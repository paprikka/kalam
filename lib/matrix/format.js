// @flow
import type {TokenSet} from './token-set'

const format = (tokens: TokenSet): string => {
    const str = tokens.join('')
    return str.charAt(0)
              .toUpperCase()
            + str.slice(1)
}


export default format