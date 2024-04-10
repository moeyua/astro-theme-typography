import fs from 'fs';
import path from 'path';
import consola from 'consola';
import { execSync } from 'child_process';

/**
 * Get the current date in the format "YYYY-MM-DD".
 * @returns The current date as a string.
 */
function getDate(): string {
  let today: Date = new Date();
  let year: number = today.getFullYear();
  let month: string = String(today.getMonth() + 1).padStart(2, '0');
  let day: string = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Create a new post.
 * Prompts the user for a file name and extension, and creates a new post file with frontmatter.
 * If successful, opens the new post file in the default editor.
 */
async function createPost(): Promise<void> {
  consola.start('Ready to create a new post!');
  let filename: string = await consola.prompt('Enter file name: ', { type: 'text' });
  let ext: string = await consola.prompt('Select file extension: ', { type: 'select', options: ['.md', '.mdx'] });

  let targetDir: string = './src/content/posts/';
  let fullPath: string = path.join(targetDir, `${filename}${ext}`);

  let frontmatter: string = 
  `---
  title: ${filename}
  pubDate: ${getDate()}
  categories: []
  description: ''
  ---
  `;

  try {
    fs.writeFileSync(fullPath, frontmatter);
    consola.success('New post created successfully!');

    const open: boolean = await consola.prompt('Open the new post?', { type: 'confirm', initial: true });
    if (open) {
      consola.info(`Opening ${fullPath}...`);
      execSync(`code ${fullPath}`);
    }
  } catch (error) {
    consola.error((error as Error).message || 'Failed to create new post!');
  }
}

createPost();
