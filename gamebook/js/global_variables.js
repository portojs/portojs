/**
 * Created by Peter on 12.03.2015.
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

var currentContainer;
var currentLocation;