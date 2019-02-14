const gameCreation = {};

gameCreation.createDeck = function (numberOfPlayers){
    var newGame = {}
    var gameDeck = [];
    
  function newDeck() {
    var cardColors = ['orange', 'blue', 'black', 'white', 'red']
    var cardNumbers = [1,1,1,2,2,3,3,4,4,5]
    var array = [];
   
    // loops through both arrays to build the deck
    for(var i = 0; i < cardColors.length; i++){
      for(var j =0; j < cardNumbers.length; j++){
        array.push({color: cardColors[i], number: cardNumbers[j], hints: []})
      }
    }
    return array
  }
  
  function shuffleDeck(array) {
    var shuffleArray = [];
    var number;  
      for(var i=0; i < array.length;){
      number = Math.floor(Math.random()*array.length)
        shuffleArray.push(array[number])
        array.splice(number, 1)
      }    
      
    return shuffleArray
      };
  
  function setCardsLeftToPlayValue(object){
    var value = 5 - object.number
    object.cardsLeftToPlay = value
  }  
    
  function checkIfWinIsPossible(array){
/*We will check the first instance of each card. If it is the first time
that card appears in the deck the number will be subtracted by 5. The value
from that operation will be set as it's cardsLeftToPlay value. Then we iterate
through the array subtracting 1 from cardsToPlay with each card (without going below zero).
When a card has a cardsLeftToPlay value we add it a cardToPlay value. If at the end of the iteration
cardsToPlay has a value greater than zero, the gameDeck is unwinnable.

This Function will Return True or False
*/
  var matched = null;
  
  var firstInstance = [];

//sets cardsLeftToPlay.value for array
    for(var i= 0; i < array.length; i++){
      if(firstInstance.length == 0){
        firstInstance.push(array[i])
        setCardsLeftToPlayValue(array[i])
      }
//If any Matches Sets matched.value to True
      for(var j = 0; j < firstInstance.length; j++){
        if(firstInstance[j].color === array[i].color && firstInstance[j].number === array[i].number){
          matched = true
          break; 
        }else{matched = false}
      };
//if no matched add object to firstInstance String and set CLTP value
//else start next iteration
      if(matched === false){
          firstInstance.push(array[i])
          setCardsLeftToPlayValue(array[i])
      }
    }  

//iterates through the array using the cardsLeftToPlay.value to check if deck is winnable.
//Totals the cardsLeftToPlay for the first x number of cards. x represents how many cards are dealt 
// out when the game starts (dependent on the number of players)
var cardToPlay = 0;
var totalHandSize;

//determines how many cards are dealt out initially.
  if(numberOfPlayers < 4){
    totalHandSize = numberOfPlayers*5
  }else{
   totalHandSize = numberOfPlayers*4 
  }
  
  for(var i= 0; i < array.length; i++){
 //doesn't start counting down until the cards are dealt   
    if(i >= totalHandSize){
        if(cardToPlay > 0){
        cardToPlay--
          }
      }
      cardToPlay += array[i].cardsLeftToPlay  
    }
    
//returns True if the Game is Winnable and False if it is impossible to Win.   
  if(cardToPlay){return false
              }
    else{
                  return true}
  };
  
   do{ 
     gameDeck = shuffleDeck(newDeck());
   } while(!checkIfWinIsPossible(gameDeck))
   
   
return gameDeck 

};

gameCreation.dealHand = function (gameDeck, numberOfPlayers, name){
var game = {}
var handSize = 0
game.players = [];
game.deck = gameDeck
  for(var i =0; i < numberOfPlayers; i++){ 
     if(i !== 0){ 
  game.players[i] = { 
        name: null,
        hand: []
      }
}else{
game.players[i] = { 
        name: name,
        hand: []
                }
    };
  }   
if(numberOfPlayers == 4 || numberOfPlayers == 5){
    handSize = 4
  }
if(numberOfPlayers == 2 || numberOfPlayers == 3){
    handSize = 5 
  }
  
for(var i = 0; i < handSize*numberOfPlayers; i++){
  var index = i % numberOfPlayers
  
  game.players[index].hand.push(game.deck.shift())
  
  }
  console.log(game.deck.length)
  console.log(JSON.stringify(game.players))
  
  return(game)
}



module.exports = gameCreation