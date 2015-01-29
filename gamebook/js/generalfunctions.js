/**
 * Created by Peter on 29.01.2015.
 */
function changeActionList (action1, action2, action3, action4, action5, action6) {
    var i;
    var actionList = document.getElementById("action_list");
    actionList.removeChild(actionList.childNodes[0]);
    for (i=5; actionList.childNodes[i] >= 0; i--) {
        actionList.removeChild(actionList.childNodes[i]);
    }
//    var actionItem = actionList.childNodes[0];
//    var listItem1Text = document.createTextNode("Go north");
//    var listItem2Text = document.createTextNode("Go south");
//    actionItem.replaceChild(action1, actionItem.childNodes[0]);
//    actionItem.setAttribute("onclick", "goNorthLocation1()");
//    actionItem = actionList.childNodes[1];
//    actionItem.replaceChild(action2, actionItem.childNodes[0]);
//    actionItem.setAttribute("onclick", "goSouthLocation1()");
}