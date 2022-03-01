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
            alert(`Sorry thats not correct. The correct asnswers were ${slotThreeCorrect} , ${slotFourCorrect} and ${slotFiveCorrect}.`);
            gameFailed();
        }    
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