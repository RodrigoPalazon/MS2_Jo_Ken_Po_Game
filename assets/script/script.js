$(document).ready(function() {

// menu.html
let difficultyBtn = '#menuPageDifficulty';
let levels = ['EASY', 'MEDIUM', 'HARD'];

// Switch the button's text  
let i = 0;
let j= i;
j++;
let buttonLevel = $(difficultyBtn).click(function(){
    if(j == levels.length){
        j=i;
        $(difficultyBtn).text(levels[j]);
        j++;
        // console.log(levels[j]);
        return levels[j];
    }else{
        // console.log(j);
        $(difficultyBtn).text(levels[j]);
        j++;
        return levels[j];
    }
});


  
//...... PC random choice; 
        let powers = ['rock', 'paper', 'scissors'];
        // generate a random index 
        let pc = powers[Math.floor(Math.random()*3)];
        console.log(pc);

    let player;
    let options = ['#rock', '#paper', '#scissors'];
    let result;
        
    
    let imagesPath = [ 'assets/images/rocks/rock_3.jpg', 
                       'assets/images/papers/paper_4.jpg', 
                       'assets/images/scissors/scissor_5.png'
                    ];

    //Rock,Paper, Scissors
    $('.power').click(function getId(btn_id){

        // setTimeout(function(){ console.log('waiting to display the image'); }, 3000);

        btn_id = this.id;
        player = btn_id;
        console.log("The ID chosen is "+ player);

        let humanImg = $('#humanPowerImage');
        let robotImg = $('#robotPowerImage');
        
        $(humanImg).css("display", "block");
        $(robotImg).css("display", "block");

        if(btn_id === 'rock'){
            humanImg.attr('src', imagesPath[0]);
        }else if(btn_id === 'paper'){
            humanImg.attr('src', imagesPath[1]);
        }else{
            humanImg.attr('src', imagesPath[2]);
        }

        if(pc === 'rock'){
            robotImg.attr('src', imagesPath[0]);
        }else if(pc === 'paper'){
            robotImg.attr('src', imagesPath[1]);
        }else{
            robotImg.attr('src', imagesPath[2]);
        }
        play();

        setTimeout(function(){
            $(humanImg).css("display", "none");
            $(robotImg).css("display", "none");
        }, 2500);
        
        // return btn_id;
    });

    if(buttonLevel === 'EASY'){
        $('#easyLevel').click();
    }
    // $('#rock').click(function(){
        //     player = 'rock';
        //     play();  
        //     // player = '';       
        // });

        // $('#paper').click(function(){
        //     player = 'paper';
        //     play();
        // });
        
        // $('#scissors').click(function(){
        //     player = 'scissors';
        //     play();
        // });

        function play(){
            displayJokenpoMessage();
            setTimeout(()=>{
                increasePoint(compare(pc,player));
                player;
                pc = powers[Math.floor(Math.random()*3)];
                console.log(pc);
            }, 500);
        }


    function compare(pc,player){
        let messageDiv = $("#battleResult");
        let message = ["TIED BATTLE", "HUMAN WON", "ROBOT WON"];
       
            function timerMessage(){
                setTimeout(() => {
                    messageDiv.text('');
                }, 1500);
            }
        // let player;
        // let pc;
        
        //    setTimeout(()=>{
                if(pc === player){
                    messageDiv.html(message[0]);
                    timerMessage();
                    return message[0];
                }else if(pc === 'rock'){
                        if(player === 'paper'){
                            messageDiv.text(message[1]);
                            timerMessage();
                            return message[1];
                        }else{
                            messageDiv.text(message[2]);
                            timerMessage();
                            return message[2];
                        }
                }else if(pc === 'paper'){
                        if(player === 'scissors'){
                            messageDiv.text(message[1]);
                            timerMessage();
                            return message[1];
                        }else{
                            messageDiv.text(message[2]);
                            timerMessage();
                            return message[2];
                        }
                }else if(pc === 'scissors'){
                    if(player === 'rock'){
                        messageDiv.text(message[1]);
                        timerMessage();
                        return message[1];
                    }else{
                        messageDiv.text(message[2]);
                        timerMessage();
                        return message[2];
                    }
                }
            // increasePoint();
            // }, 1500);
           
        }
        

    let displayJokenpoMessage = () => {
      $("#jokenpo").css({"display": "block"}); 
      setTimeout(function(){
            $("#jokenpo").css({"display": "none"}); 
        },2500); 
    }
    
    function increasePoint (point){
        // setTimeout(function(){
            let message = ["TIED BATTLE", "HUMAN WON", "ROBOT WON"];
            let humanPoints2 = $("#humanPoints").text();
            let robotPoints2 = $("#robotPoints").text();
            
            if(point === message[1]){
                humanPoints2++;
                let print = $("#humanPoints").text(humanPoints2);
                
                if(humanPoints2 === parseInt($('.difficultyPoints').text()[0])){
                    console.log('END OF THE GAME, Human won!');
                    $('#trasparentDiv').css({"display": "block"});
                    $('#winnerMessage').text('HUMAN WON');
                }
            }else if(point === message[2]){
                robotPoints2++;
                let print = $("#robotPoints").text(robotPoints2);

                if(robotPoints2 === parseInt($('.difficultyPoints').text()[0])){
                    console.log('END OF THE GAME, Robot won!')
                    $('#trasparentDiv').css({"display": "block"});
                    $('#winnerMessage').text('ROBOT WON');
                }
            }else{
                console.log("no points");
            }
        // }, 3500);
    }

    // Difficulty buttons 

    $('#easyLevel').click(function(){
        $('.difficultyPoints').text('3');
        $('#mediumLevel').removeClass('btn-success');
        $('#hardLevel').removeClass('btn-success');
        $(this).addClass('btn-success');
    });
    $('#easyLevel').click();

    $('#mediumLevel').click(function(){
        $('.difficultyPoints').text('5');
        $('#easyLevel').removeClass('btn-success');
        $('#hardLevel').removeClass('btn-success');
        $(this).addClass('btn-success');
    });
    $('#hardLevel').click(function(){
        $('.difficultyPoints').text('9');
        $('#easyLevel').removeClass('btn-success');
        $('#mediumLevel').removeClass('btn-success');
        $(this).addClass('btn-success');
    });
    
    

});

