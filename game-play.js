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
      originalDeck: [],
      playedCards: [],
      players: [], 
      playingDeck: [],
      score: 0,
      tableIds: [],
    }
for(i = 0; i < numberOfPlayers; i++){
  gameObject.players.push({
    name: null
    })
  }
    
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
      
  }
}


module.exports = {GamePlay, ModifyDeck}