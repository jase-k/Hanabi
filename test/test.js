const assert = require('chai').assert


// Import Modules

const GamePlay = require('../game-play.js');

const defaultGameSettings = {
                dateCreated: new Date(), 
                discardedCard: [],
                hintsLeft: 8, 
                id: 0, 
                livesLeft: 3, 
                messages: [],
                numberOfPlayers: 3,
                originalDeck: [/*Length of 50 Card Objects*/],
                playedCards: [],
                players: [
                  {
                    id: 0,
                    name: "John",
                    active: 0, 
                    hand: [],
                  }
                ],
                
              }

describe("GamePlay", function(){
  
  describe(".newGame", function(){
    
    it("Should returns a complete game Object for 2 people", function(){
      const numberOfPlayers = 2; 
      const expectedObjectKeys = Object.keys(defaultGameSettings)
      
      const newGameObject = GamePlay.newGame(numberOfPlayers)
      const newGameKeys = Object.keys(newGameObject)
      newGameKeys.sort();
      expectedObjectKeys.sort();

      assert.deepEqual(expectedObjectKeys, newGameKeys)
      
      
    });
  
    it("s Player's Array's Length should be the same as number of Players", function(){
        const numberOfPlayers = 4;
      
        const newGameObject = GamePlay.newGame(numberOfPlayers)
      
      
    });
    
    it("Should set Game to Default Settings", function(){
      
      
    });
  
  });
  
});