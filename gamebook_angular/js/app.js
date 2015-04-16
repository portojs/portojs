/**
 * Created by Peter on 16.04.2015.
 */
(function() {
    var app = angular.module('store', []);

    app.controller('storeController', function() {
        this.product = gem;
    });

    var gem = {
        name: 'Ruby',
        price: 2,
        desc: 'Great gem'
    }
})();