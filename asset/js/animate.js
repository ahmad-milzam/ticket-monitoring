$(document).ready(function () {
    $(function() { 

        $("#hide-count-gio-1").on('click', function(){
    
            if (!$(this).hasClass("expanded")){
                    $("#detail-1").hide();
                    $("#line-1").hide();
                    $(".ticket-1").animate({height: '100px',},"slow").css({"border" : "1px solid #3aff78"});
                    $(this).css({"transform":"rotate(180deg)"})
                    $(this).addClass("expanded");
            }
            else {
                    $("#detail-1").show();
                    $("#line-1").show();
                    $(".ticket-1").animate({height: '205px',},"slow").css({"border" : "1px solid #FB3AFF"});
                    $(this).css({"transform":"rotate(0deg)"})
                    $(this).removeClass("expanded");
            }
        });

        $("#hide-count-gio-2").on('click', function(){
    
            if (!$(this).hasClass("expanded")){
                    $("#detail-2").hide();
                    $("#line-2").hide();
                    $(".ticket-2").animate({height: '100px',},"slow").css({"border" : "1px solid #3aff78"});
                    $(this).css({"transform":"rotate(180deg)"})
                    $(this).addClass("expanded");
            }
            else {
                    $("#detail-2").show();
                    $("#line-2").show();
                    $(".ticket-2").animate({height: '205px',},"slow").css({"border" : "1px solid #FB3AFF"});
                    $(this).css({"transform":"rotate(0deg)"})
                    $(this).removeClass("expanded");
            }
        });

        $("#hide-count-gio-3").on('click', function(){
    
            if (!$(this).hasClass("expanded")){
                    $("#detail-3").hide();
                    $("#line-3").hide();
                    $(".ticket-3").animate({height: '100px',},"slow").css({"border" : "1px solid #3aff78"});
                    $(this).css({"transform":"rotate(180deg)"})
                    $(this).addClass("expanded");
            }
            else {
                    $("#detail-3").show();
                    $("#line-3").show();
                    $(".ticket-3").animate({height: '205px',},"slow").css({"border" : "1px solid #FB3AFF"});
                    $(this).css({"transform":"rotate(0deg)"})
                    $(this).removeClass("expanded");
            }
        });
        
    });
});