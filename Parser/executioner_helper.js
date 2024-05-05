
function combineIn(reMain, parserOutput) {

    if(!parserOutput){
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

    console.log("removing Marker: ", reMain);
    console.log("New Input:" , result);
  
    
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
module.exports = {combineIn,removerMarker};