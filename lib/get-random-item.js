import rand from './random-range'

export default function getRandomItem(list, weight) {
    var total_weight = weight.reduce(function (prev, cur, i, arr) {
        return prev + cur
    }, 0)
     
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