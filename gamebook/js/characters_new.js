/**
 * Created by Peter on 12.03.2015.
 */

var hero_1 = {
    name: 'Боромір',
    move: 6,
    hp: 45,
    ac: 24,
    tohit: 5,
    damage: (rolls.d8()) + 3,
    initiative: 4
};

var hero_2 = {
    name: 'Арагорн',
    move: 8,
    hp: 38,
    ac: 21,
    tohit: 6,
    damage: (rolls.d8()) + 2,
    initiative: 6
};

var hero_3 = {
    name: 'Фродо',
    move: 4,
    hp: 20,
    ac: 17,
    tohit: 2,
    damage: (rolls.d6()) + 1,
    initiative: 8
};

var hero_4 = {
    name: 'Гендальф',
    move: 6,
    hp: 30,
    ac: 20,
    tohit: 4,
    damage: (rolls.d8()) + 2,
    initiative: 5
};

var heroParty = [hero_1, hero_2, hero_3, hero_4];

var enemy_1 = {
    name: 'Гоблін',
    move: 7,
    hp: rolls.d6,
    ac: 14,
    tohit: 2,
    damage: rolls.d4,
    hpModifier: 1,
    initiative: 2
};

var enemy_2 = {
    name: 'Орк',
    move: 6,
    initiative: 5
};

var enemy_3 = {
    name: 'Урукхай',
    move: 5,
    initiative: 4
};