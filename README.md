[![view on npm](http://img.shields.io/npm/v/gfmt.svg)](https://www.npmjs.org/package/gfmt)
[![npm module downloads per month](http://img.shields.io/npm/dm/gfmt.svg)](https://www.npmjs.org/package/gfmt)
[![Dependency Status](https://david-dm.org/75lb/gfmt.svg)](https://david-dm.org/75lb/gfmt)

# gfmt
A use-anywhere, github-flavoured-markdown table generator.

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

This command, piping cherry-picked fields (see [array-tools](https://github.com/75lb/array-tools)) from a github repo list into `gfmt`:
```sh
$ curl -s "https://api.github.com/users/jsdoc2md/repos" \
| array-tools pick name stargazers_count forks_count open_issues_count \
| gfmt
```

produces this output:
```
| name                    | forks_count | open_issues_count | stargazers_count |
| ----------------------- | ----------- | ----------------- | ---------------- |
| ddata                   | 1           | 1                 |                  |
| dhtml                   |             |                   |                  |
| dmd                     | 10          | 1                 | 11               |
| dmd-bitbucket           | 1           |                   |                  |
| dmd-locale-en-gb        |             |                   |                  |
| dmd-plugin-example      | 1           |                   |                  |
| grunt-jsdoc-to-markdown | 2           |                   | 10               |
| gulp-jsdoc-to-markdown  |             |                   | 5                |
| jsdoc                   | 1           |                   |                  |
| jsdoc-parse             | 4           | 1                 | 18               |
| jsdoc-to-markdown       | 12          | 6                 | 95               |
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

## API Reference
A use-anywhere, github-flavoured-markdown table generator.


* [gfmt](#module_gfmt)
  * [GfmTable](#exp_module_gfmt--GfmTable) ⏏
    * [new GfmTable(input)](#new_module_gfmt--GfmTable_new)
    * [.getTable()](#module_gfmt--GfmTable+getTable) ⇒ <code>string</code>

<a name="exp_module_gfmt--GfmTable"></a>
### GfmTable ⏏
**Kind**: Exported class  
<a name="new_module_gfmt--GfmTable_new"></a>
#### new GfmTable(input)
Get a github-flavoured-markdown table instance


| Param | Type | Description |
| --- | --- | --- |
| input | <code>object</code> &#124; <code>Array.&lt;object&gt;</code> | the input data |

**Example**  
```js
> gfmt = require("gfmt");
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
<a name="module_gfmt--GfmTable+getTable"></a>
#### gfmTable.getTable() ⇒ <code>string</code>
get the table

**Kind**: instance method of <code>[GfmTable](#exp_module_gfmt--GfmTable)</code>  
* * *

&copy; 2015 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
