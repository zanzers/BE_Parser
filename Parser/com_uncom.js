const {findOp,packman,marker,prepInputCommon,prepInputUnCommon,separator} = require ('./necessities');


function statusUN(tokens){

    let uncommon;
    let rstIn;

    let update = marker(tokens); 
    console.log("Updating Status of Uncommon: ", update);

    const status = update.findIndex(token => token.type === "UNCOMMON");
    if(status === -1){
        
        console.log("No Uncommon find returning input:" , update);
        return [null, update];
    }else{
        const [uncommon, rstIn ] =  unCommonT(tokens);
        return  [uncommon, rstIn]
 
    }
    
  
}

// DONE COMMON UNTIL SOMETHING MISS UP AGAIN0;
function statusCom(tokens) {

    console.log("Updating Status of Common:" , tokens);
   
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
        console.log("No More Common Find");
        let packcommon = packman(tokens,'common');
       
        return [packcommon, null]
    }   
}

// DONE UNCOMMON UNTIL SOMETHING MISS UP AGAIN1;
function unCommonT(update) {
    let matchI;
    let matchN;
    let gosh = false;
    let foundI = false;

    const uncommonIndex = update.findIndex(token => token.type === 'UNCOMMON');

    if (uncommonIndex !== -1) {
        const tokenInFront = update[uncommonIndex - 1];
        const tokenInFrontIndex = update.indexOf(tokenInFront);
        const tokenType = update[tokenInFrontIndex].type
        const tokensVal = update[tokenInFrontIndex].value;


        switch(tokenType){
            case 'I':

                    for(let i = 0; i < update.length; i++){
                        if(!foundI && update[i].type === 'N' && update[i].value === tokensVal){
                            matchI = tokenInFrontIndex;
                            matchN = i;
                            gosh = separator(update, matchI, matchN);
                            const [uncommon, rstIn] = prepInputUnCommon(update, matchI, matchN,'RL', gosh);
                            foundI = true;
                            return [uncommon, rstIn];
                        }
                    }
                break;
            case 'N':
                    for(let i = tokenInFrontIndex; i >=0 ; i--){
                        if(!foundI && update[i].type === 'I' && update[i].value === tokensVal){
                            matchN = tokenInFrontIndex;
                            matchI = i;
                            gosh = separator(update, matchI, matchN);
                            const [uncommon, rstIn] = prepInputUnCommon(update, matchI, matchN,'RL',gosh);
                            foundI = true;
                      
                            return [uncommon, rstIn];
                        }
                    }
                break;
            default:
                    for(let j = tokenInFrontIndex; j <= update.length; j--){
                        if(!foundI && update[j].type === 'I'|| update[j].type === 'N'){
                
                            matchI = j;
                            matchN = tokenInFrontIndex;
                            gosh = separator(update, matchI, matchN);
                            const [uncommon, rstIn] = prepInputUnCommon(update, matchI, matchN,'LR', gosh);
                            foundI = true;

                            if(gosh){
                                packTokens = packman(rstIn, 'uncommon')
                               return [uncommon, packTokens];
                            }

                            return[uncommon, rstIn]
                        }
                        
                    }
            }
     
    }
}

module.exports = {statusUN,statusCom};


