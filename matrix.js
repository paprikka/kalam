// @flow
const Observable = require('rx').Observable
const filePath = __dirname + '/dict.txt'

import getFile from './lib/matrix/file'
const file$ = getFile(filePath)

const {min, max, floor, random} = Math

import clear from './lib/clear'

const render = result => {
    console.log(` \n\n\nResult: ${new Date().toTimeString()}`)
    console.log(result)
}

type Token = string
type TokenSet = Token[]
type TokenConfig = {
    text: string,
    tokens: TokenSet
}
const sanitize = (str: string) => str.toLowerCase()
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

type Row = Array<number>
type Matrix = Array<Row>

const createEmptyMatrix = (size: number): Matrix => (
    Array(size).fill( Array(size))
)


type TokenMap = {
    [id: string]: number
}

const {assign} = Object

const getMatchCount = (text: string, exp: RegExp): number => (text.match(exp) || []).length
const getNumberOfTransitions = (text: string, tokenA: Token, tokenB: Token): number => {
    const pairToMatch = `${tokenA}${tokenB}`
    const exp = new RegExp(pairToMatch, 'gi')
    const matchCount = getMatchCount(text, exp)

    return matchCount
}


const createMatrix = (tokenConfig: TokenConfig): Obsevable<Matrix> => {
    
    
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

/*
            // for(let rowInd = 0; rowInd < size; rowInd ++) {
            //     const rowToken = tokens[rowInd]
            //     const currRow =  matrix[rowInd]

            //     for(let itemInd = 0; itemInd < size; itemInd ++){
            //         const itemToken = tokens[itemInd]
            //         const transitionsCount = getNumberOfTransitions(
            //                                     tokenConfig.text,
            //                                     rowToken,
            //                                     itemToken
            //                                 )

            //         currRow[itemInd] = transitionsCount
            //     }
                
            // }

            // return matrix

*/
        })


}

const sum = (arr: number[]): number => arr.reduce( (acc, val) => acc + val, 0)
const calculateProbabilities = (matrix: Matrix): Matrix => {
    return matrix.map(
        row => {
            const adjustedVals = row.map( col => (col == 0) ? 0.1 : col)
            const totalWeight = sum(adjustedVals)
            return adjustedVals.map( col => (col / totalWeight))
        }
    )
}

import getRandomItem from './lib/get-random-item'
const next = (word: TokenSet, currToken: string, tokens: TokenSet, matrix: Matrix) => {
    const currTokenInd = tokens.indexOf(currToken)
    const row = matrix[currTokenInd]
    const nextToken = getRandomItem(tokens, row)

    return word.concat([nextToken])
}

const getWord = (tokenConfig: TokenConfig, matrix: Matrix) => {
    const tokens = tokenConfig.tokens
    const range = min(tokens.length, 5)

    return Observable
        .range(0, range)
        .reduce( (word, currToken) => next(word, tokens[currToken], tokens, matrix), [])
        
}


const format = (tokens: TokenSet): string => {
    const str = tokens.join('')
    return str.charAt(0).toUpperCase() + str.slice(1)
}

file$
    .map(sanitize)
    .map(getTokenConfig)
    .flatMap((tokenConfig: TokenConfig) => {
        return createMatrix(tokenConfig)
                .map(calculateProbabilities)
                .flatMap( (matrix: Matrix) => getWord(tokenConfig, matrix))
    })
    .map(format)
    .subscribe(render)

    // calculateProbabilities