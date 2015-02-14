/**
 * Created by Peter on 02.02.2015.
 */

function test(text) {
    var i;
    var trueName = text.substr(0, (text.indexOf("(") - 1));
    for (i = 0; i < heroInventory.length; i++) {
        if (heroInventory[i].name == trueName) {
            document.getElementById("result_field").innerHTML = heroInventory[i].description;
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