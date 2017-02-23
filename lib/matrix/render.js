// @flow
const render = (result: Array<string>): void => {
    console.log(`Result:\n`)
    console.dir(result, { colors: true })
}

export default render