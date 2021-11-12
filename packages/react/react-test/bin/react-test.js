#!/usr/bin/env node
/* eslint-disable */
require('yargs')
  .usage('Usage: $0 <command> [options]')
  .demandCommand(1)
  .commandDir('../commands')
  .help()
  .argv;
