const PORT = process.env.PORT || 3001
const generator = require('./generator')()
const express = require('express')
const app = express()

function clock(start) {
    if ( !start ) return process.hrtime()
    var end = process.hrtime(start)
    return Math.round((end[0]*1000) + (end[1]/1000000))
}


generator.then(gen => {
    app.get('/', (req, res) => {
        res.status(200)
        res.send(gen())
    })

    app.get('/list/:count', (req, res) => {
        const start = clock()

        if(req.params.count > 1000) {
            return res.status(400)
                      .send('Requested more than 1000 results.')
        }
        let max = req.params.count
        const result = { time: 0, words: [] }
        while(max--) {
            result.words.push(gen())
        }
        result.time = clock(start) + 'msec'

        res.json(result)
    })
})


app.use(function (err, req, res, next) {
    console.log(err)
    if (err) {
        res.status(err.status || 500)
        res.json({
            message: err.message,
            error: err
        })
    }
})

app.listen(PORT)
console.log('App started at 0.0.0.0:' + PORT)

