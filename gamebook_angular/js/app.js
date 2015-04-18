/**
 * Created by Peter on 16.04.2015.
 */
(function() {
    var app = angular.module('dreams', []);

    app.controller('DreamsController', function() {
        this.mercenaries = army;
    });

    var army = [
        {
            name: 'Snake',
            price: 1799.99,
            description: 'Top-level pro, excellent marksman and accomplished tactic',
            canPurchase: false,
            missedInAction: false,
            images: ["pics/Chuck.jpg","pics/Gunman.jpg"]
        },
        {
            name: 'Fidel',
            price: 1200,
            description: 'Specialist in explosives and close-quarters combat',
            canPurchase: true,
            missedInAction: false,
            images: ["pics/Thug.jpg","pics/Gunman.jpg"]
        }
    ];
})();