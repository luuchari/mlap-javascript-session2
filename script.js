document.addEventListener("memorygame", () => {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const cards = [...letters, ...letters];
    const gameBoard = document.getElementById("gameBoard");

    // Shuffle the cards
    cards.sort(() => 0.5 - Math.random());

    // Create the card elements
    cards.forEach(letter => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.letter = letter;
        card.textContent = "";
        gameBoard.appendChild(card);
    });

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matches = 0;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add("flipped");
        this.textContent = this.dataset.letter;

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        if (firstCard.dataset.letter === secondCard.dataset.letter) {
            disableCards();
            matches += 1;
            if (matches === letters.length) {
                setTimeout(() => alert("You win!"), 300);
            }
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);

        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            firstCard.textContent = "";
            secondCard.classList.remove("flipped");
            secondCard.textContent = "";

            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    document.querySelectorAll(".card").forEach(card => card.addEventListener("click", flipCard));
});
