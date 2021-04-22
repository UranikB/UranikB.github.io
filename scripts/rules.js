class Rules {
    constructor(symbols) {
        this.symbolToProduction = {};
        if (symbols === undefined) symbols = [];
        for (let i = 0; i < symbols.length; i++) {
            this.symbolToProduction[symbols[i]] = [];
        }
        this.productions = [];
    }

    of(symbol){
        if(this.symbolToProduction[symbol] === undefined) return [];
        let rules = [];
        for (let i = 0; i < this.symbolToProduction[symbol].length; i++) {
            rules.push(this.productions[this.symbolToProduction[symbol][i]]);
        }
        return rules;
    }

    symbolHasProduction(symbol, production){
        for (let i = 0; i < this.symbolToProduction[symbol].length ; i++) {
            if(this.productions[this.symbolToProduction[symbol][i]] === production){
                return true;
            }
        }
        return false;
    }

    append(symbol, production) {
        if(!this.symbolHasProduction(symbol, production)){
            this.productions.push(production);
            this.symbolToProduction[symbol].push(this.productions.length - 1);
            return true;
        }
        return false;
    }
}

class NonTerminals {
    constructor(symbols) {
        if(symbols === undefined) symbols = [];
        this.symbols = symbols
    }

    append(symbol) {
        if(!(this.symbols.includes(symbol))){
            this.symbols.push(symbol);
            return true;
        }
        return false;
    }
}

class Terminals {
    constructor(symbols) {
        if(symbols === undefined) symbols = [];
        this.symbols = symbols
    }

    append(symbol) {
        if(!(this.symbols.includes(symbol))){
            this.symbols.push(symbol);
            return true;
        }
        return false;
    }
}

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