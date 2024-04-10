import { execSync } from 'node:child_process'
import bumpp from 'bumpp'

async function release() {
  const { newVersion } = await bumpp({
    tag: true, commit: true
  })

  execSync(`changelogen --output -r ${newVersion}`)
  execSync('git add CHANGELOG.md')
  execSync('git commit --amend --no-edit')
  execSync('changelogen gh release')
}

release()
