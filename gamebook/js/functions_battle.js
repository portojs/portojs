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
function test(){
}


function battleMain(locationName) {
// show battle window
    openBattle();
// list of vars
    // general vars
    var i;
    var enemyName = locationName.encounter1.enemies1Name;
    // vars for creating a list of enemies
    var enemies = [];
    // displaying commands
    var enemyLocation;
    var heroLocation;
    // hero attack vars
    var heroAttackRoll;
    var battleLog = document.getElementById("battle_log");
    // enemy turn vars
    var adjacentHeroes = [];
    var enemyAPs = locationName.encounter1.enemies1Name.move;
    var enemyOffset;
    var enemyIdJq;
    var heroAPs;
    var heroCoords;
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
    var command1 = function () {
        heroMove(hero.idName, hero)
    };
    var command2 = function () {
        heroAttack(heroParty[0])
    };
//    var command9 = function() {heroAttack(heroParty[0], enemy, locationName)};
    var command3 = function () {
        endHeroTurn()
    };
    battleField = document.getElementById("battle_field");
    battleFieldCoords = $("#battle_field").offset();
    battleCommands = document.getElementById("battle_commands");
    heroCoordTop = 20;
    heroCoordLeft = 20;
    enemyCoordTop = 20;
    enemyCoordLeft = 100;

// main body
    //-- populating enemy list
    for (i = 0; i < locationName.encounter1.enemies1Quantity; i++) {
        enemies.push({
            id: 'enemy' + i,
            hp: enemyName.hp() + enemyName.hpModifier,
            init: 0
        });
    }

    //-- placing hero party on map & rolling initiative
    for (i = 0; i < heroParty.length; i++) {
        addMiniature(heroParty[i].name, heroCoordTop, heroCoordLeft, "hero_miniature");
        heroCoordTop += 40;
    }
    //-- placing enemies on map
    for (i = 0; i < enemies.length; i++) {
        addMiniature(enemies[i].id, enemyCoordTop, enemyCoordLeft, "enemy_miniature");
        enemyCoordTop += 40;
    }
    //-- roll & list initiatives for hero party
    rollHeroesInitiative();
    rollEnemiesInitiative();

    //-- show commands
    heroTurn();

// list of functions
    function heroTurn() {
        while (battleCommands.hasChildNodes()) {
            battleCommands.removeChild(battleCommands.childNodes[0]);
        }
        //--- showing the name of the hero with highest initiative
        document.getElementById("current_hero_name").innerHTML = heroParty[0].name;
        document.getElementById(heroParty[0].name).className = "hero_miniature_current";
        addCommand(battleCommands, command1, "Іти");
        addCommand(battleCommands, command3, "Завершити хід");
        //--- check for nearby enemies and add "Attack" command if there are
        for (i = 0; i < enemies.length; i++) {
            heroLocation = document.getElementById(heroParty[0].name).getBoundingClientRect();
            enemyLocation = document.getElementById(enemies[i].id).getBoundingClientRect();
            if (enemyLocation.top == heroLocation.top + 20 && enemyLocation.left == heroLocation.left ||
                enemyLocation.top == heroLocation.top - 20 && enemyLocation.left == heroLocation.left ||
                enemyLocation.left == heroLocation.left + 20 && enemyLocation.top == heroLocation.top ||
                enemyLocation.left == heroLocation.left - 20 && enemyLocation.top == heroLocation.top) {
                return addCommand(battleCommands, command2, "Атакувати");
            }
        }
    }

    function rollHeroesInitiative() {
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

    function rollEnemiesInitiative() {
        for (i = 0; i < enemies.length; i++) {
            enemies[i].init = enemyName.initiative + rolls.d20();
        }
        //--- sorting hero party in the order of rolled initiative, with the highest going first
        enemies.sort(function (a, b) {
            if (a.init < b.init) {
                return 1;
            }
            if (a.init > b.init) {
                return -1;
            }
            return 0;
        });
    }

    function addCommand(where, command, commandName) {
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
        $("#" + idName).offset({
            top: battleFieldCoords.top + coordTop,
            left: battleFieldCoords.left + coordLeft
        });
    }

    function heroAttack(hero) {
        //--- highlighting adjacent enemies
        for (i = 0; i < enemies.length; i++) {
            heroLocation = document.getElementById(heroParty[0].name).getBoundingClientRect();
            enemyLocation = document.getElementById(enemies[i].id).getBoundingClientRect();
            if (enemyLocation.top == heroLocation.top + 20 && enemyLocation.left == heroLocation.left ||
                enemyLocation.top == heroLocation.top - 20 && enemyLocation.left == heroLocation.left ||
                enemyLocation.left == heroLocation.left + 20 && enemyLocation.top == heroLocation.top ||
                enemyLocation.left == heroLocation.left - 20 && enemyLocation.top == heroLocation.top) {
                document.getElementById(enemies[i].id).className = "enemy_miniature_adjacent";
                document.getElementById(enemies[i].id).myId = enemies[i].id;
                document.getElementById(enemies[i].id).addEventListener("click", heroHits, false);
            }
        }
    }

    function heroHits(evt) {
        var hero = heroParty[0];
        var enemyId = evt.target.myId;
        heroAttackRoll = hero.tohit + rolls.d20();
        battleLog.innerHTML += hero.name + " атакує. Атака: " + heroAttackRoll + "</br>";
//        alert("Hero attacks: " + enemyId);
        if (heroAttackRoll >= enemyName.ac) {
            var enemyFind = findEnemy(enemyId);
//            alert("findEnemy returns: " + enemyFind);
//            alert("findEnemy finds enemy: " + enemyFind.id);
//            alert("findEnemy finds enemy: " + enemyId);
            var heroHit = hero.damage;
            enemyFind.hp = enemyFind.hp - heroHit;
            battleLog.innerHTML += hero.name + " влучив." + "</br>";
            battleLog.innerHTML += enemyName.name + " втратив " + heroHit + " здоров'я. Залишлиося: " + enemyFind.hp + "</br>";
            if (enemyFind.hp <= 0) {
//                alert("Hero killed: " + enemyFind.id);
                document.getElementById(enemyId).style.backgroundColor = "black";
//                alert("Enemies number: " + enemies.length);
                var enemyIndex = findEnemyIndex(enemyId);
                var deleted = enemies.splice(enemyIndex, 1);
//                alert("Deleted enemy: " + deleted[0].id);
                changeInitOrder(enemies);
//                alert("Enemies number: " + enemies.length);
//                alert("Enemies array: " + enemies);
//                alert("Enemies array length: " + enemies.length);
            }
        }
        else {
            battleLog.innerHTML += hero.name + " не влучив." + "</br>";
        }
        endHeroTurn()
    }

    function endHeroTurn() {
        document.getElementById(heroParty[0].name).className = "hero_miniature";
        for (i = 0; i < enemies.length; i++) {
            if (document.getElementById(enemies === undefined) {
                alert("The battle is won!");
            }
            document.getElementById(enemies[i].id).className = "enemy_miniature";
            document.getElementById(enemies[i].id).removeEventListener("click", heroHits, false);
        }
        changeInitOrder(heroParty);
        enemyTurn();
    }

    function endEnemyTurn() {
        changeInitOrder(enemies);
        heroTurn();
    }

    function changeInitOrder(arrayName) {
        arrayName.push(arrayName.shift());
    }

    function enemyTurn() {
        enemyAPs = locationName.encounter1.enemies1Name.move;
//        alert("Current enemy: " + enemies[0].id);
        // are there adjacent heroes?
        if (heroNear() === true) {
            // attack random adjacent hero
            attackRandomHero()
        }
        else {
            // find the shortest path
            var shortestPath = findPath();
//            alert("Shortest path length: " + shortestPath.length);
//            alert("Shortest path[0] coords: " + shortestPath[0].coordTop + ' ' + shortestPath[0].coordLeft);
//            alert("Shortest path[1] coords: " + shortestPath[1].coordTop + ' ' + shortestPath[1].coordLeft);
//            alert("Shortest path[2] coords: " + shortestPath[2].coordTop + ' ' + shortestPath[2].coordLeft);
//            alert("Shortest path[3] coords: " + shortestPath[3].coordTop + ' ' + shortestPath[3].coordLeft);
            while (enemyAPs > 0) {
                for (var j = shortestPath.length - 1; j >= 0; j--) {
                    if (heroNear() === true) {
//                        alert("Attacking!");
                        enemyAPs = 0;
                        return attackRandomHero();
                    }
//                    alert("APs left: " + enemyAPs);
                    enemyAPs--;
//                    alert("j: " + j);
                    $("#" + enemies[0].id).offset({top: (shortestPath[j].coordTop), left: shortestPath[j].coordLeft});
//                    alert("Continuing...");
                }
            }
        }
        endEnemyTurn();
    }

    function findPath() {
        // create array with all paths
        var allPaths = [];
        for (var j = 0; j < heroParty.length; j++) {
            allPaths.push(preparePathfinding(heroParty[j]));
        }
//        alert("All paths found!");
        // sort this array with the shortest path first
        allPaths.sort(function (a, b) {
            if (a.length < b.length) {
                return -1;
            }
            if (a.length > b.length) {
                return 1;
            }
            return 0;
        });
        // return the shortest path
        return allPaths[0];
    }

    function preparePathfinding(hero) {
        // declarations
        var heroCoords = document.getElementById(hero.name).getBoundingClientRect();
        var blockedTerrain = [];
        var openList = [];
        var closedList = [];
        var startCellCoord;
        var currentCell;
        var allCoordEnemy;
        var allCoordHero;
        // initial setting
        startCellCoord = document.getElementById(enemies[0].id).getBoundingClientRect();
        openList.push({coordTop: startCellCoord.top, coordLeft: startCellCoord.left, g: 0, h: 0, f: 0});
        currentCell = {coordTop: startCellCoord.top, coordLeft: startCellCoord.left, g: 0, h: 0, f: 0};
        // populate blockedTerrain
        for (i = 1; i < enemies.length; i++) {
            allCoordEnemy = document.getElementById(enemies[i].id).getBoundingClientRect();
            blockedTerrain.push({coordTop: allCoordEnemy.top, coordLeft: allCoordEnemy.left});
//            alert("blockedTerrain length: " + blockedTerrain.length);
        }
//        alert("blockedTerrain length: " + blockedTerrain.length);
        for (i = 0; i < heroParty.length; i++) {
            allCoordHero = document.getElementById(heroParty[i].name).getBoundingClientRect();
            blockedTerrain.push({coordTop: allCoordHero.top, coordLeft: allCoordHero.left});
        }
//        alert("blockedTerrain length: " + blockedTerrain.length);
        // main action
        return checkCurrentCell(blockedTerrain, openList, closedList, currentCell, heroCoords);
    }

    function checkCurrentCell(blockedTerrain, openList, closedList, currentCell, heroCoords) {
        // move currentCell from openList into closedList
        closedList.push(openList.shift());
        // check adjacent cells and populate openList
        var path = [];
        while (path.length === 0) {
            checkCell(path, blockedTerrain, openList, closedList, currentCell, heroCoords, currentCell.coordTop + 20, currentCell.coordLeft);
            checkCell(path, blockedTerrain, openList, closedList, currentCell, heroCoords, currentCell.coordTop - 20, currentCell.coordLeft);
            checkCell(path, blockedTerrain, openList, closedList, currentCell, heroCoords, currentCell.coordTop, currentCell.coordLeft + 20);
            checkCell(path, blockedTerrain, openList, closedList, currentCell, heroCoords, currentCell.coordTop, currentCell.coordLeft - 20);
            // sort openList (item with lowest F comes first)
            closedList.push(openList.shift());
            openList.sort(function (a, b) {
                if (a.f < b.f) {
                    return -1;
                }
                if (a.f > b.f) {
                    return 1;
                }
                return 0;
            });
            // set new currentCell
            currentCell = openList[0];
        }
        return path;
    }

    function checkCell(path, blockedTerrain, openList, closedList, currentCell, heroCoords, topCoord, leftCoord) {
        if (heroCoords.top === topCoord && heroCoords.left === leftCoord) {
//            alert("Hero reached!");
            setPath(path, currentCell);
            return;
        }
        var isBlocked = checkList(blockedTerrain, topCoord, leftCoord);
        if (isBlocked === true) {
//            alert("Blocked cell located");
            return;
        }
        var isClosed = checkList(closedList, topCoord, leftCoord);
        if (isClosed === true) {
//            alert("Closed cell located");
            return;
        }
//        alert("Preparing to check openList");
        checkOpenList(currentCell, heroCoords, openList, topCoord, leftCoord);
    }

    function setPath(path, currentCell) {
        path.push(currentCell);
        while (currentCell.parent) {
            path.push(currentCell.parent);
            currentCell = currentCell.parent;
        }
    }

    function checkList(list, topCoord, leftCoord) {
        for (i = 0; i < list.length; i++) {
            if (list[i].coordTop === topCoord
                && list[i].coordLeft === leftCoord) {
                return true;
            }
        }
        return false;
    }

    function checkOpenList(currentCell, heroCoords, openList, checkCellTop, checkCellLeft) {
        for (i = 0; i < openList.length; i++) {
            if (openList[i].coordTop === checkCellTop
                && openList[i].coordLeft === checkCellLeft) {
//                alert("Cell already in openList");
                if (openList[i].g > currentCell.g + 20) {
                    openList[i].g = currentCell.g + 20;
                    openList[i].parent = currentCell;
                    return;
                }
                return;
            }
        }
//        alert("Going to add a new open cell");
        openList.push({
            coordTop: checkCellTop,
            coordLeft: checkCellLeft,
            parent: currentCell,
            g: currentCell.g + 20,
            h: calculateH(checkCellTop, checkCellLeft, heroCoords.top, heroCoords.left),
            f: this.g + this.h
        });
        openList[openList.length-1].f = openList[openList.length-1].g + openList[openList.length-1].h;
//        alert("New cell G: " + openList[openList.length-1].g);
//        alert("New cell H: " + openList[openList.length-1].h);
//        alert("New cell F: " + openList[openList.length-1].f);
//        alert("openList got bigger: " + openList.length);
//        alert("openList has a new cell: " + openList[0].coordTop + " " + openList[0].coordLeft);
    }

    function calculateH(startTopCoord, startLeftCoord, endTopCoord, endLeftCoord) {
        return Math.abs(startTopCoord - endTopCoord) + Math.abs(startLeftCoord - endLeftCoord)
    }


//////////////////////////////////////

    // enemy turn - are there any adjacent heroes?
    function heroNear() {
        enemyLocation = document.getElementById(enemies[0].id).getBoundingClientRect();
        for (i = 0; i < heroParty.length; i++) {
            heroLocation = document.getElementById(heroParty[i].name).getBoundingClientRect();
            if (enemyLocation.top == heroLocation.top + 20 && enemyLocation.left == heroLocation.left ||
                enemyLocation.top == heroLocation.top - 20 && enemyLocation.left == heroLocation.left ||
                enemyLocation.left == heroLocation.left + 20 && enemyLocation.top == heroLocation.top ||
                enemyLocation.left == heroLocation.left - 20 && enemyLocation.top == heroLocation.top) {
//                alert("Adjacent hero found!");
                adjacentHeroes.push(i);
//                alert("Adjacent hero name: " + heroParty[i].name);
            }
        }
//        alert("Adjacent heroes nr: " + adjacentHeroes.length);
        return adjacentHeroes.length >= 1;
    }

    // enemy turn - attack random adjacent hero
    function attackRandomHero() {
        var randomHero;
        var enemyAttackRoll;
        var enemyDamage;
        if (adjacentHeroes.length > 1) {
            randomHero = (Math.floor((Math.random() * (adjacentHeroes.length + 1)) + 1)) - 1;
        } else {
            randomHero = 0;
        }
        enemyAttackRoll = enemyName.tohit + rolls.d20();
        battleLog.innerHTML += enemyName.name + " атакує. Атака: " + enemyAttackRoll + "</br>";
        if (enemyAttackRoll >= heroParty[adjacentHeroes[randomHero]].ac) {
            enemyDamage = enemyName.damage();
            heroParty[adjacentHeroes[randomHero]].hp -= enemyDamage;
            battleLog.innerHTML += enemyName.name + " влучив." + "</br>";
            battleLog.innerHTML += heroParty[adjacentHeroes[randomHero]].name + " втратив " + enemyDamage + " здоров'я. Залишлиося: " + heroParty[adjacentHeroes[randomHero]].hp + "</br>";
        }
        else {
            battleLog.innerHTML += enemyName.name + " не влучив." + "</br>";
        }
//        alert("Turn ended!");
        adjacentHeroes = [];
        endEnemyTurn();
    }

    // find details(hp, ac) of a particular enemy from his/her id property
    function findEnemy(enemy_id) {
        var look = {};
        for (i = 0; i < enemies.length; i++) {
            look[enemies[i].id] = enemies[i];
        }
        return look[enemy_id]
    }

    function findEnemyIndex(enemy_id) {
        for (i = 0; i < enemies.length; i++) {
            if (enemies[i].id === enemy_id) {
                return i;
            }
        }
    }


    //+++ untested & uncleared
    function heroMove(miniature, hero) {
        heroAPs = hero.move;
        document.getElementById("movement_counter").innerHTML = "Очки ходу: " + heroAPs;
        miniatureWaiting(miniature, battleFieldCoords);
        availableCells(miniature, battleFieldCoords, hero, heroAPs);
    }
}