const points = {
  easy: 3,
  medium: 5,
  hard: 9
}

const humanTagImgId = $("#humanPowerImage");
const robotTagImgId = $("#robotPowerImage");

const availableChoices = {
  rock: "rock",
  paper: "paper",
  scissors: "scissors"
};

const imagesPath = [
  "assets/images/rocks/rock_3.jpg",
  "assets/images/papers/paper_5.jpg",
  "assets/images/scissors/scissor_5.png",
];

let humanChoice;
let robotChoice;

const winners = {
  tied: "TIED BATTLE",
  human: "HUMAN WON",
  robot: "ROBOT WON"
};

const plusOneStr = "+1 POINT";

const messageResultHumanDiv = $("#battleResultHumanPoint");
const messageResultRobotDiv = $("#battleResultRobotPoint");

$(".power").click(function getId() {
  humanChoice = this.id;
  let choices = Object.values(availableChoices);
  robotChoice = choices[Math.floor(Math.random() * 3)];
  console.log(robotChoice);

  if (humanChoice === availableChoices.rock) {
    humanTagImgId.attr("src", imagesPath[0]);
  } else if (humanChoice === availableChoices.paper) {
    humanTagImgId.attr("src", imagesPath[1]);
  } else {
    humanTagImgId.attr("src", imagesPath[2]);
  }

  if (robotChoice === availableChoices.rock) {
    robotTagImgId.attr("src", imagesPath[0]);
  } else if (robotChoice === availableChoices.paper) {
    robotTagImgId.attr("src", imagesPath[1]);
  } else {
    robotTagImgId.attr("src", imagesPath[2]);
  }
  play();

});

function play() {
  displayJokenpoChoices();
  setTimeout(() => {
    if (isTied(robotChoice, humanChoice) === false) {
      increasePoint(checkWinner(robotChoice, humanChoice));
    }
  }, 500);
}

function isTied(robotChoice, humanChoice) {
  if (robotChoice === humanChoice) {
    messageResultHumanDiv.html(winners.tied);
    messageResultRobotDiv.html(winners.tied);
    return true;
  } else {
    return false;
  }
  
}

let displayJokenpoChoices = () => {
  $("#jokenpo").css({
    display: "block"
  });
  $(humanTagImgId).css("display", "block");
  $(robotTagImgId).css("display", "block");
  $("#versusImg").css("display", "block");
  setTimeout(function () {
    $("#jokenpo").css({
      display: "none"
    });
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

  if (winner === winners.human) {
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
  let level = sessionStorage.getItem('selectedLevel');

  if (totalPoints === parseInt(points[level])) {
    $("#trasparentDiv").css({
      display: "block"
    });
    $("#winnerMessage").text(player);
  }
}

function checkWinner(robotChoice, humanChoice) {
  switch (robotChoice) {
    case availableChoices.rock: 
      if (humanChoice === "paper") {
        messageResultHumanDiv.text(plusOneStr);
        return winners.human;
      } else {
        messageResultRobotDiv.text(plusOneStr);
        return winners.robot;
      }

    case availableChoices.paper: 
      if (humanChoice === "scissors") {
        messageResultHumanDiv.text(plusOneStr);
        return winners.human;
      } else {
        messageResultRobotDiv.text(plusOneStr);
        return winners.robot;
      }
    

    case availableChoices.scissors: 
      if (humanChoice === "rock") {
        messageResultHumanDiv.text(plusOneStr);
        return winners.human;
      } else {
        messageResultRobotDiv.text(plusOneStr);
        return winners.robot;
      }

  }
}

function changeStyleSelectedButton(element) {

  $(element).addClass("btn-danger");

  if (element.id === "easy") {
    $('#medium, #hard').removeClass("btn-danger");
  } else if (element.id === "medium") {
    $('#easy, #hard').removeClass("btn-danger");
  } else {
    $('#easy, #medium').removeClass("btn-danger");
  }
}


function selectLevel(level) {
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