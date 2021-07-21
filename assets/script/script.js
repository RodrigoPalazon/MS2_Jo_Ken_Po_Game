$(document).ready(function() {
    let powers = ['rock', 'paper', 'scissors'];
    let random = Math.floor(Math.random()*3);
    let pc = powers[random];
    console.log(pc);
    
    
        let player;
        let options = ['#rock', '#paper', '#scissors'];
        
        $('#rock').click(function(){
            player = 'rock';
            displayJokenpoMessage();
            compare();
        });

        $('#paper').click(function(){
            player = 'paper';
            displayJokenpoMessage();
            compare();
        });
        $('#scissors').click(function(){
            player = 'scissors';
            displayJokenpoMessage();
            compare();
        });
    

    function compare(){
        let messageDiv = $("#battleResult");
        let message = ["<b>TIED BATTLE</b>", "<b>HUMAN WON</b>", "<b>ROBOT WON</b>"];

        setTimeout(function(){
            if(pc === player){
                messageDiv.html(message[0]);
            }else if(pc === 'rock'){
                    if(player === 'paper'){
                        messageDiv.html(message[1]);
                    }else{
                        messageDiv.html(message[2]);
                    }
            }else if(pc === 'paper'){
                    if(player === 'scissors'){
                        messageDiv.html(message[1]);
                    }else{
                        messageDiv.html(message[2]);
                    }
            }else if(pc === 'scissors'){
                if(player === 'rock'){
                    messageDiv.html(message[1]);
                }else{
                    messageDiv.html(message[2]);
                }
            }

        }, 1500);
    }

    let displayJokenpoMessage = () => {
        let syllables = ['#item1', '#item2', '#item3'];
        // for (syllable of syllables) {
            setTimeout(function(){ 
                $(".jokenpoMessage").css({"display": "inline-flex"}); 
            }, 1000);
        // }
    }

});

