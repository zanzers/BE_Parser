// // const I = (input) => {
// //     let b = input[3];
// //     console.log(b);
// //     if (b === 'O' || b === 'A') {
// //         return "TRUE";
// //     } else {
// //         return "FALSE";
// //     }
// // };




// const arrayOfLetters = ['a', 'b', 'c', 'd', 'e', 'f'];

// const arrayWithoutB = [];

// for (let i = 0; i < arrayOfLetters.length; i++) {
//     if (arrayOfLetters[i] !== 'b') {
//         arrayWithoutH.push(arrayOfLetters[i]);
//     }
// }

// // arrayOfLetters is unchanged
// console.log(arrayOfLetters); // ['a', 'b', 'c', 'd', 'e', 'f']

// console.log(arrayWithoutB); // ['a', 'c', 'd', 'e', 'f']
// // // console.log(x); // Output: "TRUE"


// function annulment(position) {
//     try {
//         say("Annulment <- INPUT + 1 || INPUT + 0");
//         // I+1;
//         const varA = packman('I', position);
//         const gt = packman('R', varA.position);
//         const rhs = packman('1', gt.position);
//         return new Result(1, rhs.position);
//     } catch {
//         try{
//             // I*1;
//             const varA = packman('I', position);
//             const gt = packman('A', varA.position);
//             const rhs = packman('1', gt.position);
//             return new Result(1, rhs.position);
//         }catch{
//             try{
//                 // I+0;
//                 const varA = packman('I', position);
//                 const gt = packman('R', varA.position);
//                 const rhs = packman('0', gt.position);
//                 return new Result(0, rhs.position);
//             }catch {
//                 try{
//                     // I*0;
//                     const varA = packman('I', position);
//                     const gt = packman('A', varA.position);
//                     const rhs = packman('0', gt.position);
//                     return new Result(0, rhs.position);
//                 }catch (ex){
//                     say("Annulment <- Identity [BACKTRACK]");
//                     return identity(position);
                    
//                 }
//             }
//         }
//     }
// }

// function getTokenValueOfI(tokens) {
//     for (let token of tokens) {
//         if (token.type.startsWith('INPUT')) {
//             return token.value;
//         }
//     }
//     return null; // Return null if 'I' token is not found
// }

// // Example usage
// const tokens = [
//     { type: 'LPARENTH', value: '(' },
//     { type: 'INPUTA', value: 'A' },
//     { type: 'INPUTA', value: 'A' }, 
//     { type: 'OR', value: '+' },
//     { type: 'NOTA', value: "A'" },
//     { type: 'RPARENTH', value: ')' },
//     { type: 'EOF' }
// ];

// const tokenValueOfI = getTokenValueOfI(tokens);
// console.log(tokenValueOfI); // Output: 'A'


// function parentheses(tokens) {
//     const lpIndex = tokens.findIndex(token => token.type === 'LP');
//     const rpIndex = tokens.findIndex(token => token.type === 'RP');

//     if (lpIndex !== -1 && rpIndex !== -1) {
//         const insdTokens = tokens.slice(lpIndex + 1, rpIndex); // Include tokens between LP and RP
//         const rstTokens = tokens.slice(0, lpIndex).concat(tokens.slice(rpIndex + 1)); // Include tokens before LP and after RP
//         return [insdTokens, rstTokens];
//     } else {
//         return [tokens, []]; // If either LP or RP is missing, return the input tokens as they are
//     }
// }







// function tokensRst(nValue, iBeforeN, iAfterN){
//     nValue.value = originalNValue;

//     if (iBeforeN !== null) {
//       const matchedTokens =  [
//           { type: 'LP', value: '(' },
//           iBeforeN,
//           nValue,
//           { type: 'RP', value: ')' },
//       ];

//       return { matchedTokens, nValue: originalNValue };
//   } else if (iAfterN !== null) {
//       const matchedTokens =  [
//           { type: 'LP', value: '(' },
//           iAfterN,
//           nValue,
//           { type: 'RP', value: ')' },
//       ];
  
//       console.log("Tokens after encapsulation with nearest 'I' after 'N':", matchedTokens);
  
//       return { matchedTokens, nValue: originalNValue };
//   } else {
//       console.log("No matching 'I' tokens found.");
//       return { matchedTokens: [], nValue: originalNValue };
//   }

// }


// let iBeforeN = null;
// for (let i = nIndex - 1; i >= 0; i--) {
//     if (tokens[i].type === 'I' && tokens[i].value === nValueWithoutPrime) {
//         iBeforeN = tokens[i];
//         break;
//     }
// }

// let iAfterN = null;
// for (let i = nIndex + 1; i < tokens.length; i++) {
//     if (tokens[i].type === 'I' && tokens[i].value === nValueWithoutPrime) {
//         iAfterN = tokens[i];
//         break;
//     }
// }
// console.log(iBeforeN, iAfterN);






// for (let j = i + 1; j < tokens.length; j++) {
//     if (tokens[j].type === 'I' && tokens[j].value === nValWithoutN) {
//         iAfterN = { token: tokens[j], index: j };
//         break;
//     } else if (tokens[j].type === 'R') {
//         rToken =  { token: tokens[j], index: j };
//     } else if (tokens[j].type === 'A') {
//         aToken = { token: tokens[j], index: j };
//     }
// }


// } else {
// // newsetUnMatched.push(tokens[i]);
// }






// marker(tokens);
// function marker(tokens) {


//     let once = false;
//     const nIndex = tokens.findIndex(token => token.type === 'I');
//     const uIndex = tokens.findIndex(token => token.type === 'U');


//     console.log("nIndex", nIndex);
//     console.log("uIndex", uIndex);
//     console.log(tokens);

//     if (!once && (nIndex !== -1 || uIndex !== -1)) {

//         if(nIndex !== -1 && (uIndex === -1 || nIndex < uIndex)){
//             let matchN   = []
//             let matchI   = []
//             for (let i = 0; i < tokens.length; i++) {
//                 const currentToken = tokens[i];
//                 for (let j = 0; j < tokens.length; j++) {
//                     if (i !== j && tokens[j].value === currentToken.value && tokens[j].type !== currentToken.type) {
//                         console.log("TEST I:", { type: currentToken.value, index: i });
//                         matchN ={index: i};
//                         matchI = {index: j}
//                         once = true;
//                         break;
//                     }
//                 }
//                 if (once) {
//                     console.log("TEST N:",matchN);
//                     console.log("TEST I: ", matchI);

//                     if(matchI.index < matchN){
//                         tokens.splice(matchN.index + 1, 0, {type: "UNCOMMON"})
//                         console.log("I < N");
//                     }else{
//                         tokens.splice(matchI.index + 1, 0, {type: "UNCOMMON"})
//                         console.log("N < I");
//                     } 
//                     break;
//                 }
//             }
            
//         } else if (uIndex !== -1 && (nIndex === -1 || uIndex < nIndex)){
         

//             console.log("UVAL > NVAL: U");
//             console.log("UINDEX: " , uIndex);

//             if(!once && tokens.length === 1 && (uIndex !== -1)){
//                 once = true;
//                 console.log("LAT");
//                 return tokens
//             }else{
//                 tokens.splice(uIndex + 1, 0, {type: "UNCOMMON"})
//                 once = true;
//                return tokens;
//             }
//         }
        
//     }

//     console.log("RETURN:", tokens);
//     return tokens;
// }

// let text = '';
// let i = 0;

// do{
//     text += "The number is: " + i;
//     i++;
   
// }
// while(i < 20);



// function commonT(tokens) {
    
//     const common = [];
//     const match = [];
//     const rstIn = [];
//     let nIcaller = "COMBINE";
//     let matchingI = false;

//     for (let i = 0; i < tokens.length; i++) {
//         if (tokens[i].type === 'I') {
//             const iVal = tokens[i].value;
//             console.log("I VALUE: ", iVal);
    
     
      
//             for (let j = i + 1; j < tokens.length; j++) {
//                 if (tokens[j].type === 'I' && tokens[j].value === iVal) {
//                     match.push(tokens[j]);
//                     tokens.splice(j, 1);
//                     matchingI = true;;
//                     break;
//                 }
//             }   
//             console.log("COMMON length: ", match);

//             if (matchingI && common.length >= 2) {
//                 console.log("MATCHERI: ", matchingI);
//                 common.push({ type: 'LP', value: '(' });
//                 common.push(tokens[i]);

//                     const opToken = findOp(tokens,i,nIcaller)
//                     if(opToken){
//                     common.push(opToken);
//                     }

                
//                 common.push(match[0]);
//                 common.push({ type: 'RP', value: ')' });
            
//                 rstIn.splice(i, 0, { type: 'COMMON' });

//                 markerAdded = true;
//             }else{
//                 rstIn.push(tokens[i]);
//             }
//         }
//         else{
//             rstIn.push(tokens[i]);
//         }
//     }
//     console.log("MATCH: ", matchingI);
//     if(!matchingI){
//         console.log("NO matching FOUND: ");

//         return tokens;
//     }


//     console.log("COMMON: ", common);
//     console.log("REST INPUT: ", rstIn);

//     return [common, rstIn];
// }






// let y = {type: update[firstIndex].type, value: update[firstIndex].value, index: firstIndex};
// console.log("N VALUE::",y)
//    let nIcaller ="LR"

//    let x = Boolean(!foundI && update[j].type === 'I' && update[j].value === nVal);


//    console.log("J VALUE: ",{type: update[j].type , value:update[j].value, index: j});
//    console.log("STATUS:", x);



                
// console.log("TYPE U: ", firstIndex);

// for(let j =firstIndex; j <= update.length; j--){ 
//     if(update[j].type === 'I'){
            // near -1

//         setOfMatched.push( { type: 'LP', value: '(' });
//         setOfMatched.push(update[j]);
//         nIcaller = "U"
        
//         const opToken = findOp(update, firstIndex, nIcaller)
//         if(opToken){
//          setOfMatched.push(opToken);
//         }

//         setOfMatched.push(update[firstIndex]);
//         setOfMatched.push( { type: 'RP', value: ')' });
//         update.splice(firstIndex, 1);
//         update.splice(j, 1); 
        

//         newsetUnMatched.push(update);

//         nearI = j;
//         break;\




// const tokens = [
//     { type: 'I', value: 'A' },//
//     { type: 'R', value: '+' },
//     { type: 'U', value: '1' },
//     { type: 'U', value: '1' },//
//     { type: 'R', value: '+' },
//     { type: 'U', value: '1' },

// ];

// console.log(tokens);

// let [uncommon, rstIn] = status(tokens);


// const { singleIn, parserProcess } = require ('./prepProcess');
// const {status,commonT,} = require('./com_uncom');
// const redFlags = require ('./redFlag_parser');


// function Executioner(rInput, nIn) {

//    let combine = fntRst(rInput, nIn);
 

//     console.log("COMBINE INPUT: " , combine);

// // 1st process:
  



//    console.log();
//     console.log("START PHASE 1: ========================================");

//     let [unCommon, comMon] = unCommonT(combine)
//     const [phase1UN] = singleIn(unCommon);
//     let parserPhaseUN = parserProcess(phase1UN);

//    console.log("UNCOMMON PHASE 1: ", unCommon);
//    console.log("REST OF INPUT IN UNCOMMON PHASE 1: ", comMon)
//    console.log("UNCOMMON PHASE 1 PARSER OUTPUT: ", parserPhaseUN);

//    console.log("=======================================================");

//    let[commonIn,rstIn] = commonT(comMon);
//    const[phaseCOM] = singleIn(commonIn);
//    let parserPhaseCOM = parserProcess(phaseCOM);

//    console.log("COMMON PHASE 1: ", commonIn);
//    console.log("REST OF INPUT IN COMMON PHASE 1: ", rstIn);
//    console.log("COMMON PHASE 1 PARSER OUTPUT: ", parserPhaseCOM);

//    let newIn2 = removerMarker(rstIn,parserPhaseUN,parserPhaseCOM);  
//     console.log("PROCESS OUTPUT: ", newIn2);
//    console.log("END OF PHASE 1: ========================================");
//     console.log();
    
// // 2nd Process:
//     let [unCommon2, comMon2] = unCommonT(newIn2);
//     const [phase2UN] = singleIn(unCommon2);
//     let parserPhaseUN2 = parserProcess(phase2UN);

//     console.log();
//     console.log();
//     console.log("START PHASE 2: ========================================");
//     console.log("UNCOMMON PHASE 2: ", unCommon2);
//     console.log("REST OF INPUT IN UNCOMMON PHASE 2: ", comMon2)
//     console.log("UNCOMMON PHASE 2 PARSER OUTPUT: ", parserPhaseUN2);

//     let[commonIn2,rstIn2] = commonT(comMon2);
   


//     console.log("COMMON PHASE 2: ", commonIn2);
//     console.log("REST OF INPUT IN COMMON PHASE 2: ", comMon2);
//     // console.log("COMMON PHASE 2 PARSER OUTPUT: ", parserPhaseCOM2); NO MATCH!
 
//     let newIn3 = removerMarker(comMon2,parserPhaseUN2,parserPhaseCOM);  
//     console.log("PROCESS OUTPUT: ", newIn3);
//     console.log("END OF PHASE 2: ========================================");
//     // console.log();


// // // 3rd Process:

//     let [unCommon3, comMon3] = unCommonT(newIn3);   
//     const [phase3UN] = singleIn(unCommon3);
//     let parserPhaseUN3 = parserProcess(phase3UN);

//     console.log();
//     console.log("START PHASE 3: ========================================");
//    console.log("UNCOMMON PHASE 3: ", unCommon3);
//    console.log("REST OF INPUT IN UNCOMMON PHASE 3: ", comMon3)
//    console.log("UNCOMMON PHASE 3 PARSER OUTPUT: ", parserPhaseUN3);

//    let newIn4 = removerMarker(comMon3,parserPhaseUN3,parserPhaseCOM);  
//    console.log("PROCESS OUTPUT: ", newIn4);
//    console.log("END OF PHASE 3: ========================================");
//    console.log();

// // // 4th Process:
// let [unCommon4, comMon4] = unCommonT(newIn3); 
// const [phase4UN] = singleIn(unCommon4);
// let parserPhaseUN4 = parserProcess(phase4UN);

// console.log();
// console.log("START PHASE 4: ========================================");
// console.log("UNCOMMON PHASE 4: ", unCommon4);
// console.log("REST OF INPUT IN UNCOMMON PHASE 3: ",comMon4 )
// console.log("UNCOMMON PHASE 4 PARSER OUTPUT: ", phase4UN);


    
//     console.log("FINAL:" ,parserPhaseUN4.value);

 
// // let newIn5 = removerMarker(comMon4,phase4UN,parserPhaseCOM);  
// // console.log("PROCESS OUTPUT: ", newIn5);
// console.log("END OF PHASE 3: ========================================");




// //    console.log("UNCOMMON PHASE 1 PARSER OUTPUT: ", parserPhaseCOM);


  




// //    let [com, rst] = commonT(cT);


// //    const [test1] = singleIn(uN);
// //     const [test2] = singleIn(com)

// //    let redflg = parserProcess(test1);
// //    let comn = parserProcess(test2);

 
// //    console.log("REDFLAGOUTPUT:", redflg);
 

    
//     // console.log("COMMONOUTPUT: ", comn);
    


//     // console.log("rst_LENGTHTOP++++++++++=", rst);

//     // console.log("com_LENGTHTOP++++++++++=", rst);


//     // newSetInput(rst,redflg,comn);
// }

// function fntRst(rInput, nIn) {
//     const markerIndex = rInput.findIndex(token => token.type === 'MARKER');
//     const eofIndex = rInput.findIndex(token => token.type === 'EOF')

//     if (markerIndex !== -1 || eofIndex !==-1) {
//         rInput.splice(markerIndex, 1);
//         rInput.splice(eofIndex -1, 2);
//         rInput.splice(markerIndex, 0, ...nIn);

//         for(let i = 0; i < rInput.length; i++){
//             if(rInput[i].type === 'S'){
//                 rInput[i].type = 'I';
//             }
//         }
//     }
   
//     return rInput;
// }




// function removerMarker(rst, redflg, comn) {
//     const cT = rst.findIndex(token => token.type === 'COMMON');
//     const uN = rst.findIndex(token => token.type === 'UNCOMMON');

//     if (cT !== -1) {
//         rst.splice(cT, 1, comn);
//     }
//     if (uN !== -1) {
//         rst.splice(uN, 1, redflg);

//     }
//     return rst;
    
    
// }











// // TODO TOMMORROW:
// // while loop;
// // Examine: espicially in this com uncom part,, 
// // clean some code.
// // adjust the website:



// //1st: Combine rIn to nIn to get the new input!; DONE!

// //2nd: Look for Common terms  of every possible tokens, all common are outside
// // while the uncommon are inside of ()  if token value have it's N: for type then pair it in someone in I that
// // have it's Inverse;
// //3rd: generate the new set of input then pass any () of this back to the prepProcess along side with its (), 
// //  this part are still not sure yet or just pass this to the preprocess so we can separate the ();
// // 4rh: check the return result again;


// // 5th: this part need to be clear we will somehow do a while loop under some condition:
// //  > the length of the output should be atleast < in the lenght of the input;
// //  > need to check if thier any presence of I that have a token.value that in Inverse;
// //  >for now this is it, will thier might be changes in the process we will see that in the incoming days :) ;


// module.exports = Executioner;


// function statusCom(tokens){
    
//     let commonFound = false;
//     let [psC, parserC] = commonT(tokens)

//     for(let token of psC){
//         if(token.type === 'COMMON'){
//             commonFound = true;
//             break;
//         }
//     }

//     return {
//         commonFound : commonFound,
//         psC: psC,
//         parserC: parserC
//     }
// }


// let foundIn = false;
// let noCommon = false;
// let natara;
// do{
//     let [parserOut, psC] = processStatusUn(combine)
    
//    if(!noCommon){
//      let [nataraTemp, nCommon] = processStatusCom(psC);
//      natara = nataraTemp
//      noCommon = nCommon;
//    }

//    if(parserOut.size > 0){
//            let newInput = removerMarker(narata,parserOut)
//            combine = newInput;
      
//    }else{
//     foundIn = true;
//    }

// }while(!foundIn && !noCommon)



// console.log("===========================");
// console.log("PROCESSuNCOMMON: ", parProcessUn);

// console.log("PARSERU: " , parserU);
// console.log("PSC: ", psC);
// // console.log("===========================");
//               console.log("+++++++++++",parserOut );



// const tokens = [
//     { type: 'I', value: 'A' },//
//     { type: 'I', value: 'B' },
//     { type: 'U', value: '1' },
//     { type: 'R', value: '+' },//
//     { type: 'N', value: 'B' },

// ];

// console.log(tokens);

// let [uncommon, rstIn] = statusUN(tokens);


// mIndex > 0 && (tokens[mIndex - 1].type === 'R' || tokens[mIndex -1].type === 'A' &&



const objs = [
    { type: 'U', value: '1' },
    { type: 'I', value: 'Hello' }
];

// Iterate over each object in the array
objs.forEach((obj, index) => {
    console.log(`Object ${index + 1}:`);
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (typeof value === 'string') {
                const length = value.length;
                console.log(`  Length of ${key} value: ${length}`);
            }
        }
    }
});
