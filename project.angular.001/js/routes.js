/**
 * Created by Peter on 17.05.2015.
 */
angular.module('store')
    .config(function($routeProvider) {
        $routeProvider.when('/decisions', {
            templateUrl: 'templates/pages/decisions/index.html'
        })
        .when('/users', {
            templateUrl: 'templates/pages/users/index.html'
        })
        .when('/', {
            templateUrl: 'templates/pages/decisions/index.html'
        })
        .otherwise({redirectTo: '/'});
    });