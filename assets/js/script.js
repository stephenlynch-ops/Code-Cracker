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

    document.getElementById("level").innerText = 1;
    document.getElementById("slot-three").focus();

    runGame();
});

function runGame() {

}

function collectUsersAnswers() {

}

function gameFailed() {

}

function levelUpdate() {

}

function clearOldAnswers() {

}

function resetGame() {

}

function getPlayerName() {

}

function getInitialPlayerName() {

}

function updateGameHistory() {

}