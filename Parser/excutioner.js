const { singleIn, parserProcess } = require ('./prepProcess');
const {commonT, unCommonT} = require('./com_uncom');
const redFlags = require ('./redFlag_parser');


function Executioner(rInput, nIn, inputLength, fntInfo) {

   let combine = fntRst(rInput, nIn);

    console.log("COMBINE:" , combine.length);

// 1st process:
    let [unCommon, comMon] = unCommonT(combine);
    let[commonIn,rstIn] = commonT(comMon);

   const [phase1UN] = singleIn(unCommon);
   const[phaseCOM] = singleIn(commonIn);

   let parserPhaseUN = parserProcess(phase1UN);
   let parserPhaseCOM = parserProcess(phaseCOM);

   console.log();
   console.log();
    console.log("START PHASE 1: ========================================");
   console.log("UNCOMMON PHASE 1: ", unCommon);
   console.log("REST OF INPUT IN UNCOMMON PHASE 1: ", comMon)
   console.log("UNCOMMON PHASE 1 PARSER OUTPUT: ", parserPhaseUN);

   console.log();

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

// function newSetInput(rst,redflg,comn){
 

//    let newIn = removerMarker(rst,redflg,comn);


// //    console.log("rst: ",rst);
// //    console.log("rstredflg: ",redflg);
// //    console.log("rstcomn: ",comn);
// //     console.log("NEWIN: ", newIn);
// //     console.log("rst_LENGTH", newIn.length);


//     let [uN2, cT] = unCommonT(newIn);
//     const [test1] = singleIn(uN2);
//     let redflg2 = parserProcess(test1);

//     console.log("TESTT====12", test1);
//     console.log("REDFLAGOUTPUT2:", redflg2);
  
//     console.log("NEWIN UNCOMMON: ", uN2);
//     console.log("NEWIN CoMMON: ", cT);


//    let newIn2 = removerMarker(rst,redflg2,cT);  
//    console.log("NEWIN2: ", newIn2);



// }

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


