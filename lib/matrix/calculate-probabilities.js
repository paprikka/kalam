// @flow
import type {Matrix} from './matrix'
import sum from './sum'

const calculateProbabilities = (matrix: Matrix): Matrix => {
    return matrix.map(
        row => {
            const totalWeight = sum(row)
            return row.map( col => (col / totalWeight))
        }
    )
}

export default calculateProbabilities