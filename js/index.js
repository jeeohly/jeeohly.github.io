$( document ).ready(function() {
    
});

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];  
}

$("#send").click(function(){
    $.ajax({
        url: "https://icanhazdadjoke.com/",
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if($("#message").val() != ""){
                $("#responses").append("<span class='float-end'><div class='alert alert-primary float-end'>" + $("#message").val() + "</span></div></span>");
                $("#responses").append("<span class='float-start'><div class='alert alert-secondary float-start'>Giobot: " + data.joke + "</div></span>");
                $("#message").val("");
            }
            if($("#responses div").length > 20){
                $("#responses > ").slice(0, 2).remove();
            }
            $("#responses").scrollTop($("#responses")[0].scrollHeight);
        },
        error: function(){
          console.log("Cannot get dad joke.");
        }
    });
}); 

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        $("#send").click()
    }
});