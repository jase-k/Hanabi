var i;
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
  
  }
}


module.exports = GamePlay