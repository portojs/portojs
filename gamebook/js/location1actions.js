/**
 * Created by Peter on 27.01.2015.
 */
function intimidateBandit1() {
    var result1 = "The bandit laughed into your face and spit under your feet.";
    var result2 = "The bandit got nervous and retreated into the woods.";
    if (hero.power < bandit1.power) {
        document.getElementById("result_field").innerHTML = result1;
    }
    else {
        document.getElementById("result_field").innerHTML = result2;
        document.getElementById("event_field").innerHTML = " ";
        bandit1.present = false;
        changeActionList("Go north", "goNorthLocation1()", "Go south", "goSouthLocation1()");
    }
}

function attackBandit1() {
    var result1 = "The bandit easily deflected all the attacks and disarmed you " +
        "with a deft maneuver.";
    var result2 = "The bandit proved no match for you, in less than a minute " +
        "you've disarmed him.";
    if (hero.strength < bandit1.strength) {
        document.getElementById("result_field").innerHTML = result1;
    }
    else {
        document.getElementById("result_field").innerHTML = result2;
    }
}
function escapeBandit1() {
    var result1 = "You tried to run away, but the bandit is very quick " +
        "and catches up with you easily.";
    var result2 = "Your legs are strong and fast, very soon the bandit " +
        "stops far behind you and curses under his breath, unable to catch you.";
    if (hero.speed < bandit1.speed) {
        document.getElementById("result_field").innerHTML = result1;
    }
    else {
        document.getElementById("result_field").innerHTML = result2;
        function escapeRoute() {
            document.getElementById("location_field").innerHTML = location4;
        }
        escapeRoute();
        changeActionList();
    }
}
function goSouthLocation1() {
    var result1 = "As you try to go south, the bandit blocks your way and says " +
        "menacingly: 'Where do you think you're going?!";
    var result2 = "You walk south, soon the trees on both sides become scarce.";
    if ((bandit1.alive == true) && (bandit1.present == true)) {
        document.getElementById("result_field").innerHTML = result1;
    }
    else {
        document.getElementById("result_field").innerHTML = result2;
        document.getElementById("location_field").innerHTML = location2;
    }
}
function goNorthLocation1() {
    var result1 = "As you try to go north, the bandit blocks your way and says " +
        "menacingly: 'Where do you think you're going?!";
    var result2 = "You walk north, if anything the sky seems to grow even darker" +
        "and the air heavier. It seems you are going deeper into the forest.";
    if ((bandit1.alive == true) && (bandit1.present == true)) {
        document.getElementById("result_field").innerHTML = result1;
    }
    else {
        document.getElementById("result_field").innerHTML = result2;
        document.getElementById("location_field").innerHTML = location3;
    }
}