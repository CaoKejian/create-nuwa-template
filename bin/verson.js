function showVersion() {
  const packageJson = require('../package.json');
  console.log(`v${packageJson.version}`);
}

module.exports = { showVersion }