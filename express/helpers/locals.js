const fs = require('fs');
// Load .env config https://github.com/motdotla/dotenv
// Example: process.env.APP_VERSION
// ----------------------------------------
const dotenv = require('dotenv');
let locals = {};
var env = dotenv.parse(fs.readFileSync('.env.defaults'));
for (let k in env) { 
  if(k.split('_')['0'] == 'locals'){
    locals[k.replace('locals_', '')] = env[k];
  } else {
    process.env[k] = env[k] 
  }
}
var env = dotenv.parse(fs.readFileSync('.env'));
for (let k in env) { 
if(k.split('_')['0'] == 'locals'){
    locals[k.replace('locals_', '')] = env[k];
  } else {
    process.env[k] = env[k] 
  }
}

module.exports = locals;