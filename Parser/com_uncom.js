 
function commonT(tokens) {
    const common = [];
    const rst = [];
    let markerAdded = false;
    let commonCount = 0;
    let foundTwoCommon  = false;
    let nIcaller = "C"
  

    for (let i = 0; i < tokens.length; i++) {
        const currentToken = tokens[i];
        let isCommon = false;

        for (let j = i + 1; j < tokens.length; j++) {
            if (currentToken.value === tokens[j].value) {
                isCommon = true;
                break;
            }
        }

        if (isCommon) {
            if (!common.find(token => token.value === currentToken.value)) {
                const opToken = findOp(tokens, i, nIcaller)

                common.push( { type: 'LP', value: '(' });
                common.push(currentToken);

                
                if(opToken){
                 common.push(opToken);
                }

                for (let k = i + 1; k < tokens.length; k++) {
                    if (currentToken.value === tokens[k].value) {
                        common.push(tokens[k]);
                        tokens.splice(k, 1);
                    }
                }
            
             
                commonCount++;
        
               
                if (!markerAdded) {
                    rst.push({ type: 'Common' });
                    markerAdded = true;
                    foundTwoCommon = true;
                }
                common.push( { type: 'RP', value: ')' });
            }
        } else {
            rst.push(currentToken);
        }

     
        if (foundTwoCommon && commonCount === 2 ) {
            rst.push(currentToken);
            break;
        }
       
    }
   return [common, rst];
}

function unCommonT(tokens) {

    let update = marKer(tokens); 
    console.log("UPDATE: ", update);

    const newsetUnMatched = [];
    const setOfMatched = [];

    for (let i = 0; i < update.length; i++) {
        let found = false;

        if (update[i].type === 'N'){
            const nValWithoutN = update[i].value;
            
            for (let j = i; j >= 0; j--) {
                if (!found && update[j].type === 'I' && update[j].value === nValWithoutN) {
             
                    let nIcaller ="RL"
                    iBeforeN = { update: update[j], index: j };
                    setOfMatched.push( { type: 'LP', value: '(' });
                    setOfMatched.push(update[j]);
                    
                    const opToken = findOp(update, i, nIcaller)
                   if(opToken){
                    setOfMatched.push(opToken.update);
                   }

                    setOfMatched.push(update[i]);
                    setOfMatched.push( { type: 'RP', value: ')' });
                    
                    update.splice(i, 1);
                    update.splice(j, 1); 
                    marKer(update);
                    newsetUnMatched.push(update);
                    found = true;
                    break;
                    
                }
            }
        
            for (let j = i; j < update.length; j++){
                if(!found && update[j].type === 'I' && update[j].value === nValWithoutN){
               
                    let nIcaller ="LR"
                    nAfterI = {update: update[j], index: j};
                    setOfMatched.push({ type: 'LP', value: '('});
                    setOfMatched.push(update[i]);

                    const opToken = findOp(update, i, nIcaller)
                    if(opToken){
                        setOfMatched.push(update[i]);
                    }
                    setOfMatched.push(update[j]);
                    setOfMatched.push({type: 'RP', value: ')'});
                    
                    update.splice(j, 1);
                    update.splice(i ,1);
                    marKer(update);
                    newsetUnMatched.push(update);
                    found = true;
                    break;
                }
            }

        
        }else if(update[i].type === 'U'){
            let nearI = -1;
          
            for(let j =i; j <= update.length; j--){ 
                if(update[j].type === 'I'){
                    let nIcaller = "U";
                    const opToken = findOp(update, i, nIcaller)
                    setOfMatched.push( { type: 'LP', value: '(' });
                    setOfMatched.push(update[j]);

                    if(opToken){
                     setOfMatched.push(opToken);
                    }

                    setOfMatched.push(update[i]);
                    setOfMatched.push( { type: 'RP', value: ')' });
                    update.splice(i, 1);
                    update.splice(j, 1); 

                    nearI = j;
                    break;
                }
                newsetUnMatched.push(update)
            }

            console.log("FROM U setOfMatched:", setOfMatched);
            console.log("FROM U newsetUnMatched:", newsetUnMatched);
        }
    }

    

    return [setOfMatched, newsetUnMatched[0]];
}   




function findOp(update, start, caller){
    let  op = null;
  if(caller === 'RL'){
    for(let j = start; j >= 0; j--){
        if(update[j].type ==='R' || update[j].type === 'A'){
            op = {update: update[j], index: j};
            break;
        }
    }
  }else if(caller === 'LR'){
    for(let j = start; j >= 0; j++){
        if(update[j].type ==='R' || update[j].type === 'A'){
            op = {update: update[j], index: j};
            break;
        }
    }
  }else if(caller === 'C'){
    
    op = {type: 'R', value: '+'};

  }else if(caller === 'U'){
    for(let j = start; j>= 0; j--){
        if(update[j].type === 'R'){
            op = {update: update[j], index: j};
        }else{
            op ={type: 'A', value: '*'};
        }
    }
  }
  console.log("OPERARTION: ",op);
    return op;
}

function marKer(tokens){
    
    let once = false;
    const nIndex = tokens.findIndex(token => token.type === 'N');
    const uIndex = tokens.findIndex(token => token.type === 'U')
    const mIndex = tokens.findIndex(token => token.type === "UNCOMMON");

    if(!once && nIndex !== -1){
        const  insert = nIndex + 1;
        tokens.splice(insert, 0, {type: 'UNCOMMON'});
        once = true;
        return tokens;

    }else if (mIndex !== -1){
        if(mIndex > 0 && (tokens[mIndex - 1].type === 'R' || tokens[mIndex -1].type === 'A' )){
            tokens.splice(mIndex - 1, 1);
            return tokens;
         }
    
    }else if(!once && uIndex !== -1){
        const insert = uIndex + 1;
        tokens.splice(insert, 0, {type: 'UNCOMMON'});
        once = true;
        return tokens;
    }else{
        console.log("NO UNCOMMON FIND!");
        return tokens;
    }
}


module.exports = {commonT, unCommonT} ;