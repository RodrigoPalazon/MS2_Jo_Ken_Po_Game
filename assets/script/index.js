const points = {
  easy: 3,
  medium: 5,
  hard: 9
}

$(document).ready(function () {
  let selectedLevel = sessionStorage.getItem('selectedLevel');

  selectLevel(selectedLevel);
  
  //...... PC random choice;
  let powers = ["rock", "paper", "scissors"];
  // generate a random index
  let pc = powers[Math.floor(Math.random() * 3)];
  console.log(pc);

  let player;
  let options = ["#rock", "#paper", "#scissors"];
  let result;

  let imagesPath = [
    "assets/images/rocks/rock_3.jpg",
    "assets/images/papers/paper_5.jpg",
    "assets/images/scissors/scissor_5.png",
  ];

  //.....Recognize by its id,  which button was clicked (Rock,Paper, Scissors).
  $(".power").click(function getId(btn_id) {
    // setTimeout(function(){ console.log('waiting to display the image'); }, 3000);

    btn_id = this.id;
    player = btn_id;
    console.log("The ID chosen is " + player);

    let humanImg = $("#humanPowerImage");
    let robotImg = $("#robotPowerImage");

    $(humanImg).css("display", "block");
    $(robotImg).css("display", "block");
    $("#versusImg").css("display", "block");
    setTimeout(function () {
      $("#versusImg").css("display", "none");
    }, 2500);

    if (btn_id === "rock") {
      humanImg.attr("src", imagesPath[0]);
    } else if (btn_id === "paper") {
      humanImg.attr("src", imagesPath[1]);
    } else {
      humanImg.attr("src", imagesPath[2]);
    }

    if (pc === "rock") {
      robotImg.attr("src", imagesPath[0]);
    } else if (pc === "paper") {
      robotImg.attr("src", imagesPath[1]);
    } else {
      robotImg.attr("src", imagesPath[2]);
    }
    play();

    setTimeout(function () {
      $(humanImg).css("display", "none");
      $(robotImg).css("display", "none");
    }, 2500);

    // return btn_id;
  });

  // if (buttonLevel === "EASY") {
  //   $("#easyLevel").click();
  // }

  // Trigger for the functions:
  // -displayJokenpoMessage();
  // -increasePoint();
  // -compare();

  function play() {
    displayJokenpoMessage();
    setTimeout(() => {
      increasePoint(compare(pc, player));
      player;
      pc = powers[Math.floor(Math.random() * 3)];
      console.log(pc);
    }, 500);
  }

  // Compare the players' results
  function compare(pc, player) {
    let messageDiv = $("#battleResultHumanPoint");
    let messageDivRobot = $("#battleResultRobotPoint");
    let message = ["TIED BATTLE", "HUMAN WON", "ROBOT WON"];
    let plusOneStr = "+1 POINT";

    function timerMessage() {
      setTimeout(() => {
        messageDiv.text("");
        messageDivRobot.text("");
      }, 2000);
    }
    // let player;
    // let pc;

    //    setTimeout(()=>{
    if (pc === player) {
      messageDiv.html(message[0]);
      messageDivRobot.html(message[0]);
      timerMessage();
      return message[0];
    } else if (pc === "rock") {
      if (player === "paper") {
        messageDiv.text(plusOneStr);
        timerMessage();
        return message[1];
      } else {
        messageDivRobot.text(plusOneStr);
        timerMessage();
        return message[2];
      }
    } else if (pc === "paper") {
      if (player === "scissors") {
        messageDiv.text(plusOneStr);
        timerMessage();
        return message[1];
      } else {
        messageDivRobot.text(plusOneStr);
        timerMessage();
        return message[2];
      }
    } else if (pc === "scissors") {
      if (player === "rock") {
        messageDiv.text(plusOneStr);
        timerMessage();
        return message[1];
      } else {
        messageDivRobot.text(plusOneStr);
        timerMessage();
        return message[2];
      }
    }
    // increasePoint();
    // }, 1500);
  }

  // Display a text when some power button is clicked.
  let displayJokenpoMessage = () => {
    $("#jokenpo").css({ display: "block" });
    setTimeout(function () {
      $("#jokenpo").css({ display: "none" });
    }, 2500);
  };

  // Increase the points and display a div in the
  // end of the game showing how is the winner
  function increasePoint(point) {
    // setTimeout(function(){
    let message = ["TIED BATTLE", "HUMAN WON", "ROBOT WON"];
    let humanPoints2 = $("#humanPoints").text();
    let robotPoints2 = $("#robotPoints").text();

    if (point === message[1]) {
      humanPoints2++;
      let print = $("#humanPoints").text(humanPoints2);

      if (humanPoints2 === parseInt($(".difficultyPoints").text()[0])) {
        // console.log("END OF THE GAME, Human won!");
        $("#trasparentDiv").css({ display: "block" });
        $("#winnerMessage").text("HUMAN WON");
      }
    } else if (point === message[2]) {
      robotPoints2++;
      let print = $("#robotPoints").text(robotPoints2);

      if (robotPoints2 === parseInt($(".difficultyPoints").text()[0])) {
        // console.log("END OF THE GAME, Robot won!");
        $("#trasparentDiv").css({ display: "block" });
        $("#winnerMessage").text("ROBOT WON");
      }
    } else {
      console.log("no points");
    }
    // }, 3500);
  }


  function changeStyleSelectedButton(element) {
   
    $(element).addClass("btn-danger");
    
    if(element.id === "easy"){
      $('#medium, #hard').removeClass("btn-danger");
    }else if(element.id === "medium"){
      $('#easy, #hard').removeClass("btn-danger");
    }else{
      $('#easy, #medium').removeClass("btn-danger");
    }
  }
 
  $("#easy").click(function () {
    selectLevel("easy");
  });

  $("#medium").click(function () {
    selectLevel("medium");
  });

  $("#hard").click(function () {
    selectLevel("hard");
  });
  
  function selectLevel(level){
    changeStyleSelectedButton($("#" + level)[0]);
    $(".difficultyPoints").text(points[level]);
    sessionStorage.setItem("selectedLevel", level);
  }
});
