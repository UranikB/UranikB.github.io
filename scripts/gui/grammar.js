function getInput() {
    const container = document.getElementById("input-form");
    let nonTerminalInput = container.getElementsByClassName("nonterminal");
    let productionRulesInput = container.getElementsByClassName("production-rule");

    nonTerminals = new NonTerminals();
    terminals = new Terminals();
    let processedProductionRules = [];
    let processedNonTerminals = [];

    for (let i = 0; i < nonTerminalInput.length; i++) {
        nonTerminals.append(nonTerminalInput[i].value);
    }

    productionRules = new Rules(nonTerminals.symbols);

    for (let i = 0; i < productionRulesInput.length; i++) {
        let rules = productionRulesInput[i].value.split('|');
        for (let j = 0; j < rules.length; j++) {
            processedProductionRules.push(rules[j]);
            processedNonTerminals.push(nonTerminalInput[i].value)
        }
    }

    log(processedProductionRules);

    for (let i = 0; i < processedNonTerminals.length; i++) {
        let symbolInput = processedProductionRules[i].split(' ');
        let isEmpty = true;
        let processedSymbols = [];

        for (let j = 0; j < symbolInput.length; j++) {
            if(symbolInput[j] !== ''){
                if(!(isNT(symbolInput[j]))){
                    terminals.append(symbolInput[j]);
                }
                isEmpty = false;
                processedSymbols.push(symbolInput[j]);
            }
        }
        if(isEmpty){
            processedSymbols.push(EMPTY);
        }

        productionRules.append(processedNonTerminals[i], processedSymbols);
    }
    console.log([terminals, nonTerminals, productionRules]);

    return [terminals, nonTerminals, productionRules];
}

function getStartproduction() {
    let input = document.getElementById("startproduction-input");
    let symbols = input.value.split(' ');
    let symbol;
    let symbolCounter = 0;
    for (let i = 0; i < symbols.length; i++) {
        if(symbols[i] !== ""){
            symbolCounter++;
            symbol = symbols[i];
        }
    }
    if(symbolCounter !== 1) {
        input.style.backgroundColor = "red";
        throw "Invalid Startproduction";
    }
    STARTPRODUCTION = [symbol];
}