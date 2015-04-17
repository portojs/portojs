/**
 * Created by Peter on 16.04.2015.
 */
(function() {
    var app = angular.module('dreams', []);

    app.controller('DreamsController', function() {
        this.products = gems;
    });

    var gems = [
        {
            name: 'Ruby',
            price: 20,
            description: 'Great gem',
            canPurchase: true,
            soldOut: false
        },
        {
            name: 'Amethist',
            price: 1,
            description: 'Poor gem',
            canPurchase: true,
            soldOut: false
        }
    ];
})();