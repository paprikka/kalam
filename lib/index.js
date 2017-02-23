// @flow

import getFile from './matrix/file'
import runner from './matrix/runner'
import render from './matrix/render'
import createMatrix from './matrix/create-matrix'
import getTokenConfig from './matrix/get-token-config'
import clear from './clear'

import path from 'path'
clear()

const filePath = path.join(__dirname, '../dict.txt')
const file$ = getFile(filePath)

runner(
    file$,
    getTokenConfig,
    createMatrix
)
.subscribe(render)
