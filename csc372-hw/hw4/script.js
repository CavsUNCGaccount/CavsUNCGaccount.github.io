document.querySelectorAll('.player-option').forEach(img => {
    img.addEventListener('click', function () {

        // Remove 'selected' class from all player-option images
        document.querySelectorAll('.player-option').forEach(option => {
            option.classList.remove('selected');
        });

        this.classList.add('selected');
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const playerOptions = document.querySelectorAll(".player-option");
    const computerOption = document.querySelector(".computer-option");
    const computerOptionText = document.querySelector(".computer-option-text");
    const resultSection = document.querySelector(".result");
    const playAgainButton = document.querySelector(".play-again");
    const computerImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
    const computerTexts = ["Rock", "Paper", "Scissors"];

    let playerChoice = '';
    let computerChoice = '';
    let computerChoiceText = '';

    // Player makes a choice
    playerOptions.forEach(option => {
        option.addEventListener("click", (e) => {
            // Clear selection for all choices
            playerOptions.forEach(opt => opt.classList.remove("selected"));
            // Mark this option as selected
            e.target.classList.add("selected");
            playerChoice = e.target.alt.toLowerCase(); 
            startShuffle(); 
        });
    });

    function startShuffle() {
        let shuffleIndex = 0;
        let shuffleInterval = setInterval(() => {
            computerOption.src = computerImages[shuffleIndex];
            computerOptionText.textContent = computerTexts[shuffleIndex];
            shuffleIndex = (shuffleIndex + 1) % 3; // Loop through the images
        }, 500); 

        setTimeout(() => {
            clearInterval(shuffleInterval);
            const randomIndex = Math.floor(Math.random() * 3);
            computerChoice = computerImages[randomIndex]; // Image
            computerChoiceText = computerTexts[randomIndex]; // Text
            computerOption.src = computerChoice; 
            computerOptionText.textContent = computerChoiceText;
            determineResult(); 
        }, 3000); // 3 seconds of shuffling
    }

    function determineResult() {
        const playerWins = "You win!";
        const computerWins = "Computer wins! Better luck next time.";
        const tie = "It's a tie!";
        let resultText = "";
    
        // Obtain the computer's choice as a string to compare
        const computerChoiceActual = computerChoice.split("/").pop().split(".")[0]; 
    
        // Write the choices on the console (for debugging)
        console.log("Player Choice: ", playerChoice);
        console.log("Computer Choice: ", computerChoiceActual);
    
        if (playerChoice === computerChoiceActual) {
            resultText = tie;
        } else if (playerChoice === "rock" && computerChoiceActual === "scissors") {
            resultText = playerWins;
        } else if (playerChoice === "paper" && computerChoiceActual === "rock") {
            resultText = playerWins;
        } else if (playerChoice === "scissors" && computerChoiceActual === "paper") {
            resultText = playerWins;
        } else {
            resultText = computerWins;
        }
    
        console.log("Result: ", resultText);
    
        // Update the result section
        resultSection.querySelector("#result-text").textContent = resultText; 
        resultSection.style.display = 'flex'; 
    }    

    // Reset the game
    playAgainButton.addEventListener("click", () => {
        window.location.reload(); 
    });
});

