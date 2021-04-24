function parseGrammar() {
    hideFirst();
    try {
        getStartproduction();
        getInput();
        log("Terminals: " + terminals.symbols);
        log("NTS: " + nonTerminals.symbols);
        log("Production Rules:");
        log(productionRules);


        first = new FirstSet();
        generateFirsts();
        showFirst();

        follow = new FollowSet();
        generateFollow();

        generateStatesAndCalcJumps();
        calcReductions();

    } catch (e) {
          document.getElementById("parse-grammar-button").style.backgroundColor = "red";
    }
}
