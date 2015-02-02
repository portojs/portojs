/**
 * Created by Peter on 02.02.2015.
 */
function attack() {
    var heroAttackRoll = rolls.d20();
    var heroTotalAtRoll = heroAttackRoll + hero.tohit;
    var heroDamage;
    var finalDamage;
    var eventLog = document.getElementById("result_field");
    eventLog.innerHTML += "Attack: " + heroTotalAtRoll + "<br>";
    if (heroTotalAtRoll >= bandit1.ac) {
        heroDamage = hero.weapon.damage() + 3;
        eventLog.innerHTML += "Damage: " + heroDamage + "<br>";
        if (critical(heroAttackRoll) == true) {
            finalDamage = heroDamage * 2;
            eventLog.innerHTML += "Critical hit!" + "<br>";
            eventLog.innerHTML += "Total damage: " + finalDamage + "<br>";
        }
    }
    else {
        eventLog.innerHTML += "Miss!" + "<br>";
    }
}

function critical (roll) {
    var i;
    var heroCrit = weaponsArray[1].crit.split(",");
    for (i = 0; i < heroCrit.length; i++) {
        if (roll == heroCrit[i]) {
            return true;
        }
    }
}