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
