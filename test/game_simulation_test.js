/*
'/test/game_simulation_test.js'
This Tests the Module Simulate from '/modules/game_simulation.js
*/

const assert = require('chai').assert;

const Simulate = require('../modules/game_simulation.js')
const Defaults = require('./defaults.js')
describe("Simulate", function(){
  describe("doesCardPlay", function(){
      it("returns true if card can play blue 3", function(){
        var card = {color: "blue", hints:[], number: 3}
        var playedCards = [{color: "blue", hints:[], number: 1}, {color: "blue", hints:[], number: 2}]
     
        var torf = Simulate.doesCardPlay(card, playedCards)
        
        assert.ok(torf)
        })
      it("returns false if try play blue 3 with a red 1 & 2 already played", function(){
        var card = {color: "blue", hints:[], number: 3}
        var playedCards = [{color: "red", hints:[], number: 1}, {color: "red", hints:[], number: 2}]
     
        var torf = Simulate.doesCardPlay(card, playedCards)
        
        assert.notOk(torf)
        
        });
      it("returns true if card can play red 1", function(){
        var card = {color: "red", hints:[], number: 1}
        var playedCards = [{color: "blue", hints:[], number: 1}, {color: "blue", hints:[], number: 2}]
     
        var torf = Simulate.doesCardPlay(card, playedCards)

        assert.ok(torf)
        
      });
    });
  describe.skip("doesAnyCardPlay", function(){
      it("should return true if one card can play:", function(){
        var player ={ 
          name: "John",
          active: 1, 
          hand:  [
            {color: "red", hints:[], number: 2}, 
            {color: "blue", hints:[], number: 3}, 
            {color: "red", hints:[], number: 3},
            {color: "red", hints:[], number: 5} 
                      ]
        }
        var playedCards = [
                           {color: "blue", hints:[], number: 1},
                           {color: "blue", hints:[], number: 2}
                          ]
        var playingDeck = [
                           {color: "black", hints:[], number: 5},
                           {color: "orange", hints:[], number: 4}
                            ]
        var torf = Simulate.doesAnyCardPlay(player, playedCards, playingDeck)
          
        assert.isOk(torf)
         });
      it("should return false if no card can play:", function(){
        var player ={ 
          name: "John",
          active: 1, 
          hand:  [
            {color: "red", hints:[], number: 2}, 
            {color: "blue", hints:[], number: 4}, 
            {color: "red", hints:[], number: 3},
            {color: "red", hints:[], number: 5} 
                      ]
        }
        var playedCards = [{color: "blue", hints:[], number: 1},
                           {color: "blue", hints:[], number: 2}
                          ]
        var playingDeck = [
                           {color: "black", hints:[], number: 5},
                           {color: "orange", hints:[], number: 4}
                            ]
        var torf = Simulate.doesAnyCardPlay(player, playedCards, playingDeck)
          
        assert.isNotOk(torf)
         });
      it("should replace card in hand with card in playingDeck", function(){
        var player ={ 
          name: "John",
          active: 1, 
          hand:  [
            {color: "red", hints:[], number: 2}, 
            {color: "blue", hints:[], number: 3}, //card that will be replaced
            {color: "red", hints:[], number: 3},
            {color: "red", hints:[], number: 5} 
                      ]
        }
        var playedCards = [{color: "blue", hints:[], number: 1},
                           {color: "blue", hints:[], number: 2}
                          ]
        var playingDeck = [
                           {color: "black", hints:[], number: 5},
                           {color: "orange", hints:[], number: 4}
                            ]
        var expectedReplacement = playingDeck.slice(0,1)        
        
        var torf = Simulate.doesAnyCardPlay(player, playedCards, playingDeck)
          
        assert.deepEqual(player.hand[1], expectedReplacement[0])
         });
       it("should remove card first card from playingDeck", function(){
        var player ={ 
          name: "John",
          active: 1, 
          hand:  [
            {color: "red", hints:[], number: 2}, 
            {color: "blue", hints:[], number: 3}, //card that will be replaced
            {color: "red", hints:[], number: 3},
            {color: "red", hints:[], number: 5} 
                      ]
        }
        var playedCards = [{color: "blue", hints:[], number: 1},
                           {color: "blue", hints:[], number: 2}
                          ]
        var playingDeck = [
                           {color: "black", hints:[], number: 5},
                           {color: "orange", hints:[], number: 4}
                            ]
        var expectedFirstCard = playingDeck.slice(1,2)        
        
        var torf = Simulate.doesAnyCardPlay(player, playedCards, playingDeck)
          
        assert.deepEqual(playingDeck[0], expectedFirstCard[0])
         });
    });
  describe.skip("shouldItBeDiscarded", function(){
    
  });
  describe.skip("shouldAnyBeDiscarded", function(){
  });
  describe(".isGameOver", function(){
    it("should return 'won' if played Cards are 25", function(){
      var game = Defaults.gameSettings2Player()
      game.playedCards = [
        {color:"red", hints:[], number: "1"},
        {color:"red", hints:[], number: "2"},
        {color:"red", hints:[], number: "3"},
        {color:"red", hints:[], number: "4"},
        {color:"red", hints:[], number: "5"},
        {color:"white", hints:[], number: "1"},
        {color:"white", hints:[], number: "2"},
        {color:"white", hints:[], number: "3"},
        {color:"white", hints:[], number: "4"},
        {color:"white", hints:[], number: "5"},
        {color:"orange", hints:[], number: "1"},
        {color:"orange", hints:[], number: "2"},
        {color:"orange", hints:[], number: "3"},
        {color:"orange", hints:[], number: "4"},
        {color:"orange", hints:[], number: "5"},
        {color:"black", hints:[], number: "1"},
        {color:"black", hints:[], number: "2"},
        {color:"black", hints:[], number: "3"},
        {color:"black", hints:[], number: "4"},
        {color:"black", hints:[], number: "5"},
        {color:"blue", hints:[], number: "1"},
        {color:"blue", hints:[], number: "2"},
        {color:"blue", hints:[], number: "3"},
        {color:"blue", hints:[], number: "4"},
        {color:"blue", hints:[], number: "5"},
      ]
      
      var result = Simulate.isGameOver(game)
      
      assert.equal(result, 'won')
    });
    it("should return 'lost' if livesLeft are 0", function(){
      var game = Defaults.gameSettings2Player()
      game.livesLeft = 0 
      
      var result = Simulate.isGameOver(game)
      
      assert.equal(result, 'lost')
    })
    it("should return 'in progress' if lost and won criteria are not met", function(){
      var game = Defaults.gameSettings2Player()
      
      var result = Simulate.isGameOver(game)
      
      assert.equal(result, 'in progress')
    });
    
  });
});