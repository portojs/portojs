/**
 * Created by Peter on 27.01.2015.
 */
var rolls = {
    d4: function() {
        return Math.floor(Math.random() * 5);
    },
    d6: function() {
        return Math.floor(Math.random() * 7);
    },
    d8: function() {
        return Math.floor(Math.random() * 9);
    },
    d20: function() {
        return Math.floor(Math.random() * 21);
    }
};

var itemArray = [
    shortsword = {
        name: "Shortsword",
        damage: rolls.d6,
        crit: "20"
    },
    saber = {
        name: "Saber",
        damage: rolls.d6,
        crit: "18,19,20"
    },
    gold = {
        name: "Gold",
        quantity: 0
    }
];

var hero = {
    name: "Valin",
    class:"Fighter",
    level: 2,
    hp: 24,
    strength: 16,
    constitution: 15,
    charisma: 15,
    intelligence: 16,
    tohit: 5,
    ac: 20,
    weapon: itemArray[0]
};

var heroInventory = [
    shortsword = {
        name: "Shortsword",
        damage: rolls.d6,
        crit: "20",
        quantity: 1
    },
    gold = {
        name: "Gold",
        quantity: 100
    }
];

var tempVars = [];