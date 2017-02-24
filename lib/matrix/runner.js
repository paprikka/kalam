// @flow

import type {TokenConfig} from './token-config'
import {Observable} from 'rxjs/Rx'


import type {Matrix} from './matrix'

import sanitize from './sanitize'
import getTokenConfig from './get-token-config'
import calculateProbabilities from './calculate-probabilities'
import getWord from './get-word'

export default function runner(
    file$: Observable<string>,
    getTokenConfig: (text: string) => Observable<TokenConfig>,
    createMatrix: (tokenConfig: TokenConfig) => Observable<Matrix>
): Observable<Array<string>> {
    return file$
        .map(sanitize)
        .flatMap(getTokenConfig)
        .flatMap((tokenConfig: TokenConfig) => {
            return createMatrix(tokenConfig)
                    .do( matrix => console.log(`Matrix size: [${matrix.length, matrix.length}]`))
                    .map(calculateProbabilities)
                    .flatMap(
                        (matrix: Matrix) => Observable.range(0, 10)
                                .flatMap( _ => getWord(tokenConfig, matrix) )
                                .reduce( (acc, val)=> acc.concat(val), [] )
                    )
        })
}
