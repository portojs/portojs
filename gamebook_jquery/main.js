/**
 * Created by Peter on 27.03.2015.
 */
$(document).ready(function() {
    $("#rangerVision").on('click', function(){
        var enemy = $("#enemy");
        var command1 = $("<li>Call Ranger's Speed</li>");
        var command2 = $("<li>Call Ranger's Strength</li>");
        var enemyDescription = $("<p>It has a limp and seems to be uncertain. There is also a gap in it's armored skin, that could be used.</p>");
        $(this).closest(".actions").append(command1, command2);
        $(this).remove();
        enemy.find("p").remove();
        enemy.append(enemyDescription);
    });
});