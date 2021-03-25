import TestRunner from 'test-runner'
import assert from 'assert'
import gfmt from '../index.mjs'

const a = assert.strict
const tom = new TestRunner.Tom()

tom.test('gmft()', function () {
  const fixture = [
    { date: '10 Jun 2015', downloads: 100 },
    { date: '11 Jun 2015', downloads: 120 },
    { date: '12 Jun 2015', downloads: 150 },
    { date: '13 Jun 2015', downloads: 120 },
    { date: '14 Jun 2015', downloads: 110 }
  ]

  const result = gfmt(fixture)
  const expected =
`| date        | downloads |
| ----------- | --------- |
| 10 Jun 2015 | 100       |
| 11 Jun 2015 | 120       |
| 12 Jun 2015 | 150       |
| 13 Jun 2015 | 120       |
| 14 Jun 2015 | 110       |
`
  a.strictEqual(result, expected)
})

/* test wrap option */

tom.test('escape pipe symbol', function () {
  a.strictEqual(
    gfmt([{ one: '|..|' }]),
    '| one            |\n| -------------- |\n| &#124;..&#124; |\n'
  )
})

tom.test('ignoreEmptyColumns', function () {
  const data = [
    { name: 'Lloyd', age: '' },
    { name: 'Roger', age: ' ' },
    { name: 'Amir' },
    { name: 'Frank' },
    { name: 'Amy' }
  ]
  a.strictEqual(
    gfmt(data, { ignoreEmptyColumns: true }),
    '| name  |\n| ----- |\n| Lloyd |\n| Roger |\n| Amir  |\n| Frank |\n| Amy   |\n'
  )
})

export default tom
