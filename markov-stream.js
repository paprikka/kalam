const Observable = require('rx').Observable

const Markov = require('markov')
module.exports = function getMarkovStream(stream, order) {
    const markov = Markov(order)
    return Observable.create( obs => {
        markov.seed(stream, () => {
            obs.onNext(markov)
            obs.onCompleted()
        })
    })
}