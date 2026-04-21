import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const projectRoot = join(__dirname, '../..');

describe('Repository hygiene', () => {
  it('removes merge artifact markers from cleaned docs', () => {
    const files = [
      'BOOTSTRAP_REPORT.md',
      'docs/audit/release-process.md',
      'docs/audit/dao/README.md',
      'web/audit/README.md',
    ];

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
