// // const I = (input) => {
// //     let b = input[3];
// //     console.log(b);
// //     if (b === 'O' || b === 'A') {
// //         return "TRUE";
// //     } else {
// //         return "FALSE";
// //     }
// // };




const arrayOfLetters = ['a', 'b', 'c', 'd', 'e', 'f'];

const arrayWithoutB = [];

for (let i = 0; i < arrayOfLetters.length; i++) {
    if (arrayOfLetters[i] !== 'b') {
        arrayWithoutH.push(arrayOfLetters[i]);
    }
}

// arrayOfLetters is unchanged
console.log(arrayOfLetters); // ['a', 'b', 'c', 'd', 'e', 'f']

console.log(arrayWithoutB); // ['a', 'c', 'd', 'e', 'f']
// // console.log(x); // Output: "TRUE"


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