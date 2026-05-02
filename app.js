// Time Zone Converter App with DST Support

class TimeZoneConverter {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
        this.setDefaultDateTime();
        this.updateCurrentTime();
        this.checkDSTStatus();
        
        // Update current time every second
        setInterval(() => this.updateCurrentTime(), 1000);
    }

    initializeElements() {
        // Source elements
        this.sourceTimezone = document.getElementById('source-timezone');
        this.sourceDate = document.getElementById('source-date');
        this.sourceTime = document.getElementById('source-time');
        this.sourceDST = document.getElementById('source-dst');
        this.sourceDSTInfo = document.getElementById('source-dst-info');
        this.sourceCurrentTime = document.getElementById('source-current-time');

        // Target elements
        this.targetTimezone = document.getElementById('target-timezone');
        this.targetDST = document.getElementById('target-dst');
        this.targetDSTInfo = document.getElementById('target-dst-info');
        this.targetDate = document.getElementById('target-date');
        this.targetTime = document.getElementById('target-time');
        this.targetOffset = document.getElementById('target-offset');

        // Buttons
        this.convertBtn = document.getElementById('convert-btn');
        this.swapBtn = document.getElementById('swap-btn');
        this.resetBtn = document.getElementById('reset-btn');
    }

    initializeEventListeners() {
        this.convertBtn.addEventListener('click', () => this.convertTime());
        this.swapBtn.addEventListener('click', () => this.swapTimeZones());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        // Update DST info when timezone changes
        this.sourceTimezone.addEventListener('change', () => this.checkDSTStatus());
        this.targetTimezone.addEventListener('change', () => this.checkDSTStatus());
        
        // Update DST info when DST toggle changes
        this.sourceDST.addEventListener('change', () => this.updateDSTInfo('source'));
        this.targetDST.addEventListener('change', () => this.updateDSTInfo('target'));

        // Auto-convert on input change
        this.sourceDate.addEventListener('change', () => this.convertTime());
        this.sourceTime.addEventListener('change', () => this.convertTime());
        this.sourceDST.addEventListener('change', () => this.convertTime());
        this.targetDST.addEventListener('change', () => this.convertTime());
    }

    setDefaultDateTime() {
        const now = new Date();
        
        // Set date to today
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        this.sourceDate.value = `${year}-${month}-${day}`;
        
        // Set time to current time
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        this.sourceTime.value = `${hours}:${minutes}`;
    }

    updateCurrentTime() {
        const timezone = this.sourceTimezone.value;
        const now = new Date();
        
        try {
            const options = {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            
            const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
            this.sourceCurrentTime.textContent = timeString;
        } catch (error) {
            this.sourceCurrentTime.textContent = '--:--:--';
        }
    }

    checkDSTStatus() {
        this.updateDSTInfo('source');
        this.updateDSTInfo('target');
    }

    updateDSTInfo(type) {
        const timezone = type === 'source' ? this.sourceTimezone.value : this.targetTimezone.value;
        const dstCheckbox = type === 'source' ? this.sourceDST : this.targetDST;
        const dstInfo = type === 'source' ? this.sourceDSTInfo : this.targetDSTInfo;
        
        const dstStatus = this.isDSTObserved(timezone);
        
        if (dstStatus.observes) {
            dstCheckbox.disabled = false;
            
            if (dstCheckbox.checked) {
                dstInfo.textContent = `✓ DST Applied (+1 hour)`;
                dstInfo.style.background = '#c8e6c9';
                dstInfo.style.color = '#2e7d32';
            } else {
                dstInfo.textContent = `Standard Time (DST not applied)`;
                dstInfo.style.background = '#fff3e0';
                dstInfo.style.color = '#e65100';
            }
        } else {
            dstCheckbox.disabled = true;
            dstCheckbox.checked = false;
            dstInfo.textContent = `This timezone does not observe DST`;
            dstInfo.style.background = '#f5f5f5';
            dstInfo.style.color = '#757575';
        }
    }

    isDSTObserved(timezone) {
        // Time zones that typically observe DST
        const dstZones = [
            'America/New_York',
            'America/Chicago',
            'America/Denver',
            'America/Los_Angeles',
            'Europe/London',
            'Europe/Paris',
            'Europe/Berlin',
            'Australia/Sydney',
            'Pacific/Auckland'
        ];
        
        return {
            observes: dstZones.includes(timezone)
        };
    }

    getTimezoneOffset(timezone, date, applyDST) {
        try {
            // Get the offset in minutes
            const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
            const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
            let offset = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60);
            
            // Apply DST adjustment if enabled
            if (applyDST && this.isDSTObserved(timezone).observes) {
                offset += 60; // Add 1 hour (60 minutes) for DST
            }
            
            return offset;
        } catch (error) {
            console.error('Error getting timezone offset:', error);
            return 0;
        }
    }

    formatOffset(minutes) {
        const hours = Math.floor(Math.abs(minutes) / 60);
        const mins = Math.abs(minutes) % 60;
        const sign = minutes >= 0 ? '+' : '-';
        return `UTC ${sign}${hours}:${String(mins).padStart(2, '0')}`;
    }

    convertTime() {
        // Get source values
        const sourceDate = this.sourceDate.value;
        const sourceTime = this.sourceTime.value;
        const sourceTimezone = this.sourceTimezone.value;
        const sourceDSTEnabled = this.sourceDST.checked;
        
        // Get target values
        const targetTimezone = this.targetTimezone.value;
        const targetDSTEnabled = this.targetDST.checked;
        
        if (!sourceDate || !sourceTime) {
            this.showError('Please select both date and time');
            return;
        }
        
        try {
            // Create date object from source
            const dateTimeString = `${sourceDate}T${sourceTime}:00`;
            const sourceDateTime = new Date(dateTimeString);
            
            // Get offsets
            const sourceOffset = this.getTimezoneOffset(sourceTimezone, sourceDateTime, sourceDSTEnabled);
            const targetOffset = this.getTimezoneOffset(targetTimezone, sourceDateTime, targetDSTEnabled);
            
            // Calculate the difference
            const offsetDiff = targetOffset - sourceOffset;
            
            // Convert time
            const targetDateTime = new Date(sourceDateTime.getTime() + (offsetDiff * 60 * 1000));
            
            // Format and display result
            this.displayResult(targetDateTime, targetOffset);
            
        } catch (error) {
            console.error('Conversion error:', error);
            this.showError('Error converting time. Please check your inputs.');
        }
    }

    displayResult(date, offset) {
        // Format date
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const dateString = date.toLocaleDateString('en-US', options);
        
        // Format time
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        // Update display
        this.targetDate.textContent = dateString;
        this.targetTime.textContent = timeString;
        this.targetOffset.textContent = this.formatOffset(offset);
        
        // Add animation
        this.targetTime.style.animation = 'none';
        setTimeout(() => {
            this.targetTime.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
    }

    showError(message) {
        this.targetDate.textContent = 'Error';
        this.targetTime.textContent = message;
        this.targetOffset.textContent = '';
    }

    swapTimeZones() {
        // Swap timezone selections
        const tempTimezone = this.sourceTimezone.value;
        this.sourceTimezone.value = this.targetTimezone.value;
        this.targetTimezone.value = tempTimezone;
        
        // Swap DST toggles
        const tempDST = this.sourceDST.checked;
        this.sourceDST.checked = this.targetDST.checked;
        this.targetDST.checked = tempDST;
        
        // Update DST info and convert
        this.checkDSTStatus();
        this.convertTime();
    }

    reset() {
        // Reset to defaults
        this.sourceTimezone.value = 'Asia/Kolkata';
        this.targetTimezone.value = 'America/New_York';
        this.setDefaultDateTime();
        this.sourceDST.checked = false;
        this.targetDST.checked = false;
        
        // Clear results
        this.targetDate.textContent = '--';
        this.targetTime.textContent = '--:--:--';
        this.targetOffset.textContent = 'UTC +0:00';
        
        // Update DST info
        this.checkDSTStatus();
    }
}

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TimeZoneConverter();
});

// Made with Bob
