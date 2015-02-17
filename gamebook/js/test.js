/**
 * Created by Peter on 02.02.2015.
 */
function heroMove(character) {
    miniatureWaiting(character);
    availableCells(character);
}

function moveAction(character, currentCoords) {
    alert("Alert");
    $("#" + character).offset({top: currentCoords.top, left: currentCoords.left});
}

function miniatureWaiting(character) {
    setInterval(function(){
        document.getElementById(character).style.opacity == 0.2 ?
            document.getElementById(character).style.opacity = 1.0 :
            document.getElementById(character).style.opacity = 0.2;
    }, 500);
}

function availableCells(character) {
    var offset = $("#" + character).offset();
    var movementCell;
    var offset2 = $("#battle_graphics").offset();
    if (offset.top !== (offset2.top + 20)) {
        movementCell = document.createElement("P");
        movementCell.setAttribute("id", "movement_cell_1");
        movementCell.setAttribute("class", "movement_cell");
        document.getElementById("battle_graphics").appendChild(movementCell);
        $("#movement_cell_1")
            .offset({top: (offset.top - 20), left: offset.left})
            .on("click", function() {
                moveAction(character, this.offset);
            })
    }
    if (offset.left !== (offset2.left + 20)) {
        movementCell = document.createElement("P");
        movementCell.setAttribute("id", "movement_cell_2");
        movementCell.setAttribute("class", "movement_cell");
        document.getElementById("battle_graphics").appendChild(movementCell);
        $("#movement_cell_2").offset({top: offset.top, left: (offset.left - 20)});
    }
    if (offset.top !== (offset2.top + 150)) {
        movementCell = document.createElement("P");
        movementCell.setAttribute("id", "movement_cell_3");
        movementCell.setAttribute("class", "movement_cell");
        document.getElementById("battle_graphics").appendChild(movementCell);
        $("#movement_cell_3").offset({top: (offset.top + 20), left: offset.left});
    }
    if (offset.left !== (offset2.left + 400)) {
        movementCell = document.createElement("P");
        movementCell.setAttribute("id", "movement_cell_4");
        movementCell.setAttribute("class", "movement_cell");
        document.getElementById("battle_graphics").appendChild(movementCell);
        $("#movement_cell_4").offset({top: offset.top, left: (offset.left + 20)});
    }
}

function heroAttack(enemy, locationName) {
    $("#popup3").show();
    var listItem;
    var listItemText;
    var battleCommands = document.getElementById("battle_commands");
    while (battleCommands.hasChildNodes()) {
        battleCommands.removeChild(battleCommands.childNodes[0]);
    }
    listItem = document.createElement("LI");
    listItem.onclick = function() {heroMove("hero_miniature")};
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