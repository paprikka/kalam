// @flow

import type {Matrix} from './lib/matrix/matrix'
import type {TokenConfig} from './lib/matrix/token-config'
import getFile from './lib/matrix/file'
import clear from './lib/clear'
import render from './lib/matrix/render'
import sanitize from './lib/matrix/sanitize'
import getTokenConfig from './lib/matrix/get-token-config'
import createMatrix from './lib/matrix/create-matrix'
import calculateProbabilities from './lib/matrix/calculate-probabilities'
import getWord from './lib/matrix/get-word'
import {Observable} from 'rx'

clear()

const filePath = __dirname + '/dict.txt'
const file$ = getFile(filePath)

file$
    .map(sanitize)
    .map(getTokenConfig)
    .flatMap((tokenConfig: TokenConfig) => {
        return createMatrix(tokenConfig)
                .map(calculateProbabilities)
                .flatMap( (matrix: Matrix) => {
                    return Observable.range(0, 20)
                        .flatMap( _ => getWord(tokenConfig, matrix) )
                        .reduce( (acc, val)=> acc.concat(val), [] )
                })
    })
    .subscribe(render)
