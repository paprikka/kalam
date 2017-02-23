// @flow
import type {TokenSet} from './token-set'
import type {Matrix} from './matrix'
import getRandomItem from './get-random-item'

// import getRandomItem from './get'
const next = (word: TokenSet, currToken: string, tokens: TokenSet, matrix: Matrix) => {
    const currTokenInd = tokens.indexOf(currToken)
    const row = matrix[currTokenInd]
    const nextToken = getRandomItem(tokens, row)

    return word.concat([nextToken])
}

export default next