const Observable = require('rx').Observable
const fs = require('fs')

function clear() {
    process.stdout.write('\x1B[2J\x1B[0f')
}

clear()

const file$ = Observable.create( obs => {
    const path = __dirname + '/dict.txt'
    console.log(`Loading data from ${path}...`)

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            obs.onError(err)
        } else {
            obs.onNext(data)
            obs.onCompleted()
        }
    })
})

const {random, floor} = Math
const {create, assign, keys} = Object



function createNode(id){
    return {id, links: {}}
}

function extractGraph(str){
    const chars = str.split('')
                    .filter(c => c != '\n')

    const uniqueChars = new Set(chars)
    const graph = { nodes: {}, totalConnections: 0}

    uniqueChars.forEach( char => graph.nodes[char] = createNode(char))
    

    return Observable.create( obs => {
        Observable
            .fromArray(chars)
            .pairwise()
            .map( ([first, second]) => {
                const parentNode = graph.nodes[first]
                const link = parentNode.links[second]

                if(link >= 1) {
                    parentNode.links[second] = link + 1
                } else {
                    parentNode.links[second] = 1
                }

                graph.totalConnections ++
            })
            .subscribeOnCompleted( () => {
                obs.onNext(graph)
                obs.onCompleted()
            })
    })

}


function rand(min, max) {
    return random() * (max - min) + min
}
 
function getRandomItem(list, weight) {
    var total_weight = weight.reduce(function (prev, cur, i, arr) {
        return prev + cur
    })
     
    var random_num = rand(0, total_weight)
    var weight_sum = 0
    //console.log(random_num)
     
    for (var i = 0; i < list.length; i++) {
        weight_sum += weight[i]
        weight_sum = +weight_sum.toFixed(2)
         
        if (random_num <= weight_sum) {
            return list[i]
        }
    }
     
    // end of function
}

function sum(acc, val) { return  acc + val }

function next(node, nodes) {
    const linkIDs = keys(node.links)
    const totalCount = linkIDs.reduce(
                            (sum, key) => sum + node.links[key],
                            0 )

    const samples = linkIDs.map( id => node.links[id] / totalCount)
    // console.log(samples)
    
    return nodes[getRandomItem(linkIDs, samples)]
}

function createWords(graph) {

    const graphKeys = keys(graph.nodes)
    const randomIndex = graphKeys[floor(graphKeys.length * random())]
    const randomNode = graph.nodes[randomIndex]

    let max = 5
    let node = randomNode
    let word = randomNode.id
    
    while(max) {
        const nextNode = next(node, graph.nodes)
        if(!nextNode) break
        node = nextNode
        word += nextNode.id
        max--
    }

    return word

}

function renderResult(result) {
    console.log(
`
Ladies and Gentlemen, I give You:
----------------------------
${result}
----------------------------
`)
}

const format = name => name.charAt(0).toUpperCase() + name.slice(1)
const maxNames = 10
file$
    .flatMap(extractGraph)
    .flatMap( graph => Observable.just(graph)
                        .map(createWords)
                        .map(format)
                        .repeat(maxNames)
    )
    .scan( (all, curr) => all.concat([curr]), [])
    .filter( list => list.length == maxNames)
    .take(1)
    .map( arr => arr.join(',\n'))
    .subscribe( renderResult )