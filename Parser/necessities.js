
function findOp(update, start, caller){
    let  op = null;

    switch(caller){

        case 'RL':
            console.log("OP RL");
            for(let j = start; j >= 0; j--){
                if(update[j].type === 'R'){
                    op = update[j];
                    break;
                }
            }
            break;
        case 'LR':
            console.log("OP LR", start);
            for(let j = start; j >= 0; j++){
                if(update[j].type === 'R'){
                    console.log("LRRR", {type:update[j], value: update[j], index: j});
                    op = update[j];
                    break;
                }
            }
            break;
        case 'U':
            const prevToken = start -1;
            console.log("U", prevToken);
            const prevTokenType = update[prevToken].type;

            if(prevToken >= 0){
                if(prevTokenType === 'R'){
                    op = {type: 'R', value: '+'};
                }else if(prevTokenType === 'I'){
                    op ={type: 'A', value: '*'};
                }
            }
            break;
        default:
            op = {type: 'A', value: '*'}
            break;

    }
  console.log("OPERARTION: ",op);
    return op;
}

function packman(tokens, ghost){
    const mIndex = tokens.findIndex(token => token.type === "UNCOMMON" || token.type === "COMMON");
    
    switch(ghost){
        case 'uncommon':

        console.log("PACKMAN:", mIndex.length);

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

function marker(tokens) {

    let once = false;
    const nTokenIndex = tokens.findIndex(token => token.type === 'N');
    const uTokenIndex = tokens.findIndex(token => token.type === 'U');


    if (!once && (nTokenIndex !== -1 || uTokenIndex !== -1)) {
        if (nTokenIndex !== -1 && (uTokenIndex === -1 || nTokenIndex < uTokenIndex)) {
            let matchN = {};
            let matchU = {};
            for (let i = 0; i < tokens.length; i++) {
                const currentToken = tokens[i];
                for (let j = 0; j < tokens.length; j++) {
                    if (i !== j && tokens[j].value === currentToken.value && tokens[j].type !== currentToken.type) {
                        matchN = { index: i };
                        matchU = { index: j };
                        once = true;
                        break;
                    }
                }
                if (once) {
                    console.log("TEST N:", matchN);
                    console.log("TEST U: ", matchU);

                    if (matchU.index < matchN.index) {
                        tokens.splice(matchN.index + 1, 0, { type: "UNCOMMON" });
                        console.log("U < N");
                    } else {
                        tokens.splice(matchU.index + 1, 0, { type: "UNCOMMON" });
                        console.log("N < U");
                    }
                 
                    return tokens;
                }
            }
        } else if (uTokenIndex !== -1 && (nTokenIndex === -1 || uTokenIndex < nTokenIndex)) {
            console.log(uTokenIndex);
            if (!once && tokens.length === 3 && uTokenIndex !== -1) {
                once = true;
      
                prepInputUnCommon(tokens,null,null,'FL',null)
                return tokens;
            } else {
                tokens.splice(uTokenIndex + 1, 0, { type: "UNCOMMON" });
                once = true;
              
                return tokens;
            }
        }


    }

    return tokens;
}

function prepInputCommon(tokens, matchA, matchB){

    let common = []
    let [iIn, jIn] = [matchA[0], matchB[0]];
    let opToken = findOp(undefined, undefined, "COMBINE");
    
    common.push(iIn);
    common.push(opToken)
    common.push(jIn);

    tokens.splice(iIn.index, 1, {type: 'COMMON'});
    tokens.splice(jIn.index, 1);

    return [tokens, common];
}

function prepInputUnCommon(update,matchI, matchN, caller, startIn,indexj){

    console.log(caller);
    const unCommon = [];
    

    switch(caller){

        case 'RL':
            console.log("RL called:");
            let opTokenR = findOp(update, startIn, caller);

            unCommon.push({type: 'LP', value: '('});
            unCommon.push(matchI);
            unCommon.push(opTokenR);
            unCommon.push(matchN);
            unCommon.push({type: 'RP', value: ')'});

            update.splice(startIn, 1);
            update.splice(indexj, 1);
            packman(update, "uncommon");
            break;

        case 'LR':
            console.log("LR called:");
            let opTokenL = findOp(update, startIn, 'U' );


            


            unCommon.push({type: 'LP', value: '('});
            unCommon.push(matchN);
            
            unCommon.push(opTokenL);
            unCommon.push(matchI);
            unCommon.push({type: 'RP', value: ')'});
           
            update.splice(startIn, 1);
            
            update.splice(indexj, 1);
            console.log("LR: ", update);
            // packman(update, "uncommon");
            
            break;
        
        case 'FL':
            console.log("FL+++++");
            update.unshift({type: 'LP', value: '('});
            update.push({type: 'RP', value: ')'})

            console.log("FLLLL:", update);
            return update;
            
    }

    return [unCommon,update];
}



module.exports = {findOp,packman,marker,prepInputCommon,prepInputUnCommon};