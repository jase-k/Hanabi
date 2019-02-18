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
        .then(function(object){
          var object = JSON.parse(results)
          var objectKeys = Object.keys(object)
      
            assert.equal(object.players[1].name, 'Sam')
            assert.ok(results)
            done();
          })
      });
    })
  });
})
