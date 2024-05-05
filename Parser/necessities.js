
// finding the right operation;
function findOp(update, start, caller){
    let  op = null;

    console.log("operator of the tokens:", update,start,caller);

    switch(caller){

        case 'RL':
            console.log("CASE: RHS", start);
            for(let j = start; j >= 0; j++){
                if(update[j].type === 'R'){
                    op = update[j];
                    opIndex = {index: j}
                    break;
                }
            }
            break;

        case 'LR':
                console.log("CASE: LHS");
                if(start){
                    op = {type: 'R', value: '+'}
                }else{
                    op = {type: 'A', value: '*'}
                }

            break;
        default:

            op = {type: 'A', value: '*'}
            break;

    }
    console.log("Operator found: ",op);
    return op;
}

function separator(update,matchI, matchN){

    let gosh = false;
    for (let i = matchI; i <= matchN; i++) {
        if (i >= 0 && update[i].type === 'R') {
            gosh = true;
            
            break;
        }
    }
    return gosh;
    
}


// removing excced operation in the input;
function packman(tokens, ghost){
    const mIndex = tokens.findIndex(token => token.type === "UNCOMMON" || token.type === "COMMON");
    
    switch(ghost){
        case 'uncommon':
        if (mIndex !== -1){
            if(mIndex > 0 && (tokens[mIndex - 1].type === 'R' || tokens[mIndex -1].type === 'A' &&
        mIndex.length === 3)){
                tokens.splice(mIndex -1, 1);
   
             }

            }
          break;

        case 'common':
            do {
                if (tokens.length > 0 && tokens[0].type === 'R') {
                    tokens.shift();
                }
                if (tokens.length > 0 && tokens[tokens.length - 1].type === 'R') {
                    tokens.pop();
                }
            } while (tokens.length > 0 && (tokens[0].type === 'R' || tokens[tokens.length - 1].type === 'R'));
            break;
    }
            return tokens
}

// reference function for the retrun of Common and Uncommon;
function marker(tokens){

        let once = false;
        const nTokenIndex = tokens.findIndex(token => token.type === 'N');
        const uTokenIndex = tokens.findIndex(token => token.type === 'U');

        
             
    if(!once && uTokenIndex !== -1){
        tokens.splice(uTokenIndex+ 1, 0, {
            type: "UNCOMMON"
        });
        once = true;
    }else if(!once && nTokenIndex !== -1){
        
            let x,y;
            for(let i = 0; i < tokens.length; i++){
                const currentToken = tokens[i];

                for(let j = 0; j < tokens.length; j++){
                    if( i !== j && tokens[j].value === currentToken.value
                        && tokens[j].type !== currentToken.type){
                    
                     x = {index: i}
                     y = {index: j}
                    once = true;
                    break;
                }
            }

                if(once){
                    tokens.splice(y.index + 1, 0 , {
                        type: "UNCOMMON"
                    })
             
                    break;
                }


            }
    }
    return tokens;
}

// Input prepration for common to pass to the parser;
function prepInputCommon(tokens, matchA, matchB){

    let common = []
    let [iIn, jIn] = [matchA[0], matchB[0]];
   
    common.push(iIn);
    common.push({type: 'A', value: '*'});
    common.push(jIn);

    tokens.splice(iIn.index, 1, {type: 'COMMON'});
    tokens.splice(jIn.index, 1);

    console.log("Genarating Input for common:" ,common);

    return [tokens, common];
}

// Generatign Parser input for set of Uncommon;
function prepInputUnCommon(update,matchI, matchN, caller,gosh){

    const parserTokens = [];
    let pass = false;

    switch(caller){

        case 'RL':
            if(gosh){
                pass = true;
                break;
            };

            //PUSHING UNCOMMON || COMMONS TOKENS!
            let opTokenR = findOp(update, matchN, "RL");
            parserTokens.push(update[matchI]);
            parserTokens.push(opTokenR);
            parserTokens.push(update[matchN]);

            //UPDATING ARRAY!
            update.splice(matchN, 1);
            update.splice(matchI-1,1);
            break;

            
        case 'LR':

            // PUSHING UNCOMMON || COMMONS TOKENS!
            let opTokenL = findOp(update,gosh, "LR");
            parserTokens.push(update[matchI]);
            parserTokens.push(opTokenL);
            parserTokens.push(update[matchN]);

            //UPDAYING ARRAY          
            update.splice(matchN , 1);
            update.splice(matchI,1);  

            if(gosh){
                packTokens = packman(update, 'uncommon')
                return [parserTokens, packTokens];
            };         
            break;
        


    
        }

    if (pass) {
        return prepInputUnCommon(update, matchI, matchN, 'LR', gosh);
    }
    


    console.log("Uncommon Parser to feed:", parserTokens);
    console.log("Remaining Input:". update);
    return [parserTokens,update];
}


module.exports = {findOp,packman,marker,prepInputCommon,prepInputUnCommon, separator};