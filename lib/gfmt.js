"use strict";
var a = require("array-tools");
var s = require("string-tools");

/**
A use-anywhere, github-flavoured-markdown table generator.
@module gfmt
*/
module.exports = GfmTable;

/**
Get a github-flavoured-markdown table instance
@class
@param {object|object[]} - the input data
@returns {string}
@alias module:gfmt
*/
function GfmTable(input){
    if (!(this instanceof GfmTable)) return new GfmTable(input);
    if (Array.isArray(input)){
        this.columns = Object.keys(input[0]).map(function(column){
            var col = {};
            col.field = column;
            col.header = column;
            col.width = Math.max(
                String(column).length,
                getColumnWidth(input, col.field)
            );
            return col;
        });
        this.data = input;
    } else {
        this.columns = input.columns.map(function(col){
            col.width = col.width || Math.max(
                String(col.header).length,
                getColumnWidth(input.data, col.field)
            );
            return col;
        });
        this.data = input.data;
    }
    this.headerRow = this.columns.reduce(function(prev, column){
        prev[column.field] = column.header;
        return prev;
    }, {});
}

/**
get the table
*/
GfmTable.prototype.getTable = function(){
    var self = this;
    var headers = this.createRow(this.headerRow);
    var headerBorder = this.createBorder(this.headerRow);
    var body = this.data.reduce(function(prev, row){
        return prev + self.createRow(row);
    }, "");
    return headers + headerBorder + body;
};

GfmTable.prototype.createRow = function(row){
    return this.columns.reduce(function(prev, column){
        return prev + "| " + s.padRight(row[column.field], column.width) + " ";
    }, "") + "|\n";
};
GfmTable.prototype.createBorder = function(row){
    return this.columns.reduce(function(prev, column){
        return prev + "| " + s.fill("-", column.width) + " ";
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

function getColumnWidth(data, key){
    return data.reduce(function(prev, row){
        var width = String(row[key]).length;
        if (width > prev) prev = width;
        return prev;
    }, 0);
}
