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
const {Database, Utils, Helper} = require('../modules/database.js')
const Defaults = require('./defaults.js')


describe("Database", function(){
  describe(".insert", function(){
    it("should insert new rows in All Tables: 5 players", function(done){
       var gameObject = Defaults.gameSettings5Player()
        
       Database.insert(gameObject)
      .then(function(results){
         after(function(){
            db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
            db.run("DELETE FROM OriginalDeck WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM PlayingDeck WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM DiscardedCards WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM PlayedCards WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM Messages WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM Players WHERE gameId = "+results.tableIds.gameId)
         });
         
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
            done();
       });
      
    });
  });
  describe(".update", function(){
    it("Updates All Tables for an Updated Game Object", function(done){
      var gameObject = Defaults.gameSettings5Player()
      var expectedHints = 1
      var expectedDiscard = "white|3|"
      var expectedPlayed = "blue|3|not orange"
      var expectedCard1Playing = "blue|3|"
      var expectedMessage = "Success! Jase played a blue 4!"
       Database.insert(gameObject)
      .then(function(results){
         after(function(){
            db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
            db.run("DELETE FROM OriginalDeck WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM PlayingDeck WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM DiscardedCards WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM PlayedCards WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM Messages WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM Players WHERE gameId = "+results.tableIds.gameId)
         });
     
         //Altering Game Object for Update:
         results.hintsLeft = 1; //changes HanabiGames
         results.discardedCards.push(results.playingDeck.shift()) //Alters DiscardedCards and PlayingDeck
         results.playedCards.push({color: "blue", hints: ["not orange"], number: "3"} ) //Alters PlayedCards  
         results.messages.push("Success! Jase played a blue 4!") //Alters Messages
         results.players[4].active = 1; //changes Players
        
       Database.update(results)
       .then(function(results){
         db.get("SELECT * FROM HanabiGames WHERE id = $id", 
               {$id:results.tableIds.gameId},
               function(err, row){
                  if(err){
                     console.log(err)
                     console.log("message", err.message)
                   };
                  assert.notOk(err)
                  assert.equal(row.hintsLeft, expectedHints)
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
                  assert.equal(row.card1, expectedCard1Playing)                 
                }); 
         db.get("SELECT * FROM DiscardedCards WHERE gameId = $id",  
                 {$id: results.tableIds.gameId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                   }
           
                  assert.notOk(err)
                  assert.equal(row.card1, expectedDiscard)
                });
         db.get("SELECT * FROM PlayedCards WHERE gameId = $id",  
                 {$id: results.tableIds.gameId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                   }
                  assert.notOk(err)
                  assert.equal(row.card1, expectedPlayed)
                });
         db.get("SELECT * FROM Messages WHERE gameId = $id",  
                 {$id: results.tableIds.gameId},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                   }
                  assert.notOk(err)
                  assert.equal(row.Messages, expectedMessage)
                });
        db.get("SELECT * FROM Players WHERE id = $id",  
                 {$id: results.tableIds.playersId[4]},
                 function(err, row){
                  if(err){
                   console.log(err)
                   console.log("message", err.message)
                   }
                  assert.equal(row.active, 1)
                });      
        done();      
        }); 
      });
    });
  });
  describe.skip(".get", function(){
    it("Should create a game Object with correct Keys", function(done){
      const expectedObjectKeys = ["numberOfPlayers", "hintsLeft", "livesLeft", "score", "dateCreated", "playingDeck",
                                  "playedCards", "discardedCards", "players"]
        var gameObject = Defaults.gameSettings5Player();
      
      Database.insert(gameObject)
      .then(function(results){
         after(function(){
            db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
            db.run("DELETE FROM OriginalDeck WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM PlayingDeck WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM DiscardedCards WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM PlayedCards WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM Messages WHERE gameId = "+results.tableIds.gameId)
            db.run("DELETE FROM Players WHERE gameId = "+results.tableIds.gameId)
         });
      
        Database.get(results.id)
       .then(function(results){
         
         var newGameObject = results
         
         assert.containsAllKeys(newGameObject, expectedObjectKeys)
        
         done()
       }); 

      });
      
    });
  });
});


describe("Utils", function(){
  describe(".insertHanabiGameRow", function(){
   it("Should insert a new row in HanabiGames Table", function(done){   
      var gameObject = Defaults.gameSettings2Player()
       Utils.insertHanabiGameRow(gameObject) // Adds Row to HanabiGame Table
        .then(function(results){
          after(function(){
             //Deletes the Added Row
              db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
             })
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
                 });          
         });
    }); 
   it("Should insert Default Settings in HanabiGames", function(done){
       var gameObject = Defaults.gameSettings2Player()
      
       Utils.insertHanabiGameRow(gameObject) // Adds Row to HanabiGame Table
        .then(function(results){
         after(function(){
             //Deletes the Added Row
              db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
             })
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
                });          
         });
    });
  });
  describe(".insertOriginalDeckRow", function(){
    it("Should insert gameObject.OriginalDeck Deck Row into OriginalDeck Table",function(done){
       var gameObject = Defaults.gameSettings2Player()
       
        // Adds Row to OriginalDeck Table Row Id saved to: results.tableIds.originalDeckId 
        // HanabiGame Row is Created as well to retrieve a GameId to Insert into the Original Deck Id
        Utils.insertHanabiGameRow(gameObject)
       .then(game => Utils.insertOriginalDeckRow(game))
       .then(function(results){
         after(function(){   //Deletes the Added Rows
            db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
            db.run("DELETE FROM OriginalDeck WHERE id = "+results.tableIds.originalDeckId)
         });
      
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
              }); 
            });
         });
    });
  describe(".insertPlayingDeckRow", function(){
    it("Should insert gameObject.PlayingDeck into PlayingDeck Table", function(done){
       var gameObject = Defaults.gameSettings2Player()
       var expectedFirstCard = "red|3|"
       var expectedLastCard = "blue|4|"
       
        // Adds Row to PlayingDeck Table Row Id saved to: results.tableIds.playingDeckId 
        // HanabiGame Row is Created as well to retrieve a GameId to Insert into the Playing Deck gameId
        Utils.insertHanabiGameRow(gameObject)
       .then(game => Utils.insertPlayingDeckRow(game))
       .then(function(results){
       
        after(function(){ //Deletes the Added Rows
           db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
           db.run("DELETE FROM PlayingDeck WHERE gameId = "+results.tableIds.gameId)
         });
      
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
                   done();
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
         after(function(){   //Deletes the Added Rows
            db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
            db.run("DELETE FROM DiscardedCards WHERE id = "+results.tableIds.discardedCardsId)
         });
      
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
         after(function(){   //Deletes the Added Rows
            db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
            db.run("DELETE FROM PlayedCards WHERE id = "+results.tableIds.playedCardsId)
         })
      
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
                 
                }); 
        });
    });
  });
  describe(".insertMessagesRow", function(){
    it("should insert a new row in Messages Table", function(done){
        var gameObject = Defaults.gameSettings2Player()
       
        // Adds Row to Messages Table Row Id saved to: results.tableIds.messageId 
        // HanabiGame Row is Created as well to retrieve a GameId to Insert into the Messages gameId
        Utils.insertHanabiGameRow(gameObject)
       .then(game => Utils.insertMessagesRow(game))
       .then(function(results){
         after(function(){ //Deletes All Rows From Test
           db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
           db.run("DELETE FROM Messages WHERE id = "+results.tableIds.messagesId)
         });
      
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
                  done();
                        
                });
          
        });
    });
  });
  describe(".insertPlayerRows", function(){
    it("should insert a new rows in Players Table (2-players)", function(done){
        var gameObject = Defaults.gameSettings2Player()
        var expectedPlayer1Card2 = "orange|3|";
        var expectedPlayer2Card5 = "orange|2|";    
       
        // Adds Rows to Players Table Row Id saved to: results.tableIds.playerId[i] 
        // HanabiGame Row is Created as well to retrieve a GameId to Insert into the Players gameId
        Utils.insertHanabiGameRow(gameObject)
       .then(game => Utils.insertPlayersRows(game))
       .then(function(results){
        after(function(){  //Deletes All Rows From Test
         db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
         db.run("DELETE FROM Players WHERE gameId = "+results.tableIds.gameId)
        });
      
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
                  done();      
                });
          
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
           after(function(){ //Delete Inserted rows
             db.run("DELETE FROM HanabiGames WHERE id ="+results.tableIds.gameId);
           });
         
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
               done()
               
              });
       });
    });
  });
  describe(".updateDeck", function(){
    it("Updates PlayingDeck in the PlayingDeck Table Row", function(done){
       var gameObject = Defaults.gameSettings2Player()
       var expectedCard1 = "red|1|" 
       var expectedCard39 = "blue|4|"
       
       Utils.insertHanabiGameRow(gameObject)// Adds Row to HanabiGame Table
       .catch(function(e){ console.log(e.message)})
       .then(object => Utils.insertPlayingDeckRow(object))
       .catch(function(e){ console.log(e.message)})
       .then(function(results){
         after(function() {
           db.run("DELETE FROM HanabiGames WHERE id ="+results.tableIds.gameId);
           db.run("DELETE FROM PlayingDeck WHERE gameId ="+results.tableIds.gameId);
               }); 
         
             results.playingDeck.shift()
         
         Utils.updateDeck(results, "PlayingDeck") // Updates Table with New Playing Deck Array
         .then(function(results){
           db.get("SELECT * FROM PlayingDeck WHERE gameId = $id",  // Retrieves Row
                    {$id: results.tableIds.gameId},
                    function(err, row){
                     if(err){ console.log("Error at Utils.updatesPlayingDeck db.get('SELECT...",err)};
                assert.notOk(err, "There was an Error Getting the Table Row")
                assert.ok(row, "The Table Row was undefined!")
                assert.equal(row.card1, expectedCard1, "Card 1 is incorrect!") 
                assert.equal(row.card39, expectedCard39, "card 39 is incorrect!")
                done()
               });
         });
       });
    });
    it("Updates PlayedCards in the PlayedCards Table Row", function(done){
       var gameObject = Defaults.gameSettings2Player()
       var expectedCard1 = "red|1|" 
       
       Utils.insertHanabiGameRow(gameObject)// Adds Row to HanabiGame Table
         .catch(function(e){ console.log(e.message)})
       .then(object => Utils.insertPlayedCardsRow(object))
         .catch(function(e){ console.log(e.message)})
       .then(function(results){
         after(function() {
           db.run("DELETE FROM HanabiGames WHERE id ="+results.tableIds.gameId);
           db.run("DELETE FROM PlayedCards WHERE gameId ="+results.tableIds.gameId);
               }); 
         
          var id = results.tableIds.gameId
              results.playedCards.push({color: 'red', hints: [], number: 1}) //add Card Object to Array
         
         
         Utils.updateDeck(results, "PlayedCards") // Updates Table with New Played Cards Array
         .then(function(results){
           db.get("SELECT * FROM PlayedCards WHERE gameId = $id",  // Retrieves Row
              {$id: results.tableIds.gameId},
              function(err, row){
                if(err){ console.log("Error at Utils.updatesPlayedCards db.get('SELECT...",err)};
                
                assert.notOk(err, "There was an Error Getting the Table Row")
                assert.ok(row, "The Table Row was undefined!")
                assert.equal(row.card1, expectedCard1, "Card 1 is incorrect!") 
                done()  
                });
           });    
         });
    });
    it("Updates DiscardedCards in the DiscardedCards Table Row", function(done){
       var gameObject = Defaults.gameSettings2Player()
       var expectedCard1 = "red|1|" 
       
       Utils.insertHanabiGameRow(gameObject)// Adds Row to HanabiGame Table
         .catch(function(e){ console.log(e.message)})
       .then(object => Utils.insertDiscardedCardsRow(object))
         .catch(function(e){ console.log(e.message)})
       .then(function(results){
          after(function() {
           db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
           db.run("DELETE FROM DiscardedCards WHERE gameId ="+results.tableIds.gameId);
               }); 
         
          var id = results.tableIds.gameId
              results.discardedCards.push({color: 'red', hints: [], number: 1}) //add Card Object to Array
          
         
         Utils.updateDeck(results, "DiscardedCards") // Updates Table with New Played Cards Array
         .then(function(results){
           db.get("SELECT * FROM DiscardedCards WHERE gameId = $id",  // Retrieves Row
             {$id: results.tableIds.gameId},
             function(err, row){
                if(err){ console.log("Error at Utils.updatesDiscardedCardsRow db.get('SELECT...",err)};
                
                assert.notOk(err, "There was an Error Getting the Table Row")
                assert.ok(row, "The Table Row was undefined!")
                assert.equal(row.card1, expectedCard1, "Card 1 is incorrect!") 
                done()
              });
         });
       });
    })
  });
  describe(".updateMessages", function(){
    it("Updates Messages Tables by joining gameObject.messages into a string", function(done){
      var gameObject = Defaults.gameSettings2Player()
       var expectedString = "Steven played a blue 4!,Whoops! Jase played a white 3 and it didn't play." 
       
       Utils.insertHanabiGameRow(gameObject)// Adds Row to HanabiGame Table
         .catch(function(e){ console.log(e.message)})
       .then(object => Utils.insertMessagesRow(object))
         .catch(function(e){ console.log(e.message)})
       .then(function(results){
          after(function() {
           db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
           db.run("DELETE FROM Messages WHERE gameId ="+results.tableIds.gameId);
               }); 
         
          results.messages.push(["Steven played a blue 4!", "Whoops! Jase played a white 3 and it didn't play."]) //add Card Object to Array
          
         
           Utils.updateMessages(results)// Updates Table with New Message String
           .then(function(results){
             db.get("SELECT * FROM Messages WHERE gameId = $id",  // Retrieves Row
                 {$id: results.tableIds.gameId},
                 function(err, row){
                   if(err){ 
                     console.log("Error at Utils.updateMessages db.get('SELECT...",err)
                   };
               
                   assert.notOk(err, "There was an Error Getting the Table Row")
                   assert.ok(row, "The Table Row was undefined!")
                   assert.equal(row.Messages, expectedString, "Message String is incorrect!") 
                
                   done()
              });
           })
       });
    });
  });
  describe(".updatesPlayerRow", function(){
    it("Updates One Player in Players Tables (2-player)", function(done){
      var gameObject = Defaults.gameSettings2Player()
      var expectedCard1 = "orange|5|"
      var expectedActive = 1;
       
       Utils.insertHanabiGameRow(gameObject)// Adds Row to HanabiGame Table
         .catch(function(e){ console.log(e.message)})
       .then(object => Utils.insertPlayersRows(object))
         .catch(function(e){ console.log(e.message)})
       .then(function(results){
         
        after(function() {
           db.run("DELETE FROM HanabiGames WHERE id ="+results.tableIds.gameId)
           db.run("DELETE FROM Players WHERE gameId ="+results.tableIds.gameId);
               }); 
         
           results.players[0].hand.splice(0, 1, {color: "orange", hints: [], number: 5}) //add Switch out Card Object
           results.players[0].active = 1 
         
         Utils.updatePlayerRow(results.players[0], results)// Updates Table with New Player Data
         .then(function(results){
           db.get("SELECT * FROM Players WHERE id = $id",  // Retrieves Row
                      {$id: results.tableIds.playersId[0]},
                      function(err, row){
                       if(err){ console.log("Error at Utils.updatesPlayerRow db.get('SELECT...",err)};
                  assert.notOk(err, "There was an Error Getting the Table Row")
                  assert.ok(row, "The Table Row was undefined!")
                  assert.equal(row.card1, expectedCard1, "card 1 String is incorrect!") 
                  assert.equal(row.active, expectedActive, "Player Active is incorrect!")
                   done()
              });
         });
       });
    });
    it("Updates One Player in Players Tables (5-player)", function(done){
      var gameObject = Defaults.gameSettings5Player()
      var expectedCard1 = "orange|5|"
      var expectedActive = 1;
       
       Utils.insertHanabiGameRow(gameObject)// Adds Row to HanabiGame Table
         .catch(function(e){ console.log(e.message)})
       .then(object => Utils.insertPlayersRows(object))
         .catch(function(e){ console.log(e.message)})
       .then(function(results){
         
        after(function() {
           db.run("DELETE FROM HanabiGames WHERE id ="+results.tableIds.gameId)
           db.run("DELETE FROM Players WHERE gameId ="+results.tableIds.gameId);
               }); 
         
           results.players[4].hand.splice(0, 1, {color: "orange", hints: [], number: 5}) //add Switch out Card Object
           results.players[4].active = 1 
         
         Utils.updatePlayerRow(results.players[4], results)// Updates Table with New Player Data
         .then(function(results){
           db.get("SELECT * FROM Players WHERE id = $id",  // Retrieves Row
                      {$id: results.tableIds.playersId[4]},
                      function(err, row){
                       if(err){ console.log("Error at Utils.updatesPlayerRow db.get('SELECT...",err)};
                  assert.notOk(err, "There was an Error Getting the Table Row")
                  assert.ok(row, "The Table Row was undefined!")
                  assert.equal(row.card1, expectedCard1, "card 1 String is incorrect!") 
                  assert.equal(row.active, expectedActive, "Player Active is incorrect!")
                   done()
              });
         });
       });
    });
  });
  describe(".getHanabiGame", function(){
    it("should retrieve row with correct Key:Value Pairs", function(done){
      var gameObject = Defaults.gameSettings2Player()
       
      Utils.insertHanabiGameRow(gameObject) // Adds Row to HanabiGame Table
        .then(function(results){
          after(function(){
             db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId) //Deletes the Added Row
             })
        Utils.getHanabiGameRow(results.tableIds.gameId)  
        .then(function(results){
          
              assert.ok(results) 
              assert.equal(results.hintsLeft, gameObject.hintsLeft)
              assert.equal(results.livesLeft,gameObject.livesLeft)
              assert.equal(results.numberOfPlayers, gameObject.numberOfPlayers)
              assert.equal(results.score, gameObject.score, "Score is Not Equal")
             
             done();
           
            });
         })
    });
  });
  describe(".getPlayingDeck", function(){
    it("should retrieve the correct Playing Deck Row check card1 and card40", function(done){
      var gameObject = Defaults.gameSettings2Player()
       var expectedCard1 = {color: "red", hints:[], number:"3"}
       var expectedCard40 = {color: "blue", hints:[], number: "4" }
       var expectedLength = 50
       
        // Adds Row to PlayingDeck Table Row Id saved to: results.tableIds.playingDeckId 
        // HanabiGame Row is Created as well to retrieve a GameId to Insert into the Playing Deck gameId
        Utils.insertHanabiGameRow(gameObject)
       .then(game => Utils.insertPlayingDeckRow(game))
       .then(function(results){
       
        after(function(){ //Deletes the Added Rows
           db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
           db.run("DELETE FROM PlayingDeck WHERE gameId = "+results.tableIds.gameId)
         });
        var object = {
          id: results.tableIds.gameId
        }
        Utils.getPlayingDeck(object)
         .then(function(results){
            
            assert.ok(results)
            assert.deepEqual(results.playingDeck[0], expectedCard1, "Card 1 Failed")
            assert.deepEqual(results.playingDeck[39], expectedCard40, "Card 40 Failed")
            
            done()
          })
        
        });
    });
    it("should retrieve the correct Playing Deck Row with a length of 40", function(done){
      var gameObject = Defaults.gameSettings2Player()
       var expectedLength = 40
       
        // Adds Row to PlayingDeck Table Row Id saved to: results.tableIds.playingDeckId 
        // HanabiGame Row is Created as well to retrieve a GameId to Insert into the Playing Deck gameId
        Utils.insertHanabiGameRow(gameObject)
       .then(game => Utils.insertPlayingDeckRow(game))
       .then(function(results){
       
        after(function(){ //Deletes the Added Rows
           db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
           db.run("DELETE FROM PlayingDeck WHERE gameId = "+results.tableIds.gameId)
         });
        var object = {
          id: results.tableIds.gameId
        }
        Utils.getPlayingDeck(object)
         .then(function(results){
            
            assert.ok(results)
            assert.equal(results.playingDeck.length, 40)  
            
            done()
          })
        
        });
    });
  });
  describe(".getDiscardedCards", function(){
    it("should retrieve the Correct DiscardedCards Row (check card1)", function(done){
      var gameObject = Defaults.gameSettings2Player()
          gameObject.discardedCards = ["SampleCard"]
      var expectedCard1 = "SampleCard"
      var expectedLength = 1
      
      
      Utils.insertHanabiGameRow(gameObject)
       .then(game => Utils.insertDiscardedCardsRow(game))
       .then(function(results){
       
        after(function(){ //Deletes the Added Rows
           db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
           db.run("DELETE FROM DiscardedCards WHERE gameId = "+results.tableIds.gameId)
         });
        var object = {
          id: results.tableIds.gameId
        }
        Utils.getPlayingDeck(object)
         .then(function(results){
            
            assert.ok(results)
            assert.deepEqual(results.playingDeck[0], expectedCard1, "Card 1 Failed")
            
            done()
          })
        
        });
    })
  });
});

describe("Helper", function(){
  describe(".createCardString", function(){
    it("creates a valid card column string for 5 cards", function(){
      var expectedResult = 'card1,card2,card3,card4,card5'
      
      var result = Helper.createCardString(5);
      
      assert.equal(result, expectedResult);
    });
    it("creates a valid card column string for 15 cards", function(){
      var expectedResult = 'card1,card2,card3,card4,card5,card6,card7,card8,card9,card10,card11,card12,card13,card14,card15'
      
      var result = Helper.createCardString(15);
      
      assert.equal(result, expectedResult);
    });
  });
  describe(".convertCardArray", function(){
    it("returns a String from a CARD OBJECT ARRAY to format: 'card.color|card.number|card.hints' (5cards)", function(){
      var array = [
        {color: "red", hints: ["not white", "3"], number: 3},
        {color: "red", hints: ["not white", "3"], number: 3},
        {color: "red", hints: ["not white", "not 3"], number: 1},
        {color: "white", hints: ["white", "not 3"], number: 2},
        {color: "white", hints: ["white", "not 3"], number: 5},
      ]
      var expectedResult = '"red|3|not white,3","red|3|not white,3","red|1|not white,not 3","white|2|white,not 3","white|5|white,not 3"'
      
      var result = Helper.convertCardArray(array);
      
      assert.equal(result, expectedResult)
    });
    it("returns a String from a CARD OBJECT ARRAY to format: 'card.color|card.number|card.hints' (10 cards)", function(){
      var array = [
        {color: "red", hints: ["not white", "3"], number: 3},
        {color: "red", hints: ["not white", "3"], number: 3},
        {color: "red", hints: ["not white", "not 3"], number: 1},
        {color: "white", hints: ["white", "not 3"], number: 2},
        {color: "white", hints: ["white", "not 3"], number: 5},
        {color: "red", hints: ["not white", "3"], number: 3},
        {color: "red", hints: ["not white", "3"], number: 3},
        {color: "red", hints: ["not white", "not 3"], number: 1},
        {color: "white", hints: ["white", "not 3"], number: 2},
        {color: "white", hints: ["white", "not 3"], number: 5},
      ]
      var expectedResult = '"red|3|not white,3","red|3|not white,3","red|1|not white,not 3","white|2|white,not 3","white|5|white,not 3","red|3|not white,3","red|3|not white,3","red|1|not white,not 3","white|2|white,not 3","white|5|white,not 3"'
      
      var result = Helper.convertCardArray(array);
      
      assert.equal(result, expectedResult)
    });
  });
  describe(".cardStringToObject", function(){
    it("returns a cardObjectArray from format: 'card.color|card.number|card.hints' (5cards)", function(){
      var expectedResult =  {
        color: "red", 
        hints: ["not white", "3"], 
        number: "3"
        }
      
      var string = "red|3|not white,3"
      
      var result = Helper.cardStringToObject(string);
      
      assert.deepEqual(result, expectedResult)
    });
    it("returns a cardObjectArray from format: 'card.color|card.number|card.hints' (10 cards)", function(){
      var expectedResult =  {
        color: "white", 
        hints: ["white", "not 3"], 
        number: "5"}
      
      var string = "white|5|white,not 3"
      
      var result = Helper.cardStringToObject(string);
      
      assert.deepEqual(result, expectedResult)
    });
  });
  describe(".convertCardArrayForUpdate", function(){
    it("converts a CardObject Array to a string in the format card1='string'", function(){
      var array = [
        {color: "red", hints: ["not white", "3"], number: 3},
        {color: "red", hints: ["not white", "3"], number: 3},
        {color: "red", hints: ["not white", "not 3"], number: 1},
        {color: "white", hints: ["white", "not 3"], number: 2},
        {color: "white", hints: ["white", "not 3"], number: 5},
      ]
      var expectedResult = 'card1="red|3|not white,3",card2="red|3|not white,3",card3="red|1|not white,not 3",card4="white|2|white,not 3",card5="white|5|white,not 3",card6="null"'
    
      var result = Helper.convertCardArrayForUpdate(array, 6)
      
      assert.equal(result, expectedResult)
      
    })
  });
});