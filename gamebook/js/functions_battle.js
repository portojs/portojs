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
        // are there adjacent heroes?
        if (heroNear() == true) {
            // attack random adjacent hero
            attackRandomHero()
        }
        else {
            var findHero = [];
            enemyLocation = document.getElementById(enemies[0].id).getBoundingClientRect();
            for (i = 0; i < heroParty.length; i++) {
                heroLocation = document.getElementById(heroParty[i].name).getBoundingClientRect();
                findHero.push({
                    coord: Math.abs((heroLocation.top - enemyLocation.top)) + Math.abs((heroLocation.left - enemyLocation.left)),
                    name: heroParty[i].name
                });
            }
            findHero.sort(function (a, b) {
                return a.coord - b.coord;
            });
            closestHero = findHero[0];
            closestHeroLocation = document.getElementById(closestHero.name).getBoundingClientRect();
            enemyIdJq = $("#" + enemies[0].id);
            enemyOffset = enemyIdJq.offset();
            while (enemyAPs > 0) {
                //// ATTENTION!!!!! = this code crashes computer
                enemyAPs = enemyAPs - 1;
                if (heroNear() == true) {
                    attackRandomHero();
                    break;
                }
                if (enemyLocation.top > closestHeroLocation.top) {
//                    alert(enemies[0].id);
                    alert(enemyOffset.top + " " + enemyOffset.left);
                    enemyIdJq.offset({top: enemyOffset.top - 20, left: enemyOffset.left});
                    continue;
                }
                if (enemyLocation.top < closestHeroLocation.top) {
//                    alert(enemies[0].id);
                    alert(enemyOffset.top + " " + enemyOffset.left);
                    enemyIdJq.offset({top: enemyOffset.top + 20, left: enemyOffset.left});
                    continue;
                }
                if (enemyLocation.left > closestHeroLocation.left) {
//                    alert(enemies[0].id);
                    alert(enemyOffset.top + " " + enemyOffset.left);
                    enemyIdJq.offset({top: enemyOffset.top, left: enemyOffset.left - 20});
                    continue;
                }
                if (enemyLocation.left < closestHeroLocation.left) {
//                    alert(enemies[0].id);
                    alert(enemyOffset.top + " " + enemyOffset.left);
                    enemyIdJq.offset({top: enemyOffset.top, left: enemyOffset.left + 20});
                }
            }
            enemyAPs = locationName.encounter1.enemies1Name.move;
//            alert(closestHero.name + " + " + enemies[0].id);
            endEnemyTurn();
        }
    }

    // enemy turn - are there any adjacent heroes?
    function heroNear() {
        enemyLocation = document.getElementById(enemies[0].id).getBoundingClientRect();
        for (i = 0; i < heroParty.length; i++) {
            heroLocation = document.getElementById(heroParty[i].name).getBoundingClientRect();
            if (enemyLocation.top == heroLocation.top + 20 && enemyLocation.left == heroLocation.left ||
                enemyLocation.top == heroLocation.top - 20 && enemyLocation.left == heroLocation.left ||
                enemyLocation.left == heroLocation.left + 20 && enemyLocation.top == heroLocation.top ||
                enemyLocation.left == heroLocation.left - 20 && enemyLocation.top == heroLocation.top) {
                adjacentHeroes.push = heroParty[i].name;
            }
        }
        return adjacentHeroes.length >= 1;
    }

    // enemy turn - attack random adjacent hero
    function attackRandomHero() {
        var randomHero;
        var enemyAttackRoll;
        var enemyDamage;
        randomHero = (Math.floor((Math.random() * (adjacentHeroes.length + 1)) + 1)) - 1;
        enemyAttackRoll = enemyName.tohit + rolls.d20();
        battleLog.innerHTML += enemyName.name + " атакує. Атака: " + enemyAttackRoll + "</br>";
        if (enemyAttackRoll >= heroParty[randomHero].ac) {
            enemyDamage = enemyName.damage();
            heroParty[randomHero].hp = heroParty[randomHero].hp - enemyDamage;
            battleLog.innerHTML += enemyName.name + " влучив." + "</br>";
            battleLog.innerHTML += heroParty[randomHero].name + " втратив " + enemyDamage + " здоров'я. Залишлиося: " + heroParty[randomHero].hp + "</br>";
        }
        else {
            battleLog.innerHTML += enemyName.name + " не влучив." + "</br>";
        }
        endEnemyTurn();
    }

    // define array index of a particular enemy from his/her id property
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