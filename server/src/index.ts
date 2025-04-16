import { startServer } from './server.js';

// Start the server
const PORT = process.env.PORT || 3000;
startServer(Number(PORT));