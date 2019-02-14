/* 
/test/game_play_test.js

Tests the Functionality of the Gameplay Module

This modules Creates a New Game,and handles Playing Options:
-.playcard
-.discard
-.givehint

*/

const assert = require('chai').assert


// Import Modules

const {GamePlay} = require('../modules/game_play.js');
const Defaults = require('./defaults.js')

describe("GamePlay", function(){
  
  describe(".createDeck", function(){
    it("Creates and Returns an Array of 50 Card Objects for the OriginalDeck", function(){
      const expectedResult = 50 
      const expectedCardKeys = ["color", "hints", "number"]
      
      const originalDeck = GamePlay.createDeck()
      
      assert.equal(expectedResult, originalDeck.length)
      assert.containsAllKeys(originalDeck[0], expectedCardKeys)
    });
    it("Creates 3 (number 1 cards of every color) 2 (number 2-4 cards of every color) and 1 (number 5 of every color)", function(){
      const expectedDeck = Defaults.deckOfCards()
      
      const originalDeck = GamePlay.createDeck()
      
      assert.deepEqual(expectedDeck, originalDeck)
    }); 
  });
  describe(".shufflesDeck", function(){
    it("Returns an Array of 50 Card Objects", function(){
      const expectedDeckLength = 50;
      var   deck = Defaults.deckOfCards();
      
      const shuffledDeck = GamePlay.shufflesDeck(deck);
      
      assert.equal(expectedDeckLength, shuffledDeck.length)
      
    });
    it("Returns a shuffled Deck", function(){
      const expectDeck = Defaults.deckOfCards();
      
      var deck = GamePlay.shufflesDeck(Defaults.deckOfCards());
      
      assert.notDeepEqual(deck, expectDeck, "Does Not Equal Unshuffled Deck");
      assert.sameDeepMembers(deck, expectDeck, "Has the Same Cards as the Original Deck");
    });
  });
  describe(".dealsHands", function(){
    it("should return an object containing keys:  'playinDeck' and 'players'", function(){
      var deck = Defaults.shuffledDeckOfCards()
      var numberOfPlayers = 3; 
      var expectedKeys = ["players", "playingDeck"];
          
      var object = GamePlay.dealsHands(numberOfPlayers, deck)
      
      assert.containsAllKeys(object, expectedKeys)
      
    });
    it("should deal 5 cards for 3 players", function(){
      var deck = Defaults.shuffledDeckOfCards()
      var numberOfPlayers = 3; 
      
      const expectedHandLength = 5;
      
      var object = GamePlay.dealsHands(numberOfPlayers, deck)
      
      assert.equal(object.players[0].hand.length, expectedHandLength) 
      
    });
    it("should deal 4 cards for 4-5 players", function(){
      var deck = Defaults.shuffledDeckOfCards()
      var numberOfPlayers = 5; 
      
      const expectedHandLength = 4;
      
      var object = GamePlay.dealsHands(numberOfPlayers, deck)
      
      assert.equal(object.players[0].hand.length, expectedHandLength) 
      
    });
    it("should return array object.players that contains Player Objects with the keys: 'hand', 'name', 'active'", function(){
      var deck = Defaults.shuffledDeckOfCards()
      var numberOfPlayers = 5; 
      
      const expectedPlayerKeys = ["hand", "name", "active"]
      const expectedPlayerLength = 5;
      
      var object = GamePlay.dealsHands(numberOfPlayers, deck)
      
      assert.containsAllKeys(object.players[0], expectedPlayerKeys);
    });
    it("should return Array: 'object.players.hand' that contains CardObjects with the keys: 'number', 'color', 'hints'", function(){
      var deck = Defaults.shuffledDeckOfCards()
      var numberOfPlayers = 5; 
      
      const expectedHandLength = 5
      const expectedCardKeys = ["number", "color", "hints"]
      const expectedPlayerLength = 5;
      
      var object = GamePlay.dealsHands(numberOfPlayers, deck)
      
      assert.containsAllKeys(object.players[0].hand[0], expectedCardKeys) 
    });
    it("Dealt Cards should match the first X number of Cards in the Original Shuffled deck", function(){
      var deck = Defaults.shuffledDeckOfCards();
      var numberOfPlayers = 3
      var expectedHands = deck.slice(0,15)
      
      var object = GamePlay.dealsHands(numberOfPlayers, deck)
      //Joins the Players Hands into One Array
      var cardsInPlayersHand = object.players[0].hand.concat(object.players[1].hand, object.players[2].hand)
      
      assert.sameDeepMembers(cardsInPlayersHand, expectedHands)  
    });
    it("should remove dealt cards from returned object.playingDeck", function(){
      var deck = Defaults.shuffledDeckOfCards();
      var numberOfPlayers = 3
      var expectedDeckSize = 35
      
      var object = GamePlay.dealsHands(numberOfPlayers, deck)
      
      assert.equal(object.playingDeck.length, expectedDeckSize) 
    
    });
  });
  describe(".newGame", function(){
    it("Should create a game Object with correct Keys", function(){
      const numberOfPlayers = 2; 
      const expectedObjectKeys = Object.keys(Defaults.gameSettings2Player())

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
    it("its Hand Array Length should be 4 for 4 players", function(){
      const numberOfPlayers = 4
      const expectedHandLength = 4; 
      
      const newGameObject = GamePlay.newGame(numberOfPlayers)
      
      assert.equal(newGameObject.players[0].hand.length, expectedHandLength)
    });
    it("its Hand Array Length should be 5 for 3 players", function(){
      const numberOfPlayers = 3
      const expectedHandLength = 5; 
      
      const newGameObject = GamePlay.newGame(numberOfPlayers)
      
      assert.equal(newGameObject.players[0].hand.length, expectedHandLength)
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
      //assert.deepEqual(gameObject.dateCreated, expectedSettings.dateCreated, "Date Created should be the same as the test Date")
      assert.equal(gameObject.hintsLeft, expectedSettings.hintsLeft, "Hints Left always starts at 8")
      assert.equal(gameObject.livesLeft, expectedSettings.livesLeft, "Lives Left always starts at 3")
      assert.equal(gameObject.numberOfPlayers, expectedSettings.numberOfPlayers, "Number of Players should equal 3")
      assert.equal(gameObject.score, expectedSettings.score, "Score should start out at 0")
    });
  });
  describe(".joinGame", function(){
    it("it should add playerName to the next available spot in the game Object (2-player)", function(){
      var name = "Frodo"
      var game = Defaults.gameSettings2Player()
  
      GamePlay.joinGame(game, name)
      
      assert.equal(game.players[1].name, name)
    });
    it("it should add playerName to the next available spot in the game Object (5-player)", function(){
      var name = "Frodo"
      var game = Defaults.gameSettings5Player()
          game.players[1].name = "Sam Wise" //set the second name to mimic the second player already joining
      
      GamePlay.joinGame(game, name)
      
      assert.equal(game.players[2].name, name)//Checks the third name
    });
    it("should return the same gameObject if the name is already in the game Object", function(){
      var name = "Pippen"
      var game = Defaults.gameSettings5Player();
          game.players[1].name = "Pippen"
      
      var expectedResult = JSON.parse(JSON.stringify(game))
      
      GamePlay.joinGame(game, name)
      
      assert.deepEqual(game.players, expectedResult.players)
      
    });
  });
  describe(".playCard", function(){
    it("should copy the played card to the .playedCards array (card[0])", function(){
      var game = Defaults.gameSettings2Player(),
          cardPlayed = { color: 'white', hints: [], number: "3" },
          cardIndex = 0,
          playerOfCard = "Legalos"
          
      
      GamePlay.playCard(game, cardIndex, playerOfCard)
      
      assert.deepEqual(game.playedCards[0], cardPlayed)
    });
    it("should copy the played card to the .playedCards array (card[4])", function(){
      var game = Defaults.gameSettings2Player(),
          cardPlayed = { color: 'white', hints: [], number: "1" },
          cardIndex = 4,
          playerOfCard = "Legalos"
          
      
      GamePlay.playCard(game, cardIndex, playerOfCard)
      
      assert.deepEqual(game.playedCards[0], cardPlayed)
    });
    it("should replace the played card in the .hand with the first card in the .playingDeck", function(){
      var game = Defaults.gameSettings2Player(),
          replacementCard = {color: 'red', hints: [], number: 3 },
          cardIndex = 4,
          playerOfCard = "Legalos"
          
      GamePlay.playCard(game, cardIndex, playerOfCard)
      
      assert.deepEqual(game.players[0].hand[4], replacementCard)
      
    });
    it("should return false if the played card doesn't Play", function(){
      var game = Defaults.gameSettings2Player(),
          replacementCard = {color: 'red', hints: [], number: 3 },
          cardIndex = 4,
          playerOfCard = "Legalos"
          
      var torf = GamePlay.playCard(game, cardIndex, playerOfCard)
      
      assert.notOk(torf)
    });
  });
  describe(".discard", function(){});
  describe(".giveHint", function(){});
});

describe.skip("Modify Deck", function(){
 });

/*
= GAME FLOW =
GamePlay.newGame() => Database.insert(results) 
GamePlay.joinGame() => Database.update(results)
GamePlay.

*/