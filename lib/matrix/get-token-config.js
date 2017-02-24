// @flow
import type {TokenConfig} from './token-config'
import {Observable} from 'rxjs'

const isValidToken = token => token != '\n'

const getTokenConfig = (text: string): Observable<TokenConfig>  => {
    const allTokens = Array.from(new Set(text.split('')))
    const tokens = allTokens.filter(isValidToken)

    const result: TokenConfig = {
        text,
        tokens
    }

    return Observable.of(result)
}

export default getTokenConfig