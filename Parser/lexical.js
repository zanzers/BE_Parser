const TokensType  = {
    I: 'I',
    R: 'R',
    A: 'A',
    LP: 'LP',
    RP: 'RP',
    U: 'U',
    N: 'N',
    EOF: 'EOF'
};
 
function lexi(expression){

    let tokens = [];
    let currentPosition = 0;

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

            let nextChar = expression[currentPosition];

            if (nextChar === "'") {
                currentPosition++;
                tokens.push({
                    type: TokensType.N,
                    value: input
                });
            } else {
                for (let i = 0; i < input.length; i++) {
                    tokens.push({
                        type: TokensType.I,
                        value: input[i]
                    });
                }
            }

            continue;
        }

        if(/[10]/.test(char)){
            tokens.push({
                type: TokensType.U,
                value: char
            });
            currentPosition++;
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

    tokens.push({
        type: TokensType.EOF
    });
    return tokens;
}

function parserLexiA(parserOutput, fnt){
    chk = parserOutput.length;
    console.log("CHK: ",chk)
    if(parserOutput === '1' || parserOutput === '0'){
        let x = {type: 'U', value: parserOutput};
        return x;
    }else if(chk === 1 && parserOutput === 'I'){
        const iToken = fnt.find(token => token.type === 'I');
        let x = {type: 'I', value: iToken.value};
        return x;
    }else{
       let x = parserLexiB(parserOutput, fnt);
        return x;
    }
}
    
function parserLexiB(parserOutput, fnt) {
    let tokens = [];
    const iToken = fnt.find(token => token.type === 'I');
    const inputValue = iToken ? iToken.value : null;
    for (let i = 0; i < parserOutput.length; i++) {
        const type = parserOutput[i];
        let value = null;
        switch (type) {
            case 'I':
                value = inputValue;
                break;
            case 'R':
                value = '+';
                break;
            case 'S':
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


