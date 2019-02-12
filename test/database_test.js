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
    it("should insert new rows in All Tables: 5 players", function(done){
       var gameObject = Defaults.gameSettings5Player()
        
       Database.insert(gameObject)
      .then(function(results){
         db.get("SELECT * FROM HanabiGames WHERE id = $id", 
                 {$id:results.tableIds.gameId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                   }
                  assert.notOk(err)
         });
         db.get("SELECT * FROM OriginalDeck WHERE gameId = $id",  
                 {$id: results.tableIds.gameId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                   }
                  assert.notOk(err)
                  assert.ok(row)
               });
         db.get("SELECT * FROM PlayingDeck WHERE gameId = $id",  
                 {$id: results.tableIds.gameId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                   }
                  assert.notOk(err)
                  assert.ok(row)
                  assert.equal(row.id, results.tableIds.playingDeckId)                 
                }); 
         db.get("SELECT * FROM DiscardedCards WHERE gameId = $id",  
                 {$id: results.tableIds.gameId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                   }
           
                  assert.notOk(err)
                  assert.ok(row)
                  assert.equal(row.id, results.tableIds.discardedCardsId)
                });
         db.get("SELECT * FROM PlayedCards WHERE gameId = $id",  
                 {$id: results.tableIds.gameId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                   }
                  assert.notOk(err)
                  assert.ok(row)
                  assert.equal(row.id, results.tableIds.playedCardsId)
                });
         db.get("SELECT * FROM Messages WHERE gameId = $id",  
                 {$id: results.tableIds.gameId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                   }
                  assert.notOk(err)
                  assert.ok(row)
                  assert.equal(row.id, results.tableIds.messagesId)
                });
        db.get("SELECT * FROM Players WHERE id = $id",  
                 {$id: results.tableIds.playersId[0]},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                   }
                  assert.notOk(err)
                  assert.ok(row)
                  assert.equal(row.id, results.tableIds.playersId[0])
                  ;      
                });
        db.get("SELECT * FROM Players WHERE id = $id",  
                 {$id: results.tableIds.playersId[1]},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                   }
                  assert.notOk(err)
                  assert.ok(row)
                  assert.equal(row.id, results.tableIds.playersId[1])
                });      
         
            db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
            db.run("DELETE FROM OriginalDeck WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM PlayingDeck WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM DiscardedCards WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM PlayedCards WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM Messages WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM Players WHERE gameId = "+results.tableIds.gameId)
            done();
       });
      
    });
  });
  describe(".updateGame", function(){});
  describe(".getGame", function(){});
});


describe("Utils", function(){
  describe.skip(".insertHanabiGameRow", function(){
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
  describe.skip(".insertOriginalDeckRow", function(){
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
  describe.skip(".insertPlayingDeckRow", function(){
    it("Should insert gameObject.PlayingDeck into PlayingDeck Table", function(done){
       var gameObject = Defaults.gameSettings2Player()
       var expectedFirstCard = "red|3"
       var expectedLastCard = "blue|4"
       console.log("first Card", expectedFirstCard)
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
                  assert.ok(row) // Game Id Isn't Correct
                  assert.equal(row.id, results.tableIds.playingDeckId, "Row Id doesn't match tableIds" ) //Row Id isn't Correct
                  assert.equal(row.card1, expectedFirstCard) //First Card Matches           
                  assert.equal(row.card40, expectedLastCard) //If both these matches, it is likely the deck is in the right order.
                  //Deletes the Added Rows
                  db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
                  db.run("DELETE FROM PlayingDeck WHERE gameId = "+results.tableIds.gameId)
                  done();
                }); 
        });
    });
  });
  describe.skip(".insertDiscardedCardsRow", function(){
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
  describe.skip(".insertPlayedCardsRow", function(){
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
  describe.skip(".insertMessagesRow", function(){
    it("should insert a new row in Messages Table", function(done){
        var gameObject = Defaults.gameSettings2Player()
       
        // Adds Row to Messages Table Row Id saved to: results.tableIds.messageId 
        // HanabiGame Row is Created as well to retrieve a GameId to Insert into the Messages gameId
        Utils.insertHanabiGameRow(gameObject)
       .then(game => Utils.insertMessagesRow(game))
       .then(function(results){
      
        db.get("SELECT * FROM Messages WHERE id = $id",  
                 {$id: results.tableIds.messagesId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                     done();
                   }
                  assert.notOk(err)
                  assert.ok(row)
                  assert.equal(row.id, results.tableIds.messagesId)
                        
                });
          
          //Deletes All Rows From Test
         db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
         db.run("DELETE FROM Messages WHERE id = "+results.tableIds.messagesId)
         done();
        });
    });
  });
  describe.skip(".insertPlayerRows", function(){
    it("should insert a new rows in Players Table (2-players)", function(done){
        var gameObject = Defaults.gameSettings2Player()
        var expectedPlayer1Card2 = "orange|3";
        var expectedPlayer2Card5 = "orange|2";    
       
        // Adds Rows to Players Table Row Id saved to: results.tableIds.playerId[i] 
        // HanabiGame Row is Created as well to retrieve a GameId to Insert into the Players gameId
        Utils.insertHanabiGameRow(gameObject)
       .then(game => Utils.insertPlayersRows(game))
       .then(function(results){
      
        db.get("SELECT * FROM Players WHERE id = $id",  
                 {$id: results.tableIds.playersId[0]},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                     done();
                   }
                  assert.notOk(err)
                  assert.ok(row)
                  assert.equal(row.id, results.tableIds.playersId[0])
                  assert.equal(row.card2, expectedPlayer1Card2)
                  ;      
                });
        db.get("SELECT * FROM Players WHERE id = $id",  
                 {$id: results.tableIds.playersId[1]},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                     done();
                   }
                  assert.notOk(err)
                  assert.ok(row)
                  assert.equal(row.id, results.tableIds.playersId[1])
                  assert.equal(row.card5, expectedPlayer2Card5)
                });
          
          //Deletes All Rows From Test
         db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
         db.run("DELETE FROM Players WHERE id = "+results.tableIds.playersId[0])
         db.run("DELETE FROM Players WHERE id = "+results.tableIds.playersId[1])
                  done();      
        });
    });
  });
  describe(".updateHanabiGameRow", function(){
    it("Updates hints and lives in Hanabi Game Row", function(done){
       var gameObject = Defaults.gameSettings2Player()
       var expectedHintsLeft = 4 
       var expectedLivesLeft = 1
       
       Utils.insertHanabiGameRow(gameObject)// Adds Row to HanabiGame Table
       .catch(function(e){ console.log(e.message)})
       .then(function(results){
           results.hintsLeft = 4
           results.livesLeft = 1
        
         Utils.updateHanabiGameRow(results) // Updates Table with New Hints and Lives
         
         db.get("SELECT * FROM HanabiGames WHERE id = $id",  // Retrieves Row
                    {$id: results.tableIds.gameId},
                    function(err, row){
                assert.notOk(err)
                assert.ok(row)
                assert.equal(row.hintsLeft, expectedHintsLeft) 
                assert.equal(row.livesLeft, expectedLivesLeft)
               
               db.run("DELETE FROM HanabiGames WHERE id ="+results.tableIds.gameId);
             
           done()
              });
       });
    });
  });
  describe(".updatePlayingDeckRow", function(){
   it("Updates hints and lives in Hanabi Game Row", function(done){
       var gameObject = Defaults.gameSettings2Player()
       var expectedCard 1 = 4 
       var expectedLivesLeft = 1
       
       Utils.insertHanabiGameRow(gameObject)// Adds Row to HanabiGame Table
       .catch(function(e){ console.log(e.message)})
       .then(function(results){
           results.playingDeck.shift()
        
         Utils.updateHanabiGameRow(results) // Updates Table with New Hints and Lives
         
         db.get("SELECT * FROM PlayingDeck WHERE gameId = $id",  // Retrieves Row
                    {$id: results.tableIds.gameId},
                    function(err, row){
                assert.notOk(err)
                assert.ok(row)
                assert.equal(row.hintsLeft, expectedHintsLeft) 
                assert.equal(row.livesLeft, expectedLivesLeft)
               
               db.run("DELETE FROM PlayingDeck WHERE id ="+results.tableIds.gameId);
             
           done()
              });
       });
    });
  });  
});