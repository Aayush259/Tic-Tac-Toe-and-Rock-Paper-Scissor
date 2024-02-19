const Add_Return_Btn = () => {

    // Getting Header.
    const Header = document.getElementById('header');

    // Creating return back button.
    const Return_Back = document.createElement('div');
    Return_Back.classList.add('return-back');
    Return_Back.innerHTML = `
        <button id="return-back-btn"><b> &leftarrow; </b></button>
    `;

    // Placing the Return_Back element as the first child inside header.
    Header.insertBefore(Return_Back, Header.firstChild);

};

// This function activates the tic-tac-toe game
const Activate_Tic_Tac_Toe = () => {

    Add_Return_Btn();

    // Getting main element.
    const Main = document.getElementById('main');

    // Updating Main element with tic_tac_toe game.
    Main.innerHTML = `
    <div class="tic-tac-toe">
    <p class="select">Select Mode</p>
        <div class="play-options">
            <div class="computer-mode mode">
                <img src="./images/computer-mode.jpg" alt="Computer Mode" height="150">
                <button>Computer Mode</button>
            </div>
            <div class="player-mode mode">
                <img src="./images/player-mode.PNG" alt="Player Mode" height="150">
                <button>Player Mode</button>
            </div>
        </div>
    </div>
    `
};

// Getting tic tac toe play button.
const Tic_Tac_Toe_Play_Btn = document.getElementById('Tic-Tac-Toe-Btn');

Tic_Tac_Toe_Play_Btn.addEventListener("click", Activate_Tic_Tac_Toe);