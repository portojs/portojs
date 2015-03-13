/**
 * Created by Peter on 12.03.2015.
 */
// simple notation
//--- local explanation
//+++ notes for later action

//+++ deleted argument "enemies1", because I think info on enemies
//+++ should be received from the location variable

function battleMain(locationName) {

// list of vars
    var i;
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
    enemyCoordTop = 100;
    enemyCoordLeft = 100;

// main body
    $("#popup3").show();
    alert(locationName.encounter1.enemies1Quantity);
//    for (i = 0, i < locationName.encounter1.enemies1Quantity, i++)
/*    for (i = 0; i < heroParty.length; i++) {
        addMiniature(heroParty[i].idName, heroCoordTop, heroCoordLeft);
        heroCoordTop += 40;
    }
    for (i = 0; i < enemies1.length; i++) {
        addMiniature(enemies1[i].idName, enemyCoordTop, enemyCoordLeft);
        enemyCoordTop += 40;
    }
}
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
    function addCommand (where, command, commandName) {
        listItem = document.createElement("LI");
        listItem.onclick = command;
        listItemText = document.createTextNode(commandName);
        listItem.appendChild(listItemText);
        where.appendChild(listItem);
    }
    function addMiniature(idName, coordTop, coordLeft) {
        miniature = document.createElement("DIV");
        miniature.setAttribute("id", idName);
        battleField.appendChild(miniature);
        $("#" + idName).offset({top: battleFieldCoords.top + coordTop,
            left: battleFieldCoords.left + coordLeft});
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
