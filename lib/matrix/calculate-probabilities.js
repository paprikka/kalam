// @flow
import type {Matrix} from './matrix'
import sum from './sum'

const calculateProbabilities = (matrix: Matrix): Matrix => {
    return matrix.map(
        row => {
            const adjustedVals = row.map( col => (col == 0) ? 0.1 : col)
            const totalWeight = sum(adjustedVals)
            return adjustedVals.map( col => (col / totalWeight))
        }
    )
}

export default calculateProbabilities