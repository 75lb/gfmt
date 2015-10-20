#!/usr/bin/env node
"use strict";
var gfmTable = require("../");
var collectJson = require("collect-json");

process.stdin
    .pipe(collectJson(function(json){
        return gfmTable(json).getTable();
    }))
    .pipe(process.stdout);
