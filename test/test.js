const assert = require('chai').assert


// Import Modules

const GamePlay = require('../game-play.js');

const defaultGameSettings = {
                dateCreated: new Date(), 
                discardedCards: [],
                hintsLeft: 8, 
                livesLeft: 3, 
                messages: [],
                numberOfPlayers: 3,
                originalDeck: [/*Length of 50 Card Objects*/],
                playedCards: [],
                players: [],
                playingDeck: [],
                score: 0,
                tableIds: []
              }

describe("GamePlay", function(){
  
  describe(".newGame", function(){
    
    it("Should create a game Object for 3 people with correct Keys", function(){
      const numberOfPlayers = 3; 
      const expectedObjectKeys = Object.keys(defaultGameSettings)
      
      const newGameObject = GamePlay.newGame(numberOfPlayers)
      const newGameKeys = Object.keys(newGameObject)
      newGameKeys.sort();
      expectedObjectKeys.sort();

      assert.deepEqual(expectedObjectKeys, newGameKeys)
      
      
    });
  
    it("its Player's Array's Length should be the same as number of Players (3)", function(){
      const numberOfPlayers = 3;
      const expectedResult = 3; 
      
        const newGameObject = GamePlay.newGame(numberOfPlayers)
      
      assert.equal(expectedResult, newGameObject.players.length)
                   
    });
    
    it("its Player's Array's Length should be the same as number of Players (5)", function(){
      const numberOfPlayers = 5;
      const expectedResult = 5; 
      
        const newGameObject = GamePlay.newGame(numberOfPlayers)
      
      assert.equal(expectedResult, newGameObject.players.length)
                   
    });
    
    it("Should set Game to Default Settings", function(){
      var expectedSettings = {
                dateCreated: new Date(), 
                discardedCards: [],
                hintsLeft: 8, 
                livesLeft: 3, 
                messages: [],
                numberOfPlayers: 3,
                playedCards: [],
                score: 0,
              }
      var expectedArrayLengths = {
        o
      }
      
      assert.equal(
      
    });
  
  });
  
});