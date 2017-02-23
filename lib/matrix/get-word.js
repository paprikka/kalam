// @flow
import type {TokenConfig} from './token-config'
import type {Matrix} from './matrix'

import {Observable} from 'rx'
import next from './next'

const {min} = Math
import format from './format'

const getWord = (tokenConfig: TokenConfig, matrix: Matrix) => {
    const tokens = tokenConfig.tokens
    const range = min(tokens.length, 5)

    return Observable
        .range(0, range)
        .reduce( (word, currToken) => next(word, tokens[currToken], tokens, matrix), [])
        .map( format )
        
}

export default getWord