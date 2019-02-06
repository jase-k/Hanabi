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
                playedCards: [/* Length of 50- Dealt Cards */],
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
      
      assert.equal(gameObject.originalDeck.length, expectedArrayLengths.originalDeck, "Original Deck should have 50 Cards")
      assert.equal(gameObject.playingDeck.length, expectedArrayLengths.playingDeck, "Playing Deck should have 35 Cards (because of 3 players with 5 cards)")
      assert.equal(gameObject.players.length, expectedArrayLengths.players, "Player Length should be 3")
      assert.equal(gameObject.players[0].hand.length, expectedArrayLengths.hand, "Players' hand length should be 5")
      assert.equal(gameObject.players[0].hand[0].hints.length, expectedArrayLengths.hints, "Card Hints should start empty")
      assert.equal(gameObject.playedCards.length, expectedArrayLengths.playedCards, "playededCards  should start empty")
      assert.equal(gameObject.messages.length, expectedArrayLengths.messages, "Messages should start empty")
      assert.equal(gameObject.discardedCards.length, expectedArrayLengths.discardedCards, "Discarded Cards should start Empty")
      assert.deepEqual(gameObject.dateCreated, expectedSettings.dateCreated, "Date Created should be the same as the test Date")
      assert.equal(gameObject.hintsLeft, expectedSettings.hintsLeft, "Hints Left always starts at 8")
      assert.equal(gameObject.livesLeft, expectedSettings.livesLeft, "Lives Left always starts at 3")
      assert.equal(gameObject.numberOfPlayers, expectedSettings.numberOfPlayers, "Number of Players should equal 3")
      assert.equal(gameObject.score, expectedSettings.score, "Score should start out at 0")
    });
  
  });
  
});

describe("Modify Deck", function(){
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
      
    });
    it("should deal 5 cards for 3 players", function(){
      var deck = Defaults.shuffledDeckOfCards()
      var numberOfPlayers = 3; 
      
      const expectedHandLength = 5;
      
      var object = ModifyDeck.dealsHands(numberOfPlayers, deck)
      
      assert.equal(object.players[0].hand.length, expectedHandLength) 
      
    });
    it("should deal 4 cards for 4-5 players", function(){
      var deck = Defaults.shuffledDeckOfCards()
      var numberOfPlayers = 5; 
      
      const expectedHandLength = 4;
      
      var object = ModifyDeck.dealsHands(numberOfPlayers, deck)
      
      assert.equal(object.players[0].hand.length, expectedHandLength) 
      
    });
    it("should return array object.players that contains Player Objects with the keys: 'hand', 'name', 'active'", function(){
      var deck = Defaults.shuffledDeckOfCards()
      var numberOfPlayers = 5; 
      
      const expectedPlayerKeys = ["hand", "name", "active"]
      const expectedPlayerLength = 5;
      
      var object = ModifyDeck.dealsHands(numberOfPlayers, deck)
      
      assert.containsAllKeys(object.players[0], expectedPlayerKeys);
    });
    it("should return Array: 'object.players.hand' that contains CardObjects with the keys: 'number', 'color', 'hints'", function(){
      var deck = Defaults.shuffledDeckOfCards()
      var numberOfPlayers = 5; 
      
      const expectedHandLength = 5
      const expectedCardKeys = ["number", "color", "hints"]
      const expectedPlayerLength = 5;
      
      var object = ModifyDeck.dealsHands(numberOfPlayers, deck)
      
      assert.containsAllKeys(object.players[0].hand[0], expectedCardKeys) 
    });
    it("Dealt Cards should match the first X number of Cards in the Original Shuffled deck", function(){
      var deck = Defaults.shuffledDeckOfCards();
      var numberOfPlayers = 3
      var expectedHands = deck.slice(0,15)
      
      var object = ModifyDeck.dealsHands(numberOfPlayers, deck)
      //Joins the Players Hands into One Array
      var cardsInPlayersHand = object.players[0].hand.concat(object.players[1].hand, object.players[2].hand)
      
      assert.sameDeepMembers(cardsInPlayersHand, expectedHands)  
    });
    it("should remove dealt cards from returned object.playingDeck", function(){
      var deck = Defaults.shuffledDeckOfCards();
      var numberOfPlayers = 3
      var expectedDeckSize = 35
      
      var object = ModifyDeck.dealsHands(numberOfPlayers, deck)
      
      assert.equal(object.playingDeck.length, expectedDeckSize) 
    
    });
  });
  describe(".checkWinnability", function(){
    it("should return false if Loss Condition: First Card Instance too Late is true", function(){
      var deck = Defaults.lossExample1();
      var numberOfPlayers = 2; 
      var expectedResult = false;
      
      var torf = ModifyDeck.checkWinnability(deck, numberOfPlayers);
      
      assert.equal(torf, expectedResult)
    });
    it("should return true for shuffled Deck", function(){
    var deck = Defaults.shuffledDeckOfCards();
      var numberOfPlayers = 2; 
      var expectedResult = true;
      var gameObject = ModifyDeck.dealsHands(numberOfPlayers, deck);
      
      var torf = ModifyDeck.checkWinnability(gameObject.players, gameObject.playingDeck)
      console.log(PgameObject.players)
      console.log("Result:", torf)
      assert.equal(torf, expectedResult)
    });
  });
});