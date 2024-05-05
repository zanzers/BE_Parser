const { parserLexiA } = require('./lexical');
const redFlags = require ('./redFlag_parser');


let once = false;

function checkingIn(tokens) {   
    let destination = tokens.length; 
    switch(destination){
        case 1:
                console.log("only U");

                break;
        case 3:
          
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
                if(opIndex !== -1){
                    const frontTokens = tokens.slice(0, opIndex);
                    const restInput = tokens.slice(opIndex);
                    restInput.splice(0,0, {type: 'MARKER'});
                    once = true;
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
    return chkParserOutput;
}



module.exports = { checkingIn , parserProcessing};