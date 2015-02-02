/**
 * Created by Peter on 02.02.2015.
 */
function attackBandit1() {
    /*
    var heroAttackRoll = rolls.d20();
    var heroDamage = hero.weapon.damage() + 3;
    var heroAttack = rolls.d20() + hero.tohit;
    var heroCrit = weaponsArray[1].crit.split(",");
    var heroCrit1 = heroCrit[0];
    var i;
    */
    var i;
    var crit;
    var finalDamage;
    var heroAttackRoll = rolls.d20();
    var heroDamage = hero.weapon.damage() + 3;
    var heroCrit = weaponsArray[1].crit.split(",");
//    document.getElementById("event_field").innerHTML = heroAttackRoll;
    for (i = 0; i < heroCrit.length; i++) {
        crit = heroCrit[i];
        if (heroAttackRoll == crit) {
            finalDamage = heroDamage * 2;
        }
        else {
            finalDamage = heroDamage;
        }
        document.getElementById("event_field").innerHTML = heroAttackRoll + " ";
        document.getElementById("event_field").innerHTML += heroDamage + " ";
        document.getElementById("event_field").innerHTML += finalDamage + " ";
    }

    /*
        if (heroAttackRoll == heroCrit[i]) {
            heroDamage += heroDamage * 2;
            break
        }
        else {
            break
        }
        */
}