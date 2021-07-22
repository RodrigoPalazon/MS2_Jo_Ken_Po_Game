$(document).ready(function() {
//...... PC random choice; 
    let powers = ['rock', 'paper', 'scissors'];
    let random = Math.floor(Math.random()*3);
    let pc = powers[random];
    console.log(pc);
    
    let player;
    let options = ['#rock', '#paper', '#scissors'];
    let result;
        
        $('#rock').click(function(){
            player = 'rock';
            play();            
        });

        $('#paper').click(function(){
            player = 'paper';
            play();
        });
        
        $('#scissors').click(function(){
            player = 'scissors';
            play();
        });

        function play(){
            displayJokenpoMessage();
            setTimeout(()=>{
                increasePoint(compare(pc,player));
            }, 500);
        }

  
    function compare(pc,player){
        let messageDiv = $("#battleResult");
        let message = ["TIED BATTLE", "HUMAN WON", "ROBOT WON"];
       
        // let player;
        // let pc;
        
        //    setTimeout(()=>{
                if(pc === player){
                    messageDiv.html(message[0]);
                    
                }else if(pc === 'rock'){
                        if(player === 'paper'){
                            messageDiv.text(message[1]);
                            // humanPoints += 1;
                            return message[1];
                        }else{
                            messageDiv.text(message[2]);
                            return message[2];
                        }
                }else if(pc === 'paper'){
                        if(player === 'scissors'){
                            messageDiv.text(message[1]);
                            return message[1];
                        }else{
                            messageDiv.text(message[2]);
                            return message[2];
                        }
                }else if(pc === 'scissors'){
                    if(player === 'rock'){
                        messageDiv.text(message[1]);
                        return message[1];
                    }else{
                        messageDiv.text(message[2]);
                        return message[2];
                    }
                }
            // increasePoint();
            // }, 1500);
        }
        

    let displayJokenpoMessage = () => {
        // let syllables = ['#item1', '#item2', '#item3'];
        // for (syllable of syllables) {
            // setTimeout(function(){ 
                $(".jokenpoMessage").css({"display": "inline-flex"}); 
            // }, 500);
        // }
    }
    
    function increasePoint (point){
        // setTimeout(function(){
            let message = ["TIED BATTLE", "HUMAN WON", "ROBOT WON"];
            let humanPoints2 = $("#humanPoints").text();
            let robotPoints2 = $("#robotPoints").text();
            
            if(point === message[1]){
                humanPoints2++;
                let print = $("#humanPoints").text(humanPoints2);
            }else if(point === message[2]){
                robotPoints2++;
                let print = $("#robotPoints").text(robotPoints2);
            }else{
                console.log("no points");
            }
        // }, 3500);
    }
});

