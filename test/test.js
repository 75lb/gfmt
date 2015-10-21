var test = require('tape')
var gfmt = require('../')

test('.getTable()', function (t) {
  var result = gfmt([
    { 'date': '10 Jun 2015', 'downloads': 100 },
    { 'date': '11 Jun 2015', 'downloads': 120 },
    { 'date': '12 Jun 2015', 'downloads': 150 },
    { 'date': '13 Jun 2015', 'downloads': 120 },
    { 'date': '14 Jun 2015', 'downloads': 110 }
  ]).getTable()
  var expected =
  '| date        | downloads |\n\
| ----------- | --------- |\n\
| 10 Jun 2015 | 100       |\n\
| 11 Jun 2015 | 120       |\n\
| 12 Jun 2015 | 150       |\n\
| 13 Jun 2015 | 120       |\n\
| 14 Jun 2015 | 110       |\n'
  t.strictEqual(result, expected)
  t.end()
})

test('.getTable() with empty column', function (t) {
  var result = gfmt([
    { 'name': 'Lloyd', 'age': undefined },
    { 'name': 'Roger', 'age': undefined },
    { 'name': 'Amir', 'age': undefined },
    { 'name': 'Frank', 'age': undefined },
    { 'name': 'Amy', 'age': undefined }
  ]).getTable()
  var expected =
  '| name  |\n\
| ----- |\n\
| Lloyd |\n\
| Roger |\n\
| Amir  |\n\
| Frank |\n\
| Amy   |\n'
  t.strictEqual(result, expected)
  t.end()
})

test('.getTable() with empty column 2', function (t) {
  var result = gfmt([
    { 'name': 'Lloyd', 'age': null },
    { 'name': 'Roger', 'age': null },
    { 'name': 'Amir', 'age': null },
    { 'name': 'Frank', 'age': null },
    { 'name': 'Amy', 'age': null }
  ]).getTable()
  var expected =
  '| name  |\n\
| ----- |\n\
| Lloyd |\n\
| Roger |\n\
| Amir  |\n\
| Frank |\n\
| Amy   |\n'
  t.strictEqual(result, expected)
  t.end()
})
