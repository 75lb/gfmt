#!/usr/bin/env node
'use strict'
var gfmTable = require('../')
var collectJson = require('collect-json')
var tool = require('command-line-tool')
var extend = require('deep-extend')

var optionDefinitions = [
  { name: 'wrap', alias: 'w', type: Boolean, description: 'Wrap the column content for easier reading in the terminal (no longer valid markdown). ' }
]

try {
  var options = tool.getCli(optionDefinitions).options
} catch (err) {
  tool.halt(err)
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
