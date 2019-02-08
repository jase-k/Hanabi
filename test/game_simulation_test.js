/*
'/test/game_simulation_test.js'
This Tests the Module Simulate from '/modules/game_simulation.js
*/

const assert = require('chai');

import {Simulate} from '../modules/game_simulation.js'
  
describe("Simulate", function(){
  describe("doesCardPlay", function(){
      it("returns true if card can play blue 3", function(){
        var card = {color: "blue", hints:[], number: 3}
        var playedCards = [{color: "blue", hints:[], number: 1}, {color: "blue", hints:[], number: 2}]
     
        var torf = Simulate.doesCardPlay(card, playedCards)
        assert.isOk(torf)
        })
      it("returns false if card cannot play blue 3", function(){
        var card = {color: "blue", hints:[], number: 3}
        var playedCards = [{color: "red", hints:[], number: 1}, {color: "red", hints:[], number: 2}]
     
        var torf = Simulate.doesCardPlay(card, playedCards)
        assert.isNotOk(torf)
        });
      it("returns true if card can play red 1", function(){
        var card = {color: "red", hints:[], number: 1}
        var playedCards = [{color: "blue", hints:[], number: 1}, {color: "blue", hints:[], number: 2}]
     
        var torf = Simulate.doesCardPlay(card, playedCards)
        console.log(torf)
        assert.isOk(torf)
        
      });
    });
  describe("doesAnyCardPlay", function(){
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
        var torf = Utils.doesAnyCardPlay(player, playedCards, playingDeck)
          
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
        var torf = Utils.doesAnyCardPlay(player, playedCards, playingDeck)
          
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
        
        var torf = Utils.doesAnyCardPlay(player, playedCards, playingDeck)
          
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
        
        var torf = Utils.doesAnyCardPlay(player, playedCards, playingDeck)
          
        assert.deepEqual(playingDeck[0], expectedFirstCard[0])
         });
    });
  describe("shouldItBeDiscarded", function(){
    
  });
  describe("shouldAnyBeDiscarded", function(){
    var hand =  [
        {color: "red", hints:[], number: 5}, 
        {color: "blue", hints:[], number: 2}, 
        {color: "red", hints:[], number: 3},
        {color: "red", hints:[], number: 2} 
                ]
    var discardedPile = []
    var playedCards = [
        {color: "blue", hints:[], number: 1},
        {color: "blue", hints:[], number: 2}
                       ]
    //Returns an Index of True; returns undefined if False
    var torf = Simulate.shouldAnyBeDiscarded(hand, discardedPile, playedCards)
  
  });
});