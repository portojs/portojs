/**
 * Created by Peter on 02.02.2015.
 */

function test() {
    document.getElementById("result_field").innerHTML = this.innerHTML;
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