# NanoLink Frontend

A minimalist, dark-themed frontend for the NanoLink URL shortener service. Built with React and Vite.

## Features
- Instant URL shortening
- Developer API reference with cURL command generator

## Tech Stack

- React
- Vite
- Vanilla CSS (Variables & Flexbox)

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173.

## Configuration

The application connects to the backend service. For local development, a proxy is configured in `vite.config.js` to handle CORS.

In production, ensure the backend allows requests from your frontend domain.

## Project Structure

- `src/components`: UI components
- `src/services`: API integration
- `src/index.css`: Global styles and theme variables
