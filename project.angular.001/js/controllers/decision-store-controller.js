/**
 * Created by Peter on 17.05.2015.
 */
angular.module('store')
    .controller('StoreController',['$http', function($http){
        var store = this;
        store.products = [];
        $http({method: 'GET', url: 'json/resource.json'}).success(function(data) {
            store.products = data;
        });
    }]);