const humanTagImgId = $("#humanPowerImage");
const robotTagImgId = $("#robotPowerImage");
const vsTagImgId = $("#versusImg");
const jokenpoTagDivId = $("#jokenpo");
const messageResultHumanDiv = $("#battleResultHumanPoint");
const messageResultRobotDiv = $("#battleResultRobotPoint");
const plusOneStr = "+1 POINT";

let humanChoice;
let robotChoice;

const points = {
  easy: 3,
  medium: 5,
  hard: 9
};

const availableChoices = {
  rock: "rock",
  paper: "paper",
  scissors: "scissors"
};

const winners = {
  tied: "TIED",
  human: "HUMAN WON",
  robot: "ROBOT WON"
};

const imagesPath = [
  "assets/images/rocks/rock_3.jpg",
  "assets/images/papers/paper_5.jpg",
  "assets/images/scissors/scissor_5.png",
];

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
  } 
    return false;
}

let displayJokenpoChoices = () => {
  $(jokenpoTagDivId).css({
    display: "block"
  });
  $(humanTagImgId).css("display", "block");
  $(robotTagImgId).css("display", "block");
  $(vsTagImgId).css("display", "block");
  setTimeout(function () {
    $(jokenpoTagDivId).css({
      display: "none"
    });
    $(humanTagImgId).css("display", "none");
    $(robotTagImgId).css("display", "none");
    $(vsTagImgId).css("display", "none");
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


/**
 * Checks if game is finished
 * 
 * @param {Number} totalPoints - The total points
 * @param {String} player - The selected choice
 * @return {Null} null 
 */
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
      if (humanChoice === availableChoices.paper) {
        messageResultHumanDiv.text(plusOneStr);
        return winners.human;
      } else {
        messageResultRobotDiv.text(plusOneStr);
        return winners.robot;
      }
      break;

    case availableChoices.paper:
      if (humanChoice === availableChoices.scissors) {
        messageResultHumanDiv.text(plusOneStr);
        return winners.human;
      } else {
        messageResultRobotDiv.text(plusOneStr);
        return winners.robot;
      }
      break;


    case availableChoices.scissors:
      if (humanChoice === availableChoices.rock) {
        messageResultHumanDiv.text(plusOneStr);
        return winners.human;
      } else {
        messageResultRobotDiv.text(plusOneStr);
        return winners.robot;
      }
      break;
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