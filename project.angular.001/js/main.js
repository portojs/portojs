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
            images: [
                {full: 'pics/Chuck.jpg', thumb: 'pics/Chuck_thumb.jpg'},
                {full: 'pics/Gunman.jpg', thumb: 'pics/Gunman_thumb.jpg'},
                {full: 'pics/Gunwoman.jpg', thumb: 'pics/Gunwoman_thumb.jpg'},
                {full: 'pics/Thug.jpg', thumb: 'pics/Thug_thumb.jpg'}
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
            canPurchase: true,
            soldOut: false
        }
    ];
})();