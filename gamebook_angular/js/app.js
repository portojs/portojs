/**
 * Created by Peter on 16.04.2015.
 */
(function() {
    var app = angular.module('dreams', []);

    app.controller('DreamsController', function() {
        this.mercenaries = army;
    });

    app.controller('GalleryController', function() {
        this.current = 0;
        this.setCurrent = function(newValue) {
            this.current = newValue;
        }
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
    app.controller('ReviewController', function() {
        this.review = {};
        this.addReview = function(mercenary) {
            this.review.createdOn = Date.now();
            mercenary.reviews.push(this.review);
            this.review = {};
        };
    });

    app.directive('MercTitle', function() {
        return {
            restrict: 'E',
            templateUrl: 'merc-title.html'
        };
    });

    var army = [
        {
            name: 'Snake',
            price: 1799.99,
            description: 'Top-level pro, excellent marksman and accomplished tactic',
            specifications: 'Accuracy: 85',
            reviews: [{
                stars: 3,
                body: "I think this merc is too expensive.",
                author: "JimmyDean@example.org",
                createdOn: 1397490980837
            }, {
                stars: 4,
                body: "Solid skills, true professional!",
                author: "gemsRock@example.org",
                createdOn: 1397490980837
            }],
            canPurchase: false,
            missedInAction: false,
            images: ["pics/Chuck.jpg","pics/Gunman.jpg"]
        },
        {
            name: 'Fidel',
            price: 1200,
            description: 'Specialist in explosives and close-quarters combat',
            specifications: 'Accuracy: 75',
            reviews: [{
                stars: 3,
                body: "I think this merc was just OK, could honestly use more training, IMO.",
                author: "JimmyDean@example.org",
                createdOn: 1397490980837
            }, {
                stars: 4,
                body: "Any mercenary who knows 12 ways to blow up a bridge is for me!",
                author: "gemsRock@example.org",
                createdOn: 1397490980837
            }],
            canPurchase: true,
            missedInAction: false,
            images: ["pics/Thug.jpg","pics/Gunman.jpg"]
        }
    ];
})();