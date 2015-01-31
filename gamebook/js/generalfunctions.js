/**
 * Created by Peter on 29.01.2015.
 */
function changeActionList (option1, action1,
                           option2, action2,
                           option3, action3,
                           option4, action4,
                           option5, action5,
                           option6, action6) {
    var is = true;
    var actionList = document.getElementById("action_list");
    while (is == true) {
        actionList.removeChild(actionList.childNodes[0]);
        is = actionList.hasChildNodes();
    }
    if (option1 !== undefined) {
        var listItem1 = document.createElement("LI");
        var listItem1Text = document.createTextNode(option1);
        listItem1.appendChild(listItem1Text);
        document.getElementById('action_list').appendChild(listItem1);
        document.getElementsByTagName("LI")[0].setAttribute("onclick", action1);
    }
    if (action2 !== undefined) {
        listItem1 = document.createElement("LI");
        listItem1Text = document.createTextNode(option2);
        listItem1.appendChild(listItem1Text);
        document.getElementById('action_list').appendChild(listItem1);
        document.getElementsByTagName("LI")[1].setAttribute("onclick", action2);
    }
    if (action3 !== undefined) {
        listItem1 = document.createElement("LI");
        listItem1Text = document.createTextNode(option3);
        listItem1.appendChild(listItem1Text);
        document.getElementById('action_list').appendChild(listItem1);
        document.getElementsByTagName("LI")[1].setAttribute("onclick", action3);
    }
    if (action4 !== undefined) {
        listItem1 = document.createElement("LI");
        listItem1Text = document.createTextNode(option4);
        listItem1.appendChild(listItem1Text);
        document.getElementById('action_list').appendChild(listItem1);
        document.getElementsByTagName("LI")[1].setAttribute("onclick", action4);
    }
    if (action5 !== undefined) {
        listItem1 = document.createElement("LI");
        listItem1Text = document.createTextNode(option5);
        listItem1.appendChild(listItem1Text);
        document.getElementById('action_list').appendChild(listItem1);
        document.getElementsByTagName("LI")[1].setAttribute("onclick", action5);
    }
    if (action6 !== undefined) {
        listItem1 = document.createElement("LI");
        listItem1Text = document.createTextNode(option6);
        listItem1.appendChild(listItem1Text);
        document.getElementById('action_list').appendChild(listItem1);
        document.getElementsByTagName("LI")[1].setAttribute("onclick", action6);
    }
}

function attack (attack1, damage1, attack2, damage2) {
    var at1 = rolls.d20() + hero.tohit;
    document.getElementById('event_field').innerHTML = at1;
}
