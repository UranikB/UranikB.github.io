function correctAllFirsts(){
    for (let i = 0; i < nonTerminals.length; i++) {
        if(nonTerminals[i] !== STARTSYMBOL && nonTerminals[i] !== EMPTY){
            correctFirst(nonTerminals[i]);
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

    let inputArray = [];
    for (let i = 0; i < input.value.length; i++) {
        if(input.value[i] !== "{"
            && input.value[i] !== "}"
            && input.value[i] !== ","
            && input.value[i] !== ";"
            && input.value[i] !== " "){
            inputArray.push(input.value[i]);
        }
    }

    if(compareArrays(inputArray, first[nonTerminalSymbol])){
        output.style.color = "green";
    }
    else{
        output.style.color = "red";
    }

}

function correctAllFollows(){
    for (let i = 0; i < nonTerminals.length; i++) {
        if(nonTerminals[i] !== STARTSYMBOL && nonTerminals[i] !== EMPTY){
            correctFollow(nonTerminals[i]);
        }
    }
    for (let i = 0; i < terminals.length; i++) {
        if(terminals[i] !== STARTSYMBOL && terminals[i] !== EMPTY){
            correctFollow(terminals[i]);
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
    let semiColonCounter = 0;
    for (let i = 0; i < input.value.length; i++) {
        if (input.value[i] === "{" || input.value[i] === "}") {
            input.value[i] = "";
        }
        if(input.value[i] === ",") commaCounter++;
        if(input.value[i] === ";") semiColonCounter++;
    }

    if(commaCounter > semiColonCounter) inputArray = input.value.split(", ");
    else if (commaCounter < semiColonCounter) inputArray = input.value.split("; ");
    else inputArray = input.value.split(" ");

    if(compareArrays(inputArray, follow[symbol])){
        output.style.color = "green";
    }
    else{
        output.style.color = "red";
    }
}