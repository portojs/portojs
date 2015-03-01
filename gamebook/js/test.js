/*** Created by Peter on 02.02.2015.*/

function battleMain() {

// list of vars
    var hero;
    var heroCoord;
    var heroAPs;
    var heroMiniature;
    var enemyCoord;
    var enemyMiniature;
    var battleFieldCoords;
    var battleCommands;
    var listItem;
    var listItemText;
    var command1 = heroMove("hero_miniature", hero);

// main body
    $("#popup3").show();
    showCommandsStart();

// list of functions
    function showCommandsStart() {
        battleCommands = document.getElementById("battle_commands");
        while (battleCommands.hasChildNodes()) {
            battleCommands.removeChild(battleCommands.childNodes[0]);
        }
        addCommand(battleCommands, command1, "Іти");
    }
    function addCommand (where, command, commandName) {
        listItem = document.createElement("LI");
        listItem.onclick = function() {command};
        listItemText = document.createTextNode(commandName);
        listItem.appendChild(listItemText);
        where.appendChild(listItem);
    }
}

function heroMove(miniature, character) {
    var characterAPs = character.move;
    document.getElementById("movement_counter").innerHTML = "Очки ходу: " + characterAPs;
    var battleFieldCoords = $("#battle_field").offset();
    miniatureWaiting(miniature, battleFieldCoords);
    availableCells(miniature, battleFieldCoords, character, characterAPs);
}

function moveAction(miniature, currCoords, battleFieldCoords, character, characterAPs) {
    while (document.getElementById("battle_field").hasChildNodes()) {
        document.getElementById("battle_field").removeChild(document.getElementById("battle_field").childNodes[0]);
    }
    var heroMiniature;
    heroMiniature = document.createElement("DIV");
    heroMiniature.setAttribute("id", "hero_miniature");
    document.getElementById("battle_field").appendChild(heroMiniature);
    $("#" + miniature).offset({top: currCoords.top, left: currCoords.left});
    characterAPs--;
    document.getElementById("movement_counter").innerHTML = "Очки ходу: " + characterAPs;
    availableCells(miniature, battleFieldCoords, character, characterAPs);
}

function miniatureWaiting(miniature, battleFieldCoords) {
    $("#" + miniature).offset({top: battleFieldCoords.top, left: (battleFieldCoords.left + 60)});
    setInterval(function(){
        document.getElementById(miniature).style.opacity == 0.2 ?
            document.getElementById(miniature).style.opacity = 1.0 :
            document.getElementById(miniature).style.opacity = 0.2;
    }, 500);
}

function availableCells(miniature, battleFieldCoords, character, characterAPs) {
    var movementCell;
    var charCoords = $("#" + miniature).offset();
    tempCells(charCoords, battleFieldCoords, characterAPs);
    if (characterAPs > 0) {
        // movement UP
        if (charCoords.top !== (battleFieldCoords.top)) {
            movementCell = document.createElement("DIV");
            movementCell.setAttribute("id", "movement_cell_1");
            movementCell.setAttribute("class", "movement_cell");
            document.getElementById("battle_field").appendChild(movementCell);
            $("#movement_cell_1")
                .offset({top: (charCoords.top - 20), left: charCoords.left})
                .on("click", function () {
                    moveAction(miniature, $("#movement_cell_1").offset(), battleFieldCoords, character, characterAPs);
                });
        }
        // movement LEFT
        if (charCoords.left !== (battleFieldCoords.left)) {
            movementCell = document.createElement("DIV");
            movementCell.setAttribute("id", "movement_cell_2");
            movementCell.setAttribute("class", "movement_cell");
            document.getElementById("battle_field").appendChild(movementCell);
            $("#movement_cell_2")
                .offset({top: charCoords.top, left: (charCoords.left - 20)})
                .on("click", function () {
                    moveAction(miniature, $("#movement_cell_2").offset(), battleFieldCoords, character, characterAPs);
                });
        }
        // movement DOWN
        if (charCoords.top !== (battleFieldCoords.top + 220)) {
            movementCell = document.createElement("DIV");
            movementCell.setAttribute("id", "movement_cell_3");
            movementCell.setAttribute("class", "movement_cell");
            document.getElementById("battle_field").appendChild(movementCell);
            $("#movement_cell_3")
                .offset({top: (charCoords.top + 20), left: charCoords.left})
                .on("click", function () {
                    moveAction(miniature, $("#movement_cell_3").offset(), battleFieldCoords, character, characterAPs);
                });
        }
        // movement RIGHT
        if (charCoords.left !== (battleFieldCoords.left + 440)) {
            movementCell = document.createElement("DIV");
            movementCell.setAttribute("id", "movement_cell_4");
            movementCell.setAttribute("class", "movement_cell");
            document.getElementById("battle_field").appendChild(movementCell);
            $("#movement_cell_4")
                .offset({top: charCoords.top, left: (charCoords.left + 20)})
                .on("click", function () {
                    moveAction(miniature, $("#movement_cell_4").offset(), battleFieldCoords, character, characterAPs);
                });
        }
    }
    else {
        document.getElementById("movement_counter").innerHTML = "Очки ходу: ЗАКІНЧИЛИСЯ";
        enemyTurn();
    }
}

function tempCells (charCoords, battleFieldCoords, characterAPs) {
    var i;
    var tempCell;
    var counter;
    var offsetVal;
    var offsetTop;
    var lineWidth;
    var lineWidthFinal;
    function check(tempCellCoords, lineWidth, battleFieldCoords) {
        if (tempCellCoords.top < battleFieldCoords.top ||
            tempCellCoords.top > battleFieldCoords.top + 220) {
            document.getElementById("battle_field").removeChild(document.getElementById("temp_cell_1"));
        }
        if (tempCellCoords.left < battleFieldCoords.left) {
            lineWidthFinal = lineWidth - (battleFieldCoords.left - tempCellCoords.left);
            $("#temp_cell_1").offset({left: battleFieldCoords.left});
            $("#temp_cell_1").width(lineWidthFinal);
            lineWidthFinal = 0;
        }
        if ((tempCellCoords.left + lineWidth) > (battleFieldCoords.left + 440)) {
            lineWidthFinal = (tempCellCoords.left + lineWidth) - (battleFieldCoords.left + 440);
            $("#temp_cell_1").width(lineWidthFinal);
            lineWidthFinal = 0;
        }
        if (tempCellCoords.left >= battleFieldCoords.left ||
            (tempCellCoords.left + lineWidth) > (battleFieldCoords.left + 440)) {
            $("#temp_cell_1").width(lineWidth);
        }
        if (document.getElementById("temp_cell_1")) {
            document.getElementById("temp_cell_1").removeAttribute("id");
    }
}
    function drawLinesUp(innerCounter, innerOffsetVal, innerOffsetTop) {
            lineWidth = (((characterAPs * 2) - innerOffsetVal) * 20);
            tempCell = document.createElement("DIV");
            tempCell.setAttribute("class", "temp_cell");
            tempCell.setAttribute("id", "temp_cell_1");
            document.getElementById("battle_field").appendChild(tempCell);
            $("#temp_cell_1").offset({
                top: (charCoords.top - innerOffsetTop),
                left: ((charCoords.left - ((characterAPs * 20) - innerCounter)))
            });
            check ($("#temp_cell_1").offset(), lineWidth, battleFieldCoords);
    }
    function drawLinesDown(innerCounter, innerOffsetVal, innerOffsetTop) {
        lineWidth = (((characterAPs * 2) - innerOffsetVal) * 20);
        tempCell = document.createElement("DIV");
        tempCell.setAttribute("class", "temp_cell");
        tempCell.setAttribute("id", "temp_cell_1");
        document.getElementById("battle_field").appendChild(tempCell);
        $("#temp_cell_1").offset({
            top: (charCoords.top + innerOffsetTop),
            left: ((charCoords.left - ((characterAPs * 20) - innerCounter)))
        });
        check ($("#temp_cell_1").offset(), lineWidth, battleFieldCoords);
    }
    function drawLineCenter() {
        lineWidth = (((characterAPs * 2) + 1) * 20);
        tempCell = document.createElement("DIV");
        tempCell.setAttribute("class", "temp_cell");
        tempCell.setAttribute("id", "temp_cell_1");
        document.getElementById("battle_field").appendChild(tempCell);
        $("#temp_cell_1").offset({
            top: charCoords.top,
            left: ((charCoords.left - (characterAPs * 20)))
        });
        check ($("#temp_cell_1").offset(), lineWidth, battleFieldCoords);
    }
    if (characterAPs > 1) {
        var checkFlag = true;
        counter = 20;
        offsetVal = 1;
        offsetTop = 20;
        for (i = 1; i < (characterAPs + 1); i++) {
            if (checkFlag) {
                drawLineCenter();
                checkFlag = false;
            }
            drawLinesUp(counter, offsetVal, offsetTop);
            drawLinesDown(counter, offsetVal, offsetTop);
            counter += 20;
            offsetVal += 2;
            offsetTop += 20;
        }
    }
}

function heroAttack(enemy, locationName) {
    $("#popup3").show();
    var heroMiniature;
    var enemyMiniature;
    var listItem;
    var listItemText;
    var command1 = function() {heroMove('hero_miniature', hero)};
    var battleCommands = document.getElementById("battle_commands");
    while (battleCommands.hasChildNodes()) {
        battleCommands.removeChild(battleCommands.childNodes[0]);
    }
    heroMiniature = document.createElement("DIV");
    heroMiniature.setAttribute("id", "hero_miniature");
    document.getElementById("battle_field").appendChild(heroMiniature);
    enemyMiniature = document.createElement("DIV");
    enemyMiniature.setAttribute("id", "enemy_miniature");
    document.getElementById("battle_field").appendChild(enemyMiniature);
    listItem = document.createElement("LI");
    listItem.onclick = command1;
    listItemText = document.createTextNode("Іти");
    listItem.appendChild(listItemText);
    battleCommands.appendChild(listItem);
    listItem = document.createElement("LI");
    listItem.onclick = function() {heroAttackTest(hero, enemy, locationName)};
    listItemText = document.createTextNode("Атакувати");
    listItem.appendChild(listItemText);
    battleCommands.appendChild(listItem);
}

function enemyTurn() {

}

function lootEnemy() {
    var i;
    while (document.getElementById('loot_items_list').hasChildNodes()) {
        document.getElementById('loot_items_list').removeChild(document.getElementById('loot_items_list').firstChild);
    }
    for (i = 0; i < currentContainer.inventory2.length; i++) {
        var listItem = document.createElement("LI");
        var listItemText = document.createTextNode(currentContainer.inventory2[i].quantity + " " + currentContainer.inventory2[i].name);
        listItem.onclick = function() {take(this.innerHTML)};
        listItem.appendChild(listItemText);
        document.getElementById('loot_items_list').appendChild(listItem);
    }
}

function heroAttackTest(heroA, enemy, locationName) {
    var lootCommands;
    var listItem;
    var listItemText;
    var attackerAttackRoll = rolls.d20();
    var attackerTotalAtRoll = attackerAttackRoll + heroA.tohit;
    var attackerDamage;
    var finalDamage;
    var defenderHP = enemy.hp;
    currentContainer = enemy;
    currentLocation = locationName;
    var eventLog = document.getElementById("battle_log");
    eventLog.innerHTML = heroA.name + " атакує: " + attackerTotalAtRoll + "<br>";
    document.getElementById("enemy_hp").style.visibility = "visible";
    document.getElementById("hero_hp").style.visibility = "visible";
    if (attackerAttackRoll == 0) {
        eventLog.innerHTML += "Значний промах" + "<br>";
        enemyAttack(enemy, heroA);
    }
    else if (attackerTotalAtRoll >= enemy.ac) {
        attackerDamage = heroA.weapon.damage() + 3;
        eventLog.innerHTML += "Пошкодження: " + attackerDamage + "<br>";
        if (critical(heroA, attackerAttackRoll) == true) {
            finalDamage = attackerDamage * 2;
            eventLog.innerHTML += "Вдалий удар!" + "<br>";
            eventLog.innerHTML += "Загальні пошкодження: " + finalDamage + "<br>";
            defenderHP -= finalDamage;
            eventLog.innerHTML += enemy.name + " здоров'я залишилось: " + defenderHP + "<br>";
            enemy.hp = defenderHP;
            if (enemy.hp <= 0) {
                enemy.alive = false;
                locationName.eventCheck1 = false;
                eventLog.innerHTML += enemy.name + " вбитий" + "<br>";
                eventLog.innerHTML += enemy.name + " переможений";
                $("#popup4").show();
                lootCommands = document.getElementById("loot_commands");
                listItem = document.createElement("LI");
                listItemText = document.createTextNode("Вихід");
                listItem.onclick = function() {exitLoot()};
                listItem.appendChild(listItemText);
                lootCommands.appendChild(listItem);
                lootEnemy();
            }
            else {
                enemyAttackTest(enemy, heroA);
            }
        }
        else {
            eventLog.innerHTML += "Загальні пошкодження: " + attackerDamage + "<br>";
            defenderHP -= attackerDamage;
            eventLog.innerHTML += enemy.name + " здоров'я залишилось: " + defenderHP + "<br>";
            enemy.hp = defenderHP;
            if (enemy.hp <= 0) {
                enemy.alive = false;
                locationName.eventCheck1 = false;
                eventLog.innerHTML += enemy.name + " вбитий" + "<br>";
                eventLog.innerHTML += enemy.name + " переможений";
                $("#popup4").show();
                lootCommands = document.getElementById("loot_commands");
                listItem = document.createElement("LI");
                listItemText = document.createTextNode("Вихід");
                listItem.onclick = function() {exitLoot()};
                listItem.appendChild(listItemText);
                lootCommands.appendChild(listItem);
                lootEnemy();            }
            else {
                enemyAttackTest(enemy, heroA);
            }
        }
    }
    else {
        eventLog.innerHTML += "Промах!" + "<br>";
        enemyAttackTest(enemy, heroA);
    }
    document.getElementById("hero_hp").innerHTML = heroA.hp;
    document.getElementById("enemy_hp").innerHTML = enemy.hp;
}

function enemyAttackTest(enemy, heroA) {
    var attackerAttackRoll = rolls.d20();
    var attackerTotalAtRoll = attackerAttackRoll + enemy.tohit;
    var attackerDamage;
    var finalDamage;
    var defenderHP = heroA.hp;
    var eventLog = document.getElementById("battle_log");
    eventLog.innerHTML += enemy.name + " атакує: " + attackerTotalAtRoll + "<br>";
    if (attackerAttackRoll == 0) {
        eventLog.innerHTML += "Значний промах" + "<br>";
    }
    else if (attackerTotalAtRoll >= heroA.ac) {
        attackerDamage = enemy.weapon.damage() + 3;
        eventLog.innerHTML += "Пошкодження: " + attackerDamage + "<br>";
        if (critical(enemy, attackerAttackRoll) == true) {
            finalDamage = attackerDamage * 2;
            eventLog.innerHTML += "Вдалий удар!" + "<br>";
            eventLog.innerHTML += "Загальні пошкодження: " + finalDamage + "<br>";
            defenderHP -= finalDamage;
            eventLog.innerHTML += heroA.name + " здоров'я залишилось: " + defenderHP + "<br>";
            heroA.hp = defenderHP;
            if (heroA.hp <= 0) {
                heroA.alive = false;
                eventLog.innerHTML += heroA.name + " вбитий" + "<br>";
            }
            else {
            }
        }
        else {
            eventLog.innerHTML += "Загальні пошкодження: " + attackerDamage + "<br>";
            defenderHP -= attackerDamage;
            eventLog.innerHTML += heroA.name + " здоров'я залишилось: " + defenderHP + "<br>";
            heroA.hp = defenderHP;
            if (heroA.hp <= 0) {
                heroA.alive = false;
                eventLog.innerHTML += heroA.name + " вбитий" + "<br>";
            }
            else {
            }
        }
    }
    else {
        eventLog.innerHTML += "Промах!" + "<br>";
    }
    document.getElementById("hero_hp").innerHTML = heroA.hp;
    document.getElementById("enemy_hp").innerHTML = enemy.hp;
}