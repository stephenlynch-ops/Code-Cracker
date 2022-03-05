/**
 * This initial code block is set to run once the DOM has loaded. It calls the user to enter
 * their name. Identifies the buttons in the DOM. Allows the user to submit an answer by pressing the enter key
 * It sets the game up at level 1 and calls the game to start.
 */
 document.addEventListener("DOMContentLoaded", function() { 

    getInitialPlayerName();
    
    let buttons = document.getElementsByTagName("button");

    for(let button of buttons){
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "submit"){
                collectUsersAnswers();
            } else {
                resetGame();
            }
        });
    }

    document.getElementById("slot-three").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            collectUsersAnswers();
        }
    });
    document.getElementById("slot-four").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            collectUsersAnswers();
        }
    });
    document.getElementById("slot-five").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            collectUsersAnswers();
        }
    });

    updateGameNumber();
    document.getElementById("level").innerText = 1;
    document.getElementById("slot-three").focus();

    runGame();
});

/**
 * The runGame function generates the number pattern based on the level and populates the numbers
 * in the DOM.
 */
 function runGame() {

    // Get the level number to calculate the required clues   
    let level = parseInt(document.getElementById("level").innerText);
    let levelNum = ++level;

    document.getElementById("slot-one").innerText = level;
    document.getElementById("slot-two").innerText = level + levelNum;
    
}

/**
 * The collectUserAnswers function collects the users inputs and compares them to the expected answers
 * There are 2 error loops. One has actions if the user enters the incorrect answers. The second handles
 * what to do if the user leaves one of the answer input boxes empty and clicks submit.
 */
 function collectUsersAnswers() {

    // Calculate what the next two numbers should be

    let level = parseInt(document.getElementById("level").innerText);
    let levelNum = ++level;

    let slotThreeCorrect = level + (levelNum * 2);
    let slotFourCorrect = slotThreeCorrect + levelNum;
    let slotFiveCorrect = slotFourCorrect + levelNum;

    // Collect the users answer for comparison

    let slotThreeUserAnswer = parseInt(document.getElementById("slot-three").value);
    let slotFourUserAnswer = parseInt(document.getElementById("slot-four").value);
    let slotFiveUserAnswer = parseInt(document.getElementById("slot-five").value);

        if ((document.getElementById("slot-three").value) == "" || (document.getElementById("slot-four").value) == "" || (document.getElementById("slot-five").value) == "" ){
            alert(`You have not completed all of the missing parts of the code`);
            throw `User failed to complete the code. Aborting!`;
        } else if (slotThreeCorrect === slotThreeUserAnswer && slotFourCorrect === slotFourUserAnswer && slotFiveCorrect === slotFiveUserAnswer) {
            alert(`Thats correct. Well done. Lets move on to level ${levelNum}.`);
            clearOldAnswers();
            levelUpdate();
        } else {
            alert(`Sorry thats not correct. The correct answers were ${slotThreeCorrect} , ${slotFourCorrect} and ${slotFiveCorrect}.`);
            gameFailed();
        }    
}

/**
 * This is the general reset function that is called when the player fails a level
 * or if the user clicks the reset game button.
 */
 function gameFailed() {
    clearOldAnswers();

    updateGameHistory();

    removeExcessRows();

    sortTable();

    getPlayerName();

    updateGameNumber();
    document.getElementById("level").innerText = 1;
    document.getElementById("slot-three").focus();

    runGame();
}

/**
 * The level update function prepares the game for the next level by updating the level marker in the DOM
 * and starts the runGame function.
 */
 function levelUpdate() {

    let level = parseInt(document.getElementById("level").innerText);
    let newLevel = ++level;

    document.getElementById("level").innerText = newLevel;
    
    document.getElementById("slot-three").focus();

    runGame();
}

/**
 * This clears any old answers from the input boxes prior to a new game / level
 */
 function clearOldAnswers() {

    document.getElementById("slot-three").value = "";
    document.getElementById("slot-four").value = "";
    document.getElementById("slot-five").value = "";

}

/**
 * This is the reset function that gives the user the option to reset the game
 */
function resetGame() {
    
    let warning = "Confirm RESET game request";

    if (confirm(warning) == true) {
        gameFailed();
    } else {
        alert(`Reset request cancelled`);
    }

}

/**
 * The get player name function checks if the same player is still playing and based on the answer
 * it directs the code to either start a new game or request updated player name information.
 */
 function getPlayerName() {

    let currentPlayer = document.getElementById("player-name").innerText;

    if (currentPlayer == "") {
        getInitialPlayerName();
    } else {
        if (confirm(`Is ${currentPlayer} still playing?`) == false) {
            getInitialPlayerName();
        }
    }
}

/**
 * The get initial player name function is run when the game loads for the first time.
 * This is done to get the initial players name before the first game begins.
 */
 function getInitialPlayerName() {

    var userName = prompt("Please enter you game name", "Mr.E Player");

    if (userName == "" || userName == null) {
        document.getElementById("player-name").innerText = "Mr.E Player";
    } else {
        document.getElementById("player-name").innerText = userName;
    }
}

/**
 * The update game history function takes the users name and the level they reached and
 * logs it to the table in the DOM. This gives the user something to try and improve on.
 */
 function updateGameHistory() {

    // Get player naem and score information
    let playerName = document.getElementById("player-name").innerText;
    let levelCompleted = parseInt(document.getElementById("level").innerText);

    // Evaluate existing game hostory records
    let rowCount = (document.getElementById("game-history").rows.length);
    let rowCountAdj = (rowCount -1);
    let lastRow = document.getElementById("game-history").rows[rowCountAdj].cells;
    let lowestScore = (Number(lastRow[1].innerHTML));

    if (levelCompleted >= lowestScore || document.getElementById("game").innerText == 1 || rowCountAdj < 6) {
        var table = document.getElementById("game-history");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = playerName;
        cell2.innerHTML = levelCompleted;
    } else if (rowCountAdj = 5 && levelCompleted < lowestScore) {
        alert(`Sorry thats not good enough to make the top 5 scores. You need to get to at least level ${lowestScore}.`);
    }

}

/**
 * This sort table function sorts the scores in the table so the
 * scores are in desending order.
 */
function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("game-history");
    switching = true;

    while (switching) {
    
      switching = false;
      rows = table.rows;

      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;

        x = rows[i].getElementsByTagName("TD")[1];
        y = rows[i + 1].getElementsByTagName("TD")[1];

        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {

        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    } 
}

/**
 * The remove excess rows function simply keeps the number of rows in the game history table down to the top 5.
 */
function removeExcessRows() {

    let tabRows = document.getElementById("game-history").rows.length;

    if (tabRows === 7) {
        document.getElementById("game-history").deleteRow(6);
    } 

}

/**
 * The update game number function keeps a running count of the number of games played since the site was loaded.
 */
function updateGameNumber() {

    let game = parseInt(document.getElementById("game").innerText);
    let newGame = ++game;

    document.getElementById("game").innerText = newGame;

}