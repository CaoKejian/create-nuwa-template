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

  // 获取当前版本
  const currentVersion = execSync(`npm show ${packageName} version`, { encoding: 'utf8' }).trim()
  console.log(`\x1b[1;33m当前包版本：${packageName}@${currentVersion}\x1b[0m`);

  // 显示标题
  title(`更新 ${packageName} 版本`)

  // 创建 readline 接口
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  // 提示用户选择版本迭代类型
  rl.question('选择大、中、小版本的迭代 (b/m/s): ', async (choice) => {
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
    if (!isGitWorkingDirectoryClean()) {
      console.error('\x1b[1;31m错误：Git 分支有未提交内容，请保证 Git 分支干净后再发布。\x1b[0m');
      rl.close();
      process.exit(1)
    }

    try {
      // 更新版本
      execSync(`npm version ${versionType}`, { stdio: 'inherit' })

      // 发布到本地 registry
      execSync('npm publish --registry http://localhost:4873/', { stdio: 'inherit' })

      // 获取更新后的版本
      const updatedVersion = execSync(`npm show ${packageName} version`, { encoding: 'utf8' }).trim()
      const versionInfo = `${packageName}@${updatedVersion}`;

      // 动态导入 clipboardy 并将版本信息复制到剪贴板
      const clipboardy = await import('clipboardy');
      clipboardy.writeSync(versionInfo);
      console.log(`\x1b[1;32m组件更新成功, 版本信息已复制到剪贴板：${versionInfo}\x1b[0m`);
    } catch(err) {
      console.error(`\x1b[1;31m组件更新失败:, ${err.message} \x1b[0m`);
      process.exit(1);
    } finally {
      rl.close()
    }
  })
}

// 检查 Git 工作目录状态
function isGitWorkingDirectoryClean() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
    return status === '';
  } catch (error) {
    console.error(`\x1b[1;31m无法检查 Git 工作目录状态:, ${err.message} \x1b[0m`);
    process.exit(1);
  }
}

componentPublish()
module.exports = { componentPublish }