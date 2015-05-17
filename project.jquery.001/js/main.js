/**
 * Created by Peter on 12.05.2015.
 */
$(document).ready(function(){

    var filters = $('#filters');
    var decision = $('.decision');

    function showDecisionDetails(){
        $(this).closest('.decision').find('.decision-details').slideToggle();
    }

    decision.on('click', '.availability-button', function(){
        var closestDecision = $(this).closest('.decision');
        var amount = decision.data('price');
        var quoteReply = $('<p>Available from $' + amount + '</p>');
        closestDecision.append(quoteReply);
        $(this).remove();
    });
    filters.on('click', '.standard-filter', function() {
        $('.highlighted').removeClass('highlighted');
        decision.filter('.standard').addClass('highlighted');
    });
    filters.on('click', '.exclusive-filter', function() {
        $('.highlighted').removeClass('highlighted');
        decision.filter('.exclusive').addClass('highlighted');
    });
    /* AJAX testing*/
    decision.on('click', '.details-button', showDecisionDetails);
    decision.on('click', '.details-button', function() {
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
    });
    decision.on('click', '.details-button2', function() {
        var test = $(this);
        $.get('html/decision-details-2.html', function(response) {
            test.closest('.decision').find('.decision-details-test-2').html(response).slideToggle();
        })
    });
    $('.decision .decision-details-2-sneaky').on('click', function() {
        $(this).addClass('highlighted');
    });
//    decision.on('mouseenter', 'h3', showDecisionDetails);
    decision.on('keyup', '.quantity', function(){
        var price = +$(this).closest('.decision').data('price');
        var quantity = +$(this).val();
        $(this).closest('.decision').find('.total').text(price * quantity);
    });
    decision.on('click', '.expand', function(event){
        event.preventDefault();
        $(this).closest('.decision').find('.comments').fadeToggle();
    });
    $('#decisions').on('click', '.decision', function(){
        $(this).toggleClass('highlighted');

        if ($(this).hasClass('highlighted')) {
            $(this).animate({'top': '-10px'}, 'fast');
        }
        else {
            $(this).animate({'top': '0px'}, 'fast');
        }

    });
});