function correctAllFirsts(){
    for (let i = 0; i < nonTerminals.symbols.length; i++) {
        if(nonTerminals.symbols[i] !== STARTSYMBOL && nonTerminals.symbols[i] !== EMPTY){
            correctFirst(nonTerminals.symbols[i]);
        }

    }
}

function correctFirst(nonTerminalSymbol){
    let input = document.getElementById("first-input-of-" + nonTerminalSymbol);
    let output = document.getElementById("first-output-of-" + nonTerminalSymbol);

    let result = "";
    result += first[nonTerminalSymbol][0];
    for (let i = 1; i < first[nonTerminalSymbol].length; i++) {
        result += ", " + first[nonTerminalSymbol][i];
    }
    output.value = result;

    let counter = 0;
    for (let i = 0; i < input.value.length; i++) {
        if(input.value[i] === ",") counter++;
        else if(input.value[i] === ";") counter--;
    }
    //input = input.value.replace(/(counter<=0)?";":","/g, "");
    //let inputSet = input.value.replace(/[sSrR1234567890]/g, "").split(" ");


    let inputArray;
    let commaCounter = 0;
    for (let i = 0; i < input.value.length; i++) {
        if (input.value[i] === "{" || input.value[i] === "}") {
            input.value[i] = "";
        }
        if(input.value[i] === ",") commaCounter++;
        if(input.value[i] === ";") commaCounter--;
    }

    if(commaCounter > 0) inputArray = input.value.split(", ");
    else if (commaCounter < 0) inputArray = input.value.split("; ");
    else inputArray = input.value.split(" ");

    if(first.equalsFirst(nonTerminalSymbol, inputArray)){
        output.style.color = "green";
    }
    else{
        output.style.color = "red";
    }

}

function correctAllFollows(){
    for (let i = 0; i < nonTerminals.symbols.length; i++) {
        if(nonTerminals.symbols[i] !== STARTSYMBOL && nonTerminals.symbols[i] !== EMPTY){
            correctFollow(nonTerminals.symbols[i]);
        }
    }
    for (let i = 0; i < terminals.symbols.length; i++) {
        if(terminals.symbols[i] !== STARTSYMBOL && terminals.symbols[i] !== EMPTY){
            correctFollow(terminals.symbols[i]);
        }
    }
}

function correctFollow(symbol){
    let input = document.getElementById("follow-input-of-" + symbol);
    let output = document.getElementById("follow-output-of-" + symbol);

    let result = "";
    result += follow[symbol][0];
    for (let i = 1; i < follow[symbol].length; i++) {
        result += ", " + follow[symbol][i];
    }
    output.value = result;

    let inputArray;
    let commaCounter = 0;
    for (let i = 0; i < input.value.length; i++) {
        if (input.value[i] === "{" || input.value[i] === "}") {
            input.value[i] = "";
        }
        if(input.value[i] === ",") commaCounter++;
        if(input.value[i] === ";") commaCounter--;
    }

    if(commaCounter > 0) inputArray = input.value.split(", ");
    else if (commaCounter < 0) inputArray = input.value.split("; ");
    else inputArray = input.value.split(" ");

    if(follow.equalsFollow(symbol, inputArray)){
        output.style.color = "green";
    }
    else{
        output.style.color = "red";
    }
}

function correctParserTable(fillMode) {
    let tbody = document.getElementById("parse-table-body");
    for (let i = 0; i < tbody.rows.length; i++) {
        let row = tbody.rows[i];
        for (let j = 0; j < terminals.symbols.length; j++) {
            row.cells[j + 1].style.backgroundColor = "ghostwhite";
            //terminals[j] + ":" + row.cells[j + 1].innerHTML
            let input = row.cells[j + 1].innerHTML;

            let correct = states.collections[i].jumps[terminals.symbols[j]];
            correct = (correct !== undefined)? "s" + correct : "";

            if(states.collections[i].reduction.length !== 0) {
                if (follow[states.collections[i].reduction[0]].includes(terminals.symbols[j])) {
                    correct += "r" + states.collections[i].reduction[1];
                }
            }

            if(correct === "" && input.replace(/[\s]/g, "") !== ""){
                row.cells[j + 1].style.backgroundColor = "red";
            } else if (correct !== ""){
                if (input.replace(/[^sSrR1234567890]/g, "").toLowerCase() !== correct){
                    row.cells[j + 1].style.backgroundColor = "red";
                } else {
                    row.cells[j + 1].style.backgroundColor = "green";
                }
            }
            if(fillMode) row.cells[j + 1].innerHTML = correct;
        }

        let input = row.cells[terminals.symbols.length + 1].innerHTML;
        let correct = "";
        if(states.collections[i].reduction.length !== 0) {
            correct += (states.collections[i].reduction[1] === 0)? "Fertig" : "r" + states.collections[i].reduction[1];
        }
        if(correct === "" && input.replace(/[\s]/g, "") !== ""){
            row.cells[terminals.symbols.length + 1].style.backgroundColor = "red";
        } else if (correct !== ""){
            if(correct === "Fertig" && input !== "" && input.replace(/[^1234567890]/g, "") === ""){
                row.cells[terminals.symbols.length + 1].style.backgroundColor = "green";
            }
            else if (input.replace(/[^sSrR1234567890]/g, "").toLowerCase() !== correct){
                row.cells[terminals.symbols.length + 1].style.backgroundColor = "red";
            } else {
                row.cells[terminals.symbols.length + 1].style.backgroundColor = "green";
            }
        }
        if(fillMode) row.cells[terminals.symbols.length + 1].innerHTML = correct;

        for (let j = 1; j < nonTerminals.symbols.length; j++) {
            row.cells[terminals.symbols.length + j + 1].style.backgroundColor = "ghostwhite";
            //nonTerminals.symbols[j] + ":" + row.cells[terminals.symbols.length + j + 1].innerHTML
            let input = row.cells[terminals.symbols.length + j + 1].innerHTML;
            let correct = states.collections[i].jumps[nonTerminals.symbols[j]];
            correct = (correct !== undefined)? correct.toString() : "";
            if(correct === "" && input.replace(/[^\s]/g, "") !== ""){
                row.cells[terminals.symbols.length + j + 1].style.backgroundColor = "red";
            } else if (correct !== ""){
                if (input.replace(/[^1234567890]/g, "") !== correct){
                    row.cells[terminals.symbols.length + j + 1].style.backgroundColor = "red";
                } else {
                    row.cells[terminals.symbols.length + j + 1].style.backgroundColor = "green";
                }
            }
            if(fillMode) row.cells[terminals.symbols.length + j + 1].innerHTML = correct;

        }
    }
}