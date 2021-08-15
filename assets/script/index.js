const points = {
  easy: 3,
  medium: 5,
  hard: 9
}

const humanTagImgId = $("#humanPowerImage");
const robotTagImgId = $("#robotPowerImage");

const availableChoices = ["rock", "paper", "scissors"];

const imagesPath = [
  "assets/images/rocks/rock_3.jpg",
  "assets/images/papers/paper_5.jpg",
  "assets/images/scissors/scissor_5.png",
];

let humanChoice;
let robotChoice;

const winners = {
  tied:"TIED BATTLE",
  human: "HUMAN WON",
  robot: "ROBOT WON"
};

const plusOneStr = "+1 POINT";

const messageResultHumanDiv = $("#battleResultHumanPoint");
const messageResultRobotDiv = $("#battleResultRobotPoint");

$(".power").click(function getId() {
  humanChoice = this.id;

  robotChoice = availableChoices[Math.floor(Math.random() * 3)];
  console.log(robotChoice);

  if (humanChoice === "rock") {
    humanTagImgId.attr("src", imagesPath[0]);
  } else if (humanChoice === "paper") {
    humanTagImgId.attr("src", imagesPath[1]);
  } else {
    humanTagImgId.attr("src", imagesPath[2]);
  }

  if (robotChoice === "rock") {
    robotTagImgId.attr("src", imagesPath[0]);
  } else if (robotChoice === "paper") {
    robotTagImgId.attr("src", imagesPath[1]);
  } else {
    robotTagImgId.attr("src", imagesPath[2]);
  }
  play();

});

function play() {
  displayJokenpoResult();
  setTimeout(() => {
    increasePoint(compare(robotChoice, humanChoice));
  }, 500);
}

let displayJokenpoResult = () => {
  $("#jokenpo").css({ display: "block" });
  $(humanTagImgId).css("display", "block");
  $(robotTagImgId).css("display", "block");
  $("#versusImg").css("display", "block");
  setTimeout(function () {
  $("#jokenpo").css({ display: "none" });
  $(humanTagImgId).css("display", "none");
  $(robotTagImgId).css("display", "none");
  $("#versusImg").css("display", "none");
  }, 2500);

  setTimeout(() => {
    messageResultHumanDiv.text("");
    messageResultRobotDiv.text("");
  }, 2500);
};

function increasePoint(winner) {

  let humanTotalPoints = $("#humanPoints").text();
  let robotTotalPoints = $("#robotPoints").text();

  if (winner === winners["human"]) {
    humanTotalPoints++;
    $("#humanPoints").text(humanTotalPoints);

    checkEndGame(humanTotalPoints, winner);
  } else {
    robotTotalPoints++;
    $("#robotPoints").text(robotTotalPoints);

    checkEndGame(robotTotalPoints, winner);
  }
}

function checkEndGame(totalPoints, player) {
  if (totalPoints === parseInt($(".difficultyPoints").text()[0])) {
    $("#trasparentDiv").css({ display: "block" });
    $("#winnerMessage").text(player);
  }
}

function compare(robot, human) {

  if (robot === human) {
    messageResultHumanDiv.html(winners["tied"]);
    messageResultRobotDiv.html(winners["tied"])
    return winners["tied"];
  } else if (robot === "rock") {
    if (human === "paper") {
      messageResultHumanDiv.text(plusOneStr);
      return winners["human"];
    } else {
      messageResultRobotDiv.text(plusOneStr);
      return winners["robot"];
    }
  } else if (robot === "paper") {
    if (human === "scissors") {
      messageResultHumanDiv.text(plusOneStr);
      return winners["human"];
    } else {
      messageResultRobotDiv.text(plusOneStr);
      return winners["robot"];
    }
  } else if (robot === "scissors") {
    if (human === "rock") {
      messageResultHumanDiv.text(plusOneStr);
      return winners["human"];
    } else {
      messageResultRobotDiv.text(plusOneStr);
      return winners["robot"];
    }
  }
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


function selectLevel(level){
  changeStyleSelectedButton($("#" + level)[0]);
  $(".difficultyPoints").text(points[level]);
  sessionStorage.setItem("selectedLevel", level);
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

$(document).ready(function () {
  selectLevel(sessionStorage.getItem('selectedLevel'));
});
