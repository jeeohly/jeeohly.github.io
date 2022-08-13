$( document ).ready(function() {
    
});

var responses = ["Ask Jarod", "I don't know", "lolzcatz", "epic face"]

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];  
}

$("#send").click(function(){
    if($("#message").val() != ""){
        $("#responses").append("<span class='float-end'><div class='alert alert-primary float-end'>" + $("#message").val() + "</span></div></span>");
        $("#responses").append("<span class='float-start'><div class='alert alert-secondary float-start'>Giobot: " + getRandomResponse(responses) + "</div></span>");
    }
    if($("#responses div").length > 20){
        $("#responses > ").slice(0, 2).remove();
    }
    $("#responses").scrollTop($("#responses")[0].scrollHeight);
}); 

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        $("#send").click()
    }
});