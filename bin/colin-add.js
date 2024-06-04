#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// 获取 create-template.js 脚本的绝对路径
const scriptPath = path.resolve(__dirname, 'create-template.js');

// 使用 spawn 运行 create-template.js 脚本
const child = spawn('node', [scriptPath], { stdio: 'inherit' });

child.on('close', (code) => {
  process.exit(code);
});
