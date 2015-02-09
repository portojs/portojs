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
        listItem1.onclick = function() {take(this.innerHTML)};
        listItem1.appendChild(listItem1Text);
        document.getElementById('loot_list').appendChild(listItem1);
        }
}

function take(itemName) {
    var i;
    var j;
    var item = itemName.substr(itemName.indexOf(" "));
    var itemQuantity = parseInt(itemName.substr(0, itemName.indexOf(" ")));
    var itemTrue = item.substr(1);
    for (i = 0; i < itemArray.length; i++) {
        if (itemArray[i].name == itemTrue) {
//            document.getElementById('result_field').innerHTML += heroInventory.length + "<br>";
            updateInventory(itemTrue, itemQuantity, itemArray[i]);
//            document.getElementById('result_field').innerHTML += heroInventory.length + "<br>";
//            heroInventory.push(itemArray[i]);
            for (j = 0; j < tempVars[0].inventory2.length; j++) {
                if (itemTrue == tempVars[0].inventory2[j].name) {
                    document.getElementById('result_field').innerHTML += itemName + " added to inventory." + "<br>";
//                    document.getElementById('result_field').innerHTML += itemQuantity + heroInventory[0].quantity;
                    tempVars[0].inventory2.splice(j, 1);
                }
            }
        }
    }
    lootEnemy(tempVars[0]);
}

function updateInventory(itemTrue, itemQuantity, itemId) {
    var i;
    var j;
    var check = true;
//    document.getElementById('result_field').innerHTML += itemTrue + "<br>";
//    document.getElementById('result_field').innerHTML += itemQuantity + "<br>";
//    document.getElementById('result_field').innerHTML += itemId + "<br>";
    for (i = 0; i < heroInventory.length; i++) {
        if (itemTrue == heroInventory[i].name) {
            heroInventory[i].quantity += itemQuantity;
            check = true;
//            document.getElementById('result_field').innerHTML += heroInventory[i].name + " " + heroInventory[i].quantity + "<br>";
            break;
        }
        else if (itemTrue != heroInventory[i].name) {
            check = false;
        }
    }
    if (check == false) {
        heroInventory.push(itemId);
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