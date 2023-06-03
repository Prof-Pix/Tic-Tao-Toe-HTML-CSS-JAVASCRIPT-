const turnSaver = [0,1,2,3,4,5,6,7,8,9];

// Variable to be used for checking the turn
let counter = 1;

let player1score = 0
let player2score = 0;

let gameCounter = 0;

function isStarting() {
    document.querySelector(".start-reset-button").innerHTML = "Now Playing!";
    document.querySelector(".start-reset-button").style.backgroundColor = "#262626";
    document.querySelector(".result-shower").innerHTML = "FIRST TURN <br><b>Player 1 [X]</b>"

    for (let i = 1; i <= 9; i++) {
        const boxName = `box${i}`;
        const targetBox = mainBoxes[boxName];
        targetBox.addEventListener("click", function eventClick() { displayTurn(i) });
    }

}

function resetButton() {
    for (let i = 1; i <= 9; i++) {
        const boxName = `box${i}`;
        const targetBox = mainBoxes[boxName];
        targetBox.innerHTML = "";
        targetBox.style.backgroundColor = "";
        turnSaver[i] = i;
        targetBox.style.removeProperty("pointer-events");
    }

    document.querySelector(".winner-loser").style.backgroundColor = "";
    document.querySelector(".result-shower").innerHTML = "";
    document.querySelector(".reset-notif").innerHTML = "";
    clearInterval(intervalId);
    counter = 1;
}

// DOM of the Sub-Containers
const mainBoxes  = {
        box1: document.querySelector(".sub-container1"), 
        box2: document.querySelector(".sub-container2"),
        box3: document.querySelector(".sub-container3"),
        box4: document.querySelector(".sub-container4"),
        box5: document.querySelector(".sub-container5"),
        box6: document.querySelector(".sub-container6"),
        box7: document.querySelector(".sub-container7"),
        box8: document.querySelector(".sub-container8"),
        box9: document.querySelector(".sub-container9")
    };

function displayTurn(contNum) {

    const boxName = `box${contNum}`;
    const targetBox = mainBoxes[boxName];
    const existingPar = targetBox.querySelector('p');

    if (existingPar) {
        return;
    }

    else {
        let turnUser = document.createElement('p');

        if (counter % 2 == 0) {
            turnUser.textContent = "O";
            turnUser.style.fontSize = "75px";
            turnUser.style.fontFamily = 'Glory, sans-serif';
            turnUser.style.color = "#052e16";
            targetBox.appendChild(turnUser);
            turnSaver[contNum] = "O";
            winChecker ();
            counter++;
        }

        else {
                turnUser.textContent = "X";
                turnUser.style.fontSize = "75px";
                turnUser.style.color = "#020617";
                turnUser.style.fontFamily = 'Glory, sans-serif';
                targetBox.appendChild(turnUser);
                turnSaver[contNum] = "X";
                winChecker ();
                counter++;
            }
        }
    
        
}

function winChecker () {
    const player1 = document.querySelector(".play1-score");
    const player2 = document.querySelector(".play2-score");

    if ( (turnSaver[1] === turnSaver[2] && turnSaver[2] === turnSaver[3]) || (turnSaver[1] === turnSaver[5] && turnSaver[5] === turnSaver[9]) ||  
    (turnSaver[1] === turnSaver[4] && turnSaver[4] === turnSaver[7]) || 
    (turnSaver[2] === turnSaver[5] && turnSaver[5] === turnSaver[8]) || 
    (turnSaver[3] === turnSaver[5] && turnSaver[5] === turnSaver[7]) || 
    (turnSaver[4] === turnSaver[5] && turnSaver[5] === turnSaver[6]) || 
    (turnSaver[7] === turnSaver[8] && turnSaver[8] === turnSaver[9]) || 
    (turnSaver[3] === turnSaver[6] && turnSaver[6] === turnSaver[9])  ) {

        if (counter % 2 == 0) {
            player2score++;
            gameCounter++;
            player2.innerHTML = `Player 2 [O] :&nbsp; <b>${player2score}</b>`;
            winnerFunction();
            disableDiv();
            document.querySelector(".result-shower").innerHTML = "WINNER  <br> <b>Player 2 [O]</b>";
            historyList(2,1, gameCounter);
        }
        else {
            player1score++;
            gameCounter++;
            player1.innerHTML = `Player 1 [X] :&nbsp; <b>${player1score}</b>`;
            winnerFunction();
            disableDiv();
            document.querySelector(".result-shower").innerHTML = "WINNER <br> <b>Player 1 [X]</b>";
            historyList(1,2, gameCounter);
            
        }
        
    }

    else {
        if (counter == 9) {
            gameCounter++;
            historyList(0,0, gameCounter);
            document.querySelector(".result-shower").innerHTML = "NO WINNER  <br> <b>TIE</b>";
            winnerFunction();
            return;
        }
        else if ((counter + 1) % 2 == 0) {
            document.querySelector(".result-shower").innerHTML = "TURN <br> <b>Player 2 [O]</b>";
        }
        else {
            document.querySelector(".result-shower").innerHTML = "TURN <br> <b>Player 1 [X]</b>";
        }
    }
}

let intervalId;

function winnerFunction() {
    document.querySelector(".winner-loser").style.backgroundColor = "#0c0a09";
            document.querySelector(".winner-loser").style.color = "white";
            let tensec = 10;
            intervalId = setInterval( () => {
                document.querySelector(".reset-notif").innerHTML = `The game will automatically reset in 10 seconds. You can also click the Reset button to play again. <br> <b>${tensec}</b>`;

                if (tensec == 0) {
                    resetButton();
                    clearInterval(intervalId);
                }
                tensec--;
            } , 1000)
} 

function disableDiv () {
    for (let i = 1; i <= 9; i++) {
        const boxName = `box${i}`;
        const targetBox = mainBoxes[boxName];
        const existingPar = targetBox.querySelector('p');
        
        if (!existingPar) {
            targetBox.style.pointerEvents = "none";
        } 
    }
}

function historyList(play1, play2, gamecounter) {

    const brElement = document.createElement("br");

    const historyList = document.querySelector(".history-list");
    const gameNumber = document.createElement("b");
    gameNumber.textContent = `Game [${gamecounter}]: `;

    let textNode;

    if (play1 == 0 && play2 == 0) {
        textNode = document.createTextNode(`TIE`);
    }
    else {
        textNode = document.createTextNode(`Player ${play1}`);
    }
    

    historyList.appendChild(gameNumber);
    historyList.appendChild(textNode);
    historyList.appendChild(brElement);
}

function toggleReset() {
    document.querySelector(".sub-reset-menu").classList.toggle("show");
}

function resetAll() {

    const player1 = document.querySelector(".play1-score");
    const player2 = document.querySelector(".play2-score");

    resetButton();
    document.querySelector(".history-list").innerHTML = "";
    gameCounter = 0;
    player1score = 0
    player2score = 0;

    player1.innerHTML = `Player 1 [X] :&nbsp; <b>0</b>`;
    player2.innerHTML = `Player 2 [O] :&nbsp; <b>0</b>`;
}

function resetScoreHis() {
    const player1 = document.querySelector(".play1-score");
    const player2 = document.querySelector(".play2-score");
    document.querySelector(".history-list").innerHTML = "";
    gameCounter = 0;
    player1score = 0
    player2score = 0;

    player1.innerHTML = `Player 1 [X] :&nbsp; <b>0</b>`;
    player2.innerHTML = `Player 2 [O] :&nbsp; <b>0</b>`;
}

window.onclick = function (event) {
    if (!event.target.matches('.start-reset-button')) {
                    const dropdowns = document.getElementsByClassName("sub-reset-menu");
                    let i;
                    for (i = 0; i < dropdowns.length; i++) {
                        let openDropdown = dropdowns[i];
                            if (openDropdown.classList.contains('show')) {
                                openDropdown.classList.remove('show');
                }
            }
        }
    }