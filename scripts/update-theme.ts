import { execSync } from 'node:child_process'
import process from 'node:process'

try {
  // 检查是否已经添加了模板仓库
  execSync('git remote | grep template', { stdio: 'ignore' })
}
catch {
  // 如果没有添加，则添加模板仓库
  execSync(
    'git remote add template https://github.com/moeyua/astro-theme-typography.git',
    { stdio: 'inherit' },
  )
}

try {
  // 获取模板仓库的最新更改
  execSync('git fetch template', { stdio: 'inherit' })

  // 将模板仓库的最新更改合并到当前分支
  execSync('git merge template/main --allow-unrelated-histories', {
    stdio: 'inherit',
  })
}
catch (error) {
  console.error('更新主题时出错:', error)
  process.exit(1)
}
