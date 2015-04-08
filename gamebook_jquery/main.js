/**
 * Created by Peter on 27.03.2015.
 */
$(document).ready(function() {
    var heroList = $(".herolist");
    var action = $(".action");

    // calling Ranger Vision
    $(".actions").on("click", "#rangerVision", function(){
        var enemy = $("#enemy");
        var enemyHealth = enemy.data("hp");
        var command1 = $("<li>Call Ranger's Speed</li>");
        var command2 = $("<li>Call Ranger's Strength</li>");
        var enemyDescription = $("<p>There is also a gap in it's armored skin, that could be used. Its health: " + enemyHealth + " HP.</p>");
        $(this).closest(".actions").append(command1, command2);
        $(this).remove();
        enemy.find("p").remove();
        enemy.append(enemyDescription);
    });

    // filtering actions by characters
    heroList.on("click", "#coldeyes", function() {
        action.filter(".highlight").removeClass("highlight");
        action.filter(".coldeyes").addClass("highlight");
    });
    heroList.on("click", "#bloodyaxe", function() {
        action.filter(".highlight").removeClass("highlight");
        action.filter(".bloodyaxe").addClass("highlight");
    });
    heroList.on("click", "#shadowskill", function() {
        action.filter(".highlight").removeClass("highlight");
        action.filter(".shadowskill").addClass("highlight");
    });

});