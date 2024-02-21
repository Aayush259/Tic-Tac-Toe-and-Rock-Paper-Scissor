/*
    This function activates the rock paper scissor game.
*/

function ActivateRockPaperScissor() {

    // Adding return button.
    AddReturnBtn();

    // Getting DOM elements

    const Main = document.querySelector('#main');

    Main.innerHTML = `
        <div class="container">
        
            <div class="score">

                <div class="computer-score">
                    <div class="computerFist fist">
                        <p class="Cfist">✊🏻</p>
                    </div>
                    <p class="computerChoice">&nbsp;</p>
                    <p>Me</p>
                    <p id="computerScore">0</p>
                </div>

                <div class="user-score">
                    <div class="userFist fist">
                        <p class="Ufist">✊🏻</p>
                    </div>
                    <p class="userChoice">&nbsp;</p>
                    <p>You</p>
                    <p id="userScore">0</p>

                </div>
            </div>

            <p class="message">Play Your Move...</p>

            <div class="button-container">

                <button id="Stone" class="option" >👊🏻</button>
                <button id="Paper" class="option" >✋🏻</button>
                <button id="Scissor" class="option" >✌🏻</button>

            </div>

            <button class="restart">Restart</button>
        </div>
    `;

    // Creating a new result element.
    const NewResultElement = document.createElement('div');

    // Adding class of 'result none-display' to NewResultElement.
    NewResultElement.classList.add('result');
    NewResultElement.classList.add('none-display');

    NewResultElement.innerHTML = `

        <p class="WinningMessage">Congrats! You won the match</p>
        
        <div class="score">
        
            <div class="computer-score">
                <div class="fist">
                    <p>💻</p>
                </div>
                <p>Me</p>
                <p id="finalComputerScore">0</p>
            </div>
        
            <div class="user-score">
                <div class="fist">
                    <p>👱🏻</p>
                </div>
                <p>You</p>
                <p id="finalUserScore">0</p>
        
            </div>
        </div>

        <div class="buttons">
            <button class="home" onclick="(location.reload())">Home</button>
            <button class="newGame">Play Again</button>
        </div>
        `;

    // Insert the new result element after main element.
    Main.insertAdjacentElement('afterend', NewResultElement);

    const ComputerHand = document.querySelector('.computerFist > p');

    const UserHand = document.querySelector('.userFist > p');

    const ComputerScoreElement = document.querySelector('#computerScore');

    const ComputerChoiceText = document.querySelector('.computerChoice');

    const UserScoreElement = document.querySelector('#userScore');

    const UserChoiceText = document.querySelector('.userChoice');

    const Message = document.querySelector('.message');

    const OptionButtons = document.querySelectorAll('.option');

    const RestartButton = document.querySelector('.restart');

    const Result = document.querySelector('.result');

    const FinalComputerScoreElement = document.querySelector('#finalComputerScore');

    const FinalUserScoreElement = document.querySelector('#finalUserScore')

    const WinningMessage = document.querySelector('.WinningMessage');

    const NewGameButton = document.querySelector('.newGame');

    /*
        This function returns computer choice (stone, paper or scissor)
    */
    const ComputerChoiceFunction = () => {

        // Creating an array of possible choices
        const Choices = ['Stone', 'Paper', 'Scissor'];

        // Returning the computer choice
        return Choices[Math.floor(Math.random() * 3)];

    };

    /*
        This function temporarly stops animation of both computer and user fist for 3 seconds by removing the class which triggers the animation
        and show the computer and user's choices at place of fist
    */
    const ShowChoiceStopFistAnimation = (UserChoice, ComputerChoice) => {

        const Stone = '🤜🏻';
        const Paper = `✋🏻`;
        const Scissor = `✌🏻`;

        // Removing the class which triggers the animation of computer and user hand
        ComputerHand.classList.remove('Cfist');
        UserHand.classList.remove('Ufist');

        // Chnaging the emoji of the fist to user choice
        if (UserChoice === 'Stone') {
            UserHand.textContent = Stone
        } else if (UserChoice === 'Paper') {
            UserHand.textContent = Paper;
        } else {
            UserHand.textContent = Scissor;
        };

        // Changing the emoji of the fist to computer choice
        if (ComputerChoice === 'Stone') {
            ComputerHand.textContent = Stone;
        } else if (ComputerChoice === 'Paper') {
            ComputerHand.textContent = Paper;
        } else {
            ComputerHand.textContent = Scissor;
        };

        // Adding the same class again after 3 seconds which triggers the animation of computer and user hand and also changing the textContent to initial fist emoji
        setTimeout(() => {
            ComputerHand.classList.add('Cfist');
            UserHand.classList.add('Ufist');

            ComputerHand.textContent = `✊🏻`;
            UserHand.textContent = `✊🏻`;
        }, 3000);

    };

    /*
        This function temporarly disable all option buttons for 3 seconds.
    */
    const TemporaryDisableButtons = () => {

        OptionButtons.forEach(option => {

            // Disabling option
            option.disabled = true;

            // Enabling option after 3 seconds
            setTimeout(() => {
                option.disabled = false;
            }, 3000);

        });

    };

    /*
        This function starts a new game
    */
    const NewGame = () => {

        // Removing the result element from screen
        Result.classList.add('none-display');
        
        // Resetting the default settings of game usig restart game function
        RestartGame();

        // Displaying the main element (game) on screen
        Main.classList.remove('none-display');
        
    };

    /*
        This a function which restarts the game
    */
    const RestartGame = () => {

        // Resetting the emoji of fist of user and computer
        ComputerHand.textContent = `✊🏻`;
        UserHand.textContent = `✊🏻`;

        // Adding the class required for fist animation in case if user clicks on restart button during the time in which the options are disabled and fist animation is also stopped and with that there is another emoji(user or computer's choice).
        ComputerHand.classList.add('Cfist');
        UserHand.classList.add('Ufist');

        // Enabling all the option buttons (choices) for user
        OptionButtons.forEach(Button => {
            Button.disabled = false;
        });

        // Resetting the scores of computer and user to zero
        ComputerScoreElement.textContent = `0`;
        UserScoreElement.textContent = `0`;

        // Removing the previous choices of user and computer from the screen
        ComputerChoiceText.innerHTML = `&nbsp;`;
        UserChoiceText.innerHTML = `&nbsp;`;

        // Resetting the message
        Message.textContent = `Play Your Move...`;

    };

    /*
        This function checks for the match winnner. If any one of computer or user reach to 10 points then he will win the match
    */
    const MatchWinner = () => {

        // Storing the score of user and computer in constant variables in number data type
        const UserScore = parseInt(UserScoreElement.textContent);
        const ComputerScore = parseInt(ComputerScoreElement.textContent);

        // If any one of user or computer score is greater then 10 then only the match completes and the following `if` block will be executed
        if (UserScore >= 10 || ComputerScore >= 10) {

            // Removing Main element from the screen (game) and displaying result element on screen
            Main.classList.add('none-display');
            Result.classList.remove('none-display');

            if (UserScore > ComputerScore) {
                
                // If user wins the match then display the winning message on screen.
                WinningMessage.textContent = `Congrats! You won the match...`;

            } else if (UserScore < ComputerScore) {

                // If user lost the game then displaying message that computer won on screen.
                WinningMessage.textContent = `I won the match. Better Luck next time...`;
            } else {

                // If there is draw, then displaying draw message on screen.
                WinningMessage.textContent = `It's a draw...`;
            };

            // Updating the final user and computer score on screen
            FinalComputerScoreElement.textContent = ComputerScore;
            FinalUserScoreElement.textContent = UserScore;

            // Adding event listener on new game button so that when it is clicked, it starts a new game.
            NewGameButton.addEventListener('click', NewGame);

            return true;
        }
        else {
            return false;
        };
    };

    /*
        This function checks for a winner and return true if user wins and false if user lost and a string 'Draw' if its a draw.
    */
    const CheckWinner = (UserChoice, ComputerChoice) => {

        let returnValue;
        

        // If both user and computer have same choice then it's a draw and userWins is 'Draw'.
        if (UserChoice === ComputerChoice) {
                
            returnValue = `Draw`;
        }

        // If user choice is stone, paper or scissor and computer choice is scissor, stone or paper respectively then userWins is true.
        else if (
            (UserChoice === 'Stone' && ComputerChoice === 'Scissor') ||
            (UserChoice === 'Paper' && ComputerChoice === 'Stone') ||
            (UserChoice === 'Scissor' && ComputerChoice === 'Paper')) {
            
            returnValue = true;
        }
        
        // If none of the above condition is true then userWins is false and computer wins.
        else {
            
            returnValue = false;
        };

        return returnValue;
    };

    /*
        This function updates the screen based on the winner
    */
    const UpdateScreen = (winner, UserChoice, ComputerChoice) => {

        // If there is no winner and thers is a draw then this block will be executed
        if (winner === 'Draw') {

            // Temporarly disabling options for 3 seconds
            TemporaryDisableButtons();
            // Updating the message if there is a draw
            Message.textContent = `It's a draw.`;
        }
        else if (winner) {

            // Temporarly disabling options for 3 seconds
            TemporaryDisableButtons();
            // Updating the user's score if he won
            UserScoreElement.textContent = parseInt(UserScoreElement.textContent) + 1;

            // Updating the winning message
            Message.textContent = `Point goes to you...`;
        }
        else {

            // Temporarly disabling options for 3 seconds
            TemporaryDisableButtons();
            // Updating the computer's score if he won
            ComputerScoreElement.textContent = parseInt(ComputerScoreElement.textContent) + 1;

            // Updating the user's losing message
            Message.textContent = `Point goes to me...`;
        };

        // Asks user to play his move again after 3 seconds
        setTimeout(() => {
            Message.textContent = ` Play your move again...`;

            MatchWinner();
        }, 3000);

        // Stops the fist animation and displays the choices of both user and computer in emoji format for 3 seconds.
        ShowChoiceStopFistAnimation(UserChoice, ComputerChoice);

        // Updating the choices of both user and computer
        UserChoiceText.textContent = UserChoice;
        ComputerChoiceText.textContent = ComputerChoice;

        // Removing the choice text of both user and computer after 3 seconds
        setTimeout(() => {

            UserChoiceText.innerHTML = `&nbsp;`;
            ComputerChoiceText.innerHTML = `&nbsp;`;

        }, 3000);
        
    };

    /*
        Adding event listener to each choice (stone, paper or scissor).
    */
    OptionButtons.forEach(option => {

        option.addEventListener('click', () => {

            // Getting user choice from the `id` attribute of clicked element
            const UserChoice = option.getAttribute('id');

            // Getting computer choice from ComputerChoiceFunction
            const ComputerChoice = ComputerChoiceFunction();

            // Creating a variable userWins which will store a boolean value if any of one user and computer wins and store a string'Draw' if the game draws from the function CheckWinner.
            const UserWins = CheckWinner(UserChoice, ComputerChoice);

            // updating the screen by showing the result of point winnner.
            UpdateScreen(UserWins, UserChoice, ComputerChoice);

        });

    });

    /*
        Adding event listener to the Restart button so that when it is clicked, the game restarts.
    */
    RestartButton.addEventListener('click', RestartGame);

};