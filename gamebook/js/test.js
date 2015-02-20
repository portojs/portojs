/*** Created by Peter on 02.02.2015.*/

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
    $("#" + miniature).offset({top: battleFieldCoords.top, left: battleFieldCoords.left});
    setInterval(function(){
        document.getElementById(miniature).style.opacity == 0.2 ?
            document.getElementById(miniature).style.opacity = 1.0 :
            document.getElementById(miniature).style.opacity = 0.2;
    }, 500);
}

function availableCells(miniature, battleFieldCoords, character, characterAPs) {
    var movementCell;
    var charCoords = $("#" + miniature).offset();
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
        tempCells(charCoords, battleFieldCoords, characterAPs);
    }
    else {
        document.getElementById("movement_counter").innerHTML = "Очки ходу: ЗАКІНЧИЛИСЯ";
    }
}

function tempCells (charCoords, battleFieldCoords, characterAPs) {
    var i;
    var j;
    var xLeft;
    var xRight;
    var yUp;
    var yDown;
    var tempCell;
    var counter;
    /*
    alert("Miniature TOP: " + charCoords.top + "/n" + "Miniature LEFT: " +
    charCoords.left + "/n" + "Box TOP: " + battleFieldCoords.top + "/n" +
    "Box LEFT: " + battleFieldCoords.left);
    */
    xLeft = (charCoords.left - battleFieldCoords.left) / 20 - 1;
    xRight = ((battleFieldCoords.left + 440) - charCoords.left) / 20 - 1;
    yUp = (charCoords.top - battleFieldCoords.top) / 20 - 1;
    yDown = ((battleFieldCoords.top + 220) - charCoords.top) / 20 - 1;
//    alert(xLeft + "," + xRight + "," + yUp + "," + yDown);
    if (characterAPs > xLeft && xLeft > 0) {
        counter = 20;
        for (j = xLeft; j > 0; j--) {
            tempCell = document.createElement("DIV");
            tempCell.setAttribute("class", "temp_cell");
            tempCell.setAttribute("id", "temp_cell_1");
            document.getElementById("battle_field").appendChild(tempCell);
            counter += 20;
            $("#temp_cell_1")
                .offset({top: (charCoords.top), left: (charCoords.left - counter)});
            document.getElementById("temp_cell_1").removeAttribute("id");
        }
    }
    else if (characterAPs > 1 && xLeft > 0) {
        counter = 20;
        for (j = characterAPs; j > 0; j--) {
            tempCell = document.createElement("DIV");
            tempCell.setAttribute("class", "temp_cell");
            tempCell.setAttribute("id", "temp_cell_1");
            document.getElementById("battle_field").appendChild(tempCell);
            counter += 20;
            $("#temp_cell_1")
                .offset({top: (charCoords.top), left: (charCoords.left - counter)});
            document.getElementById("temp_cell_1").removeAttribute("id");
        }
    }
    if (characterAPs > xRight && xRight > 0) {
        counter = 20;
        for (j = xRight; j > 0; j--) {
            tempCell = document.createElement("DIV");
            tempCell.setAttribute("class", "temp_cell");
            tempCell.setAttribute("id", "temp_cell_1");
            document.getElementById("battle_field").appendChild(tempCell);
            counter += 20;
            $("#temp_cell_1")
                .offset({top: (charCoords.top), left: (charCoords.left + counter)});
            document.getElementById("temp_cell_1").removeAttribute("id");
        }
    }
    else if (characterAPs > 1 && xRight > 0) {
        counter = 20;
        for (j = characterAPs; j > 0; j--) {
            tempCell = document.createElement("DIV");
            tempCell.setAttribute("class", "temp_cell");
            tempCell.setAttribute("id", "temp_cell_1");
            document.getElementById("battle_field").appendChild(tempCell);
            counter += 20;
            $("#temp_cell_1")
                .offset({top: (charCoords.top), left: (charCoords.left + counter)});
            document.getElementById("temp_cell_1").removeAttribute("id");
        }
    }
}

function heroAttack(enemy, locationName) {
    $("#popup3").show();
    var heroMiniature;
    var listItem;
    var listItemText;
    var battleCommands = document.getElementById("battle_commands");
    while (battleCommands.hasChildNodes()) {
        battleCommands.removeChild(battleCommands.childNodes[0]);
    }
    heroMiniature = document.createElement("DIV");
    heroMiniature.setAttribute("id", "hero_miniature");
    document.getElementById("battle_field").appendChild(heroMiniature);
    listItem = document.createElement("LI");
    listItem.onclick = function() {heroMove("hero_miniature", hero)};
    listItemText = document.createTextNode("Іти");
    listItem.appendChild(listItemText);
    battleCommands.appendChild(listItem);
    listItem = document.createElement("LI");
    listItem.onclick = function() {heroAttackTest(hero, enemy, locationName)};
    listItemText = document.createTextNode("Атакувати");
    listItem.appendChild(listItemText);
    battleCommands.appendChild(listItem);
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