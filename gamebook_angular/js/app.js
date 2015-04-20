/**
 * Created by Peter on 16.04.2015.
 */
(function() {
    var app = angular.module('dreams', []);

    app.controller('DreamsController', function() {
        this.mercenaries = army;
    });

    app.controller('TabController', function() {
        this.tab = 1;
        this.setTab = function(newValue) {
            this.tab = newValue;
        };
        this.isSet = function(tabName) {
            return this.tab === tabName;
        };
    });

    var army = [
        {
            name: 'Snake',
            price: 1799.99,
            description: 'Top-level pro, excellent marksman and accomplished tactic',
            specifications: 'Accuracy: 85',
            reviews: 'This merc is an asshole!',
            canPurchase: false,
            missedInAction: false,
            images: ["pics/Chuck.jpg","pics/Gunman.jpg"]
        },
        {
            name: 'Fidel',
            price: 1200,
            description: 'Specialist in explosives and close-quarters combat',
            specifications: 'Accuracy: 75',
            reviews: "Like this guy! Sings like an angel!",
            canPurchase: true,
            missedInAction: false,
            images: ["pics/Thug.jpg","pics/Gunman.jpg"]
        }
    ];
})();