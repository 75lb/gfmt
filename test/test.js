var test = require("tape");
var gfmt = require("../");

test(".getTable()", function(t){
    var result = gfmt([
        { "date": "10 Jun 2015", "downloads": 100 },
        { "date": "11 Jun 2015", "downloads": 120 },
        { "date": "12 Jun 2015", "downloads": 150 },
        { "date": "13 Jun 2015", "downloads": 120 },
        { "date": "14 Jun 2015", "downloads": 110 }
    ]).getTable();
    var expected = 
"| date        | downloads |\n\
| ----------- | --------- |\n\
| 10 Jun 2015 | 100       |\n\
| 11 Jun 2015 | 120       |\n\
| 12 Jun 2015 | 150       |\n\
| 13 Jun 2015 | 120       |\n\
| 14 Jun 2015 | 110       |\n";
    t.strictEqual(result, expected);
    t.end();
});
