const difficultyBtn = "#menuPageDifficulty";
const levels = ["EASY", "MEDIUM", "HARD"];
const selectedLevelKey = "selectedLevel";
let selectedLevelIndex = 0;


/** 
 * Sets the key and value in the session storage.
 * @return {Null} - Null.
 */
$(document).ready(function () {
  sessionStorage.setItem(selectedLevelKey, levels[0].toLowerCase());
});


/** 
* Maps the constant {Array} and returns to the its
first index when acheived the last, and sets the key and value
to the session Storage.
* @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
* @param {Integer} selectedLevelIndex - Increments the array's index.
* @return {Null} - Null.
*/
$(difficultyBtn).click(function () {
  selectedLevelIndex++;
  if (selectedLevelIndex === levels.length) {
    selectedLevelIndex = 0;
  }

  $(difficultyBtn).text(levels[selectedLevelIndex]);
  sessionStorage.setItem(selectedLevelKey, levels[selectedLevelIndex].toLowerCase());
});