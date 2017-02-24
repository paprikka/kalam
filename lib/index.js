// @flow

import getFile from './matrix/file'
import runner from './matrix/runner'
import render from './matrix/render'
import createMatrix from './matrix/create-matrix'
import getTokenConfig from './matrix/get-token-config'
import clear from './clear'

import path from 'path'
clear()

const filePath = path.join(__dirname, '../dict.txt')
const file$ = getFile(filePath)


import { extractSyllables } from './hyphenator'
import type { TokenConfig } from './matrix/token-config'
import { Observable } from 'rxjs'

const str2arr = (str: string, separator: string): Array<string> => str.split(separator) || []
const getSyllableTokens = (text: string): Observable<TokenConfig> => {
    console.time('str2arr')
    const chars = str2arr(text, '\n')
    console.timeEnd('str2arr')
    
    return extractSyllables(chars)
        .do( _ => console.time('reduce'))
        .reduce((acc, val) => acc.concat(val), [])
        .do( _ => console.timeEnd('reduce'))
        .flatMap(syllables => {
            return Observable
                .of(...syllables)
                .distinctUntilChanged()
        })
        .do(_ => console.time('toTokens'))
        .reduce((acc, val) => acc.concat(val), [])
        .map((tokens: Array<string>): TokenConfig => {
            return {
                tokens,
                text
            }
        })
        .do(_ => console.timeEnd('toTokens'))
}

console.time('Total time')
runner(
    file$,
    getSyllableTokens,
    createMatrix
)
.do( _ => console.timeEnd('Total time'))
.subscribe(render)
