
function combineIn(reMain, parserOutput) {

    if(!parserOutput){
        console.log("combineIn+++=======+++++++++++++++++++++++++++++++++++ No");
        return reMain;
    }

    const markerIndex = reMain.findIndex(token => token.type === 'MARKER');
    const eofIndex = reMain.findIndex(token => token.type === 'EOF')

    if (markerIndex !== -1 || eofIndex !==-1) {
        reMain.splice(markerIndex, 1);
        reMain.splice(eofIndex -1, 2);
        reMain.splice(markerIndex, 0, ...parserOutput);

        for(let i = 0; i < reMain.length; i++){
            if(reMain[i].type === 'S'){
                reMain[i].type = 'I';
            }
        }
    }
   
    return reMain;
}

function removerMarker(reMain, inputs) {

    const flag = reMain.findIndex(token => token.type === 'UNCOMMON' || token.type === 'COMMON');
    

    if (flag !== -1) {
        console.log("SUCCESS To remove", inputs);
        reMain.splice(flag, 1, inputs);
        
    }
    return reMain
    
}


module.exports = {combineIn,removerMarker};