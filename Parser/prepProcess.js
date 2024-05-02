const redFlags = require ('./redFlag_parser');
const { parserLexiA } = require ('./lexical');

let once = false;
  
function singleIn(tokens) {
    console.log("singleIn", tokens);
    let chck = tokens[1].type;
    console.log("singleIn CHK: ", chck);
    if (!once && (chck === 'R' || chck === 'A')) {
        const opIndex = tokens.findIndex(token => token.type === 'R' || token.type === 'A');
        if (opIndex !== -1) {
            const fntTokens = tokens.slice(0, opIndex);
            const rstTokens = tokens.slice(opIndex);

            rstTokens.splice(0,0,{ type: 'MARKER'})

            once = true;
            return [fntTokens, rstTokens];
        }
    }else{
        let [fnt, rst] = processParenth(tokens);
        return  [fnt, rst];
    }
    return [tokens, []];
}

function processParenth(tokens) {
    console.log("processParenth")
    let lpIndex = -1;
    let rpIndex = -1;
    let lpCount = 0;
    let rpCount = 0;
    
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].type === 'LP') {
            if (lpIndex === -1) {
                lpIndex = i;
            }
            lpCount++;
        } else if (tokens[i].type === 'RP') {
            if (rpIndex === -1) {
                rpIndex = i; 
            }
            rpCount++;
            if (lpCount > 1 || rpCount > 1) {
                return [tokens, []];
            }
        }
    }
    
    if (lpIndex !== -1 && rpIndex !== -1) {

        const insdTokens = tokens.slice(lpIndex + 1, rpIndex);
        const lpToken = tokens[lpIndex];
        const rpToken = tokens[rpIndex];
        const rstTokens = tokens.slice(0, lpIndex).concat(lpToken, rpToken, tokens.slice(rpIndex + 1));
        if (rstTokens.findIndex(token => token.type === 'LP') >= 0) {
            rstTokens.splice(lpIndex + 1, 0, { type: 'MARKER' });
        }
    
         return [insdTokens, rstTokens];
    } else {
        return [tokens, []];
    }
}



function parserProcess(fnt) {
    console.log("parserProcessIIIN PUT:", fnt);
    const fntTypes = fnt.map(token => token.type).join('');
    const uToken = fnt.find(token => token.type === 'U');
    if (fntTypes.length <= 5) {
        if (uToken) {
            const uVal = uToken.value;
            const uTokens = fntTypes.replace('U', uVal);
            let result = redFlags(uTokens);
            const parserOutput = result.eval();
            console.log("parserProcessOutputz: ", parserOutput);
            
            const chckparser = parserLexiA(parserOutput, fnt);
            return chckparser;
        } else {
            let result = redFlags(fntTypes);
            const parserOutput = result.eval();
            const uTokens = fntTypes.replace('RED', result);
            console.log("parserProcessOutputz: ", parserOutput);
            const chckparser = parserLexiA(parserOutput, fnt);
            return chckparser;
        }
    }

    
}



module.exports = { singleIn, parserProcess };