import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

export function loadBrandContent(): string {
  const contentDir = join(process.cwd(), 'content');

  try {
    const files = readdirSync(contentDir).filter(file => file.endsWith('.md'));

    if (files.length === 0) {
      return 'No brand guidelines have been configured yet. Please add markdown files to the /content directory.';
    }

    const content = files.map(file => {
      const filePath = join(contentDir, file);
      const fileContent = readFileSync(filePath, 'utf-8');
      return `# ${file}\n\n${fileContent}`;
    }).join('\n\n---\n\n');

    return content;
  } catch (error) {
    console.error('Error loading brand content:', error);
    return 'Error loading brand guidelines. Please ensure the /content directory exists and contains markdown files.';
  }
}
