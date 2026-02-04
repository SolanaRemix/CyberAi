import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DOCS_DIR = path.resolve(__dirname, '../docs');

function findConflictedFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findConflictedFiles(fullPath));
    } else if (entry.isFile()) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (
        content.includes('<<<<<<<') &&
        content.includes('=======') &&
        content.includes('>>>>>>>')
      ) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function resolveConflict(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');

  const prompt = `
You are SmartBrain, an AI conflict resolver. A markdown file has a merge conflict. Your job is to resolve it cleanly and return the final version.

Conflict:
\`\`\`
${content}
\`\`\`

Resolved version:
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are SmartBrain, an AI conflict resolver.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.2,
    max_tokens: 2048,
  });

  const resolved = response.choices[0]?.message?.content?.trim();
  if (resolved) {
    fs.writeFileSync(filePath, resolved, 'utf8');
    console.log(`✅ Resolved: ${filePath}`);
  } else {
    console.warn(`⚠️ Could not resolve: ${filePath}`);
  }
}

async function run() {
  const conflicts = findConflictedFiles(DOCS_DIR);
  if (conflicts.length === 0) {
    console.log('✅ No conflicts found in docs/');
    return;
  }

  console.log(`🔍 Found ${conflicts.length} conflicted file(s):`);
  for (const file of conflicts) {
    console.log('→', file);
    await resolveConflict(file);
  }
}

run();
