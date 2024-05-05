function parseExpress(){

    const TokensType  = {
        I: 'I',
        R: 'R',
        A: 'A',
        LP: 'LP',
        RP: 'RP',
        U: 'U',
        N: 'N',
    };
    let parserList =[];
    let once = false;
    let continueLoop = false;
    let finalVal;
    let count = 0; 
    let space = '';

// VOID MAIN:
    const startTime = performance.now();

 
    
    const textarea = document.getElementById('result_id');
    textarea.value = space;





    const userInput = document.getElementById('input_area').value.trim().toUpperCase();
    console.log("User input", userInput);


    console.log("PARSER LIST", parserList);

    const tokens = lexi(userInput)
    if(userInput.length === 3){
        const result = parserProcessing(tokens)

        console.log("input === 3", result);

        parserList.push(result)
    }else{

    const[firstIn, returnIn] = checkingIn(tokens);

    console.log("checkingIn",firstIn);
    console.log("returnIn",returnIn);

    if(returnIn === null){
        Executioner(firstIn, null)
    }else{
        const parserReturn = parserProcessing(firstIn)
        Executioner(returnIn,parserReturn)
    };

    


}


   display(parserList)
  


    const elapsedTime = performance.now() - startTime; 
    console.log("Time taken:", elapsedTime.toFixed(2), "milliseconds");


//LEXE PART START HERE!!! 
function lexi(expression){
    
        let tokens = [];
        let currentPosition = 0;
        previousToken = null;
        while (currentPosition < expression.length){
            let char = expression[currentPosition];
    
            if(/\s/.test(char)){
                currentPosition++;
                continue;
            }
    
            if (/[a-zA-Z]/.test(char)) {
                let input = '';
    
                while (/[a-zA-Z0-9]/.test(char)) {
                    input += char;
                    currentPosition++;
    
                    if (currentPosition >= expression.length) 
                    break;
                
                    char = expression[currentPosition];
                }
                    for (let i = 0; i < input.length; i++) {
                        tokens.push({
                            type: TokensType.I,
                            value: input[i]
                        });
                    }
                continue;
            }
    
            if(char === "'"){
                let prevToken = tokens.pop(); 
                if (prevToken.type === TokensType.I) {
                    tokens.push({
                        type: TokensType.N,
                        value: prevToken.value 
                    });
                } else {
                    throw new Error('Warning: Invalid usage of prime character');
                }
                currentPosition++;
                continue;
            }
    
            if(/[01]/.test(char)){
                tokens.push({
                    type: TokensType.U,
                    value: char
                });
                currentPosition += char.length; 
                continue;
            }
            
            
            if (/[+*]/.test(char)) {
                let gateType = char === '+' ? TokensType.R : TokensType.A;
                tokens.push({
                    type: gateType,
                    value: char
                });
                currentPosition++;
                continue;
            }
            
            if(/[\(\)]/.test(char)){
                tokens.push({
                    type: char === '(' ? TokensType.LP: TokensType.RP,
                    value: char
                });
                currentPosition++;
                continue;
            }
            throw new Error('Warning:: Invalid Character: ' + char);
    
        }
    
        return tokens;
}
    
function parserLexiA(parserOutput, frontTokens){
        chk = parserOutput;
        console.log("CHK: ",chk)
        let result;
    
    
        switch(chk){
            case '1':
                result = lexi(parserOutput);
                break;
            case '0':
                result = lexi(parserOutput);
                break;
            case 'I':
                const iToken = frontTokens.find( token => token.type === 'I');
                iVal = iToken.value;
                result = lexi(iVal);
                break;
            case 'N':
                const nTokens = frontTokens.find( token => token.type === 'N');
                nVal = nTokens.value
                result = lexi(nVal);
                result[0].type = 'N'
    
                break;
            default:
                console.log("LEXEIN:");
                result = parserLexiB(parserOutput,frontTokens)
                console.log('B:', result);
                return result;
            
        }
    
    
        console.log("LEXICAL PARSER OUTPUT:", result[0]);
        return result[0];
      
}
        
function parserLexiB(parserOutput, fnt) {
    
        console.log("parserOutput", parserOutput, fnt);
    
        let tokens = [];
        const iToken = fnt.find(token => token.type === 'I');
        const inputValue = iToken ? iToken.value : null;
        for (let i = 0; i < parserOutput.length; i++) {
    
            let type = parserOutput[i];
            let value = null;
            switch (type) {
                case 'I':
                    value = inputValue;
                    break;
                case 'R':
                    value = '+';
                    break;
                case 'S':
                    type = 'I';
                    value = 'B';
                    break;
    
            }
            tokens.push({ type, value }); 
        }
        return tokens;
}
//LEXE PART END HERE!!! 
//REDFLAG PART START HERE!!! 
function redFlags(input) {
    let count = 0;
    let hash = {};

    console.log("PARSER: ",input);

    function eval() {
        try {
            return Goal(0).num.toString();

        } catch (e) {
            if (e instanceof Fail) {
                return "Cannot parse input";
            } else {
                throw e;
            }
        }
    }

    function say(msg) {
        console.error(msg);
        console.log("STEPS: " +count)
        console.log()
        count++;
    }

    function Goal(position) {
        const result = And(position);
        eof(result.position);
        return result;
    }

    // Grammar Rules || Production Rule START HERE!!:

   function And(position){
        try{
            // say("AND Identifiers: I*I || I*NI || I*1 || I*0");

            // say(" " + "With itself <-- Idempotent [BACKTRACK]");
            const varA = packman('I', position);
            const gate = packman('A', varA.position);
            const rhs = packman ('I', gate.position);
            return new Result ('I', rhs.position);
            
        }catch{
            try{
            // say(" " + "With inverse <-- Complement [BACKTRACK]");
            const varA = packman('I', position);
            const gate = packman('A', varA.position);
            const rhs = packman ('N', gate.position);
            return new Result ('0', rhs.position);

            }catch{
                try{
                // say(" " + "With 1 <-- Identity [BACKTRACK]");
                const varA = packman('I', position);
                const gate = packman('A', varA.position);
                const rhs = packman ('1', gate.position);
                return new Result ('I', rhs.position);

                }catch{
                    try{
                    // say(" " + "With 0 <-- Annulment [BACKTRACK]")
                    const varA = packman('I', position);
                    const gate = packman('A', varA.position);
                    const rhs = packman ('0', gate.position);
                   return new Result ('0', rhs.position);
                        
                     }catch(ex){
                        // say("AND <- OR [BACKTRACK]");
                        return Or(position);
                        }
                    }
            }

        }
   }
   
   function Or(position){
    try{
        // say("OR Identifiers: I+I || I+NI || I+1 || I+0");

        // say(" " + "With itself <-- Idempotent [BACKTRACK]");
        const varA = packman('I', position);
        const gate = packman('R', varA.position);
        const rhs = packman ('I', gate.position);
        return new Result ('I', rhs.position);
        
    }catch{
        try{
        // say(" " + "With inverse <-- Complement [BACKTRACK]");
        const varA = packman('I', position);
        const gate = packman('R', varA.position);
        const rhs = packman ('N', gate.position);
        return new Result ('1', rhs.position);

        }catch{
            try{
            // say(" " + "With 1 <-- Identity [BACKTRACK]");
            const varA = packman('I', position);
            const gate = packman('R', varA.position);
            const rhs = packman ('1', gate.position);
            return new Result ('1', rhs.position);

            }catch{
                try{
                // say(" " + "With 0 <-- Annulment [BACKTRACK]")
                const varA = packman('I', position);
                const gate = packman('R', varA.position);
                const rhs = packman ('0', gate.position);
               return new Result ('I', rhs.position);
                    
                 }catch(ex){
                    // say("OR <- Double Negation [BACKTRACK]");
                    return dNegation(position);
                    }
                }
        }

    }
    }

    function dNegation(position){
        try{
            // say("Doudle Negation: I'' ");
            const varA = packman('D', position);
            const gate = packman('N', varA.position);
            const rhs = packman ('I', gate.position);
            return new Result ('I', rhs.position);
        }catch (ex){
            // say("dNegation <- Incase [BACKTRACK]");
            return inCase(position);
        }
    }

    function inCase(position){
        try{
            // say(" " + "Encase NAN <- [BACKTRACK]"); 
            const varA = packman('N', position);
            const gate = packman('A', varA.position);
            const rhs = packman('N', gate.position);
            return new Result ('N', rhs.position);
        }catch{
            try{
                // say(" " + "Encase NAU <- [BACKTRACK]"); 
                const varA = packman('N', position);
                const gate = packman('A', varA.position);
                const rhs = packman('1', gate.position);
                return  new Result('N', rhs.position);
            }catch{
                try{
                    const varA = packman('1', position);
                    const gate = packman('R', varA.position);
                    const rhs = packman('I', gate.position);
                    return new Result('1', rhs.position);
                }catch{
                    try{
                        const varA = packman('1', position);
                        const gate = packman('A', varA.position);
                        const rhs = packman('I', gate.position);
                        return new Result ('A', rhs.position);
                    }catch{
                        try{
                            const varA = packman('0', position);
                            const gate = packman('A', varA.position);
                            const rhs = packman('1', gate.position);
                            return new Result ('0', rhs.position);
                        }catch{
                            try{
                                const varA = packman('N', position);
                                const gate = packman ('R', varA.position);
                                const rhs = packman ('1', gate.position);
                                return new Result ('N', rhs.position);
                            }catch{
                                // say("AbsorptiveLhs [BACKTRACT]")
                                return absorptiveLhs(position);
                            }
                        }
                    }
                }
            }

        }
    }
    
    function absorptiveLhs(position){
        try{
            // say("asorptiveLhs");
            const varA = packman('I', position);
            return new Result ('IRIS', varA.position);


        }catch{

        }

    }

  // Grammar Rules || Production Rule END HERE!!:


    function packman(c, position) {
        // say("Char:" +' '+c);
        if (position >= input.length) {
            throw new Fail(); 
        }
        if (hash[c] && hash[c][position]) {
            // say(`${c} -- retrieving hashed result`);
            return hash[c][position];
        }
        if (input.charAt(position) === c) {
            const result = new Result(1, position + 1);
            if (!hash[c]) hash[c] = {};
            hash[c][position] = result;
            return result; 
        }
        throw new Fail();
    }

    function eof(position) {
        // say("End Of File!");
        if (position <= input.length) {
            return new Result(1, position);
        }
        throw new Fail();
    }

    function Result(num, position) {
        this.num = num; 
        this.position = position;
        // console.log(num, position);
        return {num, position};
    }

    function Fail(message) {
        this.name = "Fail";
        this.message = message || "Default Error Message";
        this.stack = (new Error()).stack;
    }

    Fail.prototype = Object.create(Error.prototype);
    Fail.prototype.constructor = Fail;

    return { eval, count };
}
//REDFLAG PART END HERE!!! 

//checkingIn PART START HERE!!! 
function checkingIn(tokens) {

   
    let destination = tokens.length; 
    console.log("destination", destination);


    switch(destination){
        case 1:
                console.log("only U");

                break;
        case 3:
            console.log("CASE 3:", tokens); 

            const iTokens = tokens.filter(token => token.type === 'I' || token.type === 'N') 
            const uTokens = tokens.some(token => token.type === 'U');
            const iValues = iTokens.map(token => token.value);
            const unique = new Set(iValues);



            if(unique.size === iTokens.length && !uTokens){
                console.log("UNIQUE");
                return tokens;
            }else{
                console.log("DUPLICATE");
                const result = parserProcessing(tokens)
                return result
            }
            
        default:
            console.log("CONTINUE CASE:");
            let chck = tokens[1].type;
            if(!once && (chck == 'R' || chck === 'A')){
                const opIndex = tokens.findIndex(token => token.type === 'R' || token.type === 'A');
                console.log("SINGLE CASE:");
                if(opIndex !== -1){
                    const frontTokens = tokens.slice(0, opIndex);
                    const restInput = tokens.slice(opIndex);
                    restInput.splice(0,0, {type: 'MARKER'});
                    once = true;
                    console.log("RETURN:", frontTokens,"&&",restInput);
                    return [frontTokens, restInput];
                }
            }else{
                    console.log("Input that have more!!");
                   return [tokens, null]
            }
    }


}

function parserProcessing(frontInput){
    
    let chkParserOutput;
    const  updateInput = frontInput.map(token => token.type).join('');
    const uToken = frontInput.find(token => token.type === 'U');
   
    if(uToken){
        const uVal = uToken.value;
        const uTokens = updateInput.replace('U', uVal);
        const result = redFlags(uTokens);
        const parserReturn = result.eval();
     
        chkParserOutput = parserLexiA(parserReturn, frontInput);
       
    }else{
        let result = redFlags(updateInput);
        const parserReturn = result.eval();
        chkParserOutput = parserLexiA(parserReturn, frontInput)
   

        
    }

    console.log("parserProcessing CHINCKINGIN", chkParserOutput);
    
    return chkParserOutput;
}
//checkingIn PART END HERE!!! 

//Executioner PART START HERE!!! 
function Executioner(reMain, parserOut) {
    let newIn;
    let newInput = combineIn(reMain, parserOut);
    console.log("COMBINE INPUT: ", newInput);

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
    parserList.push(finalVal);
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
                     console.log("UTOKEN:", uTokens);

                     if(unique.size === iTokens.length && !uTokens){
                            console.log("Unique in case 4");

                            console.log("Final at Case: 4:" , newInput);
                            return final;
                     }
                     break;
              default:

              count++
              console.log("CHECKING = RETURN:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::", count);
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

       console.log("parserCC", natara);


       let y = Boolean(psCom !== null);
       console.log("BOOOLEAN Common:", y);

       if(parserC !== null){
              console.log("PAERSER FALSE");
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

       console.log("processStatusUn:" , psC);

       if(!foundIn && parserFeed){
              parserOut = checkingIn(parserFeed);
              foundIn = true; 
       }

       console.log("object");

       return [parserOut, psC];
}

function combineIn(reMain, parserOutput) {

    if(!parserOutput){
        console.log("combineIn+++=======+++++++++++++++++++++++++++++++++++ No");
        return reMain;
    }

    const markerIndex = reMain.findIndex(token => token.type === 'MARKER'); 
    if (markerIndex !== -1) {
        reMain.splice(markerIndex, 1);
        reMain.splice(markerIndex, 0, ...parserOutput);
        for(let i = 0; i < reMain.length; i++){
            if(reMain[i].type === 'S'){
                reMain[i].type = 'I';
            }
        }
    }
   
    console.log("Combine Success!");
    return reMain;
}

function removerMarker(reMain, result, caller) {
    switch(caller){

        case 'Com':
            const commonFlag = reMain.findIndex(token => token.type === "COMMON");
           if(commonFlag !== -1){
            reMain.splice(commonFlag, 1, result);
           }
            break;
        default:
            const uncommonFlag = reMain.findIndex(token => token.type === 'UNCOMMON');
           if(uncommonFlag !== -1){
            reMain.splice(uncommonFlag, 1, result)
           }   
    }
     return reMain;
}

//Executioner PART END HERE!!!


//STATUS PART START HERE!!!
function statusUN(tokens){

    let uncommon;
    let rstIn;

    let update = marker(tokens); 
    console.log("UPDATE_statusUN: ", update);

    const status = update.findIndex(token => token.type === "UNCOMMON");
    if(status === -1){
        
        console.log("RETURNING INPUT:" , update);
        return [null, update];
    }else{

        const [uncommon, rstIn ] =  unCommonT(tokens);
        
        return  [uncommon, rstIn]
 
    }
    
  
}
// DONE COMMON UNTIL SOMETHING MISS UP AGAIN0;
function statusCom(tokens) {
    console.log("COMMON", tokens);
    console.log("STATUS COMMON:" , tokens);
   
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

    console.log("UNCOMMON", update,);

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
                console.log("CASE I:");
                    for(let i = 0; i < update.length; i++){
                        if(!foundI && update[i].type === 'N' && update[i].value === tokensVal){

                            matchI = tokenInFrontIndex;
                            matchN = i;

                            gosh = separator(update, matchI, matchN);

                            console.log("SEPARATOR:", gosh);

                            const [uncommon, rstIn] = prepInputUnCommon(update, matchI, matchN,'RL', gosh);
                            foundI = true;
                            return [uncommon, rstIn];
                        }
                    }
                break;
            case 'N':
                console.log("CASE N:");
                 console.log("tokenInFrontIndex",tokensVal);
                 

                    for(let i = tokenInFrontIndex; i >=0 ; i--){
                        if(!foundI && update[i].type === 'I' && update[i].value === tokensVal){

                            matchN = tokenInFrontIndex;
                            matchI = i;

                            gosh = separator(update, matchI, matchN);

                            const [uncommon, rstIn] = prepInputUnCommon(update, matchI, matchN,'RL',gosh);
                            foundI = true;

                           
                            console.log("CASE N:", uncommon, rstIn);
                            return [uncommon, rstIn];
                        }
                    }
                break;
            default:
                console.log("CASE U:");
                    // const [uncommon, rstIn] = unCommonU(update)

                    console.log("CASE OF U:", tokenInFrontIndex );
            
                    for(let j = tokenInFrontIndex; j <= update.length; j--){
                        if(!foundI && update[j].type === 'I'|| update[j].type === 'N'){
                
                            matchI = j;
                            matchN = tokenInFrontIndex;

           
                            gosh = separator(update, matchI, matchN);

                            console.log("SEPARATOR!!!!!!!!!!!!!!!!!!!!!!:", gosh);
  
                            const [uncommon, rstIn] = prepInputUnCommon(update, matchI, matchN,'LR', gosh);
                            foundI = true;

                            if(gosh){

                                packTokens = packman(rstIn, 'uncommon')

                                console.log("objectssss", gosh, uncommon);
                                console.log("packTokensSSSSSSSSS", packTokens);

                               return [uncommon, packTokens];
                            }

                            return[uncommon, rstIn]
                        }
                        
                    }
        }



        console.log("Match I: ", matchI);
        console.log("Match N: ", matchN);
            
    }
}
//STATUS PART END HERE!!!


// finding the right operation;
function findOp(update, start, caller){
    let  op = null;

    console.log("OPRATION TOKENS:", update,start,caller);


console.log("OP", update);

    switch(caller){

        case 'RL':
            console.log("CASE: RHS", start);
            for(let j = start; j >= 0; j++){
                if(update[j].type === 'R'){
                    op = update[j];
                    opIndex = {index: j}
                
                    console.log("op:", op);
                    break;
                }
            }
            break;

        case 'LR':
                console.log("LR CALLED:");

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
    console.log("OPERATION: ",op);

    return op;
}
function separator(update,matchI, matchN){

    let gosh = false;
    for (let i = matchI; i <= matchN; i++) {
        let x = Boolean(i >= 0 && update[i].type === 'R');
        console.log("CONDTIION:" , x);
        if (i >= 0 && update[i].type === 'R') {
            console.log("HELOO",update[i].type);
            gosh = true;
            
            break;
        }
    }
    console.log("SEPARATOR CALLED:" , gosh);
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
        console.log(tokens);

        let once = false;
        const nTokenIndex = tokens.findIndex(token => token.type === 'N');
        const uTokenIndex = tokens.findIndex(token => token.type === 'U');

        
             
    if(!once && uTokenIndex !== -1){
        console.log("U", uTokenIndex);
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
                    console.log(x,y);
                    tokens.splice(y.index + 1, 0 , {
                        type: "UNCOMMON"
                    })
             
                    break;
                }
            }
    }

    console.log("NEW", tokens);
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

    console.log("Common_prepInputCommon:" ,common);



    return [tokens, common];
}

// Generatign Parser input for set of Uncommon;
function prepInputUnCommon(update,matchI, matchN, caller,gosh){

    const parserTokens = [];
    let pass = false;
    console.log("INDEX MATCHIN", matchI, matchN)


    switch(caller){

        case 'RL':
            console.log("RL called:", gosh);

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

            console.log("CASE RL:", update);
            break;

            
        case 'LR':
            console.log("LR called:", gosh);

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
    console.log("PARSER FEED:", parserTokens);
    console.log("PARSER PSC:". update);
    return [parserTokens,update];
}




function display(){

    console.log("parserList", parserList);

for (let i = 0; i < parserList.length; i++) {
    space += `${parserList[i].value}\n`;
    console.log("SPACE",space);
}

const text = document.getElementById('result_id');
text.value = space;

}

// parserList.forEach(token => {
//     space += `${token.value}\n`
//     console.log(space);
// });
// const text = document.getElementById('result_id');
// text.value = space;




}
