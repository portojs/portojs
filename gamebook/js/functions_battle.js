/**
 * Created by Peter on 12.03.2015.
 */
// simple notation
//--- local explanation
//+++ notes for later action

//+++ deleted argument "enemies1", because I think info on enemies
//+++ should be received from the location variable

function battleMain(locationName) {
// show battle window
    openBattle();
// list of vars
    // general vars
    var i;
    // vars for creating a list of enemies
    var enemies = [];
    //
    var heroInitList = [];
    var heroAPs;
    var heroCoords;
    var enemyAPs;
    var enemyCoords;
    var miniature;
    var battleField;
    var battleFieldCoords;
    var battleCommands;
    var listItem;
    var listItemText;
    var heroCoordTop;
    var heroCoordLeft;
    var enemyCoordTop;
    var enemyCoordLeft;
    var command1 = function() {heroMove(hero.idName, hero)};
    var command2 = function() {heroAttack(hero, enemy, locationName)};
    var command3 = function() {endTurn()};
    battleField = document.getElementById("battle_field");
    battleFieldCoords = $("#battle_field").offset();
    battleCommands = document.getElementById("battle_commands");
    heroCoordTop = 20;
    heroCoordLeft = 20;
    enemyCoordTop = 20;
    enemyCoordLeft = 400;

// main body
    //-- populating the enemy list
    for (i = 0; i < locationName.encounter1.enemies1Quantity; i++) {
        enemies.push({
            id: 'enemy' + i,
            hp: locationName.encounter1.enemies1Name.hp() + locationName.encounter1.enemies1Name.hpModifier,
            init: locationName.encounter1.enemies1Name.initiative + rolls.d20()
        });
    }

    //-- placing hero party on map & rolling initiative
    for (i = 0; i < heroParty.length; i++) {
        addMiniature(heroParty[i].name, heroCoordTop, heroCoordLeft, "hero_miniature");
        heroParty[i].init = heroParty[i].initiative + rolls.d20();
        heroInitList.push({
            id: heroParty[i].name,
            init: heroParty[i].init
        });
        heroCoordTop += 40;
    }
    //-- placing enemies on map
    for (i = 0; i < enemies.length; i++) {
        addMiniature(enemies[i].id, enemyCoordTop, enemyCoordLeft, "enemy_miniature");
        enemyCoordTop += 40;
    }
    //-- roll & list initiatives for hero party
    rollHeroesInitative();
    //-- show commands
    showCommandsStart();

    /*
    addMiniature(hero.idName, hero.coordTop, hero.coordLeft);
    addMiniature(bandit1.idName, bandit1.coordTop, bandit1.coordLeft);
    heroCoords = $("#" + hero.idName).offset();
    enemyCoords = $("#" + bandit1.idName).offset();
    showCommandsStart();
    */
// list of functions
    function showCommandsStart() {
        while (battleCommands.hasChildNodes()) {
            battleCommands.removeChild(battleCommands.childNodes[0]);
        }
        listItem = document.createElement("LI");
        listItemText = document.createTextNode();
//        Math.max();
        addCommand(battleCommands, command1, "Іти");
        //--- IF enemy is near "Attack" command is added
        if (heroCoords.top + 20 == enemyCoords.top ||
            heroCoords.top - 20 == enemyCoords.top ||
            heroCoords.left + 20 == enemyCoords.left ||
            heroCoords.left - 20 == enemyCoords.left) {
            addCommand(battleCommands, command2, "Атакувати");
        }
        addCommand(battleCommands, command3, "Завершити хід");
    }
    function rollHeroesInitative() {
        for (i = 0; i < heroParty.length; i++) {
            heroParty[i].init = heroParty[i].initiative + rolls.d20();
            heroInitList.push(heroParty[i].init);
        }
    }
    function addCommand (where, command, commandName) {
        listItem = document.createElement("LI");
        listItem.onclick = command;
        listItemText = document.createTextNode(commandName);
        listItem.appendChild(listItemText);
        where.appendChild(listItem);
    }
    function addMiniature(idName, coordTop, coordLeft, classId) {
        miniature = document.createElement("DIV");
        miniature.setAttribute("id", idName);
//        alert(battleFieldCoords.top);
//        alert(coordTop);
//        alert(battleFieldCoords.top + coordTop);
        battleField.appendChild(miniature);
        document.getElementById(idName).className = classId;
//        var temp = $("#" + idName).offset();
        $("#" + idName).offset({top: battleFieldCoords.top + coordTop,
            left: battleFieldCoords.left + coordLeft});
//        alert(temp.top);
    }
        //+++ untested & uncleared
    function heroMove(miniature, hero) {
        heroAPs = hero.move;
        document.getElementById("movement_counter").innerHTML = "Очки ходу: " + heroAPs;
        miniatureWaiting(miniature, battleFieldCoords);
        availableCells(miniature, battleFieldCoords, hero, heroAPs);
    }
        //+++ left for much later
    function endTurn() {
    }
}
