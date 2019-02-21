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

const GamePlay = require('../modules/game_play.js');
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
  describe(".switchActivePlayer", function(){
    it("should swith active player from first player the second player", function(){
      var game = {
        players : [
          {active: 1},
          {active: 0}
        ]
      }
      
      GamePlay.switchActivePlayer(game, 2, 0)
      
      assert.equal(game.players[0].active, 0)
      assert.equal(game.players[1].active, 1)
    });
    it("should swith active player from second player the first player", function(){
      var game = {
        players : [
          {active: 0},
          {active: 1}
        ]
      }
      
      GamePlay.switchActivePlayer(game, 2, 1)
      
      assert.equal(game.players[0].active, 1)
      assert.equal(game.players[1].active, 0)
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
    it("should set game.players[0].name to NAME", function(){
      const name = 'Frodo';
      const expectedResult = name; 
      
      const newGameObject = GamePlay.newGame(3, name)
      
      assert.equal(newGameObject.players[0].name, name)
    });
    it("should set game.players[0].active to 1", function(){
      const name = 'Frodo';
      const expectedActive = 1; 
      
      const newGameObject = GamePlay.newGame(3, name)
      
      assert.equal(newGameObject.players[0].active, expectedActive)
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
    it("should return false if the name slots are full and the name is not found", function(){
      var name = "Mary"
      var game = Defaults.gameSettings2Player();
          game.players[1].name = "Pippen"
      
      var expectedResult = false
      
      var results = GamePlay.joinGame(game, name)
      
      assert.equal(results, expectedResult)
      
    });
    it("should switch gameProgress to 'in progress' after last person joins", function(){
      var name = "Mary"
      var game = Defaults.gameSettings2Player();
        
      var expectedResult = 'in progress'
      
      var results = GamePlay.joinGame(game, name)
      
      assert.equal(game.gameProgress, expectedResult)
    });
  });
  describe(".playCard", function(){
    it("should copy the played card to the .playedCards array (card[0])", function(){
      var game = Defaults.gameSettings2Player(),
          cardPlayed = { color: 'white', hints: [], number: "1" },
          cardIndex = 0,
          playerOfCard = "Legolas"
          
      game.players[0].hand[0] = cardPlayed
      
      GamePlay.playCard(game, cardIndex, playerOfCard)
      
      assert.deepEqual(game.playedCards[0], cardPlayed)
    });
    it("should copy the played card to the .playedCards array (card[4])", function(){
      var game = Defaults.gameSettings2Player(),
          cardPlayed = { color: 'white', hints: [], number: "1" },
          cardIndex = 4,
          playerOfCard = "Legolas"
          
      
      GamePlay.playCard(game, cardIndex, playerOfCard)
      
      assert.deepEqual(game.playedCards[0], cardPlayed)
    });
    it("should replace the played card in the .hand with the first card in the .playingDeck", function(){
      var game = Defaults.gameSettings2Player(),
          replacementCard = {color: 'red', hints: [], number: 3 },
          cardIndex = 4,
          playerOfCard = "Legolas"
          
      GamePlay.playCard(game, cardIndex, playerOfCard)
      
      assert.deepEqual(game.players[0].hand[4], replacementCard)
      
    });
    it("should discard card if the played card doesn't Play", function(){
      var game = Defaults.gameSettings2Player(),
          cardIndex = 3,
          playerOfCard = "Legolas"
          
      var expectedCard = {color: 'red', hints: [], number: "3" }
      game.players[0].hand[3] = expectedCard
          
       GamePlay.playCard(game, cardIndex, playerOfCard)
      
      assert.deepEqual(game.discardedCards[0], expectedCard)
    });
    it("should increase hints if a 5 is played", function(){
      var game = Defaults.gameSettings2Player(),
          expectedHints = 9,
          cardToPlay = {color: "red", hints:[], number: "5"},
          playedCards = [ 
            {color: "red", hints:[], number: "1"},
            {color: "red", hints:[], number: "2"},
            {color: "red", hints:[], number: "3"},
            {color: "red", hints:[], number: "4"},
          ]
      game.playedCards = playedCards
      game.players[0].hand[0] = cardToPlay
      
      GamePlay.playCard(game, 0, "Legolas")
      
      assert.equal(game.hintsLeft, expectedHints)
      
    });
    it("should correctly play a red 3 if a red 2 is in the PlayedCards array", function(){
      var game = Defaults.gameSettings2Player();
          game.playedCards = [
            {color: "red", hints: [], number: "1"},
            {color: "red", hints: [], number: "2"},
            ]
          game.players[0].hand[1] = {color: "red", hints:[], number: "3"}
      
     var results =  GamePlay.playCard(game, 1, "Legolas")
      
      assert.ok(results)            
        
    });
    it("should not play a red 3 if a white 2 is in the .playedCards array", function(){
      var game = Defaults.gameSettings2Player(),
          expectedArray = [
            {color: "white", hints:[], number: "1"},
            {color: "white", hints:[], number: "2"}
          ]
          game.playedCards = expectedArray
      
          game.players[0].hand[1]
      
      GamePlay.playCard(game, 1, "Legolas")
      
      assert.deepEqual(game.playedCards, expectedArray )
    });
    it("should reduce livesLeft by 1 if card does not play", function(){
      var game = Defaults.gameSettings2Player(),
          card = {color: "black", hints:[], number: "2"}
          game.players[0].hand[0] = card
      
      GamePlay.playCard(game, 0, "Legolas")

        assert.equal(game.livesLeft, 2)
    });
    it("should update messages array with Success! NAME played a CARD COLOR NUMBER with a successfulPlay", function(){
      var game = Defaults.gameSettings2Player(),
          card = {color: "red", hints:[], number: "1"},
          expectedMessage = "Success! Legolas played a red 1"
      
      game.players[0].hand[0] = card
      
      GamePlay.playCard(game, 0, "Legolas")
      
      assert.equal(game.messages[0], expectedMessage)
      
    });
    it("should update messages array with Whoops! NAME tried playing a CARD COLOR NUMBER and it did not play  with a successfulPlay", function(){
      var game = Defaults.gameSettings2Player(),
          card = {color: "red", hints:[], number: "2"},
          expectedMessage = "Whoops! Legolas tried playing a red 2 and it did not play"
      
      game.players[0].hand[0] = card
      
      GamePlay.playCard(game, 0, "Legolas")
      
      assert.equal(game.messages[0], expectedMessage)
      
    });
    it("should switch active to 0 for player and switch active to 1 to the next Player", function(){
      var game = Defaults.gameSettings2Player(),
          card = {color: "black", hints:[], number: "2"}
          game.players[0].hand[0] = card
      
        GamePlay.playCard(game, 0, "Legolas")

        assert.equal(game.players[0].active, 0)
        assert.equal(game.players[1].active, 1)
    });
    it("should update gameProgress based on 'Simulate.isGameOver' results", function(){
      var game = Defaults.gameSettings2Player(),
          expectedGameProgress = 'in progress'
      
        GamePlay.playCard(game, 0, "Legolas")

        assert.equal(game.gameProgress, expectedGameProgress)
    });
  });
  describe(".discard", function(){
    it("should copy the discarded card to the .discardedCards array (card[0])", function(){
      var game = Defaults.gameSettings2Player(),
          card = {color: "black", hints:[], number: "1"}
          game.players[0].hand[0] = card
          
      GamePlay.discard(game, 0, "Legolas")
      
      assert.deepEqual(game.discardedCards[0], card)
    });
    it("should copy the discarded card to the .discardedCards array (card[1])", function(){
      var game = Defaults.gameSettings2Player(),
          card = {color: "black", hints:[], number: "1"}
          game.players[0].hand[1] = card
          
      GamePlay.discard(game, 1, "Legolas")
      
      assert.deepEqual(game.discardedCards[0], card)
    });
    it("should replace the the discarded card with the first card in the .playingDeck array", function(){
      var game = Defaults.gameSettings2Player(),
          card = {color: "black", hints:[], number: "1"},
          replacementCard = {color: "blue", hints:[], number: "4"}        
          game.players[0].hand[1] = card
          game.playingDeck[0] = replacementCard
          
      GamePlay.discard(game, 1, "Legolas")
      
      assert.deepEqual(game.players[0].hand[1], replacementCard)
    })
    it("should increase hintsLeft by 1", function(){
      var game = Defaults.gameSettings2Player()
          
      GamePlay.discard(game, 0, "Legolas");
      
      assert.equal(game.hintsLeft, 9)
    });
    it("should update messages array with NAME discarded CARD COLOR NUMBER", function(){
      var game = Defaults.gameSettings2Player(),
          card = {color: "red", hints:[], number: "2"},
          expectedMessage = "Legolas discarded a red 2"
      game.players[0].hand[0] = card
      
      GamePlay.discard(game, 0, "Legolas")
      
      assert.equal(game.messages[0], expectedMessage)
    });
    it("should switch active to 0 for player and switch active to 1 to the next Player", function(){
      var game = Defaults.gameSettings2Player()
      
        GamePlay.discard(game, 0, "Legolas")

        assert.equal(game.players[0].active, 0)
        assert.equal(game.players[1].active, 1)
    });
    it("should update gameProgress based on 'Simulate.isGameOver' results", function(){
      var game = Defaults.gameSettings2Player(),
          expectedGameProgress = 'in progress'
      
        GamePlay.discard(game, 0, "Legolas")

        assert.equal(game.gameProgress, expectedGameProgress)
    });
  });
  describe(".giveHint", function(){
    it("should update hints for Recieving Player's hand", function(){
      var game = Defaults.gameSettings2Player(),
          hint = '1',
          name = "Gimli"
      
      game.players[1].name = name;
      
      GamePlay.giveHint(game, hint, name, "Legolas")
    
      assert.equal(game.players[1].hand[0].hints.length, 1) 
      assert.equal(game.players[1].hand[4].hints.length, 1)
      
    });
    it("should set 'not HINT' for non matching cards (number hints)", function(){
      var game = Defaults.gameSettings2Player(),
          hint = '1', 
          name = "Aragon",
          hand = [
          {color: "red", hints:[], number: "1"},
          {color: "white", hints:[], number: "2"},
          {color: "blue", hints:[], number: "3"},
          {color: "black", hints:[], number: "4"},
          {color: "orange", hints:[], number: "5"}
          ]
      
      game.players[1].name = name
      game.players[1].hand = hand
      
      GamePlay.giveHint(game, hint, name, "Legolas")
      
      var playerHand = game.players[1].hand
      assert.equal(playerHand[0].hints, '1')
      assert.equal(playerHand[1].hints, 'not 1')
      
    });
    it("should set 'not HINT' for non matching cards(color hints)", function(){
      var game = Defaults.gameSettings2Player(),
          hint = 'blue', 
          name = "Aragon",
          hand = [
          {color: "red", hints:[], number: "1"},
          {color: "white", hints:[], number: "2"},
          {color: "blue", hints:[], number: "3"},
          {color: "black", hints:[], number: "4"},
          {color: "orange", hints:[], number: "5"}
          ]
      
      game.players[1].name = name
      game.players[1].hand = hand
      
      GamePlay.giveHint(game, hint, name, "Legolas")
      
      var playerHand = game.players[1].hand
      assert.equal(playerHand[2].hints, 'blue')
      assert.equal(playerHand[1].hints, 'not blue')
      
    });
    it("should remove unneccessary hints", function(){
      var game = Defaults.gameSettings2Player(),
          hint = '1', 
          name = "Aragon",
          hand = [
          {color: "red", hints:["not 5", "red", "not 3"], number: "1"},
          {color: "white", hints:["not 5", "not red", "not 3", "white"], number: "2"},
          {color: "blue", hints:["not 5", "not red", "3", "not white"], number: "3"},
          {color: "black", hints:["not 5", "not red", "not 3", "not white"], number: "4"},
          {color: "orange", hints:["not 5", "not red", "not 3", "not white"], number: "1"}
          ]
      
      game.players[1].name = name
      game.players[1].hand = hand
      
      GamePlay.giveHint(game, hint, name, "Legolas")
      
      var playerHand = game.players[1].hand
      
      assert.deepEqual(playerHand[0].hints, ["red", "1"])
      assert.deepEqual(playerHand[4].hints, ["not red", "not white", "1"])
    }); 
    it("should remove unneccessary hints (colors)", function(){
      var game = Defaults.gameSettings2Player(),
          hint = 'blue', 
          name = "Aragon",
          hand = [
          {color: "red", hints:["not 5", "red", "not 3"], number: "1"},
          {color: "white", hints:["not 5", "not red", "not 3", "white"], number: "2"},
          {color: "blue", hints:["not 5", "not red", "3", "not white"], number: "3"},
          {color: "black", hints:["not 5", "not red", "not 3", "not white"], number: "4"},
          {color: "orange", hints:["not 5", "not red", "not 3", "not white"], number: "1"}
          ]
      
      game.players[1].name = name
      game.players[1].hand = hand
      
      GamePlay.giveHint(game, hint, name, "Legolas")
      
      var playerHand = game.players[1].hand
      
      assert.deepEqual(playerHand[0].hints, ["not 5", "red", "not 3"])
      assert.deepEqual(playerHand[2].hints, ["3", "blue"])
    }); 
    it("should reduce hintsLeft by 1", function(){
      var game = Defaults.gameSettings2Player(),
          hint = 'red',
          name = 'Gandolf'
      game.players[1].name = name
      
      GamePlay.giveHint(game, hint, name, "Legolas")
      
      assert.equal(game.hintsLeft, 7)
          
    });
    it("should update messages to 'PLAYER, gave NAME a hint about his/her HINT", function(){
      var game = Defaults.gameSettings2Player(),
          hint = '1',
          name = 'Gimli'
      
      game.players[1].name = name
      
      GamePlay.giveHint(game, hint, name, "Legolas")
      
      assert.equal(game.messages, "Legolas gave Gimli a hint about his/her 1's")
    });
    it("should switch active to 0 for player and switch active to 1 to the next Player", function(){
      var game = Defaults.gameSettings2Player()
          game.players[1].name = "Gimli"
        GamePlay.giveHint(game, '1', "Gimli", "Legolas")

        assert.equal(game.players[0].active, 0)
        assert.equal(game.players[1].active, 1)
    });
  });
  describe(".setHint", function(){
    it("should add hint to array if it matches the card color", function(){
      var card = {color: "red", hints:[], number: "1"},
          hint = "red"
      
      GamePlay.setHint(card, hint)
      
      assert.equal(card.hints[0], hint)
        
    });
    it("should add NOT hint to the array if card does not match the hint (color)", function(){
      var card = {color: "red", hints:[], number: "1"}, 
          hint = "blue"
      
      GamePlay.setHint(card, hint)
      
      assert.equal(card.hints[0], "not "+hint)
    });
    it("should add hint to array if it matches the card number", function(){
      var card = {color: "red", hints:[], number: "1"},
          hint = "1"
      
      GamePlay.setHint(card, hint)
      
      assert.equal(card.hints[0], hint)
        
    });
    it("should add NOT hint to the array if card does not match the hint (number)", function(){
      var card = {color: "red", hints:[], number: "1"}, 
          hint = "2"
      
      GamePlay.setHint(card, hint)
      
      assert.equal(card.hints[0], "not "+hint)
    });
    it("should remove NOT HINT TYPE's in array if card matches HINT", function(){
      var card = {color: "red", hints:["not 1", "not 3", "not blue"], number: "2"}, 
          hint = "2",
          expectedArray = ["not blue", "2"]
      
      GamePlay.setHint(card, hint)
      
      assert.deepEqual(card.hints, expectedArray)
    });
    it("should remove NOT HINT TYPE's in array if card matches HINT", function(){
      var card = {color: "red", hints:["not 1", "not white", "not blue"], number: "2"}, 
          hint = "red",
          expectedArray = ["not 1", "red"]
      
      GamePlay.setHint(card, hint)
      
      assert.deepEqual(card.hints, expectedArray)
    });
    it("should not add the same hint to the array if already present", function(){
      var card = {color: "red", hints: ["2"], number: "2"},
          hint = "2", 
          expectedArray = ["2"]
      
      GamePlay.setHint(card, hint)
      
      assert.deepEqual(card.hints, expectedArray)
      
    });
  });
});




/*
= GAME FLOW =
GamePlay.newGame() => Database.insert(results) 
GamePlay.joinGame() => Database.update(results)
GamePlay.

*/