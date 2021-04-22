/**
 *
 * @param nonTerminalSymbols: Array of all nonterminal-symbols represented by uppercase letters
 * @param productionRules: Map of nonterminal-symbols (keys) to array of all production rules of this NT (value)
 * These production rules are stored as strings
 */

function topologicalSorting(nonTerminalSymbols, productionRules){
    var dependencies = {};
    //Initialize dependencies
    for(let i = 0; i < nonTerminalSymbols.symbols.length; i++) {
        dependencies[nonTerminalSymbols.symbols[i]] = [];
    }
    //Iterate through NTs
    for(let i = 0; i < nonTerminalSymbols.symbols.length; i++){
        //Iterate through the according production rules
        log(productionRules.of(nonTerminalSymbols.symbols[i]));
        for(let j = 0; j < productionRules.of(nonTerminalSymbols.symbols[i]).length; j++){
            //Iterate through the characters of the production
            log("   "  + productionRules.of(nonTerminalSymbols.symbols[i])[j]);
            for(let k = 0; k < productionRules.of(nonTerminalSymbols.symbols[i])[j].length; k++){
                //Check if production contains NT
                log("       " + productionRules.of(nonTerminalSymbols.symbols[i])[j] + "(" + productionRules.of(nonTerminalSymbols.symbols[i])[j].length + ")" + ": " + productionRules.of(nonTerminalSymbols.symbols[i])[j][k]);
                if(isNT(productionRules.of(nonTerminalSymbols.symbols[i])[j][k])){
                    //Add as dependency
                    if(!(nonTerminalSymbols.symbols[i] in dependencies)){
                        dependencies[nonTerminalSymbols.symbols[i]] = [];
                        dependencies[nonTerminalSymbols.symbols[i]].push(productionRules.of(nonTerminalSymbols.symbols[i])[j][k]);
                    } else if(!dependencies[nonTerminalSymbols.symbols[i]].includes(productionRules.of(nonTerminalSymbols.symbols[i])[j][k])){
                        dependencies[nonTerminalSymbols.symbols[i]].push(productionRules.of(nonTerminalSymbols.symbols[i])[j][k]);
                    }
                }
            }
        }
    }
    log(dependencies);
    let maxDependencies = 0;
    for(let i = 0; i < nonTerminalSymbols.symbols.length; i++) {
        if(maxDependencies < dependencies[nonTerminalSymbols.symbols[i]].length){
            maxDependencies = dependencies[nonTerminalSymbols.symbols[i]].length;
        }
    }
    let sortedNonTerminals = [];
    for(let i = 0; i <= maxDependencies; i++) {
        for (let j = 0; j < nonTerminalSymbols.symbols.length; j++) {
            if (dependencies[nonTerminalSymbols.symbols[j]].length === i) {
                sortedNonTerminals.push(nonTerminalSymbols.symbols[j]);
            }
        }
    }
    return new NonTerminals(sortedNonTerminals);
}
