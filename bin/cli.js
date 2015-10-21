#!/usr/bin/env node
'use strict'
var gfmTable = require('../')
var collectJson = require('collect-json')

process.stdin
  .pipe(collectJson(function (json) {
    if (Array.isArray(json)) {
      return gfmTable(json)
    } else {
      return gfmTable(json.data, json.columns)
    }

  }))
  .pipe(process.stdout)
