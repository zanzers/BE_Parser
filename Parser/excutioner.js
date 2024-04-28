const { singleIn, parserProcess } = require ('./prepProcess');
const {commonT, unCommonT} = require('./com_uncom');
const redFlags = require ('./redFlag_parser');


function Executioner(rInput, nIn, inputLength, fntInfo) {

   let combine = fntRst(rInput, nIn);
 

    console.log("COMBINE INPUT: " , combine);

// 1st process:
  



   console.log();
    console.log("START PHASE 1: ========================================");

    let [unCommon, comMon] = unCommonT(combine)
    const [phase1UN] = singleIn(unCommon);
    let parserPhaseUN = parserProcess(phase1UN);

   console.log("UNCOMMON PHASE 1: ", unCommon);
   console.log("REST OF INPUT IN UNCOMMON PHASE 1: ", comMon)
   console.log("UNCOMMON PHASE 1 PARSER OUTPUT: ", parserPhaseUN);

   console.log("=======================================================");

   let[commonIn,rstIn] = commonT(comMon);
   const[phaseCOM] = singleIn(commonIn);
   let parserPhaseCOM = parserProcess(phaseCOM);

   console.log("COMMON PHASE 1: ", commonIn);
   console.log("REST OF INPUT IN COMMON PHASE 1: ", rstIn);
   console.log("COMMON PHASE 1 PARSER OUTPUT: ", parserPhaseCOM);

   let newIn2 = removerMarker(rstIn,parserPhaseUN,parserPhaseCOM);  
    console.log("PROCESS OUTPUT: ", newIn2);
   console.log("END OF PHASE 1: ========================================");
    console.log();
    
// 2nd Process:
    let [unCommon2, comMon2] = unCommonT(newIn2);
    const [phase2UN] = singleIn(unCommon2);
    let parserPhaseUN2 = parserProcess(phase2UN);

    console.log();
    console.log();
    console.log("START PHASE 2: ========================================");
    console.log("UNCOMMON PHASE 2: ", unCommon2);
    console.log("REST OF INPUT IN UNCOMMON PHASE 2: ", comMon2)
    console.log("UNCOMMON PHASE 2 PARSER OUTPUT: ", parserPhaseUN2);

    let[commonIn2,rstIn2] = commonT(comMon2);
   


    console.log("COMMON PHASE 2: ", commonIn2);
    console.log("REST OF INPUT IN COMMON PHASE 2: ", comMon2);
    // console.log("COMMON PHASE 2 PARSER OUTPUT: ", parserPhaseCOM2); NO MATCH!
 
    let newIn3 = removerMarker(comMon2,parserPhaseUN2,parserPhaseCOM);  
    console.log("PROCESS OUTPUT: ", newIn3);
    console.log("END OF PHASE 2: ========================================");
    // console.log();


// // 3rd Process:

    let [unCommon3, comMon3] = unCommonT(newIn3);   
    const [phase3UN] = singleIn(unCommon3);
    let parserPhaseUN3 = parserProcess(phase3UN);

    console.log();
    console.log("START PHASE 3: ========================================");
   console.log("UNCOMMON PHASE 3: ", unCommon3);
   console.log("REST OF INPUT IN UNCOMMON PHASE 3: ", comMon3)
   console.log("UNCOMMON PHASE 3 PARSER OUTPUT: ", parserPhaseUN3);

   let newIn4 = removerMarker(comMon3,parserPhaseUN3,parserPhaseCOM);  
   console.log("PROCESS OUTPUT: ", newIn4);
   console.log("END OF PHASE 3: ========================================");
   console.log();

// // 4th Process:
let [unCommon4, comMon4] = unCommonT(newIn3); 
const [phase4UN] = singleIn(unCommon4);
let parserPhaseUN4 = parserProcess(phase4UN);

console.log();
console.log("START PHASE 4: ========================================");
console.log("UNCOMMON PHASE 4: ", unCommon4);
console.log("REST OF INPUT IN UNCOMMON PHASE 3: ",comMon4 )
console.log("UNCOMMON PHASE 4 PARSER OUTPUT: ", phase4UN);


    
    console.log("FINAL:" ,parserPhaseUN4.value);

 
// let newIn5 = removerMarker(comMon4,phase4UN,parserPhaseCOM);  
// console.log("PROCESS OUTPUT: ", newIn5);
console.log("END OF PHASE 3: ========================================");




//    console.log("UNCOMMON PHASE 1 PARSER OUTPUT: ", parserPhaseCOM);


  




//    let [com, rst] = commonT(cT);


//    const [test1] = singleIn(uN);
//     const [test2] = singleIn(com)

//    let redflg = parserProcess(test1);
//    let comn = parserProcess(test2);

 
//    console.log("REDFLAGOUTPUT:", redflg);
 

    
    // console.log("COMMONOUTPUT: ", comn);
    


    // console.log("rst_LENGTHTOP++++++++++=", rst);

    // console.log("com_LENGTHTOP++++++++++=", rst);


    // newSetInput(rst,redflg,comn);
}

function fntRst(rInput, nIn) {
    const markerIndex = rInput.findIndex(token => token.type === 'MARKER');
    const eofIndex = rInput.findIndex(token => token.type === 'EOF')

    if (markerIndex !== -1 || eofIndex !==-1) {
        rInput.splice(markerIndex, 1);
        rInput.splice(eofIndex -1, 2);
        rInput.splice(markerIndex, 0, ...nIn);

        for(let i = 0; i < rInput.length; i++){
            if(rInput[i].type === 'S'){
                rInput[i].type = 'I';
            }
        }
    }
   
    return rInput;
}




function removerMarker(rst, redflg, comn) {
    const cT = rst.findIndex(token => token.type === 'COMMON');
    const uN = rst.findIndex(token => token.type === 'UNCOMMON');

    if (cT !== -1) {
        rst.splice(cT, 1, comn);
    }
    if (uN !== -1) {
        rst.splice(uN, 1, redflg);

    }
    return rst;
    
    
}











// TODO TOMMORROW:
// while loop;
// Examine: espicially in this com uncom part,, 
// clean some code.
// adjust the website:



//1st: Combine rIn to nIn to get the new input!; DONE!

//2nd: Look for Common terms  of every possible tokens, all common are outside
// while the uncommon are inside of ()  if token value have it's N: for type then pair it in someone in I that
// have it's Inverse;
//3rd: generate the new set of input then pass any () of this back to the prepProcess along side with its (), 
//  this part are still not sure yet or just pass this to the preprocess so we can separate the ();
// 4rh: check the return result again;


// 5th: this part need to be clear we will somehow do a while loop under some condition:
//  > the length of the output should be atleast < in the lenght of the input;
//  > need to check if thier any presence of I that have a token.value that in Inverse;
//  >for now this is it, will thier might be changes in the process we will see that in the incoming days :) ;


module.exports = Executioner;


