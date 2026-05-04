/**
 * AI Service
 * Routes task prompts to the appropriate agent and streams responses.
 * Only agents explicitly listed in AGENT_REGISTRY are accepted.
 * Unknown agent names are rejected to prevent injection via agent name.
 */

/**
 * Strict whitelist of valid agent names.
 * Any agent name not in this set will be rejected before execution.
 */
export const AGENT_REGISTRY = new Set(["scanner", "builder", "security", "deployer"]);

/**
 * Execute a named agent against a prompt and broadcast the result.
 *
 * @param {string} prompt - The user's task prompt.
 * @param {string} agent  - The target agent name (must be in AGENT_REGISTRY).
 * @param {import('socket.io').Server} io - Socket.IO server instance.
 * @param {string|null} socketId - The originating socket ID.
 * @returns {Promise<string>} The agent response string.
 * @throws {Error} When the agent name is not in the registry.
 */
export async function runAgent(prompt, agent, io, socketId) {
  if (!AGENT_REGISTRY.has(agent)) {
    throw new Error(`Unknown agent: '${agent}'. Must be one of: ${[...AGENT_REGISTRY].join(", ")}`);
  }

  const labels = {
    scanner: "Scanner",
    builder: "Builder",
    security: "Security",
    deployer: "Deployer",
  };

  const label = labels[agent];
  const response = `[${label}] Processing: ${prompt}`;

  if (socketId) {
    io.to(socketId).emit("ai_stream", response);
  }

  return response;
}
