const { checkingIn, parserProcessing } = require('./InputPrep');
const {statusUN,statusCom} = require('./com_uncom');
const  {combineIn, removerMarker} = require ('./executioner_helper');

let continueLoop = false;
let finalVal;
let count = 0; 

function Executioner(reMain, parserOut) {

    let newIn;
    console.log("Parser ouput:", parserOut);
    console.log("Remaining input:", reMain);
    

    let newInput = combineIn(reMain, parserOut);
    console.log("combine_input: ", newInput);

       const [unCommon, psCom] = processStatusUn(newInput);
       const resultCom = processStatusCom(psCom);
       newIn = removerMarker(resultCom, unCommon);
       checking(newIn);

    continueLoop = true;
    
    try {
       finalVal = checking(newIn);
    } catch (error) {
        if (error.message === 'Breaking out') {
              
            continueLoop = false;
        } else {
            console.log("Something Error");
        }
    }
    console.log("FINAL:", finalVal);

return finalVal
}


function checking(newInput){
       let chk = newInput.length;
       console.log(('CHIKINNNG ', newInput));



       switch(chk){
              case 1:
                     console.log("INPUT 1 ", newInput);
                     return true;
              case 3:       
                     const final = checkingIn(newInput);
                     return final;

              case 4:
                     console.log("CASE 4!!!!!!");
                     const iTokens = newInput.filter(token => token.type === 'I' || token.type === 'N');
                     const uTokens = newInput.some(token => token.type === 'U');
                     const iValues = iTokens.map(token => token.value);
                     const unique = new Set(iValues);

       

                     if(unique.size === iTokens.length && !uTokens){
                            
                            return final;
                         
                     }
                     break;
              default:

              count++
              console.log("Checking current Tokens.........returning PHASE:", count);
              if(continueLoop){
                     Executioner(newInput)
              }
              return false;       
       } 

       if(continueLoop){
              Executioner(newInput)
       }
       return false;      
}



// Let processing of All common in the Array and return.
function processStatusCom(psCom){
       let caller = 'Com'
       let [natara, parserC] = statusCom(psCom);
       console.log("Processing Common");

       if(parserC !== null){
              const parserOut = checkingIn(parserC);
              let newIn= removerMarker(natara,parserOut, caller);
             return processStatusCom(newIn)
       }else{
              return natara;
       }
}
// Let processing of Uncommon  in the Array and return.
function processStatusUn(combine){

      
       let foundIn = false;
       let parserOut = null;
       let [parserFeed, psC] = statusUN(combine);    

       console.log("Processing Uncommon:" , psC);

       if(!foundIn && parserFeed){
              parserOut = checkingIn(parserFeed);
              foundIn = true; 
       }

    

       return [parserOut, psC];
}






module.exports = Executioner;


