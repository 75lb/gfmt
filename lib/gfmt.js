'use strict'
if (!Array.prototype.find) require('core-js/es6/array')
if (!String.prototype.repeat) require('core-js/es6/string')
var tableLayout = require('table-layout')

/**
 * A use-anywhere, github-flavoured-markdown table generator.
 * @module gfmt
 */
module.exports = gfmTable

/**
 * Get a github-flavoured-markdown table instance
 * @param {object|object[]} - the input data
 * @param [options] {object}
 * @param [options.columns] {object[]} - column definitions
 * @param [options.wrap] {boolean} - wrap to fit into width
 * @param [options.width] {boolean} - table width
 * @param [options.ignoreEmptyColumns] {boolean} - table width
 * @returns {string}
 * @alias module:gfmt
 * @example
 * > gfmt = require("gfmt")
 * > table = gfmt([
 *     { "date": "10 Jun 2015", "downloads": 100 },
 *     { "date": "11 Jun 2015", "downloads": 120 },
 *     { "date": "12 Jun 2015", "downloads": 150 },
 *     { "date": "13 Jun 2015", "downloads": 120 },
 *     { "date": "14 Jun 2015", "downloads": 110 }
 * ])
 * > console.log(table.getTable())
 * | date        | downloads |
 * | ----------- | --------- |
 * | 10 Jun 2015 | 100       |
 * | 11 Jun 2015 | 120       |
 * | 12 Jun 2015 | 150       |
 * | 13 Jun 2015 | 120       |
 * | 14 Jun 2015 | 110       |
 */
function gfmTable (data, options) {
  options = options || {}

  if (!data || !data.length) {
    return ''
  }

  data = escapePipes(data)

  var tableOptions = {
    nowrap: !options.wrap,
    padding: { left: '| ', right: ' ' },
    columns: options.columns || [],
    getColumn: function (columnName) {
      return this.columns.find(function (column) {
        return columnName === column.name
      })
    },
    ignoreEmptyColumns: options.ignoreEmptyColumns
  }

  if (options.width) tableOptions.viewWidth = options.width

  var headerRow = {}
  var separatorRow = {}

  var table = new tableLayout.Table(data, tableOptions)

  table.columns.list
    .forEach(function (column) {
      var optionColumn = tableOptions.getColumn(column.name)
      headerRow[column.name] = (optionColumn && optionColumn.header) || column.name
      separatorRow[column.name] = function () {
        return '-'.repeat(this.wrappedContentWidth)
      }
    })

  data.splice(0, 0, headerRow, separatorRow)
  table.load(data)

  var lastColumn = table.columns.list[table.columns.list.length - 1]
  lastColumn.padding = { left: '| ', right: ' |' }

  return table.toString()
}

function escapePipes (array) {
  return array.map(function (row) {
    Object.keys(row).forEach(function (key) {
      if (typeof row[key] === 'string') {
        row[key] = row[key].replace(/\|/g, '&#124;')
      }
    })
    return row
  })
}
