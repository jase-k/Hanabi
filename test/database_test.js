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
  describe.skip(".insert", function(){
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
                  done();      
                });
          
          //Deletes All Rows From Test
         db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
         db.run("DELETE FROM Players WHERE id = "+results.tableIds.playersId[0])
         db.run("DELETE FROM Players WHERE id = "+results.tableIds.playersId[1])
        });
    });
  });
  describe.skip(".updateHanabiGameRow", function(){
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
               done()
               
               db.run("DELETE FROM HanabiGames WHERE id ="+results.tableIds.gameId);
              });
       });
    });
  });
  describe.skip(".updateDeck", function(){
    it("Updates PlayingDeck in the PlayingDeck Table Row", function(done){
       var gameObject = Defaults.gameSettings2Player()
       var expectedCard1 = "red|1" 
       var expectedCard39 = "blue|4"
       
       Utils.insertHanabiGameRow(gameObject)// Adds Row to HanabiGame Table
       .catch(function(e){ console.log(e.message)})
       .then(object => Utils.insertPlayingDeckRow(object))
       .catch(function(e){ console.log(e.message)})
       .then(function(results){
           results.playingDeck.shift()
            var id = results.tableIds.gameId
          
        after(function() {
           db.run("DELETE FROM HanabiGames WHERE id ="+results.tableIds.gameId);
           db.run("DELETE FROM PlayingDeck WHERE gameId ="+results.tableIds.gameId);
               }); 
         
         Utils.updateDeck(results.playingDeck, id, "PlayingDeck") // Updates Table with New Playing Deck Array
         
         db.get("SELECT * FROM PlayingDeck WHERE gameId = $id",  // Retrieves Row
                    {$id: results.tableIds.gameId},
                    function(err, row){
                     if(err){ console.log("Error at Utils.updatesPlayingDeck db.get('SELECT...",err)};
                assert.notOk(err, "There was an Error Getting the Table Row")
                assert.ok(row, "The Table Row was undefined!")
                assert.equal(row.card1, expectedCard1, "Card 1 is incorrect!") 
                assert.equal(row.card39, expectedCard39, "card 39 is incorrect!")
                done()
               db.run("DELETE FROM HanabiGames WHERE id ="+results.tableIds.gameId)
               });

       });
    });
    it("Updates PlayedCards in the PlayedCards Table Row", function(done){
       var gameObject = Defaults.gameSettings2Player()
       var expectedCard1 = "red|1" 
       
       Utils.insertHanabiGameRow(gameObject)// Adds Row to HanabiGame Table
         .catch(function(e){ console.log(e.message)})
       .then(object => Utils.insertPlayedCardsRow(object))
         .catch(function(e){ console.log(e.message)})
       .then(function(results){
           results.playedCards.push({color: 'red', hints: [], number: 1}) //add Card Object to Array
            var id = results.tableIds.gameId
         
         
         Utils.updateDeck(results.playedCards, id, "PlayedCards") // Updates Table with New Played Cards Array
         
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
    it("Updates DiscardedCards in the DiscardedCards Table Row", function(done){
       var gameObject = Defaults.gameSettings2Player()
       var expectedCard1 = "red|1" 
       
       Utils.insertHanabiGameRow(gameObject)// Adds Row to HanabiGame Table
         .catch(function(e){ console.log(e.message)})
       .then(object => Utils.insertDiscardedCardsRow(object))
         .catch(function(e){ console.log(e.message)})
       .then(function(results){
           results.discardedCards.push({color: 'red', hints: [], number: 1}) //add Card Object to Array
            var id = results.tableIds.gameId
          
        after(function() {
           db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
           db.run("DELETE FROM DiscardedCards WHERE gameId ="+results.tableIds.gameId);
               }); 
         
         Utils.updateDeck(results.discardedCards, id, "DiscardedCards") // Updates Table with New Played Cards Array
         
         db.get("SELECT * FROM DiscardedCards WHERE gameId = $id",  // Retrieves Row
                    {$id: results.tableIds.gameId},
                    function(err, row){
                     if(err){ console.log("Error at Utils.updatesDiscardedCardsRow db.get('SELECT...",err)};
                assert.notOk(err, "There was an Error Getting the Table Row")
                assert.ok(row, "The Table Row was undefined!")
                assert.equal(row.card1, expectedCard1, "Card 1 is incorrect!") 
                db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
                done()
              });

       });
    })
  });
  describe.skip(".updateMessages", function(){
    it("Updates Messages Tables by joining gameObject.messages into a string", function(done){
      var gameObject = Defaults.gameSettings2Player()
       var expectedString = "Steven played a blue 4!,Whoops! Jase played a white 3 and it didn't play." 
       
       Utils.insertHanabiGameRow(gameObject)// Adds Row to HanabiGame Table
         .catch(function(e){ console.log(e.message)})
       .then(object => Utils.insertMessagesRow(object))
         .catch(function(e){ console.log(e.message)})
       .then(function(results){
           results.messages.push(["Steven played a blue 4!", "Whoops! Jase played a white 3 and it didn't play."]) //add Card Object to Array
          
        after(function() {
           db.run("DELETE FROM HanabiGames WHERE id = "+results.tableIds.gameId)
           db.run("DELETE FROM Messages WHERE gameId ="+results.tableIds.gameId);
               }); 
         
         console.log("starting update")
         Utils.updateMessages(results)// Updates Table with New Message String
         console.log("done with update", results.tableIds.gameId)
        
         db.get("SELECT * FROM Messages WHERE id = $id",  // Retrieves Row
                    {$id: results.tableIds.messagesId},
                    function(err, row){
                     if(err){ 
                       console.log("Error at Utils.updateMessages db.get('SELECT...",err)
                            };
               
                assert.notOk(err, "There was an Error Getting the Table Row")
                assert.ok(row, "The Table Row was undefined!")
                assert.equal(row.Messages, expectedString, "Message String is incorrect!") 
             
               console.log("Done with sQL")    
               done()
              });
         console.log("Done with Operation")
       });
    });
  });
  describe.skip(".updatesPlayerRow", function(){
    it("Updates One Player in Players Tables", function(done){
      var gameObject = Defaults.gameSettings2Player()
      var expectedCard1 = "orange|5"
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
         
         Utils.updatePlayerRow(results.players[0])// Updates Table with New Player Data
         
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
});

describe("Helper", function(){
  describe("createInsertSQLStrings", function(){
    it("returns a valid SQL string including the table name (HanabiGame)", function(){
      var table = "HanabiGame"
      var values = [
        {column: "numberOfPlayers", value: 3},
        {column: "dateCreated", value: new Date()},
        {column: "livesLeft", value: 3},
        {column: "hintsLeft", value: 8},
      ]
      
      var string = Helper.createInsertSQLString(table, values);
      
      assert.include(string, table)
    });
    it("returns a string including the table name (PlayingDeck)", function(){
      var table = "PlayingDeck"
      var values = [
        {column: "numberOfPlayers", value: 3},
        {column: "dateCreated", value: new Date()},
        {column: "livesLeft", value: 3},
        {column: "hintsLeft", value: 8},
      ]

      
      var string = Helper.createInsertSQLString(table, values);
      
      assert.include(string, table)
    });
    it("returns a valid SQL String with 4 column/value pairs", function(done){
      var table = "OriginalDeck"
      var values = [
        {column: "card1", value: "red|4"},
        {column: "card2", value: "red|4"},
        {column: "card3", value: "red|4"},
        {column: "card4", value: "red|4"},
        ]
      var string = Helper.createInsertSQLString(table, values);
      
      db.run(string, function(err){
        if(err){
          console.log(err)
        }  
        var id = this.lastID
        
      console.log(id)
        assert.notOk(err)
        assert.ok(this.lastID)
        
        db.run("DELETE FROM "+table+" WHERE id = "+id);
        done();
      });
      
    });
    it("returns a valid SQL String with 12 column/value pairs", function(done){
      var table = "OriginalDeck"
      var values = [
        {column: "card1", value: "red|1"},
        {column: "card2", value: "red|2"},
        {column: "card3", value: "red|3"},
        {column: "card4", value: "red|4"},
        {column: "card5", value: "red|5"},
        {column: "card6", value: "red|6"},
        {column: "card7", value: "red|7"},
        {column: "card8", value: "red|8"},
        {column: "card9", value: "red|9"},
        {column: "card10", value: "red|10"},
        {column: "card11", value: "red|11"},
        {column: "card12", value: "red|12"}
        ]
      var expectedResult = 'INSERT INTO OriginalDeck(card1,card2,card3,card4,card5,card6,card7,card8,card9,card10,card11,card12) VALUES("red|1","red|2","red|3","red|4","red|5","red|6","red|7","red|8","red|9","red|10","red|11","red|12")'
      var string = Helper.createInsertSQLString(table, values);
      
      assert.equal(string, expectedResult)
      
      db.run(string, function(err){
        if(err){
          console.log(err)
        }  
        var id = this.lastID
        
        assert.notOk(err)
        assert.ok(this.lastID)
        
        db.run("DELETE FROM "+table+" WHERE id = "+id);
        done();
      });
    });
  });
  describe("createSQL", function(){
    it("returns a valid SQL with correct columns for Insert HanabiGame", function(){
      var table = "HanabiGame"
      var expectedColumns = ['numberOfPlayers','hintsLeft', 'livesLeft', 'score', 'dateCreated']
      var object = Defaults.gameSettings2Player()
      
      var string = Helper.createSQL(table, object);
      
      assert.include(string, table)
      assert.include(string, expectedColumns[0]);
      assert.include(string, expectedColumns[1]);
      assert.include(string, expectedColumns[2]);
      assert.include(string, expectedColumns[3])
      assert.include(string, expectedColumns[4])
    });
    it("returns a valid SQL with correct values for Insert HanabiGame", function(){
      var table = "HanabiGame"
      var object = Defaults.gameSettings2Player()
      var expectedValues = [object.numberOfPlayers, object.dateCreated, object.hintsLeft, object.livesLeft, object.score ]
      
      var string = Helper.createSQL(table, object);
      
      assert.include(string, table)
      assert.include(string, expectedValues[0]);
      assert.include(string, expectedValues[1]);
      assert.include(string, expectedValues[2]);
      assert.include(string, expectedValues[3])
      assert.include(string, expectedValues[4])
    });
  });
});