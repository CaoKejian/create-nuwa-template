#!/usr/bin/env node

const { createTemplate } = require("./create-template");
const { helpDocs } = require("./help");
const { componentPublish } = require("./publish");
const { componentUpdate } = require("./update");

const args = process.argv.slice(2);

switch (args[0]) {
  case 'add': // 创建模板
  case '-a':
    createTemplate();
    break;
  case 'up': // 更新组件
  case '-u':
    componentUpdate();
    break;
  case 'publish': // 发布组件
  case '-p':
    componentPublish(); 
    break;
  case 'help': // 帮助文档
  case '-h':
    helpDocs();
    break;
  default:
    console.log('\x1b[1m\x1b[31m请输入 colin help 或者 colin -h 查看帮助文档\x1b[0m');
}