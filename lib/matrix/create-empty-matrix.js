// @flow
import type {Matrix} from './matrix'
const createEmptyMatrix = (size: number): Matrix => (
    Array(size).fill( Array(size))
)

export default createEmptyMatrix