var helpDialog = "Hi this is Giobot. Send a message to receive a random joke.<br>For my email enter 'email'.<br>For my phone # enter 'phone'.<br>To bring this dialog up again enter 'help'."

$( document ).ready(function() {
    $("#responses").append("<span class='float-start'><div class='alert alert-secondary float-start'>Giobot: " + helpDialog + "</div></span>").children(':last').hide().fadeIn(500);
});

// function to cycle border colors for responses 
var colors = ["red", "green", "blue", "purple", "yellow", "orange"];
var currentColor = 0;
function switchColor() {    
    if (currentColor >= colors.length) currentColor = 0;
    $("#responses div").last().css('border-width', "3px");
    $("#responses div").last().css('border-color', colors[currentColor++]);
    setTimeout(switchColor, 250);
}

var profileResponses = {
    'email': 'giolee8@proton.me',
    'phone': '5102993108',
    'help': helpDialog
}

$("#send").click(function(){
    $.ajax({
        url: "https://icanhazdadjoke.com/",
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // filter out html tags to avoid html injections via message input
            $("#message").val().replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();

            var message = data.joke
            if ($("#message").val() in profileResponses){
                message = profileResponses[$("#message").val() ];
            }

            if($("#message").val() != ""){
                $("#responses").append("<span class='float-end'><div class='alert alert-primary float-end'>" + $("#message").val() + "</span></div></span>").children(':last').hide().fadeIn(500);;
                $("#responses").append("<span class='float-start'><div class='alert alert-secondary float-start'>Giobot: " + message + "</div></span>").children(':last').hide().fadeIn(500);;
                $("#message").val("");
            }
            // Remove last 2 responses to avoid memory leak
            if($("#responses div").length > 20){
                $("#responses > ").slice(0, 2).remove();
            }

            //remove borders from all responses then flash colors for last response
            $("#responses div").css('border-width', "0px");
            switchColor();

            // Jump to bottom of responses 
            $("#responses").scrollTop($("#responses")[0].scrollHeight);
        },
        error: function(){
          console.log("I don't know.");
        }
    });
}); 

// Allow user to enter message via return key
$(document).on('keypress',function(e) {
    if(e.which == 13) {
        $("#send").click()
    }
});