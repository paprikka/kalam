const fs = require('fs')
const {random, floor} = Math

const Markov = require('markov')
const markov = Markov(2)
const s = fs.createReadStream(__dirname + '/dict.txt')
const suffixes = fs.readFileSync(__dirname + '/suffixes.txt', 'utf8').split('\n')

function optionalSuffix() {
    if (random() < .7) return ''
    return ' ' + suffixes[floor(random() * suffixes.length)]
}

function format(res) {
    return res
        .split('_')
        .map(str => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1))
        .join('-')
        + optionalSuffix()
}



const next = () => format(markov.pick())

module.exports = function generator() {
    return new Promise((resolve, reject) => {
        try {
            markov.seed(s, resolve(next))
        } catch (err) {
            reject(err)
        }
    })
}