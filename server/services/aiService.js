/**
 * AI Service
 * Routes task prompts to the appropriate agent and streams responses.
 */

/**
 * Execute a named agent against a prompt and broadcast the result.
 *
 * @param {string} prompt - The user's task prompt.
 * @param {string} agent  - The target agent name.
 * @param {import('socket.io').Server} io - Socket.IO server instance.
 * @param {string} socketId - The originating socket ID.
 * @returns {Promise<string>} The agent response string.
 */
export async function runAgent(prompt, agent, io, socketId) {
  let response = "";

  switch (agent) {
    case "scanner":
      response = "[Scanner] Analyzing: " + prompt;
      break;
    case "builder":
      response = "[Builder] Generating: " + prompt;
      break;
    case "security":
      response = "[Security] Checking: " + prompt;
      break;
    case "deployer":
      response = "[Deployer] Deploying: " + prompt;
      break;
    default:
      response = "[AI] " + prompt;
  }

  if (socketId) {
    io.to(socketId).emit("ai_stream", response);
  }

  return response;
}
