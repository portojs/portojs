/**
 * Created by Peter on 27.01.2015.
 */
var rolls = {
    d4: function() {
        Math.floor((Math.random() * 4) + 1)
    },
    d6: function() {
        Math.floor((Math.random() * 6) + 1)
    },
    d20: function() {
        Math.floor((Math.random() * 20) + 1)
    }
};
var weapons = {
    shortswordName: "Shortsword",
    shortswordDamage: rolls.d6(),
    saberName: "Saber",
    saberDamage: rolls.d6()
};
var hero = {
    class:"Fighter",
    level: 2,
    hp: 24,
    strength: 16,
    constitution: 15,
    charisma: 15,
    intelligence: 16,
    tohit: 5,
    weapon: weapons.shortswordName
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
    weapon: weapons.saberName,
    alive: true,
    present: true
};