/**
 * Created by Peter on 12.05.2015.
 */
$(document).ready(function(){
    var filters = $('#filters');
    var decision = $('.decision');
    decision.on('click', 'button', function(){
        var decision = $(this).closest('.decision');
        var amount = decision.data('price');
        var quoteReply = $('<p>From $' + amount + '</p>');
        decision.append(quoteReply);
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
});