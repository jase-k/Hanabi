var i;
const colors = ["black", "blue", "orange", "red", "white"]
const numbers = [1,1,1,2,2,3,3,4,4,5]

var GamePlay = {
  newGame(numberOfPlayers){
  var gameObject = {
      dateCreated: new Date(),
      discardedCards: [], 
      hintsLeft: 8, //Game Always Starts with 8 Hints 
      livesLeft: 3, //Game Always Begins with 3 lives
      messages: [],
      numberOfPlayers: numberOfPlayers, 
      // Creates and Shuffles Original Deck
      originalDeck: ModifyDeck.shufflesDeck(ModifyDeck.createDeck()),
      playedCards: [],
      players: [], 
      playingDeck: [],
      score: 0,
      tableIds: [],
    }
  
  //dealtGame holds the PlayingDeck and Players Array
  //After the Original deck was shuffled
 var dealtGame= ModifyDeck.dealsHands(numberOfPlayers, gameObject.originalDeck)

     gameObject.playingDeck = dealtGame.playingDeck
     gameObject.players = dealtGame.players
    
    return gameObject
  }
}

const ModifyDeck = {
  createDeck(){
    var array = [];
    
    for(i = 0; i < colors.length; i++){
      for(var j = 0; j < numbers.length; j++){
       array.push({
         color: colors[i], 
         hints: [],
         number: numbers[j]
       }) 
      }
    }
    return array
  },
  shufflesDeck(deck){
    var shuffledArray = [];
    var index;  
      for(var i=0; i < deck.length;){
      index = Math.floor(Math.random()*deck.length)
        shuffledArray.push(deck[index])
        deck.splice(index, 1)
      }        
    return shuffledArray
  },
  dealsHands(numberOfPlayers, deck){
    var handSize;
    var cloneDeck = deck.slice() // Creates a clone of the deck so we don't affect Original Deck
    
    if(numberOfPlayers < 4){
      handSize = 5;
    }else{
      handSize = 4;
    };
    
    var object = {
      players: [],
      playingDeck: [],
    };
    
  for(i = 0; i < numberOfPlayers; i++){
    object.players.push({
      name: "", 
      hand: [],
      active: 0,
    });
    for(var j = 0; j < handSize; j++){
      object.players[i].hand.push(
        cloneDeck.shift()
      );
    };
  };
    
    object.playingDeck = cloneDeck //Sets the Playing Deck to the remaining cards
      
    return object
  },
  checkWinnability(deck, numberOfPlayers){
  /*We will check the first instance of each card. If it is the first time
that card appears in the deck the number will be subtracted by 5. The value
from that operation will be set as it's cardsLeftToPlay value. Then we iterate
through the array subtracting 1 from cardsToPlay with each card (without going below zero).
When a card has a cardsLeftToPlay value we add it a cardToPlay value. If at the end of the iteration
cardsToPlay has a value greater than zero, the gameDeck is unwinnable.
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
      cardToPlay += array.cardsLeftToPlay  
    }
    
//returns True if the Game is Winnable and False if it is impossible to Win.   
  if(cardToPlay){return false
              }
    else{
                  return true}
  },
}


module.exports = {GamePlay, ModifyDeck}