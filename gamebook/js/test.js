/**
 * Created by Peter on 02.02.2015.
 */

function lootEnemy(enemyName) {
    var i;
    tempVars.push(enemyName);
//    document.getElementById('event_field').innerHTML = tempVars[0].name;
    for (i = 0; i < enemyName.inventory.length; i++) {
        var listItem1 = document.createElement("LI");
        var listItem1Text = document.createTextNode(enemyName.inventory[i]);
        tempVars.push(enemyName.inventory[i]);
        listItem1.appendChild(listItem1Text);
        document.getElementById('loot_list').appendChild(listItem1);
        document.getElementsByTagName("LI")[i].setAttribute("onclick", "test(tempVars[0])")
        }
}

function test(container) {
    var i;
    var itemNumber;
    var item = docu
    for (i = 0; i < itemArray.length; i++) {
        if (itemArray[i].name == item) {
            itemNumber = container.inventory.indexOf(item);
            container.inventory.splice(itemNumber, 1);
            heroInventory.push(itemArray[i]);
            document.getElementById('event_field').innerHTML = heroInventory[1].name;
        }
//    tempVars.splice(0,1)
    }
    /*
    function findItem (element) {
        return element.name == item;
    }
    */
}

function exitLoot() {
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