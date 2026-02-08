import fs from "fs";
import path from "path";
import readline from "readline";
import OpenAI from "openai";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(q) {
  return new Promise(resolve => rl.question(q, resolve));
}

async function loadAgent(agentName) {
  const agentPath = path.resolve(`contracts/agents/${agentName}.json`);
  if (!fs.existsSync(agentPath)) {
    console.error(`❌ Agent contract not found: ${agentPath}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(agentPath, "utf8"));
}

async function run() {
  const agentName = process.argv[2];
  if (!agentName) {
    console.error("Usage: npx tsx scripts/agent-runtime.mts <agent-name>");
    process.exit(1);
  }

  const agent = await loadAgent(agentName);

  console.log(`\n🚀 Loaded agent: ${agent.name}`);
  console.log(`📄 Description: ${agent.description}\n`);

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const messages = [
    { role: "system", content: agent.prompts?.system || "You are an AI agent." }
  ];

  while (true) {
    const userInput = await ask("You: ");
    if (!userInput.trim()) continue;
    if (userInput === "/exit") break;

    messages.push({ role: "user", content: userInput });

    console.log("Agent:");

    const stream = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      stream: true
    });

    let fullResponse = "";

    for await (const chunk of stream) {
      const token = chunk.choices?.[0]?.delta?.content || "";
      process.stdout.write(token);
      fullResponse += token;
    }

    console.log("\n");

    messages.push({ role: "assistant", content: fullResponse });
  }

  rl.close();
}

run();
