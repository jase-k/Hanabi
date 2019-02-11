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
       .then(game => Utils.insertOriginalDeckRow(game))
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
                  done();
                 
            //Deletes the Added Rows
            db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
            db.run("DELETE FROM OriginalDeck WHERE id = "+results.tableIds.playingDeckId)
                }); 
            });
    });
  });
});