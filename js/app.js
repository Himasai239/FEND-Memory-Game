/*
 * Create a list that holds all of your cards
 */

 // Defining global variables
var cards = ["fa-diamond","fa-diamond","fa-paper-plane-o","fa-paper-plane-o","fa-anchor","fa-anchor","fa-bolt","fa-bolt","fa-cube","fa-cube","fa-leaf","fa-leaf","fa-bomb","fa-bomb","fa-bicycle","fa-bicycle"];

/* initialising a variable stars for querySelector stars */

var stars = document.querySelector('.stars');
var first = document.querySelector('.first-star');
var second = document.querySelector('.second-star');

/* initialising a variable restart for querySelector restart*/

var timeElapsed = 0;
$restart = document.querySelector('.restart');

$header = document.querySelector('header');

var deck = document.querySelector('.deck');

/* Declaring the variables timecount,minutes,duration for Timer purpose */
let timeCount = 0;
let minutes=0;
var duration;
let timer= document.querySelector('.timer'); 

 var moveCounter =  document.querySelector('.moves');
 var matchedCard = [];
 var totalCard = cards.length/2;
 //declaring the variable to show the win status
 var youWin = document.querySelector('.youWin');



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


 // To generate cards dinamically


 function generateCard(card){
   return `<li class="card"><i class="fa ${card}"></i></li>`;
 }

//initialising the game

 function initGame(){

   var cardHTML = shuffle(cards).map(function(card){
     return generateCard(card);
   });
   moves = 0;
   moveCounter.innerText = moves;
   deck.innerHTML = cardHTML.join('');
 }


// Shuffle function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//To start the timer
function starttimer(){
  
  duration = setInterval(function(){
    timeCount++;
    timer.innerHTML=minutes+"min"+timeCount+"secs";
    if(timeCount==60){
      timeCount=0;
      minutes++;
    }
  },1000); 
}

//for resetting the timer when game ends
function reset(){
  minutes=0;
  timeCount=0;
  timer.innerHTML="Game not started"
  clearInterval(duration);
  //$(".stars li i").attr("class","fa fa-star");
  //to show the stars when game restarts
  first.style.visibility = 'visible';
  second.style.visibility = 'visible';
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

//Removes first and second stars based on move count after 12 & 18 moves respectively

function starRating() {
  if (moves > 12 && moves < 18) {
      first.style.visibility = 'hidden';
    }
  else if (moves > 18) {
      second.style.visibility = 'hidden';
    } 
}
//move counter   
// function moveCount() {

//     moves++;
//     moveCounter.innerHTML = moves;
//     starRating();
// }


//declaring variables for open cards and moves
var openCard = [];
var moves = 0;
initGame();


var paper = document.querySelectorAll('.card');

// Logic to find matching cards

var matchingCard = paper.forEach(function(card){
  card.addEventListener('click',function(e){
    //onclick displaying cards
    if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
      openCard.push(card);
      card.classList.add('open','show');

      var firstCardType = openCard[0].querySelector('i').classList.item(1);
      
      if(openCard.length == 2){
        //comparing cards when opening two cards
        if(openCard[0].querySelector('i').classList.item(1)==openCard[1].querySelector('i').classList.item(1)){
        
          openCard[0].classList.add('open','show','match');
          
          openCard[1].classList.add('open','show','match');
          
          matchedCard.push(openCard[0].querySelector('i').classList.item(1));
          
          openCard = [];
        }else{
          setTimeout(function(){

            //in the case of Unmatching

            openCard.forEach(function(card){
              card.classList.remove('open','show');
            });
            openCard = [];
          },500);
        }
        moves += 1;
        starRating()
        if(moves==1){
          starttimer();

        }
        moveCounter.innerHTML = moves;
        endGame();
      }
    }
  });
});


// when the player wins the game

function endGame(){
  
    if(matchedCard.length == 8){
      clearInterval(duration);
      youWin.innerText = " CONGRAGULATIONS \n " + " YOU WIN in " + `${moves}` +" moves with a time span of " + `${minutes}` +"min" + `${timeCount}` +"sec"  ;
      youWin.classList.add('blink');
    }else{
    }
}


// for Restarting the game

$restart.addEventListener('click',function(){

    paper.forEach(function(card){
      card.classList.remove('open','show','match');
      moves = 0;
      moveCounter.innerHTML = moves;
      youWin.innerText = "Matching Game";
      youWin.classList.remove('blink');
      shuffle(cards);
      reset();

    })
  matchedCard = [];

})




