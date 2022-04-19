exports.fibonacciCtrl = async (req, res) => {
const {number} = req.body
const data = [1]
const even = {}
if (isNaN(number) || number < 0) {
    res.status(400).json({
        status : false,
        message : 'please input a positive number!'
    })
} else {
    for(let i = 0; i < number+1; i++) {
        n = fibonacci(i)
        if (n % 2) {
            data.push(n)
        } 
    }
    data.sort(function(a, b){return b-a})
    res.json({
        status : true,
        message : 'here you fibonacci number',
        data : data
    })
}
}

exports.longestWord = async (req, res) => {
    const {input} = req.body
    const sentence = 'abcdefghijklmnopqrstuvwxyz'
    if (!isNaN(input)) {
        res.status(400).json({
            status : false,
            message : 'please input a word!'
        })
    }

    sortedChar = isStringSorted(input)

    if (sentence.includes(sortedChar)) {
        res.status(200).json({
            status : true,
            message : 'here the longest word was found',
            data : sortedChar.length +1 
        })
    } 
    
}

function fibonacci(num) {
    if(num < 1) {
        return 1;
    } else {
        return fibonacci(num-1) + fibonacci(num - 2);
    }
}

const findDiff = (a, b) => a.charCodeAt(0) - b.charCodeAt(0);
function isStringSorted (str) {
let res = ''
for(let i = 0; i < str.length-1; i++){
if(findDiff(str[i+1], str[i]) === 1){
    res += str[i]
  }else if(findDiff(str[i+1], str[i]) < 0){
     continue
  } 
};
return res;
};