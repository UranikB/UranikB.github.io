function addField(){
    const container = document.getElementById("input-form");

    const inputField = document.createElement("div");
    inputField.classList.add("input-field");

    const input1 = document.createElement("input");
    input1.classList.add("nonterminal");
    input1.type = "text";
    input1.onchange =  hideAll;

    const arrow = document.createElement("span");
    arrow.innerHTML = "&#8594;";


    const input2 = document.createElement("input");
    input2.classList.add("production-rule");
    input2.type = "text";
    input2.onchange =  hideAll;

    inputField.innerHTML = "<button class=\"button\" onclick=\"deleteField(this)\"><img src=\"../resources/trashcan.png\"/></button>";
    inputField.appendChild(input1);
    inputField.appendChild(arrow);
    inputField.appendChild(input2);

    container.insertBefore(inputField, document.getElementById("add-field-button"));
}

function deleteField(button){
    let field = button.parentNode;
    if(field.children.item(1).value !== "" || field.children.item(3).value !== ""){
        hideAll();
    }
    field.parentElement.removeChild(field);
}

function hideAll(){
    terminals = new Terminals();
    nonTerminals = new NonTerminals();
    productionRules = new Rules();
    first = new FirstSet();
    follow = new FollowSet();

    document.getElementById("parse-grammar-button").style.backgroundColor = "white";

    let nts = document.getElementsByClassName("nonterminal");
    for (let i = 1; i < nts.length; i++) {
        nts[i].style.backgroundColor = "ghostwhite";
    }

    document.getElementById("first-container").style.visibility = "collapse";
    document.getElementById("follow-container").style.visibility = "collapse";
    document.getElementById("third-row").style.visibility = "collapse";
    const stateTable = document.getElementById("state-table-container");
    const parseTable = document.getElementById("parse-table-container");
    stateTable.innerHTML = "";
    parseTable.innerHTML = "";
}

function resetAll(){
    terminals = new Terminals();
    nonTerminals = new NonTerminals();
    productionRules = new Rules();
    first = new FirstSet();
    follow = new FollowSet();

    document.getElementById("first-container").style.visibility = "collapse";
    document.getElementById("follow-container").style.visibility = "collapse";
    document.getElementById("third-row").style.visibility = "collapse";
    const container = document.getElementById("input-form");
    container.innerHTML = "<div class=\"title\"><h3>Eingabe</h3>" +
        "                <button class=\"wide-button\" id=\"parse-grammar-button\" onclick=\"parseGrammar()\">\n" +
        "                    <img src=\"../resources/caret-right-fill.svg\"/>\n" +
        "                </button>\n" +
        "                </div>\n" +
        "                <div id=\"disabled-start-field\" class=\"input-field\">\n" +
        "                   <button class=\"button\"></button\n" +
        "                   ><input disabled type=\"text\" class=\"nonterminal\" value=\"X\"\n" +
        "                   /><span>&#8594;</span\n" +
        "                   ><input disabled type=\"text\" class=\"production-rule\" value=\"S\"/>\n" +
        "               </div>\n" +
        "               <div class=\"input-field\">\n" +
        "                   <button class=\"button\" onclick=\"deleteField(this)\"\n" +
        "                   ><img src=\"../resources/trashcan.png\"\n" +
        "                   /></button><input type=\"text\" class=\"nonterminal\" onchange=\"hideAll()\"\n" +
        "                   /><span>&#8594;</span><input type=\"text\" class=\"production-rule\" onchange=\"hideAll()\"/>\n" +
        "               </div>\n" +
        "               <button class=\"wide-button\" id=\"add-field-button\" onclick=\"addField()\">+</button>"

    const stateTable = document.getElementById("state-table-container");
    const parseTable = document.getElementById("parse-table-container");
    stateTable.innerHTML = "";
    parseTable.innerHTML = "";
}
