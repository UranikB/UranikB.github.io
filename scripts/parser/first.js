class FirstSet {
    constructor(terminalSymbols, nonTerminalSymbols) {
        if(terminalSymbols === undefined) terminalSymbols = new Terminals();
        if(nonTerminalSymbols === undefined) nonTerminalSymbols = new NonTerminals();
        for(let i = 0; i < terminalSymbols.symbols.length; i++){
            this[terminalSymbols.symbols[i]] = [terminalSymbols.symbols[i]];
        }
        for(let i = 0; i < nonTerminalSymbols.symbols.length; i++){
            this[nonTerminalSymbols.symbols[i]] = [];
        }
    }

    appendToFirst(position, newSymbol){
        if(!this[position].includes(newSymbol)){
            this[position].push(newSymbol);
            return true;
        }
        return false;
    }



    equalsFirst(correctSymbol, inputSet){
        let equal = true;
        for (let i = 0; i < this[correctSymbol].length; i++) {
            if(!inputSet.includes(this[correctSymbol][i])){
                equal = false;
                break;
            }
        }
        if(equal){
            for (let i = 0; i < inputSet.length; i++) {
                if(!this[correctSymbol].includes(inputSet[i])){
                    equal = false;
                    break;
                }
            }
        }
        return equal;
    }
}


/**
 * @param terminalSymbols: Array of all terminal-symbols represented by uppercase letters
 * @param nonTerminalSymbols: Array of all nonterminal-symbols represented as uppercase letters
 * @param productionRules: Map of nonterminal-symbols (keys) to array of all production rules of this NT (value)
 * These production rules are stored as strings
 */
function generateFirsts(terminalSymbols, nonTerminalSymbols, productionRules) {
    let changed = true;
    let i = 1;
    while(changed){
        log(i + ". iteration");
        changed = false;
        for(let i = 0; i < nonTerminalSymbols.symbols.length; i++){
            log("Next symbol: " + nonTerminalSymbols.symbols[i]);
            if(generateFirstOfNT(nonTerminalSymbols.symbols[i], productionRules)){
                changed = true;
                log(nonTerminalSymbols.symbols[i] + ":    Changes detected");
            } else {
                log(nonTerminalSymbols.symbols[i] + ":    No changes detected");
            }
        }
        if(changed) log("Another iteration needed because of changes");
        i++;
    }
    log("Results after " + i + " iterations:");
    log(first);
}

/**
 * @param nonTerminal: nonterminal-symbol represented by uppercase letter
 * @param productionRules: Map of nonterminal-symbols (keys) to array of all production rules of this NT (value)
 * These production rules are stored as strings
 */
function generateFirstOfNT(nonTerminal, productionRules) {
    let changed = false;
    log(nonTerminal + ":    Rules: " + productionRules.of(nonTerminal));
    for(let i = 0; i < productionRules.of(nonTerminal).length; i++){
        log(nonTerminal + ":        Next Rule: " + productionRules.of(nonTerminal)[i]);
        if(productionRules.of(nonTerminal)[i] === EMPTY){
            if(first.appendToFirst(nonTerminal, EMPTY)){
                log(nonTerminal + ":            Adding EMPTY");
                changed = true;
            } else {
                log(nonTerminal + ":            EMPTY already included");
            }
        } else {
            log(nonTerminal + ":        Current First: " + first[nonTerminal]);
            for (let j = 0; j < productionRules.of(nonTerminal)[i].length; j++) {
                log(nonTerminal + ":            Next symbol: " + productionRules.of(nonTerminal)[i][j]);
                log(nonTerminal + ":            First of " + productionRules.of(nonTerminal)[i][j] + ": " + first[productionRules.of(nonTerminal)[i][j]]);
                for (let k = 0; k < first[productionRules.of(nonTerminal)[i][j]].length; k++) {
                    if(!(first[productionRules.of(nonTerminal)[i][j]][k] === EMPTY)) {
                        if (first.appendToFirst(nonTerminal, first[productionRules.of(nonTerminal)[i][j]][k])) {
                            log(nonTerminal + ":                Adding: " + first[productionRules.of(nonTerminal)[i][j]][k]);
                            changed = true;
                        } else {
                            log(nonTerminal + ":                " + first[productionRules.of(nonTerminal)[i][j]][k] + " already included");
                        }
                    }
                }
                if (first[productionRules.of(nonTerminal)[i][j]].includes(EMPTY)) {
                    if ((j + 1) === productionRules.of(nonTerminal)[i].length) {
                        log(nonTerminal + ":                First of last symbol contains EMPTY");
                        if (first.appendToFirst(nonTerminal, EMPTY)) {
                            log(nonTerminal + ":                    Adding EMPTY");
                            changed = true;
                        } else {
                            log(nonTerminal + ":                    EMPTY already included");
                        }
                        break;
                    } else {
                        log(nonTerminal + ":                First of current symbol contains EMPTY");
                        log(nonTerminal + ":                    Continuing with next symbol");
                    }
                } else {
                    log(nonTerminal + ":                First of current symbol contains no EMPTY");
                    log(nonTerminal + ":                    Exiting current rule");
                    break;
                }
            }
        }
        if(changed) log(nonTerminal + ":        Updating First to: " + first[nonTerminal]);
    }
    return changed;
}