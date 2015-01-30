/**
 * Created by Peter on 28.01.2015.
 */
function firstLoad() {
//    changeActionList("Examine the bandit","examineBandit1()","Intimidate the bandit","intimidateBandit1()","Attack the bandit","attackBandit1()","Escape the bandit","escapeBandit1()");
    var listItem1 = document.createElement("LI");
    var listItem1Text = document.createTextNode("Examine the bandit");
    listItem1.appendChild(listItem1Text);
    var listItem2 = document.createElement("LI");
    var listItem2Text = document.createTextNode("Intimidate the bandit");
    listItem2.appendChild(listItem2Text);
    var listItem3 = document.createElement("LI");
    var listItem3Text = document.createTextNode("Attack the bandit");
    listItem3.appendChild(listItem3Text);
    var listItem4 = document.createElement("LI");
    var listItem4Text = document.createTextNode("Escape the bandit");
    listItem4.appendChild(listItem4Text);
    document.getElementById('location_field').innerHTML = location1;
    document.getElementById('event_field').innerHTML = location1Event1;
    document.getElementById('action_list').appendChild(listItem1);
    document.getElementById('action_list').appendChild(listItem2);
    document.getElementById('action_list').appendChild(listItem3);
    document.getElementById('action_list').appendChild(listItem4);
    document.getElementsByTagName("LI")[0].setAttribute("onclick", "examineBandit1()");
    document.getElementsByTagName("LI")[1].setAttribute("onclick", "intimidateBandit1()");
    document.getElementsByTagName("LI")[2].setAttribute("onclick", "attackBandit1()");
    document.getElementsByTagName("LI")[3].setAttribute("onclick", "escapeBandit1()");
}