import Table from 'table-layout'

/**
 * A use-anywhere, github-flavoured-markdown table generator.
 * @module gfmt
 */

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

  const tableOptions = {
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

  const headerRow = {}
  const separatorRow = {}
  // tableOptions.columns.push({
  //   name: 'headerBorder',
  //   get: (cell, column) => '-'.repeat(column.wrappedContentWidth)
  // })
  const table = new Table(data, tableOptions)

  for (const column of table.columns.list) {
    const optionColumn = tableOptions.getColumn(column.name)
    console.log(optionColumn)
    headerRow[column.name] = (optionColumn && optionColumn.header) || column.name
    separatorRow[column.name] = '-'.repeat(3)
  }

  data.splice(0, 0, headerRow, separatorRow)
  table.load(data)

  const lastColumn = table.columns.list[table.columns.list.length - 1]
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

export default gfmTable
