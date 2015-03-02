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
        name: "Короткий меч",
        damage: rolls.d6,
        crit: "20",
        critMult: 2,
        weight: 0.4,
        quantity: 0,
        description:
            "Цей меч бачив багато битв і, мабуть, в нього було чимало власників. " +
            "На лезі безліч подряпин, одна із яких не дозволяє прочитати " +
            "імя майстра-коваля. Обмотане шкірою руків'я сильно потерлось." +
            "<br><br>Тип: ріжуче" +
            "<br>Урон: 1d6" +
            "<br>Критичний удар: 20" +
            "<br>Вага: 0,4 кг"
    },
    saber = {
        name: "Шабля",
        damage: rolls.d6,
        crit: "18,19,20",
        critMult: 2,
        weight: 0.3,
        quantity: 0
    },
    gold = {
        name: "Золото",
        quantity: 0
    }
];

var hero = {
    name: "Валін",
    class:"Fighter",
    level: 2,
    hp: 24,
    strength: 16,
    constitution: 15,
    charisma: 15,
    intelligence: 16,
    tohit: 5,
    move: 11,
    ac: 20,
    weapon: itemArray[0],
    idName: "hero_miniature",
    coordTop: 20,
    coordLeft: 20
};

var heroInventory = [
    shortsword = {
        name: "Короткий меч",
        damage: rolls.d6,
        crit: "20",
        critMult: 2,
        weight: 0.4,
        quantity: 1,
        description:
        "Цей меч бачив багато битв і, мабуть, в нього було чимало власників. " +
        "На лезі безліч подряпин, одна із яких не дозволяє прочитати " +
        "імя майстра-коваля. Обмотане шкірою руків'я сильно потерлось." +
        "<br><br>Тип: ріжуче" +
        "<br>Урон: 1d6" +
        "<br>Критичний удар: 20" +
        "<br>Вага: 0,4 кг"
    },
    gold = {
        name: "Золото",
        quantity: 100,
        description: "Це золоті монети, на які можна купити майже все." +
        "Проте це в основному стосується лише міст та густонаселених регіонів." +
        "Там, де людей немає, або де живуть одні дикуни, золото нічого не варте."
    }
];

var bandit1 = {
    name: "Розбійник",
    class: "Thief",
    level: 1,
    hp: 12,
    strength: 12,
    constitution: 10,
    charisma: 10,
    intelligence: 8,
    tohit: 2,
    ac: 14,
    weapon: itemArray[1],
    inventory2: [
        saber = {
            name: "Шабля",
            damage: rolls.d6,
            crit: "18,19,20",
            critMult: 2,
            weight: 0.3,
            quantity: 1
        },
        gold = {
            name: "Золото",
            quantity: 100
        }
    ],
    alive: true,
    present: true,
    idName: "bandit1_miniature",
    coordTop: 20,
    coordLeft: 20
};

var currentContainer;
var currentLocation;