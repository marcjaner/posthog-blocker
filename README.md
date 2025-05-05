# PostHog Blocker

A Chrome extension that allows you to block PostHog analytics and recordings on specific domains of your choice.

![PostHog Blocker Screenshot](https://raw.githubusercontent.com/marcjaner/posthog-blocker/main/screenshot.png)

## Features

- 🔒 Block PostHog analytics and recordings on selected domains
- 🌐 Support for both exact domain matches and subdomains
- 🎨 Clean, modern UI with dark mode support
- 🔍 Domain filtering and search
- 📱 Responsive design
- 🔄 Real-time blocking without page reload

## Installation

1. Download the latest release from the [Chrome Web Store](https://chromewebstore.google.com/detail/posthog-self-blocker/hicioojgkpaeojpclncaojemmkliiblk)
2. Or install manually:
   - Download the repository
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the extension directory

## Usage

1. Click the extension icon to open the options page
2. Add domains where you want to block PostHog (e.g., `example.com`)
3. The extension will automatically block PostHog on:
   - The exact domain (e.g., `example.com`)
   - All subdomains (e.g., `app.example.com`, `api.example.com`)

## How It Works

The extension uses multiple techniques to ensure PostHog is completely blocked:

1. **Network Blocking**: Blocks requests to PostHog's servers
2. **JavaScript Interception**: Replaces PostHog's JavaScript API with a no-op stub
3. **Storage Sync**: Your blocked domains list syncs across Chrome browsers

## Development

### Project Structure

- `manifest.json` - Extension configuration
- `content_script.js` - Main blocking logic
- `options.html` - User interface
- `options.js` - UI logic and domain management
- `rules.json` - Network blocking rules

### Building

1. Clone the repository
2. Make your changes
3. Load the extension in Chrome using "Load unpacked"

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

Built with ❤️ by [Marc Janer](https://marcjaner.com)
