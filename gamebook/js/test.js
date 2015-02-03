/**
 * Created by Peter on 02.02.2015.
 */
function heroAttack(heroA, enemy, actions) {
    var attackerAttackRoll = rolls.d20();
    var attackerTotalAtRoll = attackerAttackRoll + heroA.tohit;
    var attackerDamage;
    var finalDamage;
    var defenderHP = enemy.hp;
    var eventLog = document.getElementById("text_area");
    var newActions = sendActions(actions);
    eventLog.innerHTML = heroA.name + " attacks: " + attackerTotalAtRoll + "&#13;";
    document.getElementById("enemy_hp").style.visibility = "visible";
    document.getElementById("hero_hp").style.visibility = "visible";
    if (attackerAttackRoll == 0) {
        eventLog.innerHTML += "Critical miss" + "&#13;";
        enemyAttack(enemy, heroA);
    }
    else if (attackerTotalAtRoll >= enemy.ac) {
        attackerDamage = heroA.weapon.damage() + 3;
        eventLog.innerHTML += "Damage: " + attackerDamage + "&#13;";
        if (critical(heroA, attackerAttackRoll) == true) {
            finalDamage = attackerDamage * 2;
            eventLog.innerHTML += "Critical hit!" + "&#13;";
            eventLog.innerHTML += "Total damage: " + finalDamage + "&#13;";
            defenderHP -= finalDamage;
            eventLog.innerHTML += enemy.name + " HP left: " + defenderHP + "&#13;";
            enemy.hp = defenderHP;
            if (enemy.hp <= 0) {
                enemy.alive = false;
                eventLog.innerHTML += enemy.name + " is killed" + "&#13;";
                eventLog.innerHTML += enemy.name + " is defeated";
                changeActionList(newActions);
            }
            else {
                enemyAttack(enemy, heroA);
            }
        }
        else {
            eventLog.innerHTML += "Total damage: " + attackerDamage + "&#13;";
            defenderHP -= attackerDamage;
            eventLog.innerHTML += enemy.name + " HP left: " + defenderHP + "&#13;";
            enemy.hp = defenderHP;
            if (enemy.hp <= 0) {
                enemy.alive = false;
                eventLog.innerHTML += enemy.name + " is killed" + "&#13;";
                eventLog.innerHTML += enemy.name + " is defeated";
                changeActionList(newActions);
            }
            else {
                enemyAttack(enemy, heroA);
            }
        }
    }
    else {
        eventLog.innerHTML += "Miss!" + "&#13;";
        enemyAttack(enemy, heroA);
    }
    document.getElementById("hero_hp").innerHTML = heroA.hp;
    document.getElementById("enemy_hp").innerHTML = enemy.hp;
}

function enemyAttack(enemy, heroA) {
    var attackerAttackRoll = rolls.d20();
    var attackerTotalAtRoll = attackerAttackRoll + enemy.tohit;
    var attackerDamage;
    var finalDamage;
    var defenderHP = heroA.hp;
    var eventLog = document.getElementById("text_area");
    eventLog.innerHTML += enemy.name + " attacks: " + attackerTotalAtRoll + "&#13;";
    if (attackerAttackRoll == 0) {
        eventLog.innerHTML += "Critical miss" + "&#13;";
    }
    else if (attackerTotalAtRoll >= heroA.ac) {
        attackerDamage = enemy.weapon.damage() + 3;
        eventLog.innerHTML += "Damage: " + attackerDamage + "&#13;";
        if (critical(enemy, attackerAttackRoll) == true) {
            finalDamage = attackerDamage * 2;
            eventLog.innerHTML += "Critical hit!" + "&#13;";
            eventLog.innerHTML += "Total damage: " + finalDamage + "&#13;";
            defenderHP -= finalDamage;
            eventLog.innerHTML += heroA.name + " HP left: " + defenderHP + "&#13;";
            heroA.hp = defenderHP;
            if (heroA.hp <= 0) {
                heroA.alive = false;
                eventLog.innerHTML += heroA.name + " is killed" + "&#13;";
            }
            else {
            }
        }
        else {
            eventLog.innerHTML += "Total damage: " + attackerDamage + "&#13;";
            defenderHP -= attackerDamage;
            eventLog.innerHTML += heroA.name + " HP left: " + defenderHP + "&#13;";
            heroA.hp = defenderHP;
            if (heroA.hp <= 0) {
                heroA.alive = false;
                eventLog.innerHTML += heroA.name + " is killed" + "&#13;";
            }
            else {
            }
        }
    }
    else {
        eventLog.innerHTML += "Miss!" + "&#13;";
    }
    document.getElementById("hero_hp").innerHTML = heroA.hp;
    document.getElementById("enemy_hp").innerHTML = enemy.hp;
}

function critical (attacker, roll) {
    var i;
    var attackerCrit = attacker.weapon.crit.split(",");
    for (i = 0; i < attackerCrit.length; i++) {
        if (roll == attackerCrit[i]) {
            return true;
        }
    }
}

function sendActions (actions) {
    var i;
    var actionList = "";
    for (i = 0; i < actions.length; i++) {
        if (i == (actions.length - 1)) {
            actionList += "&#34;" + actions[i] + "&#34;";
        }
        else {
            actionList += "&#34;" + actions[i] + "&#34;,";
        }
    }
    return actionList;
}