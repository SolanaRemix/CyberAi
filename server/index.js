/**
 * CyberAI v4 — Server Entrypoint
 *
 * This file is the only place that calls server.listen().
 * Keeping listen() out of server.js means server.js can be safely imported
 * in tests and other modules without binding a port.
 */

import { server } from './server.js';

const PORT = process.env.PORT ?? 3000;

server.listen(PORT, () => {
  process.stderr.write(JSON.stringify({ event: 'server_started', port: Number(PORT) }) + '\n');
});
