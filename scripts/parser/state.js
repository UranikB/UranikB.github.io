// class Jump {
//     constructor(collection, symbol) {
//         if(symbol === undefined || collection === undefined){
//             throw "Invalid element";
//         }
//         this.symbol = symbol;
//         this.collection = collection;
//     }
//
//     equals(jump){
//         return this.symbol === jump.symbol && this.collection === jump.collection;
//     }
// }

class Element {
    constructor(nonTerminalSymbol, rule, index, point) {
        if(nonTerminalSymbol === undefined){
            throw "Invalid element";
        }
        if(rule === undefined){
            throw "Invalid element";
        }
        if(index === undefined){
            throw "Invalid element";
        }
        if(point === undefined){
            point = 0;
        }
        if(point <= rule.length) {
            this.nonTerminalSymbol = nonTerminalSymbol;
            this.rule = rule;
            this.index = index;
            this.point = point;
        } else {
            throw "Invalid element";
        }
    }

    equals(element){
        let equals = false;
        if(element.nonTerminalSymbol === this.nonTerminalSymbol
            && element.point === this.point
            && element.rule.length === this.rule.length) {
            equals = true;
            for (let i = 0; i < this.rule.length; i++) {
                if(this.rule[i] !== element.rule[i]){
                    equals = false;
                    break;
                }
            }
        }
        return equals;
    }

    isNotFinished(){
        return (this.point < this.rule.length);
    }

    followingSymbol() {
        if (this.isNotFinished()) {
            return this.rule[this.point];
        }
    }
}

Element.prototype.toString = function elementToString() {
    let ret = this.nonTerminalSymbol + " &#8594; ";
    if(this.point === 0){
        ret += ". " + this.rule[0];
    } else {
        ret += this.rule[0];
    }
    for (let i = 1; i < this.rule.length; i++) {
        if(i === this.point){
            ret += (" . " + this.rule[i]);
        } else {
            ret += (" " + this.rule[i]);
        }
    }
    if(this.point === this.rule.length){
        ret += " .";
    }
    return ret;
};

class Collection {
    constructor(elements, origin, symbol) {
        if(elements === undefined){
            elements = [];
        }
        //this.jumps = [];
        this.jumps = {};
        this.reduction = [];
        this.elements = elements;
        this.isStart = origin === undefined || symbol === undefined;
        if(!this.isStart){
            //this.origin = new Jump(origin, symbol)
            this.origin = origin;
            this.symbol = symbol;
        }
    }

    addReduction(symbol, productionIndex){
        if(this.reduction.length === 0){
            this.reduction = [symbol, productionIndex];
        } else {
            throw "Multiple Reductions by " + this;
        }
    }

    addJump(collection, symbol){
        // let jump = new Jump(collection, symbol);
        // for (let i = 0; i < this.elements.length ; i++) {
        //     if(jump.equals(this.jumps[i])){
        //         return false;
        //     }
        // }
        // this.jumps.push(jump);
        // return true;
        if(this.jumps[symbol] === undefined){
            this.jumps[symbol] = collection;
            return true;
        } else if (this.jumps[symbol] !== collection) {
            throw "Multiple Collections by jump through symbol from " + this;
        }
        return false;
    }

    has(element){
        let isIncluded = false;
        for (let i = 0; i < this.elements.length ; i++) {
            if(element.equals(this.elements[i])){
                isIncluded = true;
                break;
            }
        }
        return isIncluded;
    }

    append(element){
        if(!(this.has(element))){
            this.elements.push(element);
            return true;
        }
        return false;
    }

    equals(collection){
        for (let i = 0; i < this.elements.length; i++) {
            if(!collection.has(this.elements[i])){
                return false;
            }
        }
        for (let i = 0; i < collection.length; i++) {
            if(!this.elements.has(collection[i])){
                return false;
            }
        }
        return true;
    }
}

Collection.prototype.toString = function collectionToString() {
    if(this.isStart) return "Start: " + "(" + this.elements.toString() + "); ";
    return "(" + this.origin + ", " + this.symbol + "): " + "(" + this.elements.toString() + "); ";
};

class Collections {
    constructor(collections) {
        if(collections === undefined){
            collections = [];
        }
        this.collections = collections;
    }

    has(collection){
        let index = -1;
        for (let i = 0; i < this.collections.length ; i++) {
            if(this.collections[i].equals(collection)){
                index = i;
                break;
            }
        }
        return index;
    }

    append(collection){
        let index = this.has(collection);

        if(index === -1){
            this.collections.push(collection);
            return this.collections.length - 1;
        }
        return index;
    }

    addStateAndJump(collection, origin, symbol) {
        let prevCount = this.collections.length - 1;
        let index = this.append(collection);
        let changed = false;

        if (index > prevCount) {
            changed = true;
        }
        if(this.collections[origin].addJump(index, symbol)){
            changed = true;
        }
        return changed;
    }
}

Collections.prototype.toString = function collectionsToString() {
    return "[" + this.collections.toString() + "]"
};

function closure(collection) {
    log("                   Calculating (" + collection + ")-Closure");
    let changed = true;

    let itr = 1;

    while (changed){
        changed = false;
        log("                       " + itr + ". iteration");
        for (let i = 0; i < collection.elements.length; i++) {
            if(collection.elements[i].isNotFinished()) {
                let nextSymbol = collection.elements[i].followingSymbol();
                log("                           Current collection: " + collection.elements[i]);
                if (isNT(nextSymbol)) {
                    log("                               " + nextSymbol + " is nonTerminal");
                    for (let j = 0; j < productionRules.of(nextSymbol).length; j++) {
                        let element = new Element(nextSymbol, productionRules.of(nextSymbol)[j], productionRules.symbolToProduction[nextSymbol][j]);
                        log("                               Current element: " + element);
                        if (collection.append(element)) {
                            log("                               Added current element to: " + collection);
                            changed = true;
                        } else {
                            log("                               Element already contained in: " + collection);
                        }
                    }
                } else {
                    log("                               " + nextSymbol + " is terminal");
                }
            } else {
                log("                           " + collection.elements[i] + " is finished");
            }
        }
        if (changed) log ("                       Changes detected, current closure: " + collection)
        itr++;
    }
    return collection;
}

function jump(collection, origin, symbol){
    log("                   Calculating (" + collection + " ; " + symbol + ")-Jump");
    let jumps = new Collection([], origin, symbol);
    for (let i = 0; i < collection.elements.length; i++) {
        if(collection.elements[i].isNotFinished()) {
            log("                       Current collection: " + collection.elements[i]);
            if (collection.elements[i].followingSymbol() === symbol) {
                log("                       Found symbol: " + symbol + " after \'.\' in: " + collection.elements[i]);
                let element = new Element(collection.elements[i].nonTerminalSymbol, collection.elements[i].rule, collection.elements[i].index, collection.elements[i].point + 1);
                if (jumps.append(element)) log("                       Added: " + element);
            }
        } else {
            log("                       " + collection.elements[i] + " is finished");
        }
    }
    return closure(jumps);
}

function generateStatesAndCalcJumps() {
    log("Generating States:");
    let startingElement = new Element(STARTSYMBOL, STARTPRODUCTION, 0);
    let collection = new Collection([startingElement]);
    closure(collection);

    log("   Initial Collection: ", collection);
    states = new Collections([collection]);
    let changed = true;

    let itr = 1;

    while (changed) {
        changed = false;
        log("   " + itr + ". iteration: " + collection);
        for (let i = 0; i < states.collections.length; i++) {
            log("       Current state: " + states.collections[i]);
            for (let j = 0; j < states.collections[i].elements.length; j++) {
                log("           Current element: " + states.collections[i].elements[j]);
                if (states.collections[i].elements[j].isNotFinished()) {
                    let nextSymbol = states.collections[i].elements[j].followingSymbol();
                    log("               Following Symbol: " + nextSymbol);
                    let collection = jump(states.collections[i], i, nextSymbol);
                    log("               Returned Collection: " + collection);
                    if(states.addStateAndJump(collection, i, nextSymbol)){
                        log("               Appended Collection to states");
                        changed = true;
                    } else {
                        log("               Collection already contained");
                    }
                } else {
                    log("               Element is finished");
                }
            }
        }
        itr++;
    }
    log("Final States: " + states);
}

function calcReductions() {
    log("Calculating Reductions:");
    for (let i = 0; i < states.collections.length; i++) {
        log("       Current state: " + states.collections[i]);
        for (let j = 0; j < states.collections[i].elements.length; j++) {
            if (!(states.collections[i].elements[j].isNotFinished())) {
                states.collections[i].addReduction(states.collections[i].elements[j].nonTerminalSymbol, states.collections[i].elements[j].index)
            }
        }
    }
}