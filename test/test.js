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
  
    it("its Player's Array's Length should be the same as number of Players (3 players)", function(){
      const numberOfPlayers = 3;
      const expectedResult = 3; 
      
        const newGameObject = GamePlay.newGame(numberOfPlayers)
      
      assert.equal(expectedResult, newGameObject.players.length)
                   
    });
    
    it("its Player's Array's Length should be the same as number of Players (5 players)", function(){
      const numberOfPlayers = 5;
      const expectedResult = 5; 
      
        const newGameObject = GamePlay.newGame(numberOfPlayers)
      
      assert.equal(expectedResult, newGameObject.players.length)
                   
    });
    
    it("Should set Game to Default Settings (3 players)", function(){
      var numberOfPlayers = 3
      var expectedSettings = {
                dateCreated: new Date(), 
                hintsLeft: 8, 
                livesLeft: 3, 
                numberOfPlayers: 3,
                score: 0,
              }
      var expectedArrayLengths = {
        originalDeck: 50, 
        playingDeck: 35,
        players: 3, 
        hand: 5, 
        hints: 0,
        playedCards: 0,
        messages: 0,
        discardedCards: 0               
      }
      
      const gameObject = GamePlay.newGame(numberOfPlayers)
      
      assert.equal(expectedArrayLengths.originalDeck, gameObject.originalDeck.length)
      assert.equal(expectedArrayLengths.playingDeck, gameObject.playingDeck.length)
      assert.equal(expectedArrayLengths.players, gameObject.players.length)
      assert.equal(expectedArrayLengths.hand, gameObject.players.hand.length)
      assert.equal(expectedArrayLengths.hints, gameObject.players.hand.hints.length)
      assert.equal(expectedArrayLengths.playedCards, gameObject.playedCards.length)
      assert.equal(expectedArrayLengths.messages, gameObject.messages.length)
      assert.equal(expectedArrayLengths.discardedCards, gameObject.discardedCards.length)
      assert.equal(expectedSettings.dateCreated, gameObject.dateCreated)
      assert.equal(expectedSettings.hintsLeft, gameObject.hintsLeft)
      assert.equal(expectedSettings.liveLeft, gameObject.livesLeft)
      assert.equal(expectedSettings.numberOfPlayers, gameObject.numberOfPlayers)
      assert.equal(expectedSettings.score, gameObject.score)
    });
  
  });
  
});

describe("Modify Game", function(){
  describe("Create New Deck", function(){
    it("Creates 50 Card Objects for the OriginalDeck", function(){
      const expectedResult = 50 
      
      ModifyGame.createDeck
    
    });
    
  });
});