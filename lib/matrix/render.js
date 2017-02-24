// @flow
const render = (result: Array<string>): void => {
    console.log('Result:')
    console.dir(result, { colors: true })
    console.log('-------')
}

export default render