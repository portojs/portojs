/**
 * Created by Peter on 12.05.2015.
 */
(function(){
    var app = angular.module('store', []);

    app.controller('StoreController', function(){
        this.products = missions;
    });

    var missions = [
        {
            name: 'Recon',
            price: 2000,
            description: 'You always need to know where you stand! ' +
            'This mission allows you to have all the basic information on your enemy!',
            canPurchase: true,
            soldOut: false
        },
        {
            name: 'Recon-2',
            price: 3000,
            description: 'Basic information is all fine, ' +
            'but surely you need more to plan your offensives and defensives!',
            canPurchase: true,
            soldOut: false
        }
    ];
})();