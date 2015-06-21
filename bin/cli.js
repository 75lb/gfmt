#!/usr/bin/env node
"use strict";
var gfmTable = require("../");
var tr = require("transform-tools");

process.stdin
    .pipe(tr.collectJson({ through: function(json){
        return gfmTable(json).getTable();
    }}))
    .pipe(process.stdout);
