var i;
const colors = ["black", "blue", "orange", "red", "white"]
const numbers = [1,1,1,2,2,3,3,4,4,5]

var GamePlay = {
  newGame(numberOfPlayers){
  var gameObject = {
      dateCreated: "",
      discardedCards: [],
      hintsLeft: 0, 
      livesLeft: 0,
      messages: [],
      numberOfPlayers: 0, 
      originalDeck: ModifyDeck.createDeck(),
      playedCards: [],
      players: [], 
      playingDeck: [],
      score: 0,
      tableIds: [],
    }
  gameObject.playingDeck = ModifyDeck.
    
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
        deck.shift()
      );
    };
  };
    
    object.playingDeck = deck //Sets the Playing Deck to the remaining cards
      
    return object
  }
}


module.exports = {GamePlay, ModifyDeck}