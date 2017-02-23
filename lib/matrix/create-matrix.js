// @flow
import type {TokenConfig} from './token-config'
import type {TokenSet} from './token-set'
import type {Token} from './token'
import type {Matrix} from './matrix'

import {Observable} from 'rx'

const getMatchCount = (text: string, exp: RegExp): number => (text.match(exp) || []).length
const getNumberOfTransitions = (text: string, tokenA: Token, tokenB: Token): number => {
    const pairToMatch = `${tokenA}${tokenB}`
    const exp = new RegExp(pairToMatch, 'gi')
    const matchCount = getMatchCount(text, exp)

    return matchCount
}

const createMatrix = (tokenConfig: TokenConfig): Observable<Matrix> => {
    
    return Observable
        .return(tokenConfig.tokens)
        .map( (tokens: TokenSet): Matrix => {
            const size = tokenConfig.tokens.length

            return tokenConfig.tokens.map(
                (rowToken, rowInd) => {
                    return tokenConfig.tokens.map(
                        (itemToken, itemInd) => getNumberOfTransitions(tokenConfig.text, rowToken, itemToken)
                    )
                }
            )
        })
}

export default createMatrix