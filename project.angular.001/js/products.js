/**
 * Created by Peter on 16.05.2015.
 */
(function() {
    var app = angular.module('store-products', []);

    app.directive('productTitle', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/product-title.html'
        };
    });

    app.directive('productPanels', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/product-panels.html',
            controller: function() {
                this.tab = 1;
                this.selectTab = function(setTab) {
                    this.tab = setTab;
                };
                this.isSelected = function(checkTab) {
                    return this.tab === checkTab;
                };
            },
            controllerAs: 'panelCtrl'
        };
    });

    app.directive('productGallery', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/product-gallery.html',
            controller: function() {
                this.current = 0;
                this.setCurrent = function(newValue) {
                    this.current = newValue;
                }
            },
            controllerAs: 'gallery'
        }
    });

})();