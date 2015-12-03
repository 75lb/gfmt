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
@returns {string}
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

  if (!data || !data.length) {
    return ''
  }

  var tableOptions = {
    nowrap: !options.wrap,
    padding: { left: '| ', right: ' ' },
    columns: options.columns || [],
    viewWidth: options.width,
    getColumn: function(columnName) {
      return this.columns.find(function (column) {
        return columnName === column.name
      })
    }
  }

  var headerRow = {}
  var separatorRow = {}

  var table = columnLayout.table(data, tableOptions)

  table.columns
    .forEach(function (column) {
      var optionColumn = tableOptions.getColumn(column.name)
      headerRow[column.name] = (optionColumn && optionColumn.header) || column.name
      separatorRow[column.name] = function () {
        return '-'.repeat(this.wrappedContentWidth)
      }
    })

  data.splice(0, 0, headerRow, separatorRow)
  table.load(data)

  var lastColumn = table.columns[table.columns.length - 1]
  lastColumn.padding = { left: '| ', right: ' |' }

  return table.render()
}
