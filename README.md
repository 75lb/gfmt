[![view on npm](http://img.shields.io/npm/v/gfmt.svg)](https://www.npmjs.org/package/gfmt)
[![npm module downloads](http://img.shields.io/npm/dt/gfmt.svg)](https://www.npmjs.org/package/gfmt)
[![Build Status](https://travis-ci.org/75lb/gfmt.svg?branch=master)](https://travis-ci.org/75lb/gfmt)
[![Dependency Status](https://david-dm.org/75lb/gfmt.svg)](https://david-dm.org/75lb/gfmt)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# gfmt
A use-anywhere, github-flavoured-markdown table generator. Useful in markdown generators or for presenting table data in the terminal.

## Synopsis
Where `example/simple.json` looks like this:
```
[
    { "date": "10 Jun 2015", "downloads": 100 },
    { "date": "11 Jun 2015", "downloads": 120 },
    { "date": "12 Jun 2015", "downloads": 150 },
    { "date": "13 Jun 2015", "downloads": 120 },
    { "date": "14 Jun 2015", "downloads": 110 }
]
```

this command:
```sh
$ cat example/simple.json | gfmt
```

produces this output:
```
| date        | downloads |
| ----------- | --------- |
| 10 Jun 2015 | 100       |
| 11 Jun 2015 | 120       |
| 12 Jun 2015 | 150       |
| 13 Jun 2015 | 120       |
| 14 Jun 2015 | 110       |
```

This command pipes cherry-picked fields from a github repo list into `gfmt`:
```sh
$ curl -s "https://api.github.com/users/jsdoc2md/repos" \
| jq 'map({repo:.name, stars:.stargazers_count, forks:.forks_count, issues:.open_issues_count}) | sort_by(.stargazers_count) | reverse' \
| gfmt
```

produces this output:
```
| repo                    | stars | forks | issues |
| ----------------------- | ----- | ----- | ------ |
| jsdoc-to-markdown       | 133   | 20    | 18     |
| jsdoc-parse             | 26    | 8     | 4      |
| jsdoc                   | 0     | 1     | 0      |
| gulp-jsdoc-to-markdown  | 6     | 2     | 0      |
| grunt-jsdoc-to-markdown | 12    | 2     | 1      |
| ddata                   | 0     | 2     | 2      |
| dmd-locale-en-gb        | 0     | 0     | 0      |
| dmd-bitbucket           | 0     | 1     | 0      |
| dmd                     | 13    | 10    | 5      |
| dhtml                   | 0     | 0     | 0      |
| dmd-plugin-example      | 0     | 1     | 0      |
```

## Install
As a library:

```
$ npm install gfmt --save
```

As a command-line tool:
```
$ npm install -g gfmt
```

Run `gfmt --help` to see the command-line options.

## API Reference
A use-anywhere, github-flavoured-markdown table generator.

<a name="exp_module_gfmt--gfmTable"></a>

### gfmTable(data, [options]) ⇒ <code>string</code> ⏏
Get a github-flavoured-markdown table instance

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> &#124; <code>Array.&lt;object&gt;</code> | the input data |
| [options] | <code>object</code> |  |
| [options.columns] | <code>Array.&lt;object&gt;</code> | column definitions |
| [options.wrap] | <code>boolean</code> | wrap to fit into width |
| [options.width] | <code>boolean</code> | table width |
| [options.ignoreEmptyColumns] | <code>boolean</code> | table width |

**Example**  
```js
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
```
* * *

&copy; 2015-16 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
