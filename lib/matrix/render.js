// @flow
const render = (result: Array<string>): void => {
    const uniqueResults = result.reduce(
        (acc, val) => acc.indexOf(val) == -1 ? acc.concat(val): acc,
        []
    )
    console.log('Result:')
    console.dir(uniqueResults, { colors: true })
    console.log('-------')
}

export default render