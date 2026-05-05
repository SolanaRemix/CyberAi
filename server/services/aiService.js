/**
 * AI Service
 * Routes task prompts to the appropriate agent and streams responses.
 * Only agents explicitly listed in AGENT_REGISTRY are accepted.
 * Unknown agent names are rejected to prevent injection via agent name.
 */

/**
 * Strict whitelist of valid agent names mapped to their display labels.
 * Only agents in this map are accepted by runAgent().
 */
export const AGENT_REGISTRY = new Map([
  ["scanner", "Scanner"],
  ["builder", "Builder"],
  ["security", "Security"],
  ["deployer", "Deployer"],
]);

/**
 * Execute a named agent against a prompt and emit the result only to the
 * originating socket (not broadcast to all clients).
 *
 * @param {string} prompt - The user's task prompt.
 * @param {string} agent  - The target agent name (must be in AGENT_REGISTRY).
 * @param {import('socket.io').Server} io - Socket.IO server instance.
 * @param {string|null} socketId - The originating socket ID.
 * @returns {Promise<string>} The agent response string.
 * @throws {Error} When the agent name is not in the registry.
 */
export async function runAgent(prompt, agent, io, socketId) {
  const label = AGENT_REGISTRY.get(agent);
  if (!label) {
    throw new Error(
      `Unknown agent: '${agent}'. Must be one of: ${[...AGENT_REGISTRY.keys()].join(', ')}`,
    );
  }

  const response = `[${label}] Processing: ${prompt}`;

  if (socketId) {
    // Emit only to the originating socket, not to all connected clients
    io.to(socketId).emit('ai_stream', response);
  }

  return response;
}
