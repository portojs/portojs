/**
 * Created by Peter on 27.03.2015.
 */
$(document).ready(function() {
    var details = $(".details");
    var heroList = $(".herolist");
    var action = $(".action");
    var enemy = $("#enemy");
    var coldEyes = ".coldeyes";
    var bloodyAxe = ".bloodyaxe";
    var shadowSkill = ".shadowskill";

    // hide things for later
    details.filter(".coldeyes").hide();
    details.filter(".bloodyaxe").hide();
    details.filter(".shadowskill").hide();

    // functions
    function showHeroDetails(heroName) {
        details.filter(".bloodyaxe").hide();
        details.filter(".shadowskill").hide();
        details.filter(".coldeyes").hide();
        details.filter(heroName).slideToggle();
    }

    // call Ranger Vision
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
    // show detailed description for location
    $(".location").on("click", ".expand", function () {
        $(this).closest(".location").find(".detailedDescription").fadeToggle();
    });
    // filter actions by characters
    heroList.on("click", "#coldeyes", function() {
        action.filter(".highlight").removeClass("highlight");
        action.filter(".coldeyes").addClass("highlight");
    });
    heroList.on("mouseenter", "#coldeyes", function() {showHeroDetails(coldEyes)});
    heroList.on("mouseleave", "#coldeyes", function() {
        details.filter(".coldeyes").slideUp();
    });
        heroList.on("click", "#bloodyaxe", function() {
        action.filter(".highlight").removeClass("highlight");
        action.filter(".bloodyaxe").addClass("highlight");
    });
    heroList.on("mouseenter", "#bloodyaxe", function() {showHeroDetails(bloodyAxe)});
    heroList.on("mouseleave", "#bloodyaxe", function() {
        details.filter(".bloodyaxe").slideUp();
    });
    heroList.on("click", "#shadowskill", function() {
        action.filter(".highlight").removeClass("highlight");
        action.filter(".shadowskill").addClass("highlight");
    });
    heroList.on("mouseenter", "#shadowskill", function() {showHeroDetails(shadowSkill)});
    heroList.on("mouseleave", "#shadowskill", function() {
        details.filter(".shadowskill").slideUp();
    });

});