/**
 * Created by Peter on 12.05.2015.
 */
$(document).ready(function(){

    var filters = $('#filters');
    var decision = $('.decision');

    function showDecisionDetails(){
        $(this).closest('.decision').find('.decision-details').slideDown();
    }

    decision.on('click', '.quote-button', function(){
        var closestDecision = $(this).closest('.decision');
        var amount = decision.data('price');
        var quoteReply = $('<p>From $' + amount + '</p>');
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
    decision.on('click', '.details-button',showDecisionDetails);
    decision.on('mouseenter', 'h3', showDecisionDetails);
});