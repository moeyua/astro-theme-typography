import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import consola from 'consola'

/**
 * Get the current date in the format "YYYY-MM-DD".
 * @returns The current date as a string.
 */
function getDate(): string {
  const today: Date = new Date()
  const year: number = today.getFullYear()
  const month: string = String(today.getMonth() + 1).padStart(2, '0')
  const day: string = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Create a new post.
 * Prompts the user for a file name and extension, and creates a new post file with frontmatter.
 * If successful, opens the new post file in the default editor.
 */
async function createPost(): Promise<void> {
  consola.start('Ready to create a new post!')
  const filename: string = await consola.prompt('Enter file name: ', {
    type: 'text',
  })
  const ext: string = await consola.prompt('Select file extension: ', {
    type: 'select',
    options: ['.md', '.mdx'],
  })

  const targetDir = './src/content/posts/'
  const fullPath: string = path.join(targetDir, `${filename}${ext}`)

  const frontmatter = `---
  title: ${filename}
  pubDate: ${getDate()}
  categories: []
  description: ''
  ---
  `

  try {
    fs.writeFileSync(fullPath, frontmatter)
    consola.success('New post created successfully!')

    const open: boolean = await consola.prompt('Open the new post?', {
      type: 'confirm',
      initial: true,
    })
    if (open) {
      consola.info(`Opening ${fullPath}...`)
      execSync(`code ${fullPath}`)
    }
  }
  catch (error) {
    consola.error((error as Error).message || 'Failed to create new post!')
  }
}

createPost()
