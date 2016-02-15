var test = require('tape')
var gfmt = require('../')

test('gmft()', function (t) {
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
  t.strictEqual(result, expected)
  t.end()
})

/* test wrap option */

test('escape pipe symbol', function (t) {
  t.strictEqual(
    gfmt([ { one: '|..|' }]),
    '| one            |\n| -------------- |\n| &#124;..&#124; |\n'
  )
  t.end()
})

test('ignoreEmptyColumns', function (t) {
  const data = [
      { "name": "Lloyd", "age": "" },
      { "name": "Roger", "age": " " },
      { "name": "Amir" },
      { "name": "Frank" },
      { "name": "Amy" }
  ]
  t.strictEqual(
    gfmt(data, { ignoreEmptyColumns: true }),
    '| name  |\n| ----- |\n| Lloyd |\n| Roger |\n| Amir  |\n| Frank |\n| Amy   |\n'
  )
  t.end()
})
