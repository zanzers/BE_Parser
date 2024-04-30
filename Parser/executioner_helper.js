
function combineIn(rInput, nIn) {
    const markerIndex = rInput.findIndex(token => token.type === 'MARKER');
    const eofIndex = rInput.findIndex(token => token.type === 'EOF')

    if (markerIndex !== -1 || eofIndex !==-1) {
        rInput.splice(markerIndex, 1);
        rInput.splice(eofIndex -1, 2);
        rInput.splice(markerIndex, 0, ...nIn);

        for(let i = 0; i < rInput.length; i++){
            if(rInput[i].type === 'S'){
                rInput[i].type = 'I';
            }
        }
    }
   
    return rInput;
}

function removerMarker(rst, redflg, comn) {
    const cT = rst.findIndex(token => token.type === 'COMMON');
    const uN = rst.findIndex(token => token.type === 'UNCOMMON');

    if (cT !== -1) {
        rst.splice(cT, 1, comn);
    }
    if (uN !== -1) {
        rst.splice(uN, 1, redflg);

    }
    return rst;
    
    
}


module.exports = {combineIn,removerMarker};