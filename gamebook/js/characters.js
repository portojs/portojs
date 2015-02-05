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

var items = [
  gold = {
      name: "Gold"
  }
];

/*
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
*/
var weaponsArray = [
    ssword = {
        name: "Shortsword",
        damage: rolls.d6,
        crit: "20"
    },
    saber = {
        name: "Saber",
        damage: rolls.d6,
        crit: "18,19,20"
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
    weapon: weaponsArray[0]
};

var heroInventory = [
    ssword = {
        name: "Shortsword",
        damage: rolls.d6,
        crit: "20"
    }
];

var bandit1 = {
    name: "Seasoned bandit",
    class: "Thief",
    level: 1,
    hp: 16,
    strength: 12,
    constitution: 10,
    charisma: 10,
    intelligence: 8,
    tohit: 2,
    ac: 16,
    weapon: weaponsArray[1],
    inventory: [weaponsArray[1].name, "25 " + items[0].name],
    alive: true,
    present: true
};