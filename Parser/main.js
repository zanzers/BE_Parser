const { lexi} = require ('./lexical');
const executioner = require ('./excutioner');
const { checkingIn, parserProcessing } = require('./InputPrep');

const startTime = performance.now();


const inputs = "A+A'B";
console.log("Main USER INPUT: ",inputs);
const tokens = lexi(inputs);
const [checking,returnIn] = checkingIn(tokens)
const parserReturn = parserProcessing(checking);
executioner(returnIn,parserReturn)


// console.log("Main Lexe OUTPUT:", tokens);
// console.log("Main CHIKING IN :", checking);
// console.log("Main Return In:" ,returnIn);
// console.log("Main Parser ouput:", parserReturn);




const elapsedTime = performance.now() - startTime; 
console.log("Time taken:", elapsedTime.toFixed(2), "milliseconds");


 
module.exports = {parserProcessing};
