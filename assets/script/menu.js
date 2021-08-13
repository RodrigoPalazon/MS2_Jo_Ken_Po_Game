const difficultyBtn = "#menuPageDifficulty";
const levels = ["EASY", "MEDIUM", "HARD"];
const selectedLevelKey = "selectedLevel";
let selectedLevelIndex = 0;

$(document).ready(function () {
  sessionStorage.setItem(selectedLevelKey, levels[0].toLowerCase());
});

$(difficultyBtn).click(function () {
  selectedLevelIndex++;
  if (selectedLevelIndex === levels.length) {
    selectedLevelIndex = 0;
  }

  $(difficultyBtn).text(levels[selectedLevelIndex]);
  sessionStorage.setItem(selectedLevelKey, levels[selectedLevelIndex].toLowerCase());
});