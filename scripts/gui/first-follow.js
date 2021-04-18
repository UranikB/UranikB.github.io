function showFirst(){
    const container = document.getElementById("first-form");
    container.innerHTML = "";

    for (let i = 0; i < nonTerminals.length; i++) {
        if(nonTerminals[i] !== STARTSYMBOL) {
            const firstField = document.createElement("div");
            firstField.id = "first-filed-of-" + nonTerminals[i];
            firstField.classList.add("first-field");

            firstField.innerHTML = "<text class=\"symbol-text\">" + nonTerminals[i] + "</text" +
                "><input type=\"text\" id=\"first-input-of-" + nonTerminals[i] + "\" class=\"first-input\"" +
                "/><button class=\"button\" onclick=\"correctFirst(\'" + nonTerminals[i] + "\')\">&check;</button" +
                "><input disabled type=\"text\" id=\"first-output-of-" + nonTerminals[i] + "\" class=\"first-output\"/>";

            container.appendChild(firstField);
        }
    }
    document.getElementById("first-container").style.visibility = "visible";
}

function showFollow(){
    const container = document.getElementById("follow-form");
    container.innerHTML = "";

    let symbols = nonTerminals.concat(terminals);

    for (let i = 0; i < symbols.length; i++) {
        if(symbols[i] !== EMPTY && symbols[i] !== STARTSYMBOL) {
            const followField = document.createElement("div");
            followField.classList.add("follow-field");
            followField.id = "follow-field-of-" + symbols[i];

            followField.innerHTML = "<text class=\"symbol-text\">" + symbols[i] + "</text" +
                "><input type=\"text\" id=\"follow-input-of-" + symbols[i] + "\" class=\"follow-input\"" +
                "/><button class=\"button\" onclick=\"correctFollow(\'" + symbols[i] + "\')\">&check;</button" +
                "><input disabled type=\"text\" id=\"follow-output-of-" + symbols[i] + "\" class=\"follow-output\"/>";

            container.appendChild(followField);
        }
    }
    document.getElementById("follow-container").style.visibility = "visible";
}