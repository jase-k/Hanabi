const assert = require('chai').assert


// Import Modules

import GamePlay from '../game-play.js'



describe("GamePlay", function(){
  
  describe(".newGame", function(){
    
    it("Should returns a complete game Object for 2 people", function(){
      const numberOfPlayers = 2; 
      const expectObjectKeys = ["id", "numberOfPlayers", "score", "dateCreated", "hintsLeft", "livesLeft", "originalDeck", "playingDeck", 
                                "players", "messages", "discardedCards", "playedCards", "]
      
      GamePlay.newGame(numberOfPlayers)
      
    });
  
    it("Should return a complete game Object for 4 people", function(){
        const numberOfPlayer = 4;
      
      
      
    });
  
  });
  
});