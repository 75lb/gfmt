'use strict'
require('core-js/es6')
var columnLayout = require('column-layout')

/**
A use-anywhere, github-flavoured-markdown table generator.
@module gfmt
*/
module.exports = gfmTable

/**
Get a github-flavoured-markdown table instance
@param {object|object[]} - the input data
@param [options] {object}
@param [options.columns] {object[]} - column definitions
@param [options.wrap] {boolean} - wrap to fit into width
@param [options.width] {boolean} - table width
@alias module:gfmt
@example
> gfmt = require("gfmt")
> table = gfmt([
    { "date": "10 Jun 2015", "downloads": 100 },
    { "date": "11 Jun 2015", "downloads": 120 },
    { "date": "12 Jun 2015", "downloads": 150 },
    { "date": "13 Jun 2015", "downloads": 120 },
    { "date": "14 Jun 2015", "downloads": 110 }
])
> console.log(table.getTable())
| date        | downloads |
| ----------- | --------- |
| 10 Jun 2015 | 100       |
| 11 Jun 2015 | 120       |
| 12 Jun 2015 | 150       |
| 13 Jun 2015 | 120       |
| 14 Jun 2015 | 110       |
*/
function gfmTable (data, options) {
  options = options || {}
  options.columns = options.columns || []

  var tableOptions = {
    nowrap: !options.wrap,
    padding: { left: '| ', right: ' '}
  }

  var table = columnLayout.table(data, tableOptions)
  var headerRow = {}
  table.columns.forEach(function (column) {
    var optionColumn = options.columns.find(function (optionColumn) {
      return column.name === optionColumn.name
    })
    headerRow[column.name] = (optionColumn && optionColumn.header) || column.name
  })
  data.splice(0, 0, headerRow)

  table = columnLayout.table(data, tableOptions)
  var lastColumn = table.columns[table.columns.length - 1]
  lastColumn.padding = { left: '| ', right: ' |' }
  var separatorRow = {}
  table.columns.forEach(function (column) {
    separatorRow[column.name] = '-'.repeat(column.wrappedContentWidth)
  })
  data.splice(1, 0, separatorRow)

  table = columnLayout.table(data, tableOptions)
  var lastColumn = table.columns[table.columns.length - 1]
  lastColumn.padding = { left: '| ', right: ' |' }

  table.columns.autoSize()
  return table.render()
}
