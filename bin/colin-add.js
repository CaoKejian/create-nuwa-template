#!/usr/bin/env node

const { verify, main } = require("./create-template")

const args = process.argv.slice(2);
if (args.includes('add')) {
  verify();
  main();
} else {
  // 其他处理逻辑
  console.log(11111);
}
