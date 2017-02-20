// @flow
const Observable = require('rx').Observable

export default (path: string): any => Observable.create( obs => {
    require('fs').readFile(path, 'utf8', (err, val) => {
        if(err) {
            obs.onError(err)
        } else {
            obs.onNext(val)
            obs.onCompleted()
        }
    })
})