// @flow
import rand from '../random-range'
import type {Token} from './token'
import type {TokenSet} from './token-set'

export default function getRandomItem(list: TokenSet, weight: Array<number>): ?Token {
    var totalWeight = weight.reduce(function (prev, cur, i, arr) {
        return prev + cur
    }, 0)
     
    var randomNum = rand(0, totalWeight)
    var weightSum = 0
     
    for (var i = 0; i < list.length; i++) {
        weightSum += weight[i]
        weightSum = +weightSum.toFixed(2)
         
        if (randomNum <= weightSum) {
            return list[i]
        }
    }
}