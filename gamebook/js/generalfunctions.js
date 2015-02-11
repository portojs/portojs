/**
 * Created by Peter on 29.01.2015.
 */

function changeActionList(action1, action2, action3, action4, action5, action6) {
    var i;
    var res;
    var actionList = document.getElementById("action_list");
//    var test1 = document.getElementById("result_field").innerHTML += "Go";
    while (actionList.hasChildNodes()) {
        actionList.removeChild(actionList.childNodes[0]);
    }
//    for (i = 0; i < actionList.childNodes.length; i++) {
//        actionList.childNodes[i].style.visibility = "hidden";
//    }
    for (i = 0; i < arguments.length; i++) {
        res = arguments[i].split(",");
//        document.getElementById("result_field").innerHTML += res[1].length;
        var listItem = document.createElement("LI");
        listItem.setAttribute("onclick", res[1]);
        var listItemText = document.createTextNode(res[0]);
        listItem.appendChild(listItemText);
//        listItem.addEventListener("click", test1);
        actionList.appendChild(listItem);
//        document.getElementsByTagName("LI")[i].setAttribute("onclick", res[1]);
    }
}

function heroAttack(heroA, enemy, actions) {
    var attackerAttackRoll = rolls.d20();
    var attackerTotalAtRoll = attackerAttackRoll + heroA.tohit;
    var attackerDamage;
    var finalDamage;
    var defenderHP = enemy.hp;
    var eventLog = document.getElementById("text_area");
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
                changeActionList(actions[0],actions[1],actions[2],actions[3],actions[4],actions[5],actions[6],actions[7]);
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
                changeActionList(actions[0],actions[1],actions[2],actions[3],actions[4],actions[5],actions[6],actions[7]);
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

function critical(attacker, roll) {
    var i;
    var attackerCrit = attacker.weapon.crit.split(",");
    for (i = 0; i < attackerCrit.length; i++) {
        if (roll == attackerCrit[i]) {
            return true;
        }
    }
}

////
//// old function, now I have a shorter one
////
/*
function changeActionList (option1, action1,
                           option2, action2,
                           option3, action3,
                           option4, action4,
                           option5, action5,
                           option6, action6) {
    var is = true;
    var actionList = document.getElementById("action_list");
    while (is == true) {
        actionList.removeChild(actionList.childNodes[0]);
        is = actionList.hasChildNodes();
    }
    if (option1 !== undefined) {
        var listItem1 = document.createElement("LI");
        var listItem1Text = document.createTextNode(option1);
        listItem1.appendChild(listItem1Text);
        document.getElementById('action_list').appendChild(listItem1);
        document.getElementsByTagName("LI")[0].setAttribute("onclick", action1);
    }
    if (action2 !== undefined) {
        listItem1 = document.createElement("LI");
        listItem1Text = document.createTextNode(option2);
        listItem1.appendChild(listItem1Text);
        document.getElementById('action_list').appendChild(listItem1);
        document.getElementsByTagName("LI")[1].setAttribute("onclick", action2);
    }
    if (action3 !== undefined) {
        listItem1 = document.createElement("LI");
        listItem1Text = document.createTextNode(option3);
        listItem1.appendChild(listItem1Text);
        document.getElementById('action_list').appendChild(listItem1);
        document.getElementsByTagName("LI")[1].setAttribute("onclick", action3);
    }
    if (action4 !== undefined) {
        listItem1 = document.createElement("LI");
        listItem1Text = document.createTextNode(option4);
        listItem1.appendChild(listItem1Text);
        document.getElementById('action_list').appendChild(listItem1);
        document.getElementsByTagName("LI")[1].setAttribute("onclick", action4);
    }
    if (action5 !== undefined) {
        listItem1 = document.createElement("LI");
        listItem1Text = document.createTextNode(option5);
        listItem1.appendChild(listItem1Text);
        document.getElementById('action_list').appendChild(listItem1);
        document.getElementsByTagName("LI")[1].setAttribute("onclick", action5);
    }
    if (action6 !== undefined) {
        listItem1 = document.createElement("LI");
        listItem1Text = document.createTextNode(option6);
        listItem1.appendChild(listItem1Text);
        document.getElementById('action_list').appendChild(listItem1);
        document.getElementsByTagName("LI")[1].setAttribute("onclick", action6);
    }
}
*/