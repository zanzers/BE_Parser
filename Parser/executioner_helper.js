
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

function removerMarker(reMain, inputs) {

    console.log("removerMarker", reMain);
    console.log("MArker" , inputs);

    const flag = reMain.findIndex(token => token.type === 'UNCOMMON' || token.type === 'COMMON');
    

    if (flag !== -1) {
        console.log("SUCCESS To remove", flag);
        reMain.splice(flag, 1, inputs);
        
    }
    
    return reMain
    
}





module.exports = {combineIn,removerMarker};