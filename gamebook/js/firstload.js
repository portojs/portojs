/**
 * Created by Peter on 28.01.2015.
 */
function firstLoad() {
//    changeActionList("Examine the bandit","examineBandit1()","Intimidate the bandit","intimidateBandit1()","Attack the bandit","attackBandit1()","Escape the bandit","escapeBandit1()");
    var actionList = document.getElementById("action_list");
    var listItem1 = document.createElement("LI");
    var listItem1Text = document.createTextNode("Examine the bandit");
    listItem1.addEventListener("click", loc1.examineBandit1);
    listItem1.appendChild(listItem1Text);
    var listItem2 = document.createElement("LI");
    var listItem2Text = document.createTextNode("Intimidate the bandit");
    listItem2.addEventListener("click", loc1.intimidateBandit1);
    listItem2.appendChild(listItem2Text);
    var listItem3 = document.createElement("LI");
    var listItem3Text = document.createTextNode("Attack the bandit");
    listItem3.addEventListener("click", loc1.attackBandit1);
    listItem3.appendChild(listItem3Text);
    var listItem4 = document.createElement("LI");
    var listItem4Text = document.createTextNode("Escape the bandit");
    listItem4.addEventListener("click", loc1.escapeBandit1);
    listItem4.appendChild(listItem4Text);
    document.getElementById('location_field').innerHTML = loc1.description;
    document.getElementById('event_field').innerHTML = loc1.event;
    actionList.appendChild(listItem1);
    actionList.appendChild(listItem2);
    actionList.appendChild(listItem3);
    actionList.appendChild(listItem4);
}