const { singleIn, parserProcess } = require ('./prepProcess');
const {statusUN,statusCom} = require('./com_uncom');
const redFlags = require ('./redFlag_parser');
const  {combineIn, removerMarker} = require ('./executioner_helper');
const { parserLexiA } = require('./lexical');


function Executioner(rInput, nIn) {

       console.log("EXE: ", rInput, nIn);
    
       let newIn;
       let newInput = combineIn(rInput, nIn);
       console.log("COMBINE INPUT:::::::::::::::::::::::: " , newInput);


       const [unCommon , psCom] = processStatusUn(newInput)

       let x = Boolean(psCom !== null)
       console.log("BOOOLEAN:", x);
       console.log("processStatusUn", unCommon);

       //id psCom return null dont execute...
       if(psCom !== null){
              console.log("===========================!!!!!!!!!!===============");
              const resultCom = processStatusCom(psCom)
              newIn = removerMarker(resultCom,unCommon);
              checking(newIn);

              
              console.log("Possible Common: ", psCom);

                  console.log("Parser Output in Uncommon:", unCommon);


                       console.log("===========================");
                              console.log("processStatusCom: ", newIn);
                      console.log("===========================");
       }
     

     
      

  
       // checking(unCommon)
       // console.log("Outside:::::::", unCommon );
}

let count = 0
function checking(newInput){
       
       let procesChk = [];
       let chk = newInput.length;
       console.log(('CHIKINNNG ', newInput));


       if(!Array.isArray(newInput)){
              
              chk = 1;
              console.log("ARRAYL:", chk);
       }

       switch(chk){
              case 1:
                     console.log("INPUT 1 ", newInput);
                     return true;

           
              case 3:       
                     console.log("CASE 3:!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                     

              

               
                     // Executioner(newInput)
                     break;

              default:

              count++
              console.log("CHECKING = RETURN:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::", count);
              Executioner(newInput)
              return false;       
       }    
}





function processStatusCom(psCom){
       let [natara, parserC] = statusCom(psCom);
       if(parserC){
              const [parserOut] = singleIn(parserC);
              let parProcessCom = parserProcess(parserOut);
              let newIn= removerMarker(natara,parProcessCom);

              console.log("singleInCOMMON:::::::::::", parserOut);
              console.log("parProcessCOMMON:::::::", parProcessCom);
              processStatusCom(newIn)
       }



       console.log("STATUS COMMON RETURN: ", natara);
       return natara;

}

function processStatusUn(combine){

       let foundIn = false;
       let parProcessUn = null;

       let = [parserU, psC] = statusUN(combine);

       console.log("PARSERUNCOMMON: ", parserU);
       console.log("REST OF INT INPUT: " , psC);

     
       if(!foundIn && parserU){
              const [parserOut] = singleIn(parserU);
              parProcessUn = parserProcess(parserOut);
              foundIn = true;

              console.log("singleIn!!!!!!!!!!!!!!!!!!", parserOut);
              console.log("parProcessUn!!!!!!!!!!!!!", parProcessUn);

 
             }

           
             console.log("Uncmmon Rest of the Input: ", psC);

             return [parProcessUn, psC];
}























module.exports = Executioner;


