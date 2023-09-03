#!/usr/bin/env node
import gfmTable from '../index.mjs'
import streamReadAll from 'stream-read-all'
import commandLineArgs from 'command-line-args'

const optionDefinitions = [
  {
    name: 'wrap',
    alias: 'w',
    type: Boolean,
    description: 'Wrap the column content for easier reading in the terminal (no longer valid markdown). '
  }
]

async function getTable () {
  const options = commandLineArgs(optionDefinitions)
  const input = await streamReadAll(process.stdin)
  const json = JSON.parse(input)
  const gfmOptions = {
    wrap: options.wrap
  }
  if (Array.isArray(json)) {
    return gfmTable(json, gfmOptions)
  } else {
    Object.assign(gfmOptions, json.options)
    return gfmTable(json.data, gfmOptions)
  }
}

const output = await getTable()
console.log(output)
