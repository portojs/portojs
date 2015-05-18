/**
 * Created by Peter on 12.05.2015.
 */
var decision = {
    init: function(){
        var filters = $('#filters');
        var decision = $('.decision');

        decision.on('click', '.availability-button', this.showAvailability);
        filters.on('click', '.standard-filter', this.addHighlightStandard);
        filters.on('click', '.exclusive-filter', this.addHighlightExclusive);
        /* AJAX testing*/
        decision.on('click', '.details-button', this.showDecisionDetails);
        decision.on('click', '.details-button', this.loadDetails);
        decision.on('click', '.details-button2', this.loadDetails2);
        decision.on('click', '.decision-details-2-sneaky', function() {
            $(this).addClass('highlighted');
        });
        decision.on('keyup', '.quantity', this.calculateTotalPrice);
        decision.on('click', '.expand', this.showComments);
        $('#decisions').on('click', '.decision', this.animateDecision);
    },
    loadDetails: function() {
        var test = $(this);
        $.ajax('html/decision-details.html', {
            success: function(response) {
                test.closest('.decision').find('.decision-details-test').html(response).slideToggle();
            },
            error: function(request, errorType, errorMessage) {
                alert('Error: ' + errorType + ' with message: ' + errorMessage);
            },
            timeout: 3000,
            beforeSend: function(){},
            complete: function(){}
        });
    },
    loadDetails2: function() {
        var test = $(this);
        $.get('html/decision-details-2.html', function(response) {
            test.closest('.decision').find('.decision-details-test-2').html(response).slideToggle();
        })
    },
    showAvailability: function() {
        var closestDecision = $(this).closest('.decision');
        var amount = decision.data('price');
        var quoteReply = $('<p>Available from $' + amount + '</p>');
        closestDecision.append(quoteReply);
        $(this).remove();
    },
    showDecisionDetails: function() {
        $(this).closest('.decision').find('.decision-details').slideToggle();
    },
    addHighlightStandard: function() {
        $('.highlighted').removeClass('highlighted');
        decision.filter('.standard').addClass('highlighted');
    },
    addHighlightExclusive: function() {
        $('.highlighted').removeClass('highlighted');
        decision.filter('.exclusive').addClass('highlighted');
    },
    calculateTotalPrice: function() {
        var price = +$(this).closest('.decision').data('price');
        var quantity = +$(this).val();
        $(this).closest('.decision').find('.total').text(price * quantity);
    },
    showComments: function() {
        event.preventDefault();
        $(this).closest('.decision').find('.comments').fadeToggle();
    },
    animateDecision: function() {
        $(this).toggleClass('highlighted');
        if ($(this).hasClass('highlighted')) {
            $(this).animate({'top': '-10px'}, 'fast');
        }
        else {
            $(this).animate({'top': '0px'}, 'fast');
        }
    }
};

$(document).ready(function(){
    decision.init();
});