/**
 * Created by Peter on 12.05.2015.
 */
$(document).ready(function(){
    $('button').on('click', function(){
        var quoteReply = $('<p>Are you sure?</p>');
        $(this).closest('.decision').append(quoteReply);
        $(this).remove();
    });
});