 


const tokens = [
    { type: 'N', value: 'A' },//NO
    { type: 'N', value: 'B' },
    { type: 'I', value: 'A' },
    { type: 'R', value: '+' },
    { type: 'I', value: 'B' },
    { type: 'R', value: '+' },

];

console.log(tokens);

let [rest, com] = commonT(tokens);

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
        do {
            if (tokens.length > 0 && tokens[0].type === 'R') {
                tokens.shift();
            }
            if (tokens.length > 0 && tokens[tokens.length - 1].type === 'R') {
                tokens.pop();
            }
        } while (tokens.length > 0 && (tokens[0].type === 'R' || tokens[tokens.length - 1].type === 'R'));
    
        console.log("No match found.");
        return [tokens, null];
    }   
}

     
console.log("REST OF THE INPUT: ", rest);
console.log("COMMON TO PASS TO THE PARSER: ", com);






function unCommonT(tokens) {

    let update = marker(tokens); 
    console.log("UPDATE: ", update);
    

    let firstIndex = null;
    let found = false;  
    const newsetUnMatched = [];
    const setOfMatched = [];
    

    const status = update.findIndex(token => token.type === "UNCOMMON");
    if(status === -1){
        
        console.log("RETURNING INPUT:" , update);
        newsetUnMatched.push({type: 'UNCOMMON'})


        return [update,newsetUnMatched[0]];
    
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

                console.log("LR", update);
                packman(update);
               console.log("PAXCKMAN",update)

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
    
                console.log("FROM U setOfMatched:", setOfMatched);
                console.log("FROM U newsetUnMatched:", newsetUnMatched);
            }
            console.log("UNCOMMONT: setOfMatched", setOfMatched );
            console.log("UNCOMMONT: newsetUnMatched", newsetUnMatched );
            return [setOfMatched, newsetUnMatched[0]];
        }


function findOp(update, start, caller){
    let  op = null;

    console.log("OP UPDATE: ", update);
    console.log("OP start: ", start);
    console.log("OP caller: ", caller);



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

  }else if(caller  === 'U'){
        const prevToken = start - 1;
            console.log("prevToken",prevToken);
        const prevTokenType = update[prevToken].type;
        console.log("prevTokenType",prevTokenType);  

        if(prevToken >= 0){
         
            if(prevTokenType === "R"){
                console.log("TYPE R:" , op);
                op = {type: 'R', value: '+'};

             }else if (prevTokenType == 'I'){
            
                op = {type: 'A', value: '*'};
                console.log("TYPE I:" , op);
            }
      
        }
        console.log("FROM U: ", op);
        return op;

  }




  console.log("OPERARTION: ",op);
    return op;
}



function packman(tokens){
    const mIndex = tokens.findIndex(token => token.type === "UNCOMMON");

    console.log("PACKMAN : ", tokens);
    if (mIndex !== -1){
        if(mIndex > 0 && (tokens[mIndex - 1].type === 'R' || tokens[mIndex -1].type === 'A' )){
            tokens.splice(mIndex - 1, 1);
            once = true
           
            return tokens;
         }

        }
}

function marker(tokens) {

    
    let once = false;
    const nTokenIndex = tokens.findIndex(token => token.type === 'N');
    const uTokenIndex = tokens.findIndex(token => token.type === 'U');
    
    console.log(nTokenIndex);
    console.log(uTokenIndex);

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
      
                constant(tokens);
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



function constant(tokens){
    const LP = { type: 'LP', value: '(' };
    const RP = { type: 'RP', value: ')' };
    const finalToken = { type: 'FINAL' };


    tokens.unshift(LP);
    tokens.push(RP);

    console.log("FROM CONTANT: ", tokens);
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






// let opToken = findOp(null, null, nIcaller);
// common.push({type: 'LP', value: '('});
// common.push(matchA[0])
// common.push(opToken)
// common.push(matchB[0])
// common.push({type: 'RP', value: ')'});
// rstIn.splice(matchA, 0 , {type: 'COMMON'});
// tokens.splice(matchA,1);
// tokens.splice(matchB,1)






module.exports = {commonT, unCommonT};