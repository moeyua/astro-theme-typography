import { execSync } from 'node:child_process'
import bumpp from 'bumpp'

execSync('git tag -l | xargs git tag -d')

let isChangelogenDone = false

await bumpp({
  tag: true,
  commit: true,
  progress: (progress) => {
    const { newVersion } = progress
    if (isChangelogenDone)
      return
    execSync(`changelogen --output -r ${newVersion}`)
    isChangelogenDone = true
  },
})
