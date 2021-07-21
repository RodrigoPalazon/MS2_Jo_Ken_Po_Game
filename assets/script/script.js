$(document).ready(function() {
    let powers = ['rock', 'paper', 'scissors'];
    let random = Math.floor(Math.random()*3);
    let pc = powers[random];
    console.log(pc);
    
    let player;
    $('#rock').click(function(){
        player = 'rock';
        compare();
        // console.log(player);
    });

    $('#paper').click(function(){
        player = 'paper';
        compare();
        // console.log(player);
    });
    $('#scissors').click(function(){
        player = 'scissors';
        compare();
        // console.log(player);
    });

    function compare(){
        let messageDiv = $("#battleResult");
        let message = ["<b>TIED BATTLE</b>", "<b>HUMAN WON</b>", "<b>ROBOT WON</b>"]

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
    }
});

