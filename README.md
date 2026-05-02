# 🌍 Time-Zone Converter App with DST Toggles

A modern, user-friendly web application for converting time between different time zones with full Daylight Saving Time (DST) support.

## Features

- **Multiple Time Zones**: Support for 14+ major time zones worldwide
- **DST Toggle**: Manual control over Daylight Saving Time adjustments
- **Real-Time Display**: Shows current time in the selected source timezone
- **Auto-Conversion**: Automatically converts time as you change inputs
- **Swap Functionality**: Quickly swap source and target time zones
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful UI**: Modern gradient design with smooth animations

## Supported Time Zones

- UTC (Coordinated Universal Time)
- Eastern Time (ET) - America/New_York
- Central Time (CT) - America/Chicago
- Mountain Time (MT) - America/Denver
- Pacific Time (PT) - America/Los_Angeles
- London (GMT/BST) - Europe/London
- Paris (CET/CEST) - Europe/Paris
- Berlin (CET/CEST) - Europe/Berlin
- Dubai (GST) - Asia/Dubai
- India (IST) - Asia/Kolkata
- Shanghai (CST) - Asia/Shanghai
- Tokyo (JST) - Asia/Tokyo
- Sydney (AEDT/AEST) - Australia/Sydney
- Auckland (NZDT/NZST) - Pacific/Auckland

## How to Use

1. **Open the Application**: Open `index.html` in your web browser
2. **Select Source Time Zone**: Choose the time zone you're converting from
3. **Set Date and Time**: Enter the date and time you want to convert
4. **Toggle DST** (if applicable): Enable DST if the time zone observes it
5. **Select Target Time Zone**: Choose the time zone you're converting to
6. **Toggle Target DST** (if applicable): Enable DST for the target zone
7. **Click Convert**: The converted time will be displayed instantly

## DST (Daylight Saving Time) Information

### What is DST?
DST is the practice of advancing clocks during warmer months so that darkness falls at a later clock time. When enabled, the toggle adds one hour to the standard time offset.

### DST Rules:
- **Spring Forward**: Clocks move forward 1 hour (lose 1 hour)
- **Fall Back**: Clocks move back 1 hour (gain 1 hour)
- **Note**: Not all regions observe DST

### Time Zones with DST Support:
- America/New_York (Eastern Time)
- America/Chicago (Central Time)
- America/Denver (Mountain Time)
- America/Los_Angeles (Pacific Time)
- Europe/London (British Summer Time)
- Europe/Paris (Central European Summer Time)
- Europe/Berlin (Central European Summer Time)
- Australia/Sydney (Australian Eastern Daylight Time)
- Pacific/Auckland (New Zealand Daylight Time)

### Time Zones WITHOUT DST:
- UTC
- Asia/Dubai
- Asia/Kolkata (India)
- Asia/Shanghai
- Asia/Tokyo

## Features Breakdown

### 1. Source Time Zone Card
- Select your starting time zone
- Set the date and time to convert
- Toggle DST if applicable
- View current time in selected timezone

### 2. Target Time Zone Card
- Select your destination time zone
- Toggle DST if applicable
- View converted date and time
- See UTC offset information

### 3. Action Buttons
- **Convert Time**: Manually trigger conversion
- **Swap Time Zones**: Quickly reverse source and target
- **Reset**: Return to default settings

## Technical Details

### Technologies Used
- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript (ES6+)
- Intl.DateTimeFormat API for timezone handling

### Browser Compatibility
- Chrome 24+
- Firefox 29+
- Safari 10+
- Edge 12+
- Opera 15+

### File Structure
```
timezone-converter-app/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Styling and responsive design
├── js/
│   └── app.js          # Application logic and functionality
└── README.md           # Documentation
```

## Key Functions

### TimeZoneConverter Class
- `convertTime()`: Converts time between time zones
- `getTimezoneOffset()`: Calculates timezone offset with DST
- `isDSTObserved()`: Checks if a timezone observes DST
- `swapTimeZones()`: Swaps source and target timezones
- `updateCurrentTime()`: Updates real-time clock display

## Examples

### Example 1: Converting EST to IST
1. Source: America/New_York (Eastern Time)
2. Date: May 2, 2026
3. Time: 10:00 AM
4. DST: Enabled (EDT)
5. Target: Asia/Kolkata (India Standard Time)
6. Result: May 2, 2026, 7:30 PM IST

### Example 2: Converting UTC to PST
1. Source: UTC
2. Date: December 15, 2026
3. Time: 18:00
4. Target: America/Los_Angeles (Pacific Time)
5. DST: Disabled (PST)
6. Result: December 15, 2026, 10:00 AM PST

## Customization

### Adding New Time Zones
Edit the `<select>` elements in `index.html` and add to the `dstZones` array in `app.js` if the zone observes DST.

### Changing Color Scheme
Modify the gradient colors in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## Troubleshooting

**Issue**: Time conversion seems incorrect
- **Solution**: Ensure DST toggles are set correctly for both source and target

**Issue**: DST toggle is disabled
- **Solution**: The selected timezone doesn't observe DST

**Issue**: Current time not updating
- **Solution**: Refresh the page or check browser console for errors

## License

This project is open source and available for personal and commercial use.

## Author

Created with ❤️ by Bob

## Version

Version 1.0.0 - May 2026