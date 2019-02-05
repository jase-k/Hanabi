var GamePlay = {
  newGame(){
  return {
      dateCreated: "",
      discardedCards: [],
      hintsLeft: 0, 
      livesLeft: 0,
      messages: [],
      numberOfPlayers: 0, 
      originalDeck: [],
      playedCards: [],
      players: 0, 
      playingDeck: [],
      score: 0,
      tableIds: [],
    }
  }
}


module.exports = GamePlay