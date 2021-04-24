class FollowSet {
    constructor() {
        for(let i = 0; i < nonTerminals.symbols.length; i++){
            this[nonTerminals.symbols[i]] = [];
        }
    }

    appendToFollow(position, newSymbol){
        if(!this[position].includes(newSymbol)){
            this[position].push(newSymbol);
            return true;
        }
        return false;
    }

    equalsFollow(correctSymbol, inputSet){
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
 * This function generates the follow sets of all given symbols. It has to be called after first is calculated.
 */
function generateFollow(){
    let changed = true;
    let counter = 0;

    while(changed){
        changed = false;
        log("Going through all production rules");
        for (let i = 0; i < nonTerminals.symbols.length; i++) {
            log("   Going through production rules " + productionRules.of(nonTerminals.symbols[i]) + " of " + nonTerminals.symbols[i]);
            if(nonTerminals.symbols[i] === STARTSYMBOL){
                log("   Start Symbol. Follow is $ " + nonTerminals.symbols[i]);
                if(follow.appendToFollow(nonTerminals.symbols[i], "$")){
                    changed = true;
                    continue;
                }
            }
            for (let j = 0; j < productionRules.of(nonTerminals.symbols[i]).length; j++) {
                log("       Going through production rule " + productionRules.of(nonTerminals.symbols[i])[j] + " of " + nonTerminals.symbols[i]);
                    for (let k = 0; k < productionRules.of(nonTerminals.symbols[i])[j].length - 1; k++) {
                        log("               Checking " + productionRules.of(nonTerminals.symbols[i])[j][k]);
                        if(!isNT(productionRules.of(nonTerminals.symbols[i])[j][k])) {
                            log("               Checking " + productionRules.of(nonTerminals.symbols[i])[j][k]+ " is not NT");
                            continue;
                        }
                        let firstSet = first[productionRules.of(nonTerminals.symbols[i])[j][k+1]];
                        log("                   First of next symbol: " + firstSet);
                        for (let l = 0; l < firstSet.length; l++) {
                            if(follow.appendToFollow(productionRules.of(nonTerminals.symbols[i])[j][k], firstSet[l])){
                                changed = true;
                                log("                       Changed was set to true because of first of next");
                                log("                       " + firstSet[l] + " added to follow of " + productionRules.of(nonTerminals.symbols[i])[j][k]);
                                log(follow[productionRules.of(nonTerminals.symbols[i])[j][k]]);
                            }
                        }
                        if(firstSet.includes(EMPTY)){
                            log("                       It contains empty symbol");
                            for (let l = 0; l < follow[productionRules.of(nonTerminals.symbols[i])[j][k+1]].length; l++) {
                                if(follow.appendToFollow(productionRules.of(nonTerminals.symbols[i])[j][k], follow[productionRules.of(nonTerminals.symbols[i])[j][k+1]][l])){
                                    changed = true;
                                    log("                       Changed was set to true because of follow of next");
                                    log("                       " + follow[productionRules.of(nonTerminals.symbols[i])[j][k+1]][l] + " added to follow of ");
                                    log(follow[productionRules.of(nonTerminals.symbols[i])[j][k]]);
                                }
                            }

                        }
                    }
                log("           Checking last element " + productionRules.of(nonTerminals.symbols[i])[j][productionRules.of(nonTerminals.symbols[i])[j].length - 1]);
                for (let k = 0; k < follow[nonTerminals.symbols[i]].length; k++) {
                    if(!isNT(productionRules.of(nonTerminals.symbols[i])[j][productionRules.of(nonTerminals.symbols[i])[j].length - 1])) {
                        log("                   last element not nt");
                        continue;
                    }
                    log("           Follow of non terminal " + nonTerminals.symbols[i] + " to be added: " + follow[nonTerminals.symbols[i]][k]);
                    if(follow.appendToFollow(productionRules.of(nonTerminals.symbols[i])[j][productionRules.of(nonTerminals.symbols[i])[j].length - 1], follow[nonTerminals.symbols[i]][k])){
                        changed = true;
                        log("               Changed was set to true");
                    }
                }
            }
        }
        log(counter + ". iteration complete. Follow: ");
        log(follow);
        counter++;
    }
    log("Follow was generated");

    log("Empty Symbols get removed.");

    let defined = true;
    for (let i = 0; i < Object.keys(follow).length; i++) {
        log("   Filtering rule " + follow[Object.keys(follow)[i]] + " of " + Object.keys(follow));
        if(Object.keys(follow)[i] === EMPTY){
            delete follow[Object.keys(follow)[i]];
        } else {
            let followSet = follow[Object.keys(follow)[i]];
            for (let j = 0; j < followSet.length; j++) {
                if (followSet[j] === EMPTY) {
                    followSet.splice(j, 1);
                }
            }
        }
        log("         Result of filter: " + follow[Object.keys(follow)[i]]);
        log("         Checking if " + follow[Object.keys(follow)[i]] + " is defined.");
        if(typeof follow[Object.keys(follow)[i]][0] === "undefined"){
            log("               It is not defined.");
            let nts = document.getElementsByClassName("nonterminal");
            for (let j = 0; j < nts.length; j++) {
                if(nts[j].value === Object.keys(follow)[i]){
                    nts[j].style.backgroundColor = "red";
                    defined = false;
                }
            }

        }
    }
    if(!defined) throw "Invalid Symbol";
    log(follow);
}
