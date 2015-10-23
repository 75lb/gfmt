#!/usr/bin/env node
'use strict'
var gfmTable = require('../')
var collectJson = require('collect-json')

process.stdin
  .pipe(collectJson(function (json) {
    var options = {
      wrap: true
    }
    if (Array.isArray(json)) {
      return gfmTable(json, options)
    } else {
      return gfmTable(json.data, json.options)
    }

  }))
  .pipe(process.stdout)
