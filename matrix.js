// @flow

import getFile from './lib/matrix/file'
import runner from './lib/matrix/runner'
import render from './lib/matrix/render'
import createMatrix from './lib/matrix/create-matrix'
import getTokenConfig from './lib/matrix/get-token-config'
import clear from './lib/clear'

clear()

const filePath = __dirname + '/dict.txt'
const file$ = getFile(filePath)
runner(
    file$,
    getTokenConfig,
    createMatrix
)
.subscribe(render)
