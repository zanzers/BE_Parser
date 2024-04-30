const {findOp,packman,marker,prepInputCommon,prepInputUnCommon} = require ('./necessities');

function status(tokens){

    let uncommon;
    let rstIn;
    let found =false;
    
    let update = marker(tokens); 
    console.log("UPDATE: ", update);

    const status = update.findIndex(token => token.type === "UNCOMMON");
    if(status === -1){
        
        console.log("RETURNING INPUT:" , update);
        return [update,null];
};

    for (let i = 0; i < update.length; i++) {
        if(!found && update[i].type === 'N' ){
            firstIndex = i;
            [uncommon, rstIn] = unCommonT(update,firstIndex);
            found = true;
            break;

        }else if(!found && update[i].type === 'U'){
            firstIndex = i;
            found = true;
            [uncommon, rstIn] = unCommonU(tokens,firstIndex)
            break;
        }
    }
   return  [uncommon, rstIn]
}

// DONE COMMON UNTIL SOMETHING MISS UP AGAIN0;
function commonT(tokens) {
    
    let [matchA, matchB] = [[],[]];
    let found = false;

    for(let i = 0; i < tokens.length; i++) {
        if(tokens[i].type === 'I' || tokens[i].type === 'N') {
            const iVal = {type: tokens[i].type, value: tokens[i].value, index: i};
      
            for(let j = i +1 ; j < tokens.length; j++) {
                if((tokens[j].type === 'I' || tokens[j].type === 'N') && 
                (tokens[j].value === tokens[i].value)  && 
                tokens[j].type === tokens[i].type) {

                    const jVal = {type: tokens[i].type, value: tokens[j].value, index: j}
                    matchA.push(iVal);
                    matchB.push(jVal);

                    console.log("JVAL:",iVal);
                    console.log("IVAL:" , jVal);
                    found = true; 
                    break;
                }
            }
            console.log(found);
            if(found) {
              
                let [rst, common] = prepInputCommon(tokens, matchA, matchB);
                return [rst, common];
            }
           
        }
    }



    if (!found) {
        console.log("TRUE NOCOMMON");
        let packtokens = packman(tokens,'common');

        return [packtokens, null];
    }   
}
// DONE UNCOMMON UNTIL SOMETHING MISS UP AGAIN1;
function unCommonT(update,firstIndex) {

    let uncommon;
    let rstIn;
    let foundI = false;

        if(update[firstIndex].type === 'N'){
            const nVal = update[firstIndex].value;
           
            for (let j = firstIndex; j >= 0; j--) {
                if (!foundI && update[j].type === 'I' && update[j].value === nVal) {
                    matchIR = update[j];
                    matchNR = update[firstIndex];
                     [uncommon, rstIn] = prepInputUnCommon(update, matchIR,matchNR,'RL',firstIndex);
                    foundI = true;
                    break;
                }
            }
            for (let j = firstIndex + 1; j < update.length; j++){
               if (!foundI && update[j].type === 'I' && update[j].value === nVal){
                    matchIL = update[j];
                    matchNL = update[firstIndex];
                     [uncommon, rstIn] = prepInputUnCommon(update, matchIL,matchNL,'LR',firstIndex);
                    foundI = true;
                    break;
               }
                  
            }
              
        }
            return [uncommon, rstIn]; 
}
// DONE UNCOMMON UNTIL SOMETHING MISS UP AGAIN1;
function unCommonU(update,findIndex){

    let rstIn;
    let uncommon;

    if(update[findIndex].type === 'U'){
        let foundI = false;

        console.log("U", update,"F" ,firstIndex);

        for(let j = firstIndex; j >=0; j--){
            if(!foundI && update[j].type === 'I'){

                matchU = update[firstIndex];
                matchI = update[j];
                [uncommon, rstIn] = prepInputUnCommon(update, matchU,matchI,'LR',firstIndex);
                foundI = true;
                break;
            }
        }
    }
    return [uncommon, rstIn]; 
}

module.exports = {status,commonT};


