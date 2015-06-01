/**
 * Created by Peter on 12.05.2015.
 */
$.fn.decisioning = function() {
    this.each(function(){
        var decision_current = $(this);
        decision_current.on('click.details', '.expand', function(){
            event.preventDefault();
            $(this).closest('.decision').find('.comments').fadeToggle();
        });
    });
};

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
    $('.show-all-details').on('click', function(event){
        event.preventDefault();
        $('.decision').trigger('show.details');
    });
    $('.show-all-availability').on('click', function(event){
        event.preventDefault();
        $('.decision').trigger('show.availability');
    })
}

function Decision(el) {
    this.el = el;
    this.decisionDetails = this.el.find('.decision-details');
    var decision = this;

    /* helper methods go here */
    /*
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
    */
    this.loadDetails2 = function(event) {
        event.preventDefault();
        var loadDets = $(this).closest('.decision').find('.decision-details');
        $.get(loadDets.data('address'), function(response) {
            loadDets.html(response).slideToggle();
        })
    };
    this.showAvailability = function() {
        var closestDecision = $(this).closest('.decision');
        var amount = closestDecision.data('price');
        var quoteReply = $('<p>Available from $' + amount + '</p>');
        closestDecision.find('.quoteReply').html(quoteReply).toggle(400);
    };
    /*
    this.showDecisionDetails = function() {
        $(this).closest('.decision').find('.decision-details').slideToggle();
    };
    */
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
    this.el.on('click.availability', '.availability-button', this.showAvailability);
//    this.el.on('click', '.details-button', this.showDecisionDetails);
//    this.el.on('click', '.details-button', this.loadDetails);
    this.el.on('click.details', '.details-button', this.loadDetails2);
    this.el.on('show.details', this.showComments);
    this.el.on('show.availability', this.showAvailability);
//    this.el.on('click', '.decision-details-2-sneaky', this.addHighlight);
    this.el.on('keyup.quantity', '.quantity', this.calculateTotalPrice);
    this.el.on('click.details', '.expand', this.showComments);
    this.el.on('click', this.animateDecision);
    this.el.on('click.decision', 'submit', function(event) {
        event.preventDefault();
        $.ajax($('form').attr('action'), {
            context: decision,
            type: 'POST',
            data: $('form').serialize(),
            dataType: 'json',
            success: function(result) {
                $('form').remove();
                var msg = $("<p></p>");
                msg.append("Destination: " + result.locaion + ". ");
                msg.append("Region: " + result.region + ". ");
                msg.append("Operatives Nr.: " + result.operatives + ". ");
                $('#tobago').hide().html(msg).fadeIn();
            },
            error: function (request, errorType, errorMessage) {
                alert("Error: " + errorType + " with message: " + errorMessage);
            },
            contentType: 'application/json'

                /*
            { "destination": decision.closest('.decision').find('#destination').val(),
                    "quantity": decision.closest('.decision').find('.quantity').val()}
                    */
        })
    });
    this.el.on('click.operative', '.test-button', function(event) {
        event.preventDefault();
        $.ajax(el.data('address'), {
            dataType: 'json',
            contentType: 'application/json',
            success: function(result) {
                var msg = $("<p></p>");
                msg.append("Name: " + result.name + ". ");
                msg.append("Version: " + result.version + ".");
                el.hide().html(msg).fadeIn();
            }
        });
    });
    /*
    this.el.on('click', '.show-operatives-button', function(event) {
        event.preventDefault();
        var operatives = $("<div class='operative-0'><p></p><img src=''/></div>" +
        "<div class='operative-1'><p></p><img src=''/></div>" +
        "<div class='operative-2'><p></p><img src=''/></div>");
        el.hide().html(operatives).fadeIn();
        $.ajax(el.data('operatives'), {
            dataType: 'json',
            contentType: 'application/json',
            success: function(result) {
                $.each(result, function(index, operative) {
                    var op = $('.operative-' + index);
                    op.find('p').html(operative.name);
                    op.find('img').attr('src', operative.image);
                });
            }
        });
    });
    */
    this.el.on('click.operatives', '.show-operatives-button', function(event) {
        event.preventDefault();
        $.getJSON(el.data('operatives'), function(result){
           var newOperatives = $.map(result, function(operative, index) {
               var operativeItem = $('<div></div>');
               $('<p>'+operative.name+'</p>').appendTo(operativeItem);
               $('<img src="" />').appendTo(operativeItem);
               operativeItem.find('img').attr('src', operative.image);
               return operativeItem;
           });
           el.html(newOperatives);
        });
    });
}

$(document).ready(function(){
    var general = new General();
//    var trinidad = new Decision($('#trinidad'));
//    var southAfrica = new Decision($('#southAfrica'));
//    var tobago = new Decision($('#tobago'));
    $(".decision").decisioning();
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