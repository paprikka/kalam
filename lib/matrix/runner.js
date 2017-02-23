// @flow

import type {TokenConfig} from './token-config'
import {Observable} from 'rxjs/Rx'
type Tokenizer = (text: string) => TokenConfig

import type {Matrix} from './matrix'

import sanitize from './sanitize'
import getTokenConfig from './get-token-config'
import createMatrix from './create-matrix'
import calculateProbabilities from './calculate-probabilities'
import getWord from './get-word'

export default function runner(
    file$: Observable<string>,
    getTokenConfig: Tokenizer
): Observable<Array<string>> {
    return file$
        .map(sanitize)
        .map(getTokenConfig)
        .flatMap((tokenConfig: TokenConfig) => {
            return createMatrix(tokenConfig)
                    .map(calculateProbabilities)
                    .flatMap( 
                        (matrix: Matrix) => Observable.range(0, 20)
                                .flatMap( _ => getWord(tokenConfig, matrix) )
                                .reduce( (acc, val)=> acc.concat(val), [] )
                    )
        })
}
