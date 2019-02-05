const assert = require('chai').assert


// Import Modules

const {GamePlay, ModifyDeck} = require('../game-play.js');
const Defaults = require('./defaults.js')

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


      assert.containsAllKeys(newGameObject, expectedObjectKeys)
      
      
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
    
    it.skip("Should set Game to Default Settings (3 players)", function(){
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
  describe(".createDeck", function(){
    it("Creates and Returns an Array of 50 Card Objects for the OriginalDeck", function(){
      const expectedResult = 50 
      const expectedCardKeys = ["color", "hints", "number"]
      
      const originalDeck = ModifyDeck.createDeck()
      
      assert.equal(expectedResult, originalDeck.length)
      assert.containsAllKeys(originalDeck[0], expectedCardKeys)
    });
    it("Creates 3 (number 1 cards of every color) 2 (number 2-4 cards of every color) and 1 (number 5 of every color)", function(){
      const expectedDeck = Defaults.deckOfCards()
      
      const originalDeck = ModifyDeck.createDeck()
      
      assert.deepEqual(expectedDeck, originalDeck)
    }); 
  });
  describe(".shufflesDeck", function(){
    it("Returns an Array of 50 Card Objects", function(){
      const expectedDeckLength = 50;
      var   deck = Defaults.deckOfCards();
      
      const shuffledDeck = ModifyDeck.shufflesDeck(deck);
      
      assert.equal(expectedDeckLength, shuffledDeck.length)
      
    });
    it("Returns a shuffled Deck", function(){
      const expectDeck = Defaults.deckOfCards();
      
      var deck = ModifyDeck.shufflesDeck(Defaults.deckOfCards());
      
      assert.notDeepEqual(deck, expectDeck, "Does Not Equal Unshuffled Deck");
      assert.sameDeepMembers(deck, expectDeck, "Has the Same Cards as the Original Deck");
    });
  });
  describe(".dealsHands", function(){
    it("should return an object containing keys:  'playinDeck' and 'players'", function(){
      var deck = Defaults.shuffledDeckOfCards()
      var numberOfPlayers = 3; 
      var expectedKeys = ["players", "playingDeck"];
          
      var object = ModifyDeck.dealsHands(numberOfPlayers, deck)
      
      assert.containsAllKeys(object, expectedKeys)
      
    })
    it("should deals 5 cards for 3 players", function(){
      var deck = Defaults.shuffledDeckOfCards()
      var numberOfPlayers = 3; 
      
      const expectedHandLength = 5
      const expectedCardKeys = ["number", "color", "hints"]
      const expectedPlayerLength = 3;
      
      var object = ModifyDeck.dealsHands(numberOfPlayers, deck)
      
      assert.equal(object.players.length, expectedPlayerLength) 
      
      
    });
  });
});