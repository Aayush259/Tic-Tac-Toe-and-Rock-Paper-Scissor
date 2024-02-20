/*
    This funciton activates the tic tac toe game.
*/
function ActivateTicTacToe() {

    // Adding Return Button at top-left corner.
    AddReturnBtn();

    // Getting Main Element.
    const Main = document.getElementById('main');

    // Updating Main content
    Main.innerHTML = `
        <div class="tic-tac-toe">
        <p class="select">Select Mode</p>
            <div class="play-options">
                <div class="computer-mode mode">
                    <img src="./images/computer-mode.jpg" alt="Computer Mode" height="150">
                    <button onclick="ActivateComputerMode()">Computer Mode</button>
                </div>
                <div class="player-mode mode">
                    <img src="./images/player-mode.PNG" alt="Player Mode" height="150">
                    <button onclick="ActivatePlayerMode()">Player Mode</button>
                </div>
            </div>
        </div>
    `
};

/*
    This function activates the computer mode of tic tac toe game.
*/
function ActivateComputerMode() {

    // Getting game container.
    const TicTacToeContainer = document.querySelector('.tic-tac-toe');

    // Updating the value of tic tac toe game container.
    TicTacToeContainer.innerHTML = `
        <p class="select">Select your symbol</p>
        <div class="play-options">
            <button class="symbol O">O</button>
            <button class="symbol X">X</button>
        </div>
    `;
    
    // Getting SymbolButtons.
    const SymbolButtons = document.querySelectorAll('.symbol');

    // Adding event listener to each button so that when any of the button is clicked then call StartGame function.
    SymbolButtons.forEach(button => {
        button.addEventListener('click', () => {
            StartGame(button.textContent);
        })
    })
};

/*
    This function Activate player mode of tic-tac-toe game.
*/
function ActivatePlayerMode() {
    console.log('PlayerMode is in development process.');
};

/*
    This function return true if a winning pattern is matched otherwise it returns false.
*/
const CheckWinner = (arrayOfButtons) => {

    // Array of winning patterns.
    const WinningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8]
    ];

    for (let pattern of WinningPatterns) {

        const Position0 = arrayOfButtons[pattern[0]].textContent;
        const Position1 = arrayOfButtons[pattern[1]].textContent;
        const Position2 = arrayOfButtons[pattern[2]].textContent;

        if (Position0 === 'X' || Position0 === 'O') {

            if (Position0 === Position1 &&
                Position1 === Position2) {
                    return true;
                }
        }
    }
    return false;
};

/*
    This function is responsible for Computer Turn.
*/
const ComputerTurn = (arrayOfButtons, ComputerChoice) => {

    // Filtering Available buttons.
    const AvailableButtons = arrayOfButtons.filter(button => !button.disabled);

    // Disabling all buttons so that user can't play his move multiple times before computer's move.
    DisableButtons(arrayOfButtons);

    if (AvailableButtons.length !== 0) {
        const RandomIndex = Math.floor(Math.random() * AvailableButtons.length);

        AvailableButtons[RandomIndex].textContent = ComputerChoice;
    }
    else {
        ShowResults(`It's a Tie`, 'TTT');
    }

    arrayOfButtons.forEach(button => {
        if (button.textContent !== 'X' && button.textContent !== 'O') {
            button.disabled = false;
        }
    });

    // If Computer wons then disable all buttons and display final screen.
    if (CheckWinner(arrayOfButtons)){
        DisableButtons(arrayOfButtons);
        ShowResults('Computer Won', 'TTT');
    }
};

/*
    Thus function starts the tic-tac-toe of compute mode.
*/
function StartGame(UserSymbol) {
    
    // Setting computer symbol.
    let ComputerSymbol = 'X';

    if (UserSymbol === 'X'){
        ComputerSymbol = 'O';
    }

    // Getting tic-tac-toe container.
    const TicTacToeContainer = document.querySelector('.tic-tac-toe');

    TicTacToeContainer.innerHTML = `
    <div class="tic-tac-toe-button-container">
        <button class="play-button">&nbsp;</button>
        <button class="play-button">&nbsp;</button>
        <button class="play-button">&nbsp;</button>
        <button class="play-button">&nbsp;</button>
        <button class="play-button">&nbsp;</button>
        <button class="play-button">&nbsp;</button>
        <button class="play-button">&nbsp;</button>
        <button class="play-button">&nbsp;</button>
        <button class="play-button">&nbsp;</button>
    </div>
    `;

    // Getting all game buttons.
    const GameButtons = document.querySelectorAll('.play-button');

    // Array of GameButtons
    const GameButtonsArray = [];

    GameButtons.forEach(button => {
        GameButtonsArray.push(button);
    })

    // Adding event listener to each button so that when any button is clicked, its textContent is updated and that button gets disabled.
    GameButtonsArray.forEach(button => {
        button.addEventListener('click', () => {
            button.disabled = true;
            button.textContent = UserSymbol;

            // If the user wins then disable all the game buttons and show final screen else call for computer's turn.
            if (CheckWinner(GameButtonsArray)) {
                DisableButtons(GameButtonsArray);
                ShowResults('You Won','TTT');
            } else {
                ComputerTurn(GameButtonsArray, ComputerSymbol);
            }
        });
    })
};