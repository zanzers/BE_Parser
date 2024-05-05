const TokensType  = {
    I: 'I',
    R: 'R',
    A: 'A',
    LP: 'LP',
    RP: 'RP',
    U: 'U',
    N: 'N',
};
  
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
            result = parserLexiB(parserOutput,frontTokens)
            console.log('B:', result);
            return result;   
    }
    return result[0];
  
}
    
function parserLexiB(parserOutput, fnt) {
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


module.exports = {
    lexi: lexi,
    parserLexiA: parserLexiA
};


