/*
/test/api_test.js

This document test the API Call from: 

https://puddle-catcher.glitch.me/

*/
//Import dependencies
const rp = require('request-promise');
const assert = require('chai').assert;

//Import Local Modules
//Import Database
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);


//Import Module:
const {Database, Utils, Helper} = require('../modules/database.js')
const Defaults = require('./defaults.js')

describe('SERVER JS:', function(){
  describe("NEW GAME: /newgame/:numberOfPlayers?name=NAME", function(){
    it("should add a new game to the database", function(done){
      const expectedObjectKeys = [ 'dateCreated',  'discardedCards', 'hintsLeft', 
                                    'livesLeft', 'messages', 'numberOfPlayers', 'originalDeck', 'playedCards',
                                    'players', 'playingDeck', 'score', 'tableIds', 'id']
    
      var url = 'https://puddle-catcher.glitch.me/newgame/2?name=Frodo'
    
      rp(url)
      .then(function(results){
          after(function(){
            db.run("DELETE FROM HanabiGames WHERE id = "+object.tableIds.gameId)
            db.run("DELETE FROM OriginalDeck WHERE gameId = "+object.tableIds.gameId)
            db.run("DELETE FROM PlayingDeck WHERE gameId = "+object.tableIds.gameId)
            db.run("DELETE FROM DiscardedCards WHERE gameId = "+object.tableIds.gameId)
            db.run("DELETE FROM PlayedCards WHERE gameId = "+object.tableIds.gameId)
            db.run("DELETE FROM Messages WHERE gameId = "+object.tableIds.gameId)
            db.run("DELETE FROM Players WHERE gameId = "+object.tableIds.gameId)
         });
      
        var object = JSON.parse(results)
        var objectKeys = Object.keys(object)
      
        assert.deepEqual(objectKeys, expectedObjectKeys, ""+objectKeys+" should equal "+expectedObjectKeys)
        assert.equal(object.players[0].name, 'Frodo')
        assert.ok(results)
      
        done();
      });
    })
  });
  describe("JOIN GAME '/joingame/:gameid?name=NAME'", function(){
    it("should add a new Player and return the game", function(done){
      const expectedObjectKeys = [ 'dateCreated',  'discardedCards', 'hintsLeft', 
                                    'livesLeft', 'messages', 'numberOfPlayers', 'originalDeck', 'playedCards',
                                    'players', 'playingDeck', 'score', 'tableIds', 'id']
    
      var url = 'https://puddle-catcher.glitch.me/newgame/2?name=Frodo'
    
      rp(url)
      .then(function(results){
          after(function(){
              db.run("DELETE FROM HanabiGames WHERE id = "+object.tableIds.gameId)
              db.run("DELETE FROM OriginalDeck WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM PlayingDeck WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM DiscardedCards WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM PlayedCards WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM Messages WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM Players WHERE gameId = "+object.tableIds.gameId)
           });
        
        var object = JSON.parse(results)
        var objectKeys = Object.keys(object)
        var url = 'https://puddle-catcher.glitch.me/joingame/'+object.tableIds.gameId+'?name=Sam'

        rp(url)
        .then(function(results){
          var object = JSON.parse(results)
          var objectKeys = Object.keys(object)
            assert.equal(object.players[1].name, 'Sam')
            assert.ok(results)
            done();
          })
      });
    })
  });
  describe("GET '/game/:gameId/:name'", function(){
    it("should return a game object from the database", function(done){
      const expectedObjectKeys = [ 'dateCreated',  'discardedCards', 'hintsLeft', 
                                    'livesLeft', 'messages', 'numberOfPlayers', 'originalDeck', 'playedCards',
                                    'players', 'playingDeck', 'score', 'tableIds', 'id']
    
      let url = 'https://puddle-catcher.glitch.me/newgame/2?name=Frodo'
    
      rp(url)
      .then(function(results){
          after(function(){
              db.run("DELETE FROM HanabiGames WHERE id = "+object.tableIds.gameId)
              db.run("DELETE FROM OriginalDeck WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM PlayingDeck WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM DiscardedCards WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM PlayedCards WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM Messages WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM Players WHERE gameId = "+object.tableIds.gameId)
           });
        
        var object = JSON.parse(results)
        
        let url = 'https://puddle-catcher.glitch.me/game/'+object.tableIds.gameId+'/Frodo'
        
        rp(url)
        .then(function(results){
          var object = JSON.parse(results)
          var objectKeys = Object.keys(object)
                
            assert.equal(object.players[0].name, 'Frodo')
            assert.equal(object.playedCards.length, 0)
            assert.ok(results)
            done();
          })
      });
    })
    });
  describe("PLAYCARD '/game/:gameId/:name/playcard?cardIndex=INTEGER'", function(){
    it("should play a card and return a object from the database", function(done){
     
      const expectedPlayedCards = [
        {color: "blue", hints:[], number:"1"}
      ]
    
      let url = 'https://puddle-catcher.glitch.me/newgame/2?name=Frodo'
    
      rp(url) // Inserting New Game to Database
      .then(function(results){ 
          after(function(){
              db.run("DELETE FROM HanabiGames WHERE id = "+object.tableIds.gameId)
              db.run("DELETE FROM OriginalDeck WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM PlayingDeck WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM DiscardedCards WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM PlayedCards WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM Messages WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM Players WHERE gameId = "+object.tableIds.gameId)
           });
        
        let object = JSON.parse(results)
        
        object.players[0].active = 1
        object.players[1].name = 'Sam'
        object.players[0].hand[0] = {color: "blue", hints:[], number:"1"}
        
        Database.update(object) //Updating the Database with Sample Values
        .then(function(results){
            
          let object = results
          let url = 'https://puddle-catcher.glitch.me/game/'+object.tableIds.gameId+'/Frodo'
        
          rp(url) // Retrieving the Game from the Database
           .then(function(results){
              let object = JSON.parse(results)
        
              let url = 'https://puddle-catcher.glitch.me/game/'+object.tableIds.gameId+'/Frodo/playcard?cardIndex=0'
          
        
          rp(url) // Executing Played Card Action and Updating 
          .then(function(results){
          
            let object = JSON.parse(results)
            var objectKeys = Object.keys(object)
                
              assert.deepEqual(object.playedCards, expectedPlayedCards)
              assert.ok(results)
              done();
            })
          })
        })
      });   
    });
  });
  describe("DISCARD '/game/:gameId/:name/discard?cardIndex=INTEGER'", function(){
    it("should discard a card and return a object from the database", function(done){
      
      const expectedDiscardedCards = [
        {color: "blue", hints:[], number:"1"}
      ]
    
      let url = 'https://puddle-catcher.glitch.me/newgame/2?name=Frodo'
    
      rp(url) // Inserting New Game to Database
      .then(function(results){ 
          after(function(){
              db.run("DELETE FROM HanabiGames WHERE id = "+object.tableIds.gameId)
              db.run("DELETE FROM OriginalDeck WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM PlayingDeck WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM DiscardedCards WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM PlayedCards WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM Messages WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM Players WHERE gameId = "+object.tableIds.gameId)
           });
        
        let object = JSON.parse(results)
        
        object.players[0].active = 1
        object.players[1].name = 'Sam'
        object.players[0].hand[0] = {color: "blue", hints:[], number:"1"}
        
        Database.update(object) //Updating the Database with Sample Values
        .then(function(results){
      console.log("UPDATE RESULTS:", results)
          let url = 'https://puddle-catcher.glitch.me/game/'+object.tableIds.gameId+'/Frodo'
        
          rp(url) // Retrieving the Game from the Database
           .then(function(results){
              let object = JSON.parse(results)
        console.log("GET RESULTS:", results)
              let url = 'https://puddle-catcher.glitch.me/game/'+object.tableIds.gameId+'/Frodo/discard?cardIndex=0'
          
        
          rp(url) // Executing Discard Card Action and Updating 
          .then(function(results){
 console.log("Execution RESULTS:", results)

            let object = JSON.parse(results)
            var objectKeys = Object.keys(object)
                
              assert.deepEqual(object.discardedCards, expectedDiscardedCards)
              assert.ok(results)
              done();
            })
          })
        })
      });   
    });
  });
  describe.skip("GIVE HINT '/game/:gameId/:name/givehint?hint=INTEGER&player=STRING'", function(){
    it("should update hints on cards and return a object from the database", function(done){
      
      const card = [
        {color: "blue", hints:[], number:"1"}
      ]
      const expectedHintArray = ["not orange"]
    
      let url = 'https://puddle-catcher.glitch.me/newgame/2?name=Frodo'
    
      rp(url) // Inserting New Game to Database
      .then(function(results){ 
          after(function(){
              db.run("DELETE FROM HanabiGames WHERE id = "+object.tableIds.gameId)
              db.run("DELETE FROM OriginalDeck WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM PlayingDeck WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM DiscardedCards WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM PlayedCards WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM Messages WHERE gameId = "+object.tableIds.gameId)
              db.run("DELETE FROM Players WHERE gameId = "+object.tableIds.gameId)
           });
        
        let object = JSON.parse(results)
        
        object.players[0].active = 1
        object.players[1].name = 'Sam'
        object.players[1].hand[0] = {color: "blue", hints:[], number:"1"}
        
        Database.update(object) //Updating the Database with Sample Values
        .then(function(results){
          console.log("Updating Results", results.players)

          let url = 'https://puddle-catcher.glitch.me/game/'+object.tableIds.gameId+'/Frodo'
        
          rp(url) // Retrieving the Game from the Database
           .then(function(results){
              let object = JSON.parse(results)
        
              console.log("GET RESULTS", object.players)
            
              let url = 'https://puddle-catcher.glitch.me/game/'+object.tableIds.gameId+'/Frodo/givehint?hint=orange&player=Sam'
          
        
          rp(url) // Executing Give Hint Action and Updating 
          .then(function(results){
            console.log("Give Hint CARD RESULTS", results)
          
            let object = JSON.parse(results)
            var objectKeys = Object.keys(object)
                
              assert.deepEqual(object.players[1].hand[0].hints, expectedHintArray)
              assert.ok(results)
              done();
            })
          })
        })
      });   
    });
  });
})
