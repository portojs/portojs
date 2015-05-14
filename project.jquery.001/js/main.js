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
    decision.on('click', '.details-button',showDecisionDetails);
    decision.on('mouseenter', 'h3', showDecisionDetails);
    decision.on('keyup', '.quantity', function(){
        var price = +$(this).closest('.decision').data('price');
        var quantity = +$(this).val();
        $('#total').text(price * quantity);
    });
    decision.on('click', '.expand', function(event){
        event.preventDefault();
        $(this).closest('.decision').find('.comments').fadeToggle();
    });
    $('#decisions').on('click', '.decision', function(){
        $(this).css({'border': '1px solid #967'});
    });
});