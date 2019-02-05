const assert = require('chai').assert


// Import Modules

const GamePlay = require('../game-play.js');



describe("GamePlay", function(){
  
  describe(".newGame", function(){
    
    it("Should returns a complete game Object for 2 people", function(){
      const numberOfPlayers = 2; 
      const expectedObjectKeys = ["numberOfPlayers", "score", "dateCreated", "hintsLeft", "livesLeft", "originalDeck", "playingDeck", 
                                "players", "messages", "discardedCards", "playedCards", "tableIds"]
      
      const newGameObject = GamePlay.newGame(numberOfPlayers)
      const newGameKeys = Object.keys(newGameObject)
      newGameKeys.sort();
      expectedObjectKeys.sort();

      assert.deepEqual(expectedObjectKeys, newGameKeys)
      
      
    });
  
    it("Should return a complete game Object for 4 people", function(){
        const numberOfPlayer = 4;
      
      
      
    });
    
    it("Should set Game to Default Settings", function(){
      const defaultSettings = {
                dateCreated: new Date(), 
                discardedCard: [],
                hintsLeft: 8, 
                livesLeft: 3, 
                
              }
      
    });
  
  });
  
});