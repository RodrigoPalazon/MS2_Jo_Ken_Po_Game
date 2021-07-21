// alert('Halo Alle maal!');

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
        if(pc === player){
            console.log('TIED BATTLE');
        }else if(pc === 'rock'){
                if(player === 'paper'){
                    console.log('Human WON');
                }else{
                    console.log('Robot WON');
                }
        }else if(pc === 'paper'){
                if(player === 'scissors'){
                    console.log('Human WON');
                }else{
                    console.log('Robot WON');
                }
        }else if(pc === 'scissors'){
            if(player === 'rock'){
            console.log('Human WON');
            }else{
            console.log('Robot WON');
            }
        }
    }
});

