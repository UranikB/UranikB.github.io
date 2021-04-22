function parseGrammar() {


      //  test();
    hideAll();
    let input = getInput();
    //terminals = input[0].sort();
    log("Terminals: " + terminals.symbols);
    //nonTerminals = input[1].sort();
    log("NTS: " + nonTerminals.symbols);
    log("Production Rules:");
    productionRules = input[2];
    log(productionRules);

    try {
        first = new FirstSet(terminals, nonTerminals);
        follow = new FollowSet(terminals, nonTerminals);
        console.time("First");
        generateFirsts(terminals, topologicalSorting(nonTerminals, productionRules), productionRules);
        //generateFirsts(terminals, nonTerminals, productionRules);
        console.timeEnd("First");
        console.time("Follow");
        generateFollow(terminals, nonTerminals, productionRules);
        console.timeEnd("Follow");
        showFirst();
        showFollow();
        generateStatesAndCalcJumps();
        calcReductions();
        console.log(states);
        createStateTable();
        createParseTable();
        showTables();
    } catch (e) {
         document.getElementById("parse-grammar-button").style.backgroundColor = "red";
    }
}
