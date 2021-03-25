#!/usr/bin/env node
import gfmTable from '../index.mjs'
import collectJson from 'collect-json'
import commandLineArgs from 'command-line-args'

const optionDefinitions = [
  {
    name: 'wrap',
    alias: 'w',
    type: Boolean,
    description: 'Wrap the column content for easier reading in the terminal (no longer valid markdown). '
  }
]

const options = commandLineArgs(optionDefinitions)

process.stdin
  .pipe(collectJson(function (json) {
    const gfmOptions = {
      wrap: options.wrap
    }
    if (Array.isArray(json)) {
      return gfmTable(json, gfmOptions)
    } else {
      Object.assign(gfmOptions, json.options)
      return gfmTable(json.data, gfmOptions)
    }
  }))
  .pipe(process.stdout)
