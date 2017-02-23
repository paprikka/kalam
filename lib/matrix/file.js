// @flow
const Observable = require('rxjs/Rx').Observable

export default (path: string): Observable<string> => Observable.create( obs => {
    require('fs').readFile(path, 'utf8', (err, val) => {
        if(err) {
            obs.error(err)
        } else {
            obs.next(val)
            obs.complete()
        }
    })
})