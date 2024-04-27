 
function commonT(tokens) {
    
    const common = [];
    const match = [];
    const rstIn = [];


    let nIcaller = "COMBINE";

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].type === 'I') {
            const iVal = tokens[i].value;
            console.log("I VALUE: ", iVal);
    
            let matchingI = false;
      
            for (let j = i + 1; j < tokens.length; j++) {
                if (tokens[j].type === 'I' && tokens[j].value === iVal) {
                    match.push(tokens[j]);
                    matchingI = true;
                    console.log("SPLICE: ", j );
                    tokens.splice(j, 1);
                    console.log("TOKENS J", rstIn  );
                    break;
                }
            }   




            console.log("J", match);
            if (matchingI) {
                console.log("MATCHERI: ", matchingI);
                common.push({ type: 'LP', value: '(' });
                common.push(tokens[i]);

                    const opToken = findOp(tokens,i,nIcaller)
                    if(opToken){
                    common.push(opToken);
                    }

                
                common.push(match[0]);
                common.push({ type: 'RP', value: ')' });
            
                rstIn.splice(i, 0, { type: 'COMMON' });

                markerAdded = true;
            }else{
                rstIn.push(tokens[i]);
            }
        }
        else{
            rstIn.push(tokens[i]);
        }
    }



    console.log("COMMON:", common);
    console.log("REST=====:", rstIn);

    return [common, rstIn];
}

function unCommonT(tokens) {

    let update = marKer(tokens); 
    console.log("UPDATE: ", update);

    let firstIndex = null;
    let found = false;  
    const newsetUnMatched = [];
    const setOfMatched = [];
    

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
            console.log("nValllllll: ", nVal);

            let foundI = false

            for (let j = firstIndex; j >= 0; j--) {
                if (!foundI && update[j].type === 'I' && update[j].value === nVal) {
             
                    let nIcaller ="RL"
                    iBeforeN = { update: update[j], index: j };
                    setOfMatched.push( { type: 'LP', value: '(' });
                    setOfMatched.push(update[j]);
                    
                    const opToken = findOp(update, firstIndex, nIcaller)
                   if(opToken){
                    setOfMatched.push(opToken.update);
                   }

                    setOfMatched.push(update[firstIndex]);
                    setOfMatched.push( { type: 'RP', value: ')' });
                    
                    update.splice(firstIndex, 1);
                    update.splice(j, 1); 
                    packman(update);
                    newsetUnMatched.push(update);
                    foundI = true;
                    break;
                    
                }
            }
            for (let j = firstIndex; j < update.length; j++){
                let nIcaller ="LR"

               if (!found && update[j].type === 'I' && update[j].value === nVal){
                nAfterI = {update: update[j], index: j};
                setOfMatched.push({ type: 'LP', value: '('});
                setOfMatched.push(update[firstIndex]);

                const opToken = findOp(update, firstIndex, nIcaller)
               if(opToken){
                setOfMatched.push(opToken.update);
               }
                setOfMatched.push(update[j]);
                setOfMatched.push({type: 'RP', value: ')'});
                
                update.splice(j, 1);
                update.splice(firstIndex, 1);
                packman(update);
                newsetUnMatched.push(update);
                foundI = true;
                break;
               }
                  
                }
            }else if(found && update[firstIndex].type === 'U'){
            
                let nearI = -1;
                
                console.log("TYPE U: ", firstIndex);

                for(let j =firstIndex; j <= update.length; j--){ 
                    if(update[j].type === 'I'){
                        let nIcaller = "U";
                        const opToken = findOp(update, firstIndex, nIcaller)
                        setOfMatched.push( { type: 'LP', value: '(' });
                        setOfMatched.push(update[j]);
    
                        if(opToken){
                         setOfMatched.push(opToken);
                        }
    
                        setOfMatched.push(update[firstIndex]);
                        setOfMatched.push( { type: 'RP', value: ')' });
                        update.splice(firstIndex, 1);
                        update.splice(j, 1); 
    
                        nearI = j;
                        break;
                    }
                    newsetUnMatched.push(update)
                }
    
                console.log("FROM U setOfMatched:", setOfMatched);
                console.log("FROM U newsetUnMatched:", newsetUnMatched);
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
  }else if(caller === 'COMBINE'){
    
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

function marKer(tokens) {
    let once = false;
    const nIndex = tokens.findIndex(token => token.type === 'N');
    const uIndex = tokens.findIndex(token => token.type === 'U');

    console.log("Index of 'N':", nIndex);
    console.log("Index of 'U':", uIndex);

    if (!once && (nIndex !== -1 || uIndex !== -1)) {
        let insertIndex;
        if (nIndex !== -1 && uIndex !== -1) {
            insertIndex = nIndex < uIndex ? nIndex : uIndex;
        } else {
            insertIndex = nIndex !== -1 ? nIndex : uIndex;
        }
        if (insertIndex === -1) {
            console.log("No 'N' or 'U' token found.");
        } else {
            tokens.splice(insertIndex + 1, 0, { type: 'UNCOMMON' });
            once = true;
            console.log("Marker added at index:", insertIndex + 1);
        }
    } else {
        console.log("No 'N' or 'U' token found.");
    }

    return tokens;
}

function packman(tokens){
    const mIndex = tokens.findIndex(token => token.type === "UNCOMMON");

    if (mIndex !== -1){
        if(mIndex > 0 && (tokens[mIndex - 1].type === 'R' || tokens[mIndex -1].type === 'A' )){
            tokens.splice(mIndex - 1, 1);
            once = true
            console.log("MIDBN:", tokens);
            return tokens;
         }

        }
}





module.exports = {commonT, unCommonT} ;