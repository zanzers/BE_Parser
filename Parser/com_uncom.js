
const tokens = [
    { type: 'N', value: 'A' },//
    { type: 'R', value: '+' },
    { type: 'I', value: 'A' },
    { type: 'I', value: 'A' },//
    { type: 'R', value: '+' },
    { type: 'U', value: '1' },

];

console.log(tokens);

let [uncommon, rstIn] = unCommonT(tokens);

// DONE COMMON UNTIL SOMETHING MISS UP AGAIN;
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

function unCommonT(tokens) {

    // Adding the marker
    let update = marker(tokens); 
    console.log("UPDATE: ", update);
    

    let firstIndex = null;
    let found = false;  
    let uncommon;
    let rstIn;


    const newsetUnMatched = [];
    const setOfMatched = [];
    

    const status = update.findIndex(token => token.type === "UNCOMMON");
    if(status === -1){
        
        console.log("RETURNING INPUT:" , update);
        newsetUnMatched.push({type: 'UNCOMMON'})
        return [update,null];
};


    for (let i = 0; i < update.length; i++) {
        if(update[i].type === 'N' ){
            firstIndex = i;
            found =true;
            console.log("nValN: ", firstIndex);
            break;
        }else if(update[i].type === 'U'){
            firstIndex = i;
            found = true;
            console.log("nValU: ", firstIndex);
            break;
        }
    }

        if(found && update[firstIndex].type === 'N'){
            const nVal = update[firstIndex].value;
            let foundI = false
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
              
            }else if(found && update[firstIndex].type === 'U'){
            
                let nearI = -1;
                
                console.log("TYPE U: ", firstIndex);

                for(let j =firstIndex; j <= update.length; j--){ 
                    if(update[j].type === 'I'){
            
                
                        setOfMatched.push( { type: 'LP', value: '(' });
                        setOfMatched.push(update[j]);
                        nIcaller = "U"
                        
                        const opToken = findOp(update, firstIndex, nIcaller)
                        if(opToken){
                         setOfMatched.push(opToken);
                        }
    
                        setOfMatched.push(update[firstIndex]);
                        setOfMatched.push( { type: 'RP', value: ')' });
                        update.splice(firstIndex, 1);
                        update.splice(j, 1); 
                        
     
                        newsetUnMatched.push(update);

                        nearI = j;
                        break;
                    }
                   
                   

                }
                
                // console.log("FROM U setOfMatched:", setOfMatched);
                // console.log("FROM U newsetUnMatched:", newsetUnMatched);

           
            }
            return [uncommon, rstIn];
}


console.log("UNCOMMONT: setOfMatched", uncommon );
console.log("UNCOMMONT: newsetUnMatched", rstIn );


function findOp(update, start, caller){
    let  op = null;

    switch(caller){

        case 'RL':
            for(let j = start; j >= 0; j--){
                if(update[j].type === 'R'|| update[j].type === 'A'){
                    op = update[j];
                    break;
                }
            }
            break;
        case 'LR':
            for(let j = start; j >= 0; j++){
                if(update[j].type === 'R' || update.type === 'A'){
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
    const mIndex = tokens.findIndex(token => token.type === "UNCOMMON");
    
    switch(ghost){
        case 'uncommon':
            console.log("packman", ghost);
        if (mIndex !== -1){
            if(mIndex > 0 && (tokens[mIndex - 1].type === 'R' || tokens[mIndex -1].type === 'A' )){
                tokens.splice(mIndex - 1, 1);
   
             }

            }
          break;

        case 'common':
            console.log("packman", ghost);
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
        console.log('TRUE');
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

function prepInputUnCommon(update,matchI, matchN, caller, startIn){

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
            update.splice(matchI, 1);
            packman(update, "uncommon");
            break;

        case 'LR':
            console.log("LR called:");
            let opTokenL = findOp(update, startIn, caller);

            unCommon.push({type: 'LP', value: '('});
            unCommon.push(matchN);
            unCommon.push(opTokenL);
            unCommon.push(matchI);
            unCommon.push({type: 'RP', value: ')'});

            update.splice(startIn, 1);
            update.splice(matchI, 1);
            packman(update, "uncommon");

            break;
        
        case 'FL':
            console.log("FL+++++");
            update.unshift({type: 'LP', value: '('});
            update.push({type: 'RP', value: ')'})
            return update;
            
    }


    console.log("prepInputUnCommon", unCommon);
    console.log("prepInputUnRST:" , update);

    return [unCommon,update];
}







module.exports = {commonT, unCommonT};


