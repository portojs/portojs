/**
 * Created by Peter on 27.01.2015.
 */

var heroParty = [
    hero = {
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
    },
    hero2 = {
        name: "Бобур",
        class:"Fighter",
        level: 2,
        hp: 20,
        strength: 18,
        constitution: 12,
        charisma: 12,
        intelligence: 11,
        tohit: 6,
        move: 11,
        ac: 22,
        weapon: itemArray[0],
        idName: "hero2_miniature",
        coordTop: 40,
        coordLeft: 40
    }
];

var enemies1 = [
    bandit1 = {
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
        coordTop: 80,
        coordLeft: 80
    },
    bandit2 = {
        name: "Малий розбійник",
        class: "Thief",
        level: 1,
        hp: 10,
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
                quantity: 50
            }
        ],
        alive: true,
        present: true,
        idName: "bandit12_miniature",
        coordTop: 100,
        coordLeft: 100
    }
];