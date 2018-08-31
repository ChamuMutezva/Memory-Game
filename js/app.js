const deckCards = document.querySelector(".deck"); /* variable that Create a list that holds all of your cards */
const restart = document.querySelector(".restart");/*refresh or start the game again*/
let clickedCards = []; /*This array carries a maximum of 2 cards for comparison*/
let remainingStars = 0; /* the remaining stars */
let seconds, min, hours; /*To be used with the myTimer function */
let stopWatch = document.getElementById("watch");
let countUp = 0; /*Variable to count time(seconds, minutes, hours) */
let moves = document.querySelector(".moves");
let counter = 0; /*Keeps track of the number of moves made */
let startCount = false; /*Determines to set the counter in motion */
let countClicks = 0; /*Used to start the setInterval timer. Only if 
the countClicks === 0 and startCount === true can the setInterval be triggered on */
let startTimer; /*Variable which calls the setInterval time */
moves.innerHTML = counter;

/*TODO: calls the function that shuffles the card and appends them */
function cardsShuffling() {
    const cardsToShuffle = Array.from(document.querySelectorAll(".deck li"));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        deckCards.appendChild(card);
    }
}

cardsShuffling();

/*TODO: Function to start the stopwatch(setInterval timer) . The result is 
stored in a variable */
function startTheTimer() {
    startCount = true;
    if (countClicks === 0 && startCount === true) {
        startTimer = setInterval(myTimer, 1000);
    } else {
        startCount = false;
    }
    countClicks++;
}

deckCards.addEventListener("click", function (event) {
    startTheTimer();
    const clickTarget = event.target;
    console.log(clickTarget);
    addStars();
    if (clickTarget.classList.contains("card") && !clickTarget.classList.contains("match") &&
        clickedCards.length < 2 && !clickedCards.includes(clickTarget)) {
        toggleCards(clickTarget);
        addClickedCards(clickTarget);
    }
})

function toggleCards(clickTarget) {
    clickTarget.classList.toggle("open");
    clickTarget.classList.toggle("show");
}

/*TODO: If 2 cards have been clicked call the checkForMatch function
Increase the number of moves(counter) and print the moves on the screen
 */
function addClickedCards(clickTarget) {
    clickedCards.push(clickTarget);
    if (clickedCards.length === 2) {
        checkforMatch();
        counter++;
        moves.innerHTML = counter;
    }
}

/*TODO: create an array to temporaly store 2 values and compare them
if the 2 values are the  same, they remain open otherwise they must
retain original closed position */
function checkforMatch() {
    if (clickedCards[0].firstElementChild.className === clickedCards[1].firstElementChild.className) {
        console.log(clickedCards[0].firstElementChild);
        console.log(clickedCards[1].firstElementChild.classList);
        clickedCards[0].classList.toggle("match");
        clickedCards[1].classList.toggle("match");
        console.log("we have a match");
        clickedCards = [];
        endGame();
    } else {
        console.log(clickedCards[0].firstElementChild.classList);
        console.log(clickedCards[1].firstElementChild.classList);
        console.log("no match");
        setTimeout(function () {
            clickedCards[0].classList.toggle("open");
            clickedCards[0].classList.toggle("show");
            clickedCards[1].classList.toggle("open");
            clickedCards[1].classList.toggle("show");
            clickedCards = [];
        }, 1000);
    }
}

/*TODO: dealing with stars, Aim to finish the game with
a minimum of moves to have 3 stars */
function addStars() {
    let stars = document.querySelectorAll(".stars li");
    if (counter < 12) {
        stars[0].style.color = "black";
        stars[1].style.color = "black";
        stars[2].style.color = "black";
        stars[3].style.color = "black";
    } else if (counter >= 12 && counter < 16) {
        stars[3].style.color = "white";

    } else if (counter >= 16 && counter < 22) {
        stars[2].style.color = "white";
    } else if (counter >= 22 && counter < 26){
        stars[1].style.color = "white";
    } else{
        stars[0].style.color = "white";
    }
}

/*count the number of stars , to give credit to player */
function countStars() {
    remainingStars = 0;
    let stars = document.querySelectorAll(".stars li");
    for (star of stars) {
        if (star.style.color === "black") {
            remainingStars++;
        }
    }
}

/*TODO: Ending the game, */
function endGame() {
    let classMatch = document.querySelectorAll(".match");
    if (classMatch.length === 16) {
        countStars();
        stopTheTimer();
        printModalStatistics();
        toggleModal();
    }
}

/*Restart the game */
function restartGame() {
    console.log("reshuffling 1");
    const cards = document.querySelectorAll(".deck li");
    for (card of cards) {           
        card.className = "card";
    }
}

/*Reset clock timer*/
function resetClock() {
    startCount = false;
    countUp = 0;
    countClicks = 0;
    seconds = 0;
    min = 0;
    hours = 0;
    strHours = 00;
    strMin = 00;
    strSeconds = 00;
}

/*Reset moves to zero */
function restoreScores() {
    counter = 0;
    moves.innerHTML = counter;
}

/*Reset stars to original state*/
function resetStars() {
    let stars = document.querySelectorAll(".stars li");
    stars[0].style.color = "black";
    stars[1].style.color = "black";
    stars[2].style.color = "black";
    stars[3].style.color = "black";
}


/*Restarting the game*/
restart.addEventListener("click", function () {
    clickedCards = [];
    restartGame();
    cardsShuffling();
    restoreScores();
    resetStars();
    clearInterval(startTimer);
     resetClock();
    myTimer();
})

/*TODO: Play again the same game */
document.querySelector(".modalReplay").addEventListener("click", function () {
    console.log("toggled>>>");
    restartGame();
    cardsShuffling();
    restoreScores();
    resetStars();
    clearInterval(startTimer);
    resetClock();
    toggleModal();
    myTimer();
})

/*TODO: The function that counts the time taken to play the game */
function myTimer() {
    if (countUp < 60) {
        seconds = countUp;
        min = 00;
        hours = 00;
    }
    if (countUp >= 60) {
        min = Math.floor(countUp / 60);
        seconds = countUp % 60;
    }
    if (countUp >= 3600) {
        hours = Math.floor(countUp / 3600);
        min = countUp % 3600;
        countUp = min;
        if (countUp >= 60) {
            min = Math.floor(countUp / 60);
            seconds = countUp % 60;
        }
    }
    displayTimer();
    countUp++;
}

/*stop the stopwatch timer */
function stopTheTimer() {
    clearInterval(startTimer);
}

/*Display the time taken */
function displayTimer() {
    let message = "";
    let strSeconds, strMin, strHours;

    if (seconds < 10) {
        strSeconds = `0${seconds}`;
    } else {
        strSeconds = `${seconds}`;
    }

    if (min < 10) {
        strMin = `0${min}`;
    } else {
        strMin = `${min}`;
    }

    if (hours < 10) {
        strHours = `0${hours}`;
    } else {
        strHours = `${hours}`;
    }

    message = `${strHours}:${strMin}:${strSeconds}`
    stopWatch.innerHTML = message;
}

/*Show the modalBackground*/
function toggleModal() {
    const modal = document.querySelector(".modalBackground");
    modal.classList.toggle("hide");
}

/*Call this function to print the statistical data to the modal */
function printModalStatistics() {
    const timeStatistics = document.querySelector(".summary");
    const clockTime = document.querySelector("#watch").innerHTML;
    const str = `Time = ${clockTime} 
     Moves = ${counter + 1} 
     Stars = ${remainingStars}`;
    timeStatistics.innerHTML = str;
    console.log(timeStatistics);
    console.log(clockTime);
}

document.querySelector(".modalCancel").addEventListener("click", function () {
    toggleModal();
})

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    console.log(array.length);
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */