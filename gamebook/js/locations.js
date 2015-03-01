/**
 * Created by Peter on 27.01.2015.
 */
var loc1 = {
    description: "Густий ліс, дорога прямує із півдня на північ.",
    event: "Посеред дороги стоїть розбійник з іржавою шабелю у руці.",
    eventCheck1: true,
    setActions: function() {
        if (loc1.eventCheck1 == true) {
            document.getElementById("event_field").innerHTML = loc1.event;
            changeActionList("Оглянути розбійника,loc1.examineBandit1()",
                "Залякати розбійника,loc1.intimidateBandit1()",
                "Розпочати бій,loc1.attackBandit1()",
                "Втекти від розбійника,loc1.escapeBandit1()");
        } else {
            document.getElementById("event_field").innerHTML = " ";
            changeActionList("Іти на північ,loc1.goNorth()", "Іти на південь,loc1.goSouth()");
        }},
    examineBandit1: function() {
        var result1 = "Важко оцінити розбійника, проте він здається небезпечним.";
        var result2_1 = "слабший, ";
        var result2_2 = "сильніший, ";
        var result3_1 = "повільніший, ";
        var result3_2 = "швидший, ";
        var result4_1 = "менш досвідчений.";
        var result4_2 = "більш досвідчений.";
        var resultField = document.getElementById("result_field");
        if (hero.intelligence < 15) {
            resultField.innerHTML = result1;
        }
        else {
            resultField.innerHTML = "Розбійник ";
            if (hero.strength > bandit1.strength) {
                resultField.innerHTML += result2_1;
            }
            else {
                resultField.innerHTML += result2_2;
            }
            if (hero.speed > bandit1.speed) {
                resultField.innerHTML += result3_1;
            }
            else {
                resultField.innerHTML += result3_2;
            }
            if (hero.level > bandit1.level) {
                resultField.innerHTML += result4_1;
            }
            else {
                resultField.innerHTML += result4_2;
            }
        }
    },
    intimidateBandit1: function() {
        var result1 = "Розбійник розсміявся та сплюнув на дорогу.";
        var result2 = "Розбійник зблід та швидко зник у лісі.";
        if (hero.level < bandit1.level) {
            document.getElementById("result_field").innerHTML = result1;
        }
        else {
            document.getElementById("result_field").innerHTML = result2;
            document.getElementById("event_field").innerHTML = " ";
            bandit1.present = false;
            loc1.eventCheck1 = false;
            changeLocation(loc1);
        }
    },

    attackBandit1: function() {
        heroAttack(bandit1, loc1);
    },

    escapeBandit1: function() {
        var result1 = "Ви спробували втекти, проте розбіник швидко наздогнав вас.";
        var result2 = "Ви дуже швидкі, і дуже скоро робійник залишився далеко позаду десь посеред лісу.";
        if (hero.constitution < bandit1.constitution) {
            document.getElementById("result_field").innerHTML = result1;
        }
        else {
            document.getElementById("result_field").innerHTML = result2;
            changeLocation(loc4);
        }
    },
    goSouth: function() {
            changeLocation(loc2);
    },
    goNorth: function() {
            changeLocation(loc3);
    }
};
var loc2 = {
    description: "Дерева тут маленькі та криві, здається ліс не дуже хоче рости у цій місцевості. На півдні дорога добігає до краю великого каньону та обривається. Багато років потому тут був міст, проте зараз про той міст нагадують лише кам'яні уламки даелко внизу." +
    "На північ дорога поринає глибоко в ліс, та ще є маленька стежка поміж деревами, що прямує на захід.",
    eventCheck1: false,
    setActions: function() {
        if (loc4.eventCheck1 == true) {
        } else  {
            document.getElementById("event_field").innerHTML = " ";
            changeActionList("Іти західною стежкою,loc2.goWest()", "Іти на північ,loc2.goNorth()");
        }
    },
    goWest: function() {
        changeLocation(loc4);
    },
    goNorth: function() {
        changeLocation(loc1);
    }
};
var loc3 = {
    description: "З обох боків дороги ростуть могутні дерева. На півночі понад найвишими деревами видно велику башту. На захід від дороги віддідяється стара дорога, що заросла густою травою.",
    eventCheck1: false,
    setActions: function() {
        if (loc4.eventCheck1 == true) {
        } else  {
            document.getElementById("event_field").innerHTML = " ";
            changeActionList("Іти на північ,loc3.goNorth()", "Іти на південь,loc3.goSouth()", "Іти на захід,loc3.goWest()");
        }
    },
    goNorth: function() {
        changeLocation(loc5);
    },
    goSouth: function() {
        changeLocation(loc1);
    },
    goWest: function() {
        changeLocation(loc6);
    }
};
var loc4 = {
    description: "Схил пагорба, що порос густи лісом. Дерева дуже високі, неба майже не видно. Поміж деревами в'ється стежка. У східному напрямку вона спускається з пагорба, а на північ піднімається на його вершину.",
    eventCheck1: false,
    setActions: function() {
        if (loc4.eventCheck1 == true) {
        } else  {
            document.getElementById("event_field").innerHTML = " ";
            changeActionList("Піднятися схилом,loc4.goUphill()", "Спуститися схилом,loc4.goDownhill()");
        }
    },
    goUphill: function() {
        changeLocation(loc6);
    },
    goDownhill: function() {
        changeLocation(loc2);
    }
};
var loc5 = {
    description: "Посеред лісу стоїть старий замок. Десь на заході та південніше посеред лісу встає великий пагорб. Ворота замка закриті, дорога від цих воріт уходить на південь. Серед дерев, що впритул підступили до стін замку, видно стежку, що мабуть веде до вершини далекого пагорбу",
    eventCheck1: false,
    setActions: function() {
        if (loc4.eventCheck1 == true) {
        } else  {
            document.getElementById("event_field").innerHTML = " ";
            changeActionList("Іти на південь по дорозі,loc5.goSouth()", "Іти стежкою убік пагорбу,loc5.goSW()");
        }
    },
    goSouth: function() {
        changeLocation(loc3);
    },
    goSW: function() {
        changeLocation(loc6);
    }
};
var loc6 = {
    description: "Вершина пагорба, видно дуже далеко. Десь на сході посеред лісу простежується дорога. На півночі поміж великих дерев височіть замок. На півдні ліс сходить схилами пагорба і рпатово обривається, здається десь там проходить великий каньон.",
    eventCheck1: false,
    setActions: function() {
        if (loc4.eventCheck1 == true) {
        } else  {
            document.getElementById("event_field").innerHTML = " ";
            changeActionList("Іти на північ до замку,loc6.goNorth()", "Іти на схід до дороги,loc6.goEast()", "Іти на південь до каньону,loc6.goSouth()");
        }
    },
    goNorth: function() {
        changeLocation(loc5);
    },
    goEast: function() {
        changeLocation(loc3);
    },
    goSouth: function() {
        changeLocation(loc4);
    }
};