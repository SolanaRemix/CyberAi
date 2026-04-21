import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const projectRoot = join(__dirname, '../..');

describe('Repository hygiene', () => {
  it('removes merge artifact markers from markdown docs', () => {
    const skipDirs = new Set(['.git', 'node_modules', 'dist', 'build', '.cache']);
    const files: string[] = [];
    const queue = [projectRoot];

    while (queue.length > 0) {
      const current = queue.pop()!;
      for (const entry of readdirSync(current)) {
        const fullPath = join(current, entry);
        const relPath = relative(projectRoot, fullPath);
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
          if (!skipDirs.has(entry)) queue.push(fullPath);
          continue;
        }
        if (entry.endsWith('.md')) files.push(relPath);
      }
    }

    for (const file of files) {
      const content = readFileSync(join(projectRoot, file), 'utf-8');
      expect(content).not.toMatch(/^<<<<<<< /m);
      expect(content).not.toMatch(/^=======\s*$/m);
      expect(content).not.toMatch(/^>>>>>>> /m);
      expect(content).not.toMatch(/^>{7,}\s+/m);
    }
  });

  it('uses live GitHub Actions loading in dashboard views', () => {
    const dashboardFiles = ['web/index.html', 'web/audit/index.html'];

    for (const file of dashboardFiles) {
      const content = readFileSync(join(projectRoot, file), 'utf-8');
      expect(content).toContain('loadDashboardData');
      expect(content).toContain('api.github.com');
      expect(content).toContain('actions/runs');
      expect(content).not.toContain('This is a placeholder dashboard');
    }
  });
});
