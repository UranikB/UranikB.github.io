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