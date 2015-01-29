/**
 * Created by Peter on 29.01.2015.
 */
function changeActionList (option1, action1,
                           option2, action2,
                           option3, action3,
                           option4, action4,
                           option5, action5,
                           option6, action6) {
    var is;
    var actionList = document.getElementById("action_list");
    while (is = true) {
        actionList.removeChild(actionList.childNodes[0]);
        is = actionList.hasChildNodes();
    }

    if (option1 == true) {
        document.getElementById("event_field").innerHTML = "Done";
//        var listItem1 = document.createElement("LI");
//        listItem1.appendChild(option1);
//        actionList.appendChild(listItem1);
//        document.getElementsByTagName("LI")[0].setAttribute("onclick", action1);
    }
    /*
    if (action2 = true) {
        listItem1 = document.createElement("LI");
        listItem1.appendChild(option2);
        actionList.appendChild(listItem1);
        document.getElementsByTagName("LI")[1].setAttribute("onclick", action2);
    }
    if (action3 = true) {
        listItem1 = document.createElement("LI");
        listItem1.appendChild(option3);
        actionList.appendChild(listItem1);
        document.getElementsByTagName("LI")[1].setAttribute("onclick", action3);
    }
    if (action4 = true) {
        listItem1 = document.createElement("LI");
        listItem1.appendChild(option4);
        actionList.appendChild(listItem1);
        document.getElementsByTagName("LI")[1].setAttribute("onclick", action4);
    }
    if (action5 = true) {
        listItem1 = document.createElement("LI");
        listItem1.appendChild(option5);
        actionList.appendChild(listItem1);
        document.getElementsByTagName("LI")[1].setAttribute("onclick", action5);
    }
    if (action6 = true) {
        listItem1 = document.createElement("LI");
        listItem1.appendChild(option6);
        actionList.appendChild(listItem1);
        document.getElementsByTagName("LI")[1].setAttribute("onclick", action6);
    }
    */
}