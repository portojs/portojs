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
    var openList = [{f: 0},{f:10},{f:20},{f:15},{f:28},{f:5}];
    openList.sort(function (a, b) {
        if (a.f < b.f) {
            return -1;
        }
        if (a.f > b.f) {
            return 1;
        }
        return 0;
    });
    alert(openList[5].f);
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
    var findHero = [];
    var adjacentHeroes = [];
    var closestHero;
    var enemyAPs = locationName.encounter1.enemies1Name.move;
    var closestHeroLocation;
    var enemyOffset;
    var enemyIdJq;

    var currentHero;
    var heroInitList = [];
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
        if (heroAttackRoll >= enemyName.ac) {
            var enemyFind = findEnemy(enemyId);
            var heroHit = hero.damage;
            enemyFind.hp = enemyFind.hp - heroHit;
            battleLog.innerHTML += hero.name + " влучив." + "</br>";
            battleLog.innerHTML += enemyName.name + " втратив " + heroHit + " здоров'я. Залишлиося: " + enemyFind.hp + "</br>";
        }
        else {
            battleLog.innerHTML += hero.name + " не влучив." + "</br>";
        }
        endHeroTurn()
    }

    function endHeroTurn() {
        document.getElementById(heroParty[0].name).className = "hero_miniature";
        for (i = 0; i < enemies.length; i++) {
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
        pathFinding(heroParty[0]);
        alert("Current enemy: " + enemies[0].id);
        // are there adjacent heroes?
        if (heroNear() == true) {
            // attack random adjacent hero
            attackRandomHero()
        }
        else {
            // taking coordinates of all heroes
            findHero = [];
            enemyLocation = document.getElementById(enemies[0].id).getBoundingClientRect();
            for (i = 0; i < heroParty.length; i++) {
                heroLocation = document.getElementById(heroParty[i].name).getBoundingClientRect();
                findHero.push({
                    coord: Math.abs((heroLocation.top - enemyLocation.top)) + Math.abs((heroLocation.left - enemyLocation.left)),
                    name: heroParty[i].name
                });
            }
            // sorting heroes by nearness
            findHero.sort(function (a, b) {
                return a.coord - b.coord;
            });
            closestHero = findHero[0];
            closestHeroLocation = document.getElementById(closestHero.name).getBoundingClientRect();
            enemyIdJq = $("#" + enemies[0].id);
            enemyAPs = locationName.encounter1.enemies1Name.move;
            while (enemyAPs > 0) {
                alert("APs left: " + enemyAPs);
                enemyAPs--;
                enemyOffset = enemyIdJq.offset();
                if (heroNear() == true) {
                    alert("Attacking!");
                    enemyAPs = 0;
                    attackRandomHero();
                }
                else if (enemyLocation.top > closestHeroLocation.top) {
                    alert("Moving up");
                    enemyIdJq.offset({top: (enemyOffset.top - 20), left: enemyOffset.left});
                }
                else if (enemyLocation.top < closestHeroLocation.top) {
                    alert("Moving down");
                    enemyIdJq.offset({top: (enemyOffset.top + 20), left: enemyOffset.left});
                }
                else if (enemyLocation.left > closestHeroLocation.left) {
                    alert("Moving left - hero:" + closestHeroLocation.top + " " + closestHeroLocation.left + "</br>enemy: " + enemyOffset.top + " " + enemyOffset.left);
                    enemyIdJq.offset({top: enemyOffset.top, left: (enemyOffset.left - 20)});
                }
                else {
                    alert("Moving right");
                    enemyIdJq.offset({top: enemyOffset.top, left: (enemyOffset.left + 20)});
                }
            }
            endEnemyTurn();
        }
    }

    function preparePathfinding(hero) {
        // declarations
        var heroCoords = document.getElementById(hero.name).getBoundingClientRect();
        var blockedTerrain = [];
        var openList = [];
        var closedList = [];
        var startCellCoord;
        var currentCell;
        var allCoord;
        // initial setting
        startCellCoord = document.getElementById(enemies[0].id).getBoundingClientRect();
        openList.push({coordTop: startCellCoord.top, coordLeft: startCellCoord.left, g: 0, h: 0, f: 0});
        currentCell = {coordTop: startCellCoord.top, coordLeft: startCellCoord.left, g: 0, h: 0, f: 0};
        // populate blockedTerrain
        for (i = 1; i < enemies.length; i++) {
            allCoord = document.getElementById(enemies[i].id).getBoundingClientRect();
            blockedTerrain.push({coordTop: allCoord.top, coordLeft: allCoord.left});
        }
        for (i = 0; i < heroParty.length; i++) {
            allCoord = document.getElementById(heroParty[i].name).getBoundingClientRect();
            blockedTerrain.push({coordTop: allCoord.top, coordLeft: allCoord.left});
        }
        // main action
        checkCurrentCell(blockedTerrain, openList, closedList, currentCell, heroCoords);
    }

    function checkCurrentCell(blockedTerrain, openList, closedList, currentCell, heroCoords) {
        // move currentCell from openList into closedList
        closedList.push(openList.shift());
        // check adjacent cells and populate openList
        var path = [];
        while (!path) {
            checkCell(path, blockedTerrain, openList, closedList, currentCell, heroCoords, currentCell.top + 20, currentCell.left);
            checkCell(path, blockedTerrain, openList, closedList, currentCell, heroCoords, currentCell.top - 20, currentCell.left);
            checkCell(path, blockedTerrain, openList, closedList, currentCell, heroCoords, currentCell.top, currentCell.left + 20);
            checkCell(path, blockedTerrain, openList, closedList, currentCell, heroCoords, currentCell.top, currentCell.left - 20);
            // sort openList (item with lowest F comes first)
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
            path = setPath(currentCell);
            return;
        }
        var isBlocked = checkList(blockedTerrain, topCoord, leftCoord);
        if (isBlocked === true) {
            return;
        }
        var isClosed = checkList(closedList, topCoord, leftCoord);
        if (isClosed === true) {
            return;
        }
        checkOpenList(currentCell, heroCoords, openList, topCoord, leftCoord);
    }

    function setPath(currentCell) {
        var path = [];
        while (currentCell.parent) {
            path.push(currentCell.parent);
            currentCell = currentCell.parent;
        }
        return path;
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
                if (openList[i].g > currentCell.g + 20) {
                    openList[i].g = currentCell.g + 20;
                    openList[i].parent = currentCell;
                    return;
                }
                return;
            }
        }
        openList.push({
            coordTop: checkCellTop,
            coordLeft: checkCellLeft,
            parent: currentCell,
            g: currentCell.g + 20,
            h: calculateH(checkCellTop, checkCellLeft, heroCoords.top, heroCoords.left),
            f: this.g + this.h
        })
    }

    function calculateH(startTopCoord, startLeftCoord, endTopCoord, endLeftCoord) {
        return Math.abs(startTopCoord - endTopCoord) + Math.abs(startLeftCoord - endLeftCoord)
    }

    function findPath() {
        var allPaths = [];
        for (i = 0; i < heroParty.length; i++) {
            allPaths.push(preparePathfinding(heroParty[i]));
        }
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
                alert("Adjacent hero found!");
                adjacentHeroes.push(i);
                alert("Adjacent hero name: " + heroParty[i].name);
            }
        }
        alert("Adjacent heroes nr: " + adjacentHeroes.length);
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
        alert("Turn ended!");
        adjacentHeroes = [];
        endEnemyTurn();
    }

    // find array index of a particular enemy from his/her id property
    function findEnemy(enemy_id) {
        var look = {};
        for (i = 0; i < enemies.length; i++) {
            look[enemies[i].id] = enemies[i];
        }
        return look[enemy_id]
    }

    //+++ untested & uncleared
    function heroMove(miniature, hero) {
        heroAPs = hero.move;
        document.getElementById("movement_counter").innerHTML = "Очки ходу: " + heroAPs;
        miniatureWaiting(miniature, battleFieldCoords);
        availableCells(miniature, battleFieldCoords, hero, heroAPs);
    }
}