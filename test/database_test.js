/*
'/test/database_test.js'
This Tests the Module Database from '/modules/database.js

database.js's purpose is to insert, update, and get data from 
the sqlite Database

*/

const assert = require('chai').assert

//Import Database
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);


//Import Module:
const {Database, Utils} = require('../modules/database.js')
const Defaults = require('./defaults.js')


describe("Database", function(){
  describe(".insert", function(){
  
  });
  describe(".updateGame", function(){});
  describe(".getGame", function(){});
});


describe("Utils", function(){
  describe("insertHanabiGameRow", function(){
   it("Should insert a new row in HanabiGames Table", function(done){   
      var gameObject = Defaults.gameSettings2Player()
       Utils.insertHanabiGameRow(gameObject) // Adds Row to HanabiGame Table
        .then(function(results){
          db.get("SELECT * FROM HanabiGames WHERE id = $id", 
                 {$id:results.tableIds.gameId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                     done();
                   }
                  assert.notOk(err)
                  done();
                 
            //Deletes the Added Row
            db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
                });          
         });
    }); 
   it("Should insert Default Settings in HanabiGames", function(done){
       var gameObject = Defaults.gameSettings2Player()
      
       Utils.insertHanabiGameRow(gameObject) // Adds Row to HanabiGame Table
        .then(function(results){
          db.get("SELECT * FROM HanabiGames WHERE id = $id", 
                 {$id:results.tableIds.gameId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                     done();
                   }
                  assert.equal(row.hintsLeft, gameObject.hintsLeft, "Expected hintsLeft to Equal")
                  assert.equal(row.livesLeft, gameObject.livesLeft, "Expected livesLeft to Equal")
                  done();
                 
            //Deletes the Added Row
            db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
                });          
         });
    });
  });
  describe("insertOriginalDeckRow", function(){
    it("Should insert gameObject.OriginalDeck Deck Row into OriginalDeck Table",function(done){
       var gameObject = Defaults.gameSettings2Player()
       
        // Adds Row to OriginalDeck Table Row Id saved to: results.tableIds.originalDeckId 
        // HanabiGame Row is Created as well to retrieve a GameId to Insert into the Original Deck Id
        Utils.insertHanabiGameRow(gameObject)
       .then(game => Utils.insertOriginalDeckRow(game))
       .then(function(results){
      
        db.get("SELECT * FROM OriginalDeck WHERE id = $id",  
                 {$id: results.tableIds.originalDeckId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                     done();
                   }
                  assert.notOk(err)
                  assert.ok(row)
                  done();
                 
            //Deletes the Added Rows
            db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
            db.run("DELETE FROM OriginalDeck WHERE id = "+results.tableIds.originalDeckId)
                }); 
            });
         });
    });
  describe(".insertPlayingDeckRow", function(){
    it("Should insert gameObject.PlayingDeck into PlayingDeck Table", function(done){
       var gameObject = Defaults.gameSettings2Player()
       
        // Adds Row to PlayingDeck Table Row Id saved to: results.tableIds.playingDeckId 
        // HanabiGame Row is Created as well to retrieve a GameId to Insert into the Playing Deck gameId
        Utils.insertHanabiGameRow(gameObject)
       .then(game => Utils.insertPlayingDeckRow(game))
       .then(function(results){
      
        db.get("SELECT * FROM PlayingDeck WHERE id = $id",  
                 {$id: results.tableIds.playingDeckId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                     done();
                   }
                  assert.notOk(err)
                  assert.ok(row)
                  assert.equal(row.id, results.tableIds.playingDeckId)
                  done();
                 
            //Deletes the Added Rows
            db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
            db.run("DELETE FROM OriginalDeck WHERE id = "+results.tableIds.playingDeckId)
                }); 
        });
    });
  });
  describe(".insertDiscardedCardsRow", function(){
    it("should insert a new row in DescardedCards Table", function(done){
      var gameObject = Defaults.gameSettings2Player()
       
        // Adds Row to DiscardedCards Table Row Id saved to: results.tableIds.discardedCardsId 
        // HanabiGame Row is Created as well to retrieve a GameId to Insert into the  DiscardedCards gameId
        Utils.insertHanabiGameRow(gameObject)
       .then(game => Utils.insertDiscardedCardsRow(game))
       .then(function(results){
      
        db.get("SELECT * FROM DiscardedCards WHERE id = $id",  
                 {$id: results.tableIds.discardedCardsId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                     done();
                   }
                  assert.notOk(err)
                  assert.ok(row)
                  assert.equal(row.id, results.tableIds.discardedCardsId)
                  done();
                 
            //Deletes the Added Rows
            db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
            db.run("DELETE FROM DiscardedCards WHERE id = "+results.tableIds.discardedCardsId)
                }); 
        });
    });
  });
  describe(".insertPlayedCardsRow", function(){
    it("should insert a new row in PlayedCards Table", function(done){
      var gameObject = Defaults.gameSettings2Player()
       
        // Adds Row to PlayedCards Table Row Id saved to: results.tableIds.playedCardsId 
        // HanabiGame Row is Created as well to retrieve a GameId to Insert into the  PlayedCards gameId
        Utils.insertHanabiGameRow(gameObject)
       .then(game => Utils.insertPlayedCardsRow(game))
       .then(function(results){
      
        db.get("SELECT * FROM PlayedCards WHERE id = $id",  
                 {$id: results.tableIds.playedCardsId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                     done();
                   }
                  assert.notOk(err)
                  assert.ok(row)
                  assert.equal(row.id, results.tableIds.playedCardsId)
                  done();
                 
            //Deletes the Added Rows
            db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
            db.run("DELETE FROM PlayedCards WHERE id = "+results.tableIds.playedCardsId)
                }); 
        });
    });
  });
  describe(".insertMessagesRow", function(){
    it("should insert a new row in Messages Table", function(done){
      var results; 
      
      after(function(){
         //Deletes the Added Rows
         db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
         db.run("DELETE FROM Messages WHERE id = "+results.tableIds.messageId)
           
      });
      
      var gameObject = Defaults.gameSettings2Player()
       
        // Adds Row to Messages Table Row Id saved to: results.tableIds.messageId 
        // HanabiGame Row is Created as well to retrieve a GameId to Insert into the Messages gameId
        Utils.insertHanabiGameRow(gameObject)
       .then(game => Utils.insertPlayedCardsRow(game))
       .then(function(results){
      
        db.get("SELECT * FROM Messages WHERE id = $id",  
                 {$id: results.tableIds.messageId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                     done();
                   }
                  assert.notOk(err)
                  assert.ok(row)
                  assert.equal(row.id, results.tableIds.messageId)
                  done();      
                }); 
        });
    });
  });
});