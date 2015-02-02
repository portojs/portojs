/**
 * Created by Peter on 27.01.2015.
 */
var loc1 = {
    description: "The sky is dark, the road is surrounded by black trees. " +
    "The wood on both sides is very dense. The road goes south and north.",
    event: "In the middle of the road stands a stinky bandit with a rusty saber " +
    "in his hand.",
    examineBandit1: function() {
        var result1 = "You aren't sure. The bandit looks very formidable " +
            "and scary Somehow it seems you don't stand much of a chance against him.";
        var result2_1 = "weaker, ";
        var result2_2 = "stronger, ";
        var result3_1 = "slower, ";
        var result3_2 = "faster, ";
        var result4_1 = "less experienced.";
        var result4_2 = "more experienced.";
        var resultField = document.getElementById("result_field");
        if (hero.intelligence < 15) {
            resultField.innerHTML = result1;
        }
        else {
            resultField.innerHTML = "The bandit is: ";
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
        var result1 = "The bandit laughed into your face and spit under your feet.";
        var result2 = "The bandit got nervous and retreated into the woods.";
        if (hero.level < bandit1.level) {
            document.getElementById("result_field").innerHTML = result1;
        }
        else {
            document.getElementById("result_field").innerHTML = result2;
            document.getElementById("event_field").innerHTML = " ";
            bandit1.present = false;
            changeActionList("Go north", "loc1.goNorth()", "Go south", "loc1.goSouth()");
        }
    },
    attackBandit1: function() {
        var heroAttackRoll = rolls.d20();
        var heroAttack = rolls.d20() + hero.tohit;
//        var heroWeapon = hero.weapon;
//        var d4 = Math.floor((Math.random() * 4) + 1);
        document.getElementById("event_field").innerHTML = heroAttack;
//        var result1 = "The bandit easily deflected all the attacks and disarmed you " +
//            "with a deft maneuver.";
//        var result2 = "The bandit proved no match for you, in less than a minute " +
//            "you've disarmed him.";
//        if (hero.strength < bandit1.strength) {
//            document.getElementById("result_field").innerHTML = result1;
//        }
//        else {
//            document.getElementById("result_field").innerHTML = result2;
//        }
    },
    escapeBandit1: function() {
        var result1 = "You tried to run away, but the bandit is very quick " +
            "and catches up with you easily.";
        var result2 = "Your legs are strong and fast, very soon the bandit " +
            "stops far behind you and curses under his breath, unable to catch you.";
        if (hero.constitution < bandit1.constitution) {
            document.getElementById("result_field").innerHTML = result1;
        }
        else {
            document.getElementById("result_field").innerHTML = result2;
            document.getElementById("event_field").innerHTML = " ";
            function escapeRoute() {
                document.getElementById("location_field").innerHTML = loc4.description;
            }
            escapeRoute();
            changeActionList("Go uphill","go1Location4","Go downhill","go2location4");
        }
    },
    goSouth: function() {
        var result1 = "As you try to go south, the bandit blocks your way and says " +
            "menacingly: 'Where do you think you're going?!";
        var result2 = "You walk south, soon the trees on both sides become scarce.";
        if ((bandit1.alive == true) && (bandit1.present == true)) {
            document.getElementById("result_field").innerHTML = result1;
        }
        else {
            document.getElementById("result_field").innerHTML = result2;
            document.getElementById("location_field").innerHTML = loc2.description;
        }
    },
    goNorth: function() {
        var result1 = "As you try to go north, the bandit blocks your way and says " +
            "menacingly: 'Where do you think you're going?!";
        var result2 = "You walk north, if anything the sky seems to grow even darker" +
            "and the air heavier. It seems you are going deeper into the forest.";
        if ((bandit1.alive == true) && (bandit1.present == true)) {
            document.getElementById("result_field").innerHTML = result1;
        }
        else {
            document.getElementById("result_field").innerHTML = result2;
            document.getElementById("location_field").innerHTML = loc3.description;
        }
    }
};
var loc2 = {
    description: "The forest edge is near - there are not so many trees as before and " +
    "most of them are young sapling. There is a path, going westwards " +
    "between the trees."
};
var loc3 = {
    description: "The trees on both sides are huge, their powerful roots burrow across " +
    "the road, making the passage difficult. You can see a strange light among the " +
    "trees to the east."
};
var loc4 = {
    description: "You are deep in the woods, heavy branches hung low almost touching your head, " +
    "dense underbrush hinders your movement. You hear faint sounds of animals moving somewhere " +
    "behind the trees. There are two possible ways out of this spot - one leading up " +
    "the nearest hill, and the other - to go downhill, where the sounds of running " +
    "water can be heard.",
    goUphill: function(){},
    goDownhill: function(){}
};