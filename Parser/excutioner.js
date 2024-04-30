const { singleIn, parserProcess } = require ('./prepProcess');
const {statusUN,statusCom} = require('./com_uncom');
const redFlags = require ('./redFlag_parser');
const  {combine, remover} = require ('./executioner_helper');


function Executioner(rInput, nIn) {

       let newInput = combine(rInput, nIn);
       console.log("COMBINE INPUT: " , newInput);

//     let foundUncommon = false;
//     let noCommonFound = false;

//     do{
//         let [parcerU, psC] = status(combine);
//         if(psC)






//     }
//     while(!foundUncommon && !noCommonFound)
 










}


module.exports = Executioner;


