const { parserLexiA } = require('./lexical');
const redFlags = require ('./redFlag_parser');

let once = false;

function checkingIn(tokens) {

   
    let destination = tokens.length; 
    console.log("destination", tokens);


    switch(destination){
        case 3:
            const result = parserProcessing(tokens);
            console.log("CASE 3 result", result);
            return result;
            
        break;
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
                    console.log("RETURN:", frontTokens,restInput);
                    return [frontTokens, restInput];
                }
            }else{
              console.log("NOthing  For now");
            //   Thing is AA+BB can just go to EXE;
            }
   
            return tokens

    }








}

function parserProcessing(frontInput){
    console.log("parserProcessing", frontInput);
    const  updateInput = frontInput.map(token => token.type).join('');
    const uToken = frontInput.find(token => token.type === 'U');
   
    if(uToken){
        const uVal = uToken.value;
        const uTokens = updateInput.replace('U', uVal);
        const result = redFlags(uTokens);
        const parserReturn = result.eval();
        const chkParserOutput = parserLexiA(parserReturn, frontInput);
        return chkParserOutput
    }else{
        let result = redFlags(updateInput);
        const parserReturn = result.eval();
        const chkParserOutput = parserLexiA(parserReturn, frontInput)
        return chkParserOutput;
    }

}








module.exports = { checkingIn , parserProcessing};