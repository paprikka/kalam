'use strict';module.exports = function clear() {
    process.stdout.write('\x1B[2J\x1B[0f');
};
'use strict';

var _file = require('./matrix/file');var _file2 = _interopRequireDefault(_file);
var _runner = require('./matrix/runner');var _runner2 = _interopRequireDefault(_runner);
var _render = require('./matrix/render');var _render2 = _interopRequireDefault(_render);
var _createMatrix = require('./matrix/create-matrix');var _createMatrix2 = _interopRequireDefault(_createMatrix);
var _getTokenConfig = require('./matrix/get-token-config');var _getTokenConfig2 = _interopRequireDefault(_getTokenConfig);
var _clear = require('./clear');var _clear2 = _interopRequireDefault(_clear);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

(0, _clear2.default)();

var filePath = __dirname + '/dict.txt';
var file$ = (0, _file2.default)(filePath);

(0, _runner2.default)(
file$, _getTokenConfig2.default, _createMatrix2.default).



subscribe(_render2.default);
'use strict';Object.defineProperty(exports, "__esModule", { value: true });

var _sum = require('./sum');var _sum2 = _interopRequireDefault(_sum);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var calculateProbabilities = function calculateProbabilities(matrix) {
    return matrix.map(
    function (row) {
        var totalWeight = (0, _sum2.default)(row);
        return row.map(function (col) {return col / totalWeight;});
    });

};exports.default =

calculateProbabilities;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });

var createEmptyMatrix = function createEmptyMatrix(size) {return (
        Array(size).fill(Array(size)));};exports.default =


createEmptyMatrix;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });





var _Rx = require('rxjs/Rx');

var getMatchCount = function getMatchCount(text, exp) {return (text.match(exp) || []).length;};
var getNumberOfTransitions = function getNumberOfTransitions(text, tokenA, tokenB) {
    var pairToMatch = '' + tokenA + tokenB;
    var exp = new RegExp(pairToMatch, 'gi');
    var matchCount = getMatchCount(text, exp);

    return matchCount;
};

var createMatrix = function createMatrix(tokenConfig) {

    return _Rx.Observable.
    of(tokenConfig.tokens).
    map(function (tokens) {
        var size = tokenConfig.tokens.length;

        return tokenConfig.tokens.map(
        function (rowToken, rowInd) {
            return tokenConfig.tokens.map(
            function (itemToken, itemInd) {return getNumberOfTransitions(tokenConfig.text, rowToken, itemToken);});

        });

    });
};exports.default =

createMatrix;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var Observable = require('rxjs/Rx').Observable;exports.default =

function (path) {return Observable.create(function (obs) {
        require('fs').readFile(path, 'utf8', function (err, val) {
            if (err) {
                obs.error(err);
            } else {
                obs.next(val);
                obs.complete();
            }
        });
    });};
'use strict';Object.defineProperty(exports, "__esModule", { value: true });


var format = function format(tokens) {
    var str = tokens.join('');
    return str.charAt(0).
    toUpperCase() +
    str.slice(1);
};exports.default =


format;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =




getRandomItem;var _randomRange = require('../random-range');var _randomRange2 = _interopRequireDefault(_randomRange);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function getRandomItem(list, weight) {
    var totalWeight = weight.reduce(function (prev, cur, i, arr) {
        return prev + cur;
    }, 0);

    var randomNum = (0, _randomRange2.default)(0, totalWeight);
    var weightSum = 0;

    for (var i = 0; i < list.length; i++) {
        weightSum += weight[i];
        weightSum = +weightSum.toFixed(2);

        if (randomNum <= weightSum) {
            return list[i];
        }
    }
}
'use strict';Object.defineProperty(exports, "__esModule", { value: true });


var isValidToken = function isValidToken(token) {return token != '\n';};

var getTokenConfig = function getTokenConfig(text) {
    var allTokens = Array.from(new Set(text.split('')));
    var tokens = allTokens.filter(isValidToken);

    var result = {
        text: text,
        tokens: tokens };


    return result;
};exports.default =

getTokenConfig;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });



var _Rx = require('rxjs/Rx');
var _next = require('./next');var _next2 = _interopRequireDefault(_next);


var _format = require('./format');var _format2 = _interopRequireDefault(_format);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var min = Math.min;

var getWord = function getWord(tokenConfig, matrix) {
    var tokens = tokenConfig.tokens;
    var range = min(tokens.length, 5);

    return _Rx.Observable.
    range(0, range).
    reduce(function (word, currToken) {return (0, _next2.default)(word, tokens[currToken], tokens, matrix);}, []).
    map(_format2.default);

};exports.default =

getWord;
"use strict";
'use strict';Object.defineProperty(exports, "__esModule", { value: true });


var _getRandomItem = require('./get-random-item');var _getRandomItem2 = _interopRequireDefault(_getRandomItem);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// import getRandomItem from './get'
var next = function next(word, currToken, tokens, matrix) {
    var currTokenInd = tokens.indexOf(currToken);
    var row = matrix[currTokenInd];
    var nextToken = (0, _getRandomItem2.default)(tokens, row);

    return word.concat([nextToken]);
};exports.default =

next;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var render = function render(result) {
    var uniqueResults = result.reduce(
    function (acc, val) {return acc.indexOf(val) == -1 ? acc.concat(val) : acc;},
    []);

    console.log('Result:');
    console.dir(uniqueResults, { colors: true });
    console.log('-------');
};exports.default =

render;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =












runner;var _Rx = require('rxjs/Rx');var _sanitize = require('./sanitize');var _sanitize2 = _interopRequireDefault(_sanitize);var _getTokenConfig = require('./get-token-config');var _getTokenConfig2 = _interopRequireDefault(_getTokenConfig);var _calculateProbabilities = require('./calculate-probabilities');var _calculateProbabilities2 = _interopRequireDefault(_calculateProbabilities);var _getWord = require('./get-word');var _getWord2 = _interopRequireDefault(_getWord);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function runner(
file$,
getTokenConfig,
createMatrix)
{
    return file$.
    map(_sanitize2.default).
    map(getTokenConfig).
    flatMap(function (tokenConfig) {
        return createMatrix(tokenConfig).
        map(_calculateProbabilities2.default).
        flatMap(
        function (matrix) {return _Rx.Observable.range(0, 20).
            flatMap(function (_) {return (0, _getWord2.default)(tokenConfig, matrix);}).
            reduce(function (acc, val) {return acc.concat(val);}, []);});

    });
}
"use strict";Object.defineProperty(exports, "__esModule", { value: true });

var sanitize = function sanitize(str) {return str.toLowerCase();};exports.default =

sanitize;
"use strict";Object.defineProperty(exports, "__esModule", { value: true });
var sum = function sum(arr) {return arr.reduce(function (acc, val) {return acc + val;}, 0);};exports.default =
sum;
'use strict';
"use strict";
'use strict';
"use strict";
"use strict";Object.defineProperty(exports, "__esModule", { value: true });var
random = Math.random;exports.default =
function (min, max) {return random() * (max - min) + min;};
