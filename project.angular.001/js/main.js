/**
 * Created by Peter on 12.05.2015.
 */
(function(){
    var app = angular.module('store', ['store-products']);

    app.controller('StoreController',['$http', function($http){
        var store = this;
        store.products = [];
        $http.get('json/resource.json').success(function(data) {
            store.products = data;
        });
    }]);

    app.controller('ReviewController', function() {
        this.review = {};
        this.addReview = function(product) {
            product.reviews.push(this.review);
            this.review = {};
        };
    });
/*
    var missions = [
        {
            name: 'Recon',
            price: 2000,
            description: 'You always need to know where you stand! ' +
            'This mission allows you to have all the basic information on your enemy!',
            images: [
                {full: 'pics/Chuck.jpg', thumb: 'pics/Chuck_thumb.jpg'},
                {full: 'pics/Gunman.jpg', thumb: 'pics/Gunman_thumb.jpg'},
                {full: 'pics/Gunwoman.jpg', thumb: 'pics/Gunwoman_thumb.jpg'},
                {full: 'pics/Thug.jpg', thumb: 'pics/Thug_thumb.jpg'}
            ],
            reviews: [
                {
                    stars: 5,
                    body: "Cheap and denedable!",
                    author: "john_doe@gmail.com"
                },
                {
                    stars: 2,
                    body: "Little point in this, Recon-2 is much better",
                    author: "tarantino@hotmail.com"
                }
            ],
            canPurchase: true,
            soldOut: false
        },
        {
            name: 'Recon-2',
            price: 3000,
            description: 'Basic information is all fine, ' +
            'but surely you need more to plan your offensives and defensives!',
            images: [
                {full: 'pics/Gunman.jpg', thumb: 'pics/Gunman_thumb.jpg'},
                {full: 'pics/Chuck.jpg', thumb: 'pics/Chuck_thumb.jpg'},
                {full: 'pics/Gunwoman.jpg', thumb: 'pics/Gunwoman_thumb.jpg'},
                {full: 'pics/Thug.jpg', thumb: 'pics/Thug_thumb.jpg'}
            ],
            reviews: [
                {
                    stars: 4,
                    body: "Quite good. would recommend to friends",
                    author: "alpacino@gmail.com"
                },
                {
                    stars: 1,
                    body: "This company employs amateurs!",
                    author: "steven_seagul@mail.ru"
                }
            ],
            canPurchase: true,
            soldOut: false
        },
        {
            name: 'Recon-3',
            price: 6000,
            description: 'This gives you the most detailed information on ' +
            'your adversaries. Fear no more - you will never be caught unprepared!',
            images: [
                {full: 'pics/Gunwoman.jpg', thumb: 'pics/Gunwoman_thumb.jpg'},
                {full: 'pics/Gunman.jpg', thumb: 'pics/Gunman_thumb.jpg'},
                {full: 'pics/Chuck.jpg', thumb: 'pics/Chuck_thumb.jpg'},
                {full: 'pics/Thug.jpg', thumb: 'pics/Thug_thumb.jpg'}
            ],
            reviews: [
                {
                    stars: 5,
                    body: "The best of all Recon series, look no further",
                    author: "shwarzenegger@hotmail.com"
                },
                {
                    stars: 4,
                    body: "Agree with the colleagues, this is the best offer!",
                    author: "stallone@hotmail.com"
                }
            ],
            canPurchase: true,
            soldOut: false
        },
        {
            name: 'Assault-1',
            price: 3000,
            description: "The most simple kind of attacks. It won't allow you to defeat" +
            "you enemy or capture anything, but is very useful for testing your opponent.",
            images: [
                {full: 'pics/Thug.jpg', thumb: 'pics/Thug_thumb.jpg'},
                {full: 'pics/Gunman.jpg', thumb: 'pics/Gunman_thumb.jpg'},
                {full: 'pics/Gunwoman.jpg', thumb: 'pics/Gunwoman_thumb.jpg'},
                {full: 'pics/Chuck.jpg', thumb: 'pics/Chuck_thumb.jpg'}
            ],
            reviews: [
                {
                    stars: 1,
                    body: "Don't waste your money on these fellas! They suck royally!",
                    author: "vandamme@gmail.com"
                },
                {
                    stars: 3,
                    body: "Not good enough, choose something from the upper tier",
                    author: "adamsandler@hotmail.com"
                }
            ],
            canPurchase: true,
            soldOut: false
        }
    ];
    */
})();