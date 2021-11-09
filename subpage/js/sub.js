$(document).ready(function(){

    $(".navIcons>button").click(function(){

        $("#srchBox").addClass("active");
    });
    $(".btnClose").click(function(){

        $("#srchBox").removeClass("active");

    });
});