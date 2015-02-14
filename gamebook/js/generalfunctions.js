/**
 * Created by Peter on 29.01.2015.
 */

function changeLocation(locationName) {
    document.getElementById("location_field").innerHTML = locationName.description;
    document.getElementById("result_field").value = "";
    locationName.setActions();
}

function changeActionList(action1, action2, action3, action4, action5, action6) {
    var i;
    var res;
    var actionList = document.getElementById("action_list");
    while (actionList.hasChildNodes()) {
        actionList.removeChild(actionList.childNodes[0]);
    }
    for (i = 0; i < arguments.length; i++) {
        res = arguments[i].split(",");
        var listItem = document.createElement("LI");
        listItem.setAttribute("onclick", res[1]);
        var listItemText = document.createTextNode(res[0]);
        listItem.appendChild(listItemText);
        actionList.appendChild(listItem);
    }
}

function heroAttack(heroA, enemy, locationName) {
    var attackerAttackRoll = rolls.d20();
    var attackerTotalAtRoll = attackerAttackRoll + heroA.tohit;
    var attackerDamage;
    var finalDamage;
    var defenderHP = enemy.hp;
    currentContainer = enemy;
    currentLocation = locationName;
    var eventLog = document.getElementById("text_area");
    eventLog.innerHTML = heroA.name + " атакує: " + attackerTotalAtRoll + "&#13;";
    document.getElementById("enemy_hp").style.visibility = "visible";
    document.getElementById("hero_hp").style.visibility = "visible";
    if (attackerAttackRoll == 0) {
        eventLog.innerHTML += "Значний промах" + "&#13;";
        enemyAttack(enemy, heroA);
    }
    else if (attackerTotalAtRoll >= enemy.ac) {
        attackerDamage = heroA.weapon.damage() + 3;
        eventLog.innerHTML += "Пошкодження: " + attackerDamage + "&#13;";
        if (critical(heroA, attackerAttackRoll) == true) {
            finalDamage = attackerDamage * 2;
            eventLog.innerHTML += "Вдалий удар!" + "&#13;";
            eventLog.innerHTML += "Загальні пошкодження: " + finalDamage + "&#13;";
            defenderHP -= finalDamage;
            eventLog.innerHTML += enemy.name + " здоров'я залишилось: " + defenderHP + "&#13;";
            enemy.hp = defenderHP;
            if (enemy.hp <= 0) {
                enemy.alive = false;
                locationName.eventCheck1 = false;
                eventLog.innerHTML += enemy.name + " вбитий" + "&#13;";
                eventLog.innerHTML += enemy.name + " переможений";
                changeActionList("Обшукати,lootEnemy()", "Вихід,exitLoot()");
            }
            else {
                enemyAttack(enemy, heroA);
            }
        }
        else {
            eventLog.innerHTML += "Загальні пошкодження: " + attackerDamage + "&#13;";
            defenderHP -= attackerDamage;
            eventLog.innerHTML += enemy.name + " здоров'я залишилось: " + defenderHP + "&#13;";
            enemy.hp = defenderHP;
            if (enemy.hp <= 0) {
                enemy.alive = false;
                locationName.eventCheck1 = false;
                eventLog.innerHTML += enemy.name + " вбитий" + "&#13;";
                eventLog.innerHTML += enemy.name + " переможений";
                changeActionList("Обшукати,lootEnemy()", "Вихід,exitLoot()");
            }
            else {
                enemyAttack(enemy, heroA);
            }
        }
    }
    else {
        eventLog.innerHTML += "Промах!" + "&#13;";
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
    eventLog.innerHTML += enemy.name + " атакує: " + attackerTotalAtRoll + "&#13;";
    if (attackerAttackRoll == 0) {
        eventLog.innerHTML += "Значний промах" + "&#13;";
    }
    else if (attackerTotalAtRoll >= heroA.ac) {
        attackerDamage = enemy.weapon.damage() + 3;
        eventLog.innerHTML += "Пошкодження: " + attackerDamage + "&#13;";
        if (critical(enemy, attackerAttackRoll) == true) {
            finalDamage = attackerDamage * 2;
            eventLog.innerHTML += "Вдалий удар!" + "&#13;";
            eventLog.innerHTML += "Загальні пошкодження: " + finalDamage + "&#13;";
            defenderHP -= finalDamage;
            eventLog.innerHTML += heroA.name + " здоров'я залишилось: " + defenderHP + "&#13;";
            heroA.hp = defenderHP;
            if (heroA.hp <= 0) {
                heroA.alive = false;
                eventLog.innerHTML += heroA.name + " вбитий" + "&#13;";
            }
            else {
            }
        }
        else {
            eventLog.innerHTML += "Загальні пошкодження: " + attackerDamage + "&#13;";
            defenderHP -= attackerDamage;
            eventLog.innerHTML += heroA.name + " здоров'я залишилось: " + defenderHP + "&#13;";
            heroA.hp = defenderHP;
            if (heroA.hp <= 0) {
                heroA.alive = false;
                eventLog.innerHTML += heroA.name + " вбитий" + "&#13;";
            }
            else {
            }
        }
    }
    else {
        eventLog.innerHTML += "Промах!" + "&#13;";
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

function lootEnemy() {
    var i;
    document.getElementById("loot").style.visibility = 'visible';
//    tempVars.push(enemyName);
    while (document.getElementById('loot_list').hasChildNodes()) {
        document.getElementById('loot_list').removeChild(document.getElementById('loot_list').firstChild);
    }
    for (i = 0; i < currentContainer.inventory2.length; i++) {
        var listItem = document.createElement("LI");
        var listItemText = document.createTextNode(currentContainer.inventory2[i].quantity + " " + currentContainer.inventory2[i].name);
        listItem.onclick = function() {take(this.innerHTML)};
        listItem.appendChild(listItemText);
        document.getElementById('loot_list').appendChild(listItem);
    }
    changeActionList("Вихід,exitLoot()");
}

function take(itemName) {
    var i;
    var j;
    var item = itemName.substr(itemName.indexOf(" "));
    var itemQuantity = parseInt(itemName.substr(0, itemName.indexOf(" ")));
    var itemTrue = item.substr(1);
    for (i = 0; i < itemArray.length; i++) {
        if (itemArray[i].name == itemTrue) {
            updateInventory(itemTrue, itemQuantity, itemArray[i]);
            for (j = 0; j < currentContainer.inventory2.length; j++) {
                if (itemTrue == currentContainer.inventory2[j].name) {
                    document.getElementById('result_field').innerHTML += itemName + " додано в інвентар." + "<br>";
                    currentContainer.inventory2.splice(j, 1);
                }
            }
        }
    }
    lootEnemy();
}

function updateInventory(itemTrue, itemQuantity, itemId) {
    var i;
    var j;
    var check = true;
    for (i = 0; i < heroInventory.length; i++) {
        if (itemTrue == heroInventory[i].name) {
            heroInventory[i].quantity += itemQuantity;
            check = true;
            break;
        }
        else if (itemTrue != heroInventory[i].name) {
            check = false;
        }
    }
    if (check == false) {
        heroInventory.push(itemId);
        heroInventory[heroInventory.length - 1].quantity = 1;
    }
}

function exitLoot(){
    changeLocation(currentLocation);
}

/* show/hide inventory functions */

$(document).ready(function(){
    hideInventory();
    closeItemDescription();
});

function showInventory() {
    var i;
    $("#popup1").show();
    var inventoryList = document.getElementById("inventory_list");
    while (inventoryList.hasChildNodes()) {
        inventoryList.removeChild(inventoryList.childNodes[0]);
    }
    for (i = 0; i < heroInventory.length; i++) {
        var listItem = document.createElement("LI");
//        currentItem = heroInventory[i];
        listItem.setAttribute("onclick", "test()");
        var listItemText = document.createTextNode(heroInventory[i].name + " (" + heroInventory[i].quantity + ")");
        listItem.appendChild(listItemText);
        inventoryList.appendChild(listItem);
    }
}

function hideInventory() {
    $("#popup1").hide();
}

/* show item description */

function closeItemDescription() {
    $("#popup2").hide();
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