import fs from 'fs';
import path from "path"
import consola from 'consola';
import { execSync } from 'node:child_process'

consola.start('Ready to create a new post!');
const filename = await consola.prompt('Enter file name: ', {type: 'text'});
// const draft = await consola.prompt('Draft or publish? (default: publish)', {type: 'confirm', initial: false});
const ext = await consola.prompt('Select file extension: ', {type: 'select', options: ['.md', '.mdx']});

const targetDir = `./src/content/posts/`;

function getDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

const frontmatter = `---
title: ${filename}
pubDate: ${getDate()}
categories: []
description: ''
---
`;

try {
  fs.writeFileSync(path.join(targetDir, `${filename}${ext}`), frontmatter)
} catch (error) {
  consola.error(error || 'Failed to create new post!')
}

const fullPath = `${targetDir}${filename}${ext}`

consola.success('New post created successfully!')

consola.prompt('Open the new post?', {type: 'confirm', initial: true}).then((open) => {
  if (open) {
    consola.info(`Opening ${fullPath}...`)
    execSync(`code ${fullPath}`)
  }
})





