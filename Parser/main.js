const { singleIn, parserProcess} = require ('./prepProcess');
const { lexi} = require ('./lexical');
const executioner = require ('./excutioner');


const startTime = performance.now();


// A+A'B+B'
// A+A'B

const inputs = "A+A'B+B'";
console.log("USER INPUT: ",inputs);
// const inputv = executioner();



let inputLength = inputs.length;
const tokens = lexi(inputs);

console.log("Tokens INPUT: ", tokens);

const [fnt, rst] = singleIn(tokens);

console.log("parserProcessInput: ",fnt);

let x = parserProcess(fnt);

console.log("HELOOOO: ", x);
let y = executioner(rst,x,inputLength);




const elapsedTime = performance.now() - startTime; 
console.log("Time taken:", elapsedTime.toFixed(2), "milliseconds");





// console.log();
// console.log("PARSER INPUT:",  fnt);
// console.log();
// console.log("parserProcess: ", x );
// console.log("EXECUTIONER: ", y );
 
module.exports = {parserProcess};
