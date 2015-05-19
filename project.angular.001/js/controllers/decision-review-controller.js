/**
 * Created by Peter on 17.05.2015.
 */
angular.module('store')
    .controller('ReviewController', function() {
        this.review = {};
        this.addReview = function(product) {
            product.reviews.push(this.review);
            this.review = {};
        };
    });