/**
 * Created by Peter on 12.05.2015.
 */

function General() {
    var $filters = $('#filters');
    var $decision = $('.decision');
    this.addHighlightStandard = function() {
        if ($decision.filter('.standard').hasClass('highlighted')) {
            $('.highlighted').removeClass('highlighted');
        }
        else {
            $('.highlighted').removeClass('highlighted');
            $decision.filter('.standard').addClass('highlighted');
        }
    };
    this.addHighlightExclusive = function() {
        if ($decision.filter('.exclusive').hasClass('highlighted')) {
            $('.highlighted').removeClass('highlighted');
        }
        else {
            $('.highlighted').removeClass('highlighted');
            $decision.filter('.exclusive').addClass('highlighted');
        }
    };
    $filters.on('click', '.standard-filter', this.addHighlightStandard);
    $filters.on('click', '.exclusive-filter', this.addHighlightExclusive);
}

function Decision(el) {
    this.el = el;
    this.decisionDetails = this.el.find('.decision-details');
    var decision = this;

    /* helper methods go here */
    this.loadDetails = function() {
        $.ajax('html/decision-details.html', {
            context: decision,
            success: function(response) {
                this.decisionDetails.html(response).slideToggle();
            },
            error: function(request, errorType, errorMessage) {
                alert('Error: ' + errorType + ' with message: ' + errorMessage);
            },
            timeout: 3000,
            beforeSend: function(){},
            complete: function(){}
        });
    };
    this.loadDetails2 = function() {
        var test = $(this);
        $.get('html/decision-details-2.html', function(response) {
            test.closest('.decision').find('.decision-details-test-2').html(response).slideToggle();
        })
    };
    this.showAvailability = function() {
        var closestDecision = $(this).closest('.decision');
        var amount = closestDecision.data('price');
        var quoteReply = $('<p>Available from $' + amount + '</p>');
        closestDecision.append(quoteReply);
        $(this).remove();
    };
    this.showDecisionDetails = function() {
        $(this).closest('.decision').find('.decision-details').slideToggle();
    };
    this.addHighlight = function() {
        $(this).addClass('highlighted');
    };
    this.calculateTotalPrice = function() {
        var price = +$(this).closest('.decision').data('price');
        var quantity = +$(this).val();
        $(this).closest('.decision').find('.total').text(price * quantity);
    };
    this.showComments = function() {
        event.preventDefault();
        $(this).closest('.decision').find('.comments').fadeToggle();
    };
    this.animateDecision = function() {
        $(this).toggleClass('highlighted');
        if ($(this).hasClass('highlighted')) {
            $(this).animate({'top': '-10px'}, 'fast');
        }
        else {
            $(this).animate({'top': '0px'}, 'fast');
        }
    };

    /* event handlers go here */
    this.el.on('click', '.availability-button', this.showAvailability);
    this.el.on('click', '.details-button', this.showDecisionDetails);
    this.el.on('click', '.details-button', this.loadDetails);
    this.el.on('click', '.details-button2', this.loadDetails2);
    this.el.on('click', '.decision-details-2-sneaky', this.addHighlight);
    this.el.on('keyup', '.quantity', this.calculateTotalPrice);
    this.el.on('click', '.expand', this.showComments);
    this.el.on('click', this.animateDecision);
}

$(document).ready(function(){
    var general = new General();
    var trinidad = new Decision($('#trinidad'));
    var southAfrica = new Decision($('#southAfrica'));
    var tobago = new Decision($('#tobago'));
});

/* object declaration
var decision = {
    init: function(){
        var filters = $('#filters');
        var decision = $('.decision');

        decision.on('click', '.availability-button', this.showAvailability);
        filters.on('click', '.standard-filter', this.addHighlightStandard);
        filters.on('click', '.exclusive-filter', this.addHighlightExclusive);
        decision.on('click', '.details-button', this.showDecisionDetails);
        decision.on('click', '.details-button', this.loadDetails);
        decision.on('click', '.details-button2', this.loadDetails2);
        decision.on('click', '.decision-details-2-sneaky', this.addHighlight);
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
    addHighlight: function() {
        $(this).addClass('highlighted');
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
*/