/**
 * Created by Peter on 27.01.2015.
 */
var rolls = {
    d4: function() {
        return Math.floor((Math.random() * 4) + 1);
    },
    d6: function() {
        return Math.floor((Math.random() * 6) + 1);
    },
    d8: function() {
        return Math.floor((Math.random() * 8) + 1);
    },
    d20: function() {
        return Math.floor((Math.random() * 20) + 1);
    }
};

var weapons = {
    sswordName: "Shortsword",
    sswordDamage: function() {
        return rolls.d6();
    },
    sswordCrit: 20,
    saberName: "Saber",
    saberDamage: function() {
        return rolls.d6();
    }
};

var weaponsArray = [
    ssword = {
        name: "Shortsword",
        damage: function() {
            return rolls.d6();
        },
        crit: "20"
    },
    saber = {
        name: "Saber",
        damage: function() {
            return rolls.d6();
        },
        crit: "18,19,20"
    }
];

var hero = {
    class:"Fighter",
    level: 2,
    hp: 24,
    strength: 16,
    constitution: 15,
    charisma: 15,
    intelligence: 16,
    tohit: 5,
    weapon: weaponsArray[0]
};

var bandit1 = {
    class: "Thief",
    level: 1,
    hp: 6,
    strength: 12,
    constitution: 10,
    charisma: 10,
    intelligence: 8,
    tohit: 2,
    weapon: weaponsArray[1],
    alive: true,
    present: true
};