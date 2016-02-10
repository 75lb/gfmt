#!/usr/bin/env node
'use strict'
var gfmTable = require('../')
var collectJson = require('collect-json')
var commandLineArgs = require('command-line-args')
var extend = require('deep-extend')

var cli = commandLineArgs([
  { name: 'wrap', alias: 'w', type: Boolean, description: 'Wrap the column content for easier reading in the terminal (no longer valid markdown). ' }
])

try {
  var options = cli.parse()
} catch (err) {
  console.error(err.message)
  console.error(cli.getUsage())
  process.exit(1)
}

process.stdin
  .pipe(collectJson(function (json) {
    var gfmOptions = {
      wrap: options.wrap
    }
    if (Array.isArray(json)) {
      return gfmTable(json, gfmOptions)
    } else {
      return gfmTable(json.data, extend(json.options, gfmOptions))
    }
  }))
  .pipe(process.stdout)
