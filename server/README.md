# Renderly Server

Server-side rendering for JSON designs.

## System Architecture

Renderly is a server-side rendering engine that converts JSON design specifications into HTML. The system follows a modular architecture with clear separation of concerns:

### Core Components

1. **Express Server** - Handles HTTP requests and serves rendered HTML
2. **Rendering Engine** - Converts JSON designs to React components
3. **Component Library** - Reusable React components for different design elements
4. **Caching Layer** - Optimizes performance by caching rendered designs

### Data Flow

1. Client requests a design by hash
2. Server fetches the design JSON from cache or data source
3. Rendering engine converts JSON to React components
4. Components are server-side rendered to HTML
5. HTML is returned to the client

## Setup Procedures

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/renderly.git
cd renderly/server

# Install dependencies
npm install

# Build the project
npm run build
```

### Environment Configuration

Create a `.env` file in the server directory with the following variables:

```
PORT=3000
NODE_ENV=development
CACHE_TTL=3600
MEDIA_URL_PREFIX=https://d2gla4g2ia06u2.cloudfront.net/assets/media/
```

## Usage Instructions

### Starting the Server

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

### API Endpoints

#### Render Design

```
GET /render/:hash
```

Renders a design by its hash identifier.

**Parameters:**
- `hash` - Unique identifier for the design

**Response:**
- HTML representation of the design

#### Health Check

```
GET /health
```

Returns server health status.

## Development Guide

### Project Structure

```
server/
├── src/
│   ├── components/   # React components
│   │   ├── elements/ # Design element components
│   │   └── ...
│   ├── types/        # TypeScript type definitions
│   ├── utils/        # Utility functions
│   ├── services/     # Business logic services
│   ├── styles/       # CSS styles
│   ├── server.ts     # Express server setup
│   └── index.ts      # Application entry point
└── ...
```

### Adding New Element Types

2. Create a new component in `src/components/elements/`
4. Update the `DesignElement` component to handle the new element type

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Performance Considerations

- Server-side rendering optimisez loading performance
- Caching layer reduces rendering time for frequently accessed designs

## Security Considerations (for the future)

- Sanitization of design JSON to prevent XSS attacks
- Rate limiting to prevent abuse

## Troubleshooting

### Common Issues

1. **Rendering errors**: Check the design JSON format
2. **Missing images**: Verify the media URL prefix in environment variables
3. **Performance issues**: Ensure caching is properly configured

### Logs

Logs are output to the console and can be redirected to a file:

```bash
npm start > renderly.log 2>&1
```
