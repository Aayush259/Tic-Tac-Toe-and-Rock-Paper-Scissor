// This function adds a button at the top-left corner of the screen to go back to the previous move.
const AddReturnBtn = () => {

    // Getting Header.
    const Header = document.getElementById('header');

    // Creating return back button.
    const ReturnBack = document.createElement('div');
    ReturnBack.classList.add('return-back');
    ReturnBack.innerHTML = `
        <button id="return-back-btn"><b> &leftarrow; </b></button>
    `;

    // Placing the Return_Back element as the first child inside header.
    Header.insertBefore(ReturnBack, Header.firstChild);

};

const DisableButtons = (arrayOfButtons) => {

    arrayOfButtons.forEach(button => {button.disabled = true;});
};

// This function displays result on screen.
const ShowResults = (msg, game) => {

    // Creating a new element for displaying result.
    const ResultElement = document.createElement('div');

    // Adding class of result to the ResultElement.
    ResultElement.classList.add('result');

    // Updating result inside ResultElement.
    ResultElement.innerHTML = `
        <p class="result-msg">${msg}</p>
        <div class="buttons">
            <button onclick="(location.reload())">Home</button>
            <button class="${game}" onclick="PlayAgain(this)">Play Again</button>
        </div>
    `;

    // Appending the new element to the Main element.
    const Main = document.getElementById('main');

    Main.appendChild(ResultElement);
};

// This function restarts the game.
function PlayAgain(btnElement) {

    // Getting Main element.
    const Main = document.getElementById('main');

    // Gettin Result element.
    const Result = document.querySelector('.result');

    // If the game is tic-tac-toe then this if code will be executed.
    if (btnElement.classList.value === 'TTT') {

        Main.innerHTML = `
        <div class="tic-tac-toe">
            <p class="select">Select your symbol</p>
            <div class="play-options">
                <button class="symbol O">O</button>
                <button class="symbol X">X</button>
            </div>
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
        
    } else if (btnElement.classList.value === 'TTT-P') {

        // Remove result element from screen.
        Result.remove();

        // Activate player mode again.
        ActivatePlayerMode();
    }
};