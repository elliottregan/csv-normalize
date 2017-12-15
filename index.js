#!/usr/bin/env node
 
const readline = require('readline');
const dataNormSvc = require('./modules/dataNormSvc')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let header = false;

rl.on('line', (lineData) => {
  if (!header) {
    process.stdout.write(dataNormSvc.processHeader(lineData) + '\n');
    header = true;
  }
  else {
    process.stdout.write(dataNormSvc.processDataRow(lineData) + '\n');
  }
});
