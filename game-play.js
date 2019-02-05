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
    var returned = doesCardPlay(deck[0], [{color: "white", number: 2}])
  return returned
  },
}

function doesCardPlay(cardToCheck, playedCards){
  var colorPile = cardToCheck.color
  var playedCardColorPile = playedCards.filter(function(card){
    return card.color == colorPile
  })
  
  var highestCardInPile = Math.max(playedCardColorPile.map(card => card.number)) 

  
  return cardToCheck.color
}

module.exports = {GamePlay, ModifyDeck}