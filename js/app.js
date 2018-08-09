/*
 * Create a list that holds all of your cards */
const deckCards = document.querySelector(".deck");
const restart = document.querySelector(".restart");
let clickedCards = [];


/* >>>>>>>>>>>>>--------------------------------------------------->>>> */

function cardsShuffling() {
    const cardsToShuffle = Array.from(document.querySelectorAll(".deck li"));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        deckCards.appendChild(card);
    }
}

cardsShuffling();

/* >>>>>>>>>>>>>--------------------------------------------------->>>> */
let moves = document.querySelector(".moves");
let counter = 0;
let startCount = false;
let countClicks = 0;
let startTimer;
moves.innerHTML = counter;

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
/* create an array to temporaly store 2 values and compare them
if the 2 values are the  same, they remain open otherwise they must
retain original closed position */
function addClickedCards(clickTarget) {
    clickedCards.push(clickTarget);
    if (clickedCards.length === 2) {
        checkforMatch();
        counter++;
        moves.innerHTML = counter;
    }

}

function checkforMatch() {
    if (clickedCards[0].firstElementChild.className === clickedCards[1].firstElementChild.className) {
        console.log(clickedCards[0].firstElementChild.classList);
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

/*dealing with stars */
function addStars() {
    let stars = document.querySelectorAll(".stars li");

    if (counter < 12) {
        stars[0].style.color = "black";
        stars[1].style.color = "black";
        stars[2].style.color = "black";
    } else if (counter >= 12 && counter < 18) {
        stars[2].style.color = "white";

    } else if (counter >= 18 && counter < 25) {
        stars[1].style.color = "white";
    } else {
        stars[0].style.color = "white";
    }

}

/* Ending the game */
function endGame() {
    let classMatch = document.querySelectorAll(".match");
    if (classMatch.length === 16) {
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
function resetClock(){
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
/*Reset scores */
function restoreScores() {
    counter = 0;
    moves.innerHTML = counter;
}
/*Reset stars */
function resetStars() {
    let stars = document.querySelectorAll(".stars li");
    stars[0].style.color = "black";
    stars[1].style.color = "black";
    stars[2].style.color = "black";

}
/*Restarting the game*/
restart.addEventListener("click", function () {
    restartGame();
    cardsShuffling();
    restoreScores();
    resetStars();
    clearInterval(startTimer);
    resetClock();
    myTimer();
    console.log("reshuffle");
})

/*Play again the same game */
document.querySelector(".modalReplay").addEventListener("click", function(){
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

/*starting the timer using setInterval*/
let seconds, min, hours;
let stopWatch = document.getElementById("watch");
let countUp = 0;

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
    /* stopWatch.innerHTML = hours + ":" + min + ":" + seconds;*/
    countUp++;

}
function stopTheTimer(){
    clearInterval(startTimer);
    
}

function displayTimer() {
    let message = "";
    let strSeconds , strMin, strHours;
    if (seconds < 10) {
       strSeconds = `0${seconds}`;       
    } else {
        strSeconds = `${seconds}`;
    }

    if (min < 10){
        strMin = `0${min}`;
    }else {
        strMin = `${min}`;
    }

    if (hours < 10){
        strHours = `0${hours}`;
    } else {
        strHours = `${hours}`;
    }
    
    message = `${strHours}:${strMin}:${strSeconds}`

  

    stopWatch.innerHTML = message;
}

function toggleModal(){
    const modal = document.querySelector(".modalBackground");
    modal.classList.toggle("hide");
}


function printModalStatistics(){
    const timeStatistics = document.querySelector(".summary");
    const clockTime = document.querySelector("#watch").innerHTML;
    timeStatistics.innerHTML = `Time = ${clockTime} : 
    Moves = ${counter + 1}`;
    console.log(timeStatistics);
    console.log(clockTime);
}

document.querySelector(".modalCancel").addEventListener("click", function(){
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