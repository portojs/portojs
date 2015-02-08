/**
 * Created by Peter on 02.02.2015.
 */

function lootEnemy(enemyName) {
    var i;
    tempVars.push(enemyName);
    while (document.getElementById('loot_list').hasChildNodes()) {
        document.getElementById('loot_list').removeChild(document.getElementById('loot_list').firstChild);
    }
    for (i = 0; i < enemyName.inventory2.length; i++) {
        var listItem1 = document.createElement("LI");
        var listItem1Text = document.createTextNode(enemyName.inventory2[i].quantity + " " + enemyName.inventory2[i].name);
//        tempVars.push(enemyName.inventory[i]);
        listItem1.onclick = function() {test(this.innerHTML)};
        listItem1.appendChild(listItem1Text);
        document.getElementById('loot_list').appendChild(listItem1);
        }
}

function test(itemName) {
    var i;
    var j;
    var itemNumber;
//    var n = itemName.indexOf(" ");
    var item = itemName.substr(itemName.indexOf(" "));
//    tempVars[0].inventory2.splice(0, 1);
//    document.getElementById('event_field').innerHTML = tempVars[0].inventory2[0].name;
//    document.getElementById('event_field').innerHTML = item;
//    document.getElementById('event_field').innerHTML = "true";
    for (i = 0; i < itemArray.length; i++) {
//        document.getElementById('event_field').innerHTML = "true";
        if (itemArray[i].name == item) {
            document.getElementById('event_field').innerHTML = "true";
//            itemNumber = tempVars[0].inventory2.indexOf(itemName);
//            tempVars[0].inventory2.splice(itemNumber, 1);
/*            heroInventory.push(itemArray[i]);
            for (j = 0; j < tempVars[0].inventory2.length; j++) {
                document.getElementById('event_field').innerHTML = "true";
                if (item == tempVars[0].inventory2[j].name) {
                    document.getElementById('event_field').innerHTML = "true";
                    tempVars[0].inventory2.splice(j, 1);
                }
            }*/
//            document.getElementById('event_field').innerHTML = heroInventory[2].name;
        }
    }
    lootEnemy(tempVars[0]);
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