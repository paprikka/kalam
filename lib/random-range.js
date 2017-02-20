// @flow
const {random} = Math
export default (min: number, max: number): number => random() * (max - min) + min
