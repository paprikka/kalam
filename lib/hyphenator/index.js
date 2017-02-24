// @flow

import clear from '../clear'
clear()


const patterns = [
    'cvcc',
    'cccv',
    'ccv',
    'cvc',
    'vc',
    'cv',
    'v',
    'c'
]

import getFile from '../matrix/file'
import path from 'path'
import { Observable } from 'rxjs'

const file$: Observable<string> = getFile(path.join(__dirname, '../..', 'dict.txt'))

const vowels = 'aeiouy'.split('')

const toVC = (str: string): string => str.split('').map(
    char => vowels.indexOf(char) != -1 ? 'v' : 'c'
).join('')


type Index = [number, number]

function has<T>(arr: Array<T>, item: T): bool { return arr.indexOf(item) != -1 }

function groupByIndices(word: string, indices: Array<Index>): Array<string> {
    return indices.map((ind: Index): string => word.slice(ind[0], ind[0] + ind[1]))
}

const extractWordSyllables = (word: string): Array<Index> => {
    const chars = toVC(word).split('')
    const indices: Array<Index> = []

    let needle = chars.length - 1
    while (needle > 0) {
        let chunk: string = ''
        if (chunk) console.log(chunk)

        while (
            has(patterns, chars[chars.length - 1] + chunk)
        ) {
            chunk = chars.pop() + chunk
            needle--
        }
        indices.unshift([needle + 1, chunk.length])
    }

    return indices
}

const getWords = (text: string): Observable<Array<string>> => {
    const words: Array<string> = text.split('\n')
    return Observable.of(words)
}


export function extractSyllables(words: Array<string>): Observable<Array<string>> {
    return Observable.of(...words)
        .map((word: string): Array<string> => {
            const indices = extractWordSyllables(word)
            return groupByIndices(word, indices)
        })
}
