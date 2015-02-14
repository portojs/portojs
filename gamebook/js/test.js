/**
 * Created by Peter on 02.02.2015.
 */

function test(enemy, locationName) {
    $("#popup3").show();
    var battleCommands = document.getElementById("battle_commands");
    while (battleCommands.hasChildNodes()) {
        battleCommands.removeChild(battleCommands.childNodes[0]);
    }
    var listItem = document.createElement("LI");
    listItem.onclick = function() {heroAttackTest(hero, enemy, locationName)};
    var listItemText = document.createTextNode("Атакувати");
    listItem.appendChild(listItemText);
    battleCommands.appendChild(listItem);
}

function heroAttackTest(heroA, enemy, locationName) {
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
            eventLog.innerHTML += enemy.name + " здоров'я залишилось: " + defenderHP + "<br>;";
            enemy.hp = defenderHP;
            if (enemy.hp <= 0) {
                enemy.alive = false;
                locationName.eventCheck1 = false;
                eventLog.innerHTML += enemy.name + " вбитий" + "<br>";
                eventLog.innerHTML += enemy.name + " переможений";
                changeActionList("Обшукати,lootEnemy()", "Вихід,exitLoot()");
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
                changeActionList("Обшукати,lootEnemy()", "Вихід,exitLoot()");
            }
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