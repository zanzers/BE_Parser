//  OR = R;
// AND = A;
// INPUT = I:A,B,C,D;
// NOT = N:A,B,C,D;
// DNI = DN: A,B,C,D;
// ();
// CONSTANT = 1 OR 0;

//LHS: single Output OR input;
// RHS: more than one input OR output;
 
 
function redFlags(input) {
    let count = 0;
    let hash = {};

    console.log("PARSER: ",input);

    function eval() {
        try {
            return Goal(0).num.toString();

        } catch (e) {
            if (e instanceof Fail) {
                return "Cannot parse input";
            } else {
                throw e;
            }
        }
    }

    function say(msg) {
        console.error(msg);
        console.log("STEPS: " +count)
        console.log()
        count++;
    }

    function Goal(position) {
        const result = And(position);
        eof(result.position);
        return result;
    }

    // Grammar Rules || Production Rule START HERE!!:

   function And(position){
        try{
            // say("AND Identifiers: I*I || I*NI || I*1 || I*0");

            // say(" " + "With itself <-- Idempotent [BACKTRACK]");
            const varA = packman('I', position);
            const gate = packman('A', varA.position);
            const rhs = packman ('I', gate.position);
            return new Result ('I', rhs.position);
            
        }catch{
            try{
            // say(" " + "With inverse <-- Complement [BACKTRACK]");
            const varA = packman('I', position);
            const gate = packman('A', varA.position);
            const rhs = packman ('N', gate.position);
            return new Result ('0', rhs.position);

            }catch{
                try{
                // say(" " + "With 1 <-- Identity [BACKTRACK]");
                const varA = packman('I', position);
                const gate = packman('A', varA.position);
                const rhs = packman ('1', gate.position);
                return new Result ('I', rhs.position);

                }catch{
                    try{
                    // say(" " + "With 0 <-- Annulment [BACKTRACK]")
                    const varA = packman('I', position);
                    const gate = packman('A', varA.position);
                    const rhs = packman ('0', gate.position);
                   return new Result ('0', rhs.position);
                        
                     }catch(ex){
                        // say("AND <- OR [BACKTRACK]");
                        return Or(position);
                        }
                    }
            }

        }
   }
   
   function Or(position){
    try{
        // say("OR Identifiers: I+I || I+NI || I+1 || I+0");

        // say(" " + "With itself <-- Idempotent [BACKTRACK]");
        const varA = packman('I', position);
        const gate = packman('R', varA.position);
        const rhs = packman ('I', gate.position);
        return new Result ('I', rhs.position);
        
    }catch{
        try{
        // say(" " + "With inverse <-- Complement [BACKTRACK]");
        const varA = packman('I', position);
        const gate = packman('R', varA.position);
        const rhs = packman ('N', gate.position);
        return new Result ('1', rhs.position);

        }catch{
            try{
            // say(" " + "With 1 <-- Identity [BACKTRACK]");
            const varA = packman('I', position);
            const gate = packman('R', varA.position);
            const rhs = packman ('1', gate.position);
            return new Result ('1', rhs.position);

            }catch{
                try{
                // say(" " + "With 0 <-- Annulment [BACKTRACK]")
                const varA = packman('I', position);
                const gate = packman('R', varA.position);
                const rhs = packman ('0', gate.position);
               return new Result ('I', rhs.position);
                    
                 }catch(ex){
                    // say("OR <- Double Negation [BACKTRACK]");
                    return dNegation(position);
                    }
                }
        }

    }
    }

    function dNegation(position){
        try{
            // say("Doudle Negation: I'' ");
            const varA = packman('D', position);
            const gate = packman('N', varA.position);
            const rhs = packman ('I', gate.position);
            return new Result ('I', rhs.position);
        }catch (ex){
            // say("dNegation <- Incase [BACKTRACK]");
            return inCase(position);
        }
    }

    function inCase(position){
        try{
            // say(" " + "Encase NAN <- [BACKTRACK]"); 
            const varA = packman('N', position);
            const gate = packman('A', varA.position);
            const rhs = packman('N', gate.position);
            return new Result ('N', rhs.position);
        }catch{
            try{
                // say(" " + "Encase NAU <- [BACKTRACK]"); 
                const varA = packman('N', position);
                const gate = packman('A', varA.position);
                const rhs = packman('1', gate.position);
                return  new Result('N', rhs.position);
            }catch{
                try{
                    const varA = packman('1', position);
                    const gate = packman('R', varA.position);
                    const rhs = packman('I', gate.position);
                    return new Result('1', rhs.position);
                }catch{
                    try{
                        const varA = packman('1', position);
                        const gate = packman('A', varA.position);
                        const rhs = packman('I', gate.position);
                        return new Result ('A', rhs.position);
                    }catch{
                        try{
                            const varA = packman('0', position);
                            const gate = packman('A', varA.position);
                            const rhs = packman('1', gate.position);
                            return new Result ('0', rhs.position);
                        }catch{
                            try{
                                const varA = packman('N', position);
                                const gate = packman ('R', varA.position);
                                const rhs = packman ('1', gate.position);
                                return new Result ('N', rhs.position);
                            }catch{
                                // say("AbsorptiveLhs [BACKTRACT]")
                                return absorptiveLhs(position);
                            }
                        }
                    }
                }
            }

        }
    }
    
    function absorptiveLhs(position){
        try{
            // say("asorptiveLhs");
            const varA = packman('I', position);
            return new Result ('IRIS', varA.position);


        }catch{

        }

    }

  // Grammar Rules || Production Rule END HERE!!:


    function packman(c, position) {
        // say("Char:" +' '+c);
        if (position >= input.length) {
            throw new Fail(); 
        }
        if (hash[c] && hash[c][position]) {
            // say(`${c} -- retrieving hashed result`);
            return hash[c][position];
        }
        if (input.charAt(position) === c) {
            const result = new Result(1, position + 1);
            if (!hash[c]) hash[c] = {};
            hash[c][position] = result;
            return result; 
        }
        throw new Fail();
    }

    function eof(position) {
        // say("End Of File!");
        if (position <= input.length) {
            return new Result(1, position);
        }
        throw new Fail();
    }

    function Result(num, position) {
        this.num = num; 
        this.position = position;
        // console.log(num, position);
        return {num, position};
    }

    function Fail(message) {
        this.name = "Fail";
        this.message = message || "Default Error Message";
        this.stack = (new Error()).stack;
    }

    Fail.prototype = Object.create(Error.prototype);
    Fail.prototype.constructor = Fail;

    return { eval, count };
}

module.exports = redFlags;


