/**
 * Created by Peter on 02.02.2015.
 */

function lootEnemy(enemyName) {
    var i;
    tempVars.push(enemyName);
    for (i = 0; i < enemyName.inventory.length; i++) {
        var listItem1 = document.createElement("LI");
        var listItem1Text = document.createTextNode(enemyName.inventory[i]);
        tempVars.push(enemyName.inventory[i]);
        listItem1.appendChild(listItem1Text);
        document.getElementById('loot_list').appendChild(listItem1);
        document.getElementsByTagName("LI")[i].onclick = "test(this.innerHTML)";
        }
}

function test(itemName) {
    document.getElementById('event_field').innerHTML = itemName;
    var i;
    var itemNumber;
    for (i = 0; i < itemArray.length; i++) {
        if (itemArray[i].name == itemName) {
            itemNumber = tempVars[0].inventory.indexOf(itemName);
            tempVars[0].inventory.splice(itemNumber, 1);
            heroInventory.push(itemArray[i]);
            document.getElementById('event_field').innerHTML = heroInventory[1].name;
        }
    }
}

////
//// deprecated function, proved to be unnecessary
////
/*
function sendActions(actions) {
    var i;
    var actionList = "";
    var actionListMain;
    for (i = 0; i < actions.length; i++) {
        if (i == (actions.length - 1)) {
            actionList += "&#34;" + actions[i] + "&#34;";
        }
        else {
            actionList += "&#34;" + actions[i] + "&#34;,";
        }
    }
    actionListMain = "changeActionList(" + actionList + ")";
    return actionListMain;
}

function changeActionListSub(stringFunction) {
    stringFunction;
}
    */