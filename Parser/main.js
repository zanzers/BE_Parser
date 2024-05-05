const { lexi} = require ('./lexical');
const readline = require('readline');
const executioner = require ('./excutioner');
const { checkingIn, parserProcessing } = require('./InputPrep');
const Executioner = require('./excutioner');

function main(){

const startTime = performance.now();
const Output = [];


// TEST!
// AA+AA || A+A || A+1 || A*A  all red Flag;
// A+A;B ||  A+A'B+B || A'B'C+A'BC+BC'+B'C' || ABC+A'+AB'C || A'B'C'+A'B'C+A'C';
// Input that parser not been introduce yet!! (),
const inputs = "A+A";
console.log("user_input: ",inputs);

const tokens = lexi(inputs);
console.log("Token's Stream:", tokens);

if(inputs.length === 3){
    result = parserProcessing(tokens)
    Output.push(result);
}else{
    const [checking, returnIn] = checkingIn(tokens);

    if(returnIn === null){
        executioner(checking, null);
    }else{
        const parserRetutn = parserProcessing(checking);
        executioner(returnIn, checking)
    }
}

console.log("Output:" , Output);
const elapsedTime = performance.now() - startTime; 
console.log("Time taken:", elapsedTime.toFixed(2), "milliseconds");

}

main();

 
module.exports = {parserProcessing};
