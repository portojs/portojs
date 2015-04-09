/**
 * Created by Peter on 27.03.2015.
 */
$(document).ready(function() {
    var details = $(".details");
    var heroList = $(".herolist");
    var action = $(".action");
    var enemy = $("#enemy");

    // hiding things for later
    details.filter(".coldeyes").hide();
    details.filter(".bloodyaxe").hide();
    details.filter(".shadowskill").hide();

    // functions
    function showHeroDetails() {
        details.filter(".bloodyaxe").hide();
        details.filter(".shadowskill").hide();
        details.filter(".coldeyes").hide();
        details.filter(".coldeyes").slideToggle();
    }

    // calling Ranger Vision
    $(".actions").on("click", "#rangerVision", function(){
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
    heroList.on("mouseenter", "#coldeyes", showHeroDetails);
    heroList.on("mouseleave", "#coldeyes", function() {
        details.filter(".coldeyes").slideToggle();
    });
        heroList.on("click", "#bloodyaxe", function() {
        action.filter(".highlight").removeClass("highlight");
        action.filter(".bloodyaxe").addClass("highlight");
    });
    heroList.on("mouseenter", "#bloodyaxe", showHeroDetails);
    heroList.on("mouseleave", "#bloodyaxe", function() {
        details.filter(".bloodyaxe").slideToggle();
    });
    heroList.on("click", "#shadowskill", function() {
        action.filter(".highlight").removeClass("highlight");
        action.filter(".shadowskill").addClass("highlight");
    });
    heroList.on("mouseenter", "#shadowskill", showHeroDetails);
    heroList.on("mouseleave", "#shadowskill", function() {
        details.filter(".shadowskill").slideToggle();
    });

});