// @flow
import type {TokenConfig} from './token-config'

const isValidToken = token => token != '\n'

const getTokenConfig = (text: string): TokenConfig  => {
    const allTokens = Array.from(new Set(text.split('')))
    const tokens = allTokens.filter(isValidToken)

    const result: TokenConfig = {
        text,
        tokens
    }

    return result
}

export default getTokenConfig