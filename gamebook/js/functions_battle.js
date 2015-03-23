/**
 * Created by Peter on 12.03.2015.
 */
///---------------------NOTES--------------------------------------------
// simple notation
//--- local explanation
//+++ notes for later action

//+++ deleted argument "enemies1", because I think info on enemies
//+++ should be received from the location variable
///----------------------------------------------------------------------

function battleMain(locationName) {
// show battle window
    openBattle();
// list of vars
    // general vars
    var i;
    // vars for creating a list of enemies
    var enemies = [];
    // displaying commands
    var enemyLocation;
    var heroLocation;

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
    enemyCoordLeft = 40;

// main body
    //-- populating enemy list
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
        /*
        heroParty[i].init = heroParty[i].initiative + rolls.d20();
        heroInitList.push({
            id: heroParty[i].name,
            init: heroParty[i].init
        });
        */
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
        //--- showing the name of the hero with highest initiative
        document.getElementById("current_hero_name").innerHTML = heroParty[0].name;
        addCommand(battleCommands, command1, "Іти");
        //--- check for nearby enemies and add "Attack" command if there are
        for (i = 0; i < enemies.length; i++) {
            heroLocation = document.getElementById(heroParty[0].name).getBoundingClientRect();
            enemyLocation = document.getElementById(enemies[i].id).getBoundingClientRect();
            if (enemyLocation.top == heroLocation.top + 20 ||
                enemyLocation.top == heroLocation.top - 20 ||
                enemyLocation.left == heroLocation.left + 20 ||
                enemyLocation.left == heroLocation.left - 20) {
                return addCommand(battleCommands, command2, "Атакувати");
            }
        }
    }

    function rollHeroesInitative() {
        for (i = 0; i < heroParty.length; i++) {
            heroParty[i].init = heroParty[i].initiative + rolls.d20();
        }
        //--- sorting hero party in the order of rolled initiative, with the highest going first
        heroParty.sort(function (a, b) {
            if (a.init < b.init) {
                return 1;
            }
            if (a.init > b.init) {
                return -1;
            }
            return 0;
        });
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
        battleField.appendChild(miniature);
        document.getElementById(idName).className = classId;
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
