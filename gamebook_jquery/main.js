/**
 * Created by Peter on 27.03.2015.
 */
$(document).ready(function() {
    var details = $(".details");
    var heroList = $(".herolist");
    var action = $(".action");
    var enemy = $("#enemy");
    var heroTitles = $(".heroTitle");
    var coldEyes = ".coldeyes";
    var bloodyAxe = ".bloodyaxe";
    var shadowSkill = ".shadowskill";

    // hide things for later
    details.filter(".coldeyes").hide();
    details.filter(".bloodyaxe").hide();
    details.filter(".shadowskill").hide();

    // functions
    function showHeroDetails(heroTitle, heroName) {
        details.filter(".bloodyaxe").hide();
        details.filter(".shadowskill").hide();
        details.filter(".coldeyes").hide();
        details.filter(heroName).slideToggle();
        heroTitles.text($(heroTitle).text());
        heroTitles.animate({"opacity": "1", "top": "-14px"});
    }
    function highlightHero(heroTitle, heroName) {
        var selectHeroTitle = $(heroTitle);
        selectHeroTitle.toggleClass('highlighted');
        if (selectHeroTitle.hasClass('highlighted')) {
            selectHeroTitle.animate({'top': '-10px'}, 'fast');
        }
        else {
            selectHeroTitle.animate({'top': '0px'}, 'fast');
        }
        action.filter(".highlight").removeClass("highlight");
        action.filter(heroName).addClass("highlight");
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
    $(".location").on("click", ".expand", function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).closest(".location").find(".detailedDescription").fadeToggle();
    });
    // filter actions by characters
    heroList.on("click", "#coldeyes", function() {highlightHero("#coldeyes", coldEyes)});
    heroList.on("mouseenter", "#coldeyes", function() {showHeroDetails("#coldeyes", coldEyes)});
    heroList.on("mouseleave", "#coldeyes", function() {
        details.filter(".coldeyes").slideUp();
        $(this).closest(".location").find(".heroTitle").animate({"opacity": "0", "top": "0px"});
    });

    heroList.on("click", "#bloodyaxe", function() {highlightHero("#bloodyaxe", bloodyAxe)});
    heroList.on("mouseenter", "#bloodyaxe", function() {showHeroDetails("#bloodyaxe", bloodyAxe)});
    heroList.on("mouseleave", "#bloodyaxe", function() {
        details.filter(".bloodyaxe").slideUp();
        $(this).closest(".location").find(".heroTitle").animate({"opacity": "0", "top": "0px"});
    });

    heroList.on("click", "#shadowskill", function() {highlightHero("#shadowskill", shadowSkill)});
    heroList.on("mouseenter", "#shadowskill", function() {showHeroDetails("#shadowskill", shadowSkill)});
    heroList.on("mouseleave", "#shadowskill", function() {
        details.filter(".shadowskill").slideUp();
        $(this).closest(".location").find(".heroTitle").animate({"opacity": "0", "top": "0px"});
    });

});