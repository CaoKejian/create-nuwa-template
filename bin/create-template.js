#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
// 使用动态import导入inquirer模块
const main = async () => {
  let inquirer;
  try {
    // 动态导入inquirer模块
    const { default: prompt } = await import('inquirer');
    inquirer = prompt;
  } catch (err) {
    console.error('无法加载inquirer模块:', err);
    process.exit(1);
  }

  const promptOptions = [
    {
      type: 'list',
      name: 'action',
      message: '请选择要执行的操作:',
      choices: [
        '创建nuwa（女娲）-React组件',
        '测试（误用）'
      ]
    }
  ];

  try {
    // 显示命令行选项
    const answers = await inquirer.prompt(promptOptions);

    if (answers.action === '创建nuwa（女娲）-React组件') {
      askComponentName();
    } else if (answers.action === '测试（误用）') {
      console.log('执行测试操作...');
      // 在这里添加测试操作的代码
    }
  } catch (error) {
    console.error('发生错误:', error);
  }
};

function verify() {
  // 检查当前目录是否为项目根目录
  const currentDir = process.cwd();
  const lastDir = path.basename(currentDir);

  if (lastDir !== 'package') {
    console.error('\x1b[1m\x1b[31m当前目录非 package 工作目录\x1b[0m');
    process.exit(1);
  }
}
verify();
main();

// 提示用户输入组件名称的方法
function askComponentName() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.question('新创建组件的名字: ', (componentName) => {
    const directory = path.join(process.cwd(), componentName);
    const modelDirectory = path.join(directory, 'model');

    if (fs.existsSync(directory)) {
      console.error('\x1b[1m\x1b[33m%s 组件已存在，请重新创建新的组件\x1b[0m', componentName);
      readline.close();
      return;
    }

    fs.mkdirSync(directory, { recursive: true });
    fs.mkdirSync(modelDirectory, { recursive: true });
    const templates = {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Please input your component name.</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>`,
      'index.tsx': `import React from 'react';
import * as s from './index.less'
import xprops from './model/props'
interface ButtonProps {
  label?: string;
  onClick?: () => void;
}

const mergeProps = (xprops: ButtonProps, props: ButtonProps) => ({
  ...xprops,
  ...props,
})
export const Index = (props: ButtonProps) => {

  const mergedProps = mergeProps(xprops, props);
  return (
    <button
      type="button"
      className={s.button}
       {...mergedProps}
    >
      {mergedProps.label || '默认文字'}
    </button>
  )
}
`,
      'index.less': `.button {
  color: white;
  background-color: #1ea7fd;
  width: 300px;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
`,
      'meta.json': `{
  "desc": "这是一个组件",
  "img": "图片链接"
}`
    };

    const propsContent = `export default {
  label: 'ckj is king'
};`;
    fs.writeFileSync(path.join(modelDirectory, 'props.ts'), propsContent);

    for (const [filename, content] of Object.entries(templates)) {
      fs.writeFileSync(path.join(directory, filename), content);
    }
    console.log('\x1b[1m\x1b[33mComponent %s created in %s\x1b[0m', componentName, directory);
    readline.close();
  });
}
