$( document ).ready(function() {
    
});

var responses = ["Ask Jarod", "I don't know", "lolzcatz", "epic face"]

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];  
}

$("#send").click(function(){
    $("#responses").append("<li class='list-group-item' style='text-align:right;'>" + $("#message").val() + "</li>");
    $("#responses").append("<li class='list-group-item'>Giobot: " + getRandomResponse(responses) + "</li>");
    $("#message").val("");
    if($("#responses li").length > 20){
        $("#responses > li").slice(0, 2).remove();
    }
}); 

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        $("#send").click()
    }
});