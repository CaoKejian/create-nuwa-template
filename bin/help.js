function helpDocs() {
  console.log(`
Usage: colin <command> [options]
Author: Cao Kejian
Email: caokejian@foxmail.com

Commands:
  colin publish  发布新版本
  colin up       更新依赖
  colin add      创建新的组件

Options:
  -h, help       显示帮助信息

Examples:
  colin publish  发布新版本并将版本信息复制到剪贴板
  colin up       更新项目中的所有依赖到最新版本
  colin add      添加一个新的组件在package目录下
  `);
}

module.exports = { helpDocs }