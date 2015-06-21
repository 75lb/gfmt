"use strict";
var a = require("array-tools");
var s = require("string-tools");

/**
@module gfm-table
*/
module.exports = GfmTable;

/**
Get a github-flavoured-markdown table instance
@class
@param {object|object[]} - the input data
@returns {string}
@alias module:gfm-table
*/
function GfmTable(input){
    if (!(this instanceof GfmTable)) return new GfmTable(input);
    this.columns = input.columns;
    this.data = input.data;
    this.widestColumn = Math.max(getWidestColumn(this.columns), getWidestColumn(this.data));
    this.fieldNames = a.pluck(this.columns, "field");
    this.headerNames = a.pluck(this.columns, "header");
}

/**
get the table
*/
GfmTable.prototype.getTable = function(){
    var self = this;
    var headers = this.createRow(this.headerNames);
    var headers2 = this.createRow([ "---", "---", "---" ]);
    var body = this.data.reduce(function(prev, row){
        var rowValues = self.fieldNames.map(function(field){
            return row[field];
        });
        return prev + self.createRow(rowValues);
    }, "");
    return headers + headers2 + body;
};

GfmTable.prototype.createRow = function(columnValues){
    var self = this;
    return columnValues.reduce(function(prev, columnValue){
        return prev + "| " + s.padRight(columnValue, self.widestColumn) + " ";
    }, "") + "|\n";
};

function containsData(rows, col){
    return rows.some(function(row){
        return typeof row[col] !== "undefined";
    });
}

function getWidestColumn(data){
    return data.reduce(function(prev, row){
        var widths = Object.keys(row).map(function(key){
            return row[key].toString().length;
        });
        var max = Math.max.apply(null, widths);
        if (max > prev) prev = max;
        return prev;
    }, 0);
}
