'use strict'
var TestRunner = require('test-runner')
var gfmt = require('../')
var a = require('core-assert')

var runner = new TestRunner()

runner.test('gmft()', function () {
  var fixture = require('./fixture/downloads')
  var result = gfmt(fixture)
  var expected =
'| date        | downloads |\n\
| ----------- | --------- |\n\
| 10 Jun 2015 | 100       |\n\
| 11 Jun 2015 | 120       |\n\
| 12 Jun 2015 | 150       |\n\
| 13 Jun 2015 | 120       |\n\
| 14 Jun 2015 | 110       |\n'
  a.strictEqual(result, expected)
})

/* test wrap option */

runner.test('escape pipe symbol', function () {
  a.strictEqual(
    gfmt([ { one: '|..|' }]),
    '| one            |\n| -------------- |\n| &#124;..&#124; |\n'
  )
})

runner.test('ignoreEmptyColumns', function () {
  var data = [
      { "name": "Lloyd", "age": "" },
      { "name": "Roger", "age": " " },
      { "name": "Amir" },
      { "name": "Frank" },
      { "name": "Amy" }
  ]
  a.strictEqual(
    gfmt(data, { ignoreEmptyColumns: true }),
    '| name  |\n| ----- |\n| Lloyd |\n| Roger |\n| Amir  |\n| Frank |\n| Amy   |\n'
  )
})
