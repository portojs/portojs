/**
 * Created by Peter on 02.02.2015.
 */

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
    changeActionList("Exit,exitLoot()");
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
                    document.getElementById('result_field').innerHTML += itemName + " added to inventory." + "<br>";
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
    }
}

function exitLoot(){
    changeLocation(currentLocation);
}

function changeLocation(locationName) {
    document.getElementById("location_field").innerHTML = locationName.description;
    locationName.changeActions();
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