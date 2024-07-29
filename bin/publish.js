#!/usr/bin/env node

const { execSync } = require('child_process')
const readline = require('readline')
const fs = require('fs')
const path = require('path')

// 定义 title 函数
function title(message) {
  console.log()
  console.log("###############################################################################")
  console.log(`## 👉${message}👈`)
  console.log("###############################################################################")
  console.log()
}

function componentPublish() {
  // 读取 package.json 文件
  const packageJsonPath = path.resolve(process.cwd(), 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  const packageName = packageJson.name

  console.log(packageName);
  // 获取当前版本
  const currentVersion = execSync(`npm show ${packageName} version`, { encoding: 'utf8' }).trim()
  console.log(`当前包版本：${packageName}@${currentVersion}`)

  // 显示标题
  title(`更新 ${packageName} 版本`)

  // 创建 readline 接口
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  // 提示用户选择版本迭代类型
  rl.question('选择大、中、小版本的迭代 (b/m/s): ', (choice) => {
    let versionType

    // 判断用户的选择
    switch (choice) {
      case 'b':
        console.log('\x1b[133m更新大版本\x1b[0m')
        versionType = 'major'
        break
      case 'm':
        console.log('\x1b[133m更新中版本\x1b[0m')
        versionType = 'minor'
        break
      case 's':
        console.log('\x1b[133m更新小版本\x1b[0m')
        versionType = 'patch'
        break
      default:
        console.log('无效选择, 默认更新小版本。')
        versionType = 'patch'
    }

    // 更新版本
    execSync(`npm version ${versionType}`, { stdio: 'inherit' })

    // 发布到本地 registry
    execSync('npm publish --registry http://localhost:4873/', { stdio: 'inherit' })

    // 获取更新后的版本
    const updatedVersion = execSync(`npm show ${packageName} version`, { encoding: 'utf8' }).trim()
    console.log(`\x1b[133m更新完成：${packageName}@${updatedVersion}\x1b[0m`)

    rl.close()
  })
}
componentPublish()
module.exports = { componentPublish }