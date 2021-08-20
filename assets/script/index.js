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

const pointsMade = [
  "#humanPoints",
  "#robotPoints"
];

const imagesPath = [
  "assets/images/rocks/rock_3.jpg",
  "assets/images/papers/paper_5.jpg",
  "assets/images/scissors/scissor_5.png",
];

/** 
* This function gets the button's that was clicked id, sets a random 
value for the 'robotChoice' variable from the constant 'availableChoices' 
above, and displays the related image for the user's and robot's chosen 
option from the constant 'imagePath' above. Invokes 'play()' function.
* @param {String} humanChoice - The id of the clicked button.
* @param {Array} choices - Array of Strings.
* @param {String} robotChoice - One index from variable 'choices'.
* @return {Null} null 
*/
$(".power").click(function getId() {
  $(".power").attr("disabled", true);
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


/** 
* Invokes 'displayJokenpoChoices()', and if 'isTied()'funcion returns false, then
invokes 'increasePoint()' function receiving 'checkWinner()' function as a parameter.
* @param {String} robotChoice - Chosen value from the 'availableChoices' constant.
* @param {String} humanChoice - Chosen value from the 'availableChoices' constant.
* @return {Null} - Null.
*/
function play() {
  displayJokenpoChoices();
  setTimeout(() => {
    if (isTied(robotChoice, humanChoice) === false) {
      increasePoint(checkWinner(robotChoice, humanChoice));
    }
  }, 500);
}


/** 
* Compares both string values, displays the "TIED" value from the constant Object
'winners' and returns a boolean value.
* @param {String} robotChoice - Chosen value from the 'availableChoices' constant.
* @param {String} humanChoice - Chosen value from the 'availableChoices' constant.
* @return {Boolean} - Boolean.
*/
function isTied(robotChoice, humanChoice) {
  if (robotChoice === humanChoice) {
    messageResultHumanDiv.html(winners.tied);
    messageResultRobotDiv.html(winners.tied);
    return true;
  }
  return false;
}


/** 
* Sets css to "display:block" and "display:block" for the 
mentioned images.
* @param {String} jokenpoTagDivId - Id from the HTML's element.
* @param {String} humanTagImgId - Id from the HTML's element.
* @param {String} robotTagImgId - Id from the HTML's element.
* @param {String} vsTagImgId - Id from the HTML's element.
* @return {Null} - Null.
*/
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
    $(".power").attr("disabled", false);
  }, 2500);

  setTimeout(() => {
    messageResultHumanDiv.text("");
    messageResultRobotDiv.text("");
  }, 2500);
};


/** 
*  Increments the winner's points, and invokes the 
'checkEndGame()' function independently of who is the winner.
* @param {String} humanTotalPoints - Points made by the Human.
* @param {String} robotTotalPoints - Points made by the Robot.
* @return {Null} - Null.
*/
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
 Checks if the game is finished, and displays a Div if so.
 * @param {Number} totalPoints - The total points.
 * @param {String} player - The selected choice.
 * @return {Null} - Null.
 */
function checkEndGame(totalPoints, player) {
  let level = sessionStorage.getItem("selectedLevel");
  if (totalPoints === parseInt(points[level])) {
    setTimeout(() => {
      $("#trasparentDiv").css({
        display: "block"
      });
      $("#winnerMessage").text(player);
    }, 2000);
  }
}


/** 
* Compares the humanChoice's and the robotChoice's values and
returns the winner's name.
* @param {String} robotChoice - Random Robot choice from the availableChoices constant.
* @param {String} humanChoice - Clicked button's value got from the availableChoices constant.
* @return {String} - Constant's 'winners' key.
*/
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


/** 
* Sets a BootStrap class for the clicked button 
and removeClass from the others.
* @param {String} element - Id of the clicked button.
* @return {Null} - Null.
*/
function changeStyleSelectedButton(element) {
  $(element).addClass("btn-danger");
  if (element.id === "easy") {
    $("#medium, #hard").removeClass("btn-danger");
  } else if (element.id === "medium") {
    $("#easy, #hard").removeClass("btn-danger");
  } else {
    $("#easy, #medium").removeClass("btn-danger");
  }
}


/** 
* Sets the value of points for the constant {Array} 'pointsMade'.
Invokes the 'changeStyleSelectedButton()' function, and set the 
key and value to the sessionStorage.
* @param {String} level - Button id's name.
* @param {Array} pointsMade - Array of Strings.
* @return {Null} - Null.
*/
function selectLevel(level) {
  $(pointsMade[0]).text(0);
  $(pointsMade[1]).text(0);
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


/** 
* Gets the value in the session Storage from 
the key 'selectedLevel'.
* @return {Null} - Null.
*/
$(document).ready(function () {
  selectLevel(sessionStorage.getItem('selectedLevel'));
});