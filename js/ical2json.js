"use strict";
/*
The MIT License (MIT)

Copyright (c) 2017 Adrian Lee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
exports.__esModule = true;
exports.convert = exports.revert = void 0;
// Make sure lines are splited correctly
// http://stackoverflow.com/questions/1155678/javascript-string-newline-character
var NEW_LINE = /\r\n|\n|\r/;
var COLON = ':';
// const COMMA = ",";
// const DQUOTE = "\"";
// const SEMICOLON = ";";
var SPACE = ' ';
/**
 * Take ical string data and convert to JSON
 */
function convert(source) {
    var output = {};
    var lines = source.split(NEW_LINE);
    var parentObj = {};
    var currentObj = output;
    var parents = [];
    var currentKey = '';
    for (var i = 0; i < lines.length; i++) {
        var currentValue = '';
        var line = lines[i];
        if (line.charAt(0) === SPACE) {
            currentObj[currentKey] += line.substr(1);
        }
        else {
            var splitAt = line.indexOf(COLON);
            if (splitAt < 0) {
                continue;
            }
            currentKey = line.substr(0, splitAt);
            currentValue = line.substr(splitAt + 1);
            switch (currentKey) {
                case 'BEGIN':
                    parents.push(parentObj);
                    parentObj = currentObj;
                    if (parentObj[currentValue] == null) {
                        parentObj[currentValue] = [];
                    }
                    // Create a new object, store the reference for future uses
                    currentObj = {};
                    parentObj[currentValue].push(currentObj);
                    break;
                case 'END':
                    currentObj = parentObj;
                    parentObj = parents.pop();
                    break;
                default:
                    if (currentObj[currentKey]) {
                        if (!Array.isArray(currentObj[currentKey])) {
                            currentObj[currentKey] = [currentObj[currentKey]];
                        }
                        currentObj[currentKey].push(currentValue);
                    }
                    else {
                        currentObj[currentKey] = currentValue;
                    }
            }
        }
    }
    return output;
}
exports.convert = convert;
/**
 * Take JSON, revert back to ical
 */
function revert(object) {
    var lines = [];
    var _loop_1 = function (key) {
        var value = object[key];
        if (Array.isArray(value)) {
            if (key === 'RDATE') {
                value.forEach(function (item) {
                    lines.push(key + ':' + item);
                });
            }
            else {
                value.forEach(function (item) {
                    lines.push('BEGIN:' + key);
                    lines.push(revert(item));
                    lines.push('END:' + key);
                });
            }
        }
        else {
            var fullLine = key + ':' + value;
            do {
                // According to ical spec, lines of text should be no longer
                // than 75 octets
                lines.push(fullLine.substr(0, 75));
                fullLine = SPACE + fullLine.substr(75);
            } while (fullLine.length > 1);
        }
    };
    for (var key in object) {
        _loop_1(key);
    }
    return lines.join('\n');
}
exports.revert = revert;
