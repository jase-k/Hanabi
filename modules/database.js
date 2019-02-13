/*
/modules/database.js

This Module is in Take the GameObject modified by game_play.js
and inserts it into the sqlite Database. 

It has three public functions: 
.insert(GAME OBJECT)
.get(GAMEID
.update(GAME Object)

The Object Utils contains Private Helper Functions for 
{Database}.

All Calls to the sqlite.db DATABASE are Promises
*/

//Establishes a Database
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);


//Declare variables
var i;
const Helper = {
  
 createCardString(number){
   var string = '' 
   
   for(var i = 1; i <= number; i++){
    if(i !== number){ 
      string += 'card'+i+','
      }else{string += 'card'+i}
    }
   
  return string
},
  //input Array of {color: STRING, hints: [STRINGS], number: STRING}
  //output: "'color|number|hints', 'color|number|hints'"
 convertCardArray(array){
  var stringArray = array.map(card => card.color+"|"+card.number+"|"+card.hints.join())
  
  var string = '"'+stringArray.join('","')+'"'
   
  return string
},
//input: "color|number|hints"
//output {color: STRING, hints: [STRINGS], number: STRING}
 cardStringToObject(string){
  var object;
    if(string){
      var array = string.split("|")
      object = {
        color: array[0],
        number: array[1],
        hints: array[2].split(',')    
        }
    }
    return object
  },
//input: array: [CARD OBJECTS] length: INTEGER (Length of Max Array Length)
//output: 'card1="card.color|card.number|card.hints",card2="card.color|card.number|card.hints", card[length+1...n]=null'    
 convertCardArrayForUpdate(array, length){
    var string = ''
    
    var stringArray = array.map((card, index) => 'card'+(index+1)+'="'+card.color+'|'+card.number+'|'+card.hints.join()+'"') 
    
    for(var i = array.length; i < length; i++){
      stringArray.push('card'+(i+1)+'="null"')
    }  
    
   string = stringArray.join() 
   
   return string
  }
}

const Utils = {
  insertHanabiGameRow(object) { //Insert Row and Return Object with Game ID
    return new Promise((resolve, reject) => {
      object.tableIds = {}
      db.run('INSERT INTO HanabiGames(numberOfPlayers, dateCreated, hintsLeft, livesLeft) VALUES('+object.numberOfPlayers+',"'+object.dateCreated+'",'+ object.hintsLeft+','+object.livesLeft+')',
         {}, 
         function(err){
           if(err){ 
             reject(console.log('Operation was Rejected at Hanabi Table', err))
             };
        
           object.tableIds.gameId= this.lastID
           console.log("HanabiGame ID", this.lastID)
           resolve(object)
        })
    });
  },
  insertOriginalDeckRow(object){
 return new Promise((resolve, reject) =>{
  db.run('INSERT INTO OriginalDeck (gameId,'+Helper.createCardString(50)+') VALUES('+object.tableIds.gameId+','+Helper.convertCardArray(object.originalDeck)+') ', {}, 
      function(err){
        if(err){throw err}
        
        object.tableIds.originalDeckId = this.lastID
        
        resolve(object)
    })
  });
},
  insertPlayingDeckRow(object){
  return new Promise((resolve, reject) =>{
    db.run('INSERT INTO PlayingDeck (gameId,'+Helper.createCardString(object.playingDeck.length)+') VALUES('+object.tableIds.gameId+','+Helper.convertCardArray(object.playingDeck)+') ', {}, 
        function(err){
          if(err){throw err}
          
          object.tableIds.playingDeckId = this.lastID

          resolve(object)
    });
  })
},
  insertDiscardedCardsRow(object){
    return new Promise ((resolve, reject) =>{
      db.run('INSERT INTO DiscardedCards (gameId) VALUES('+object.tableIds.gameId+') ', {}, 
         function(err){
           if(err){throw err}
           
           object.tableIds.discardedCardsId = this.lastID
      
           resolve(object)
      });
    });
  },
  insertPlayedCardsRow(object){
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO PlayedCards (gameId) VALUES('+object.tableIds.gameId+') ', {}, 
         function(err){
           if(err){throw err}
           
           object.tableIds.playedCardsId = this.lastID
        
           resolve(object)
      });  
    });
  },
  insertMessagesRow(object){
    return new Promise((resolve, reject) =>{
    db.run('INSERT INTO Messages (gameId) VALUES('+object.tableIds.gameId+') ', {}, 
       function(err){
         if(err){
           console.log("Error at insertMessagesRow")
           throw err
         }
         object.tableIds.messagesId = this.lastID
         
         resolve(object)
      });
    })
  },
  insertPlayersRows(object){
    return new Promise((resolve, reject) => {
      object.tableIds.playersId = []
      var i = 1
      var number = object.players[i].hand.length
    db.run('INSERT INTO Players (gameId, name, active,  '+Helper.createCardString(number)+') VALUES('+object.tableIds.gameId+',"'+object.players[0].name+'", 1 ,'+Helper.convertCardArray(object.players[i-1].hand)+') ', {}, 
      function(err){
       if(err){
         console.log("Error at insertMessagesRow Player 1")
         throw err
       }
      
       object.tableIds.playersId.push(this.lastID)
       object.players[i-1].id = this.lastID
         
      if(i == object.players.length){
        resolve(object)
      }else{ i++
          
    db.run('INSERT INTO Players (gameId,'+Helper.createCardString(number)+') VALUES('+object.tableIds.gameId+','+Helper.convertCardArray(object.players[i-1].hand)+') ', {}, 
      function(err){
        if(err){
          console.log("Error at insertMessagesRow Player 2")
          throw err}
        object.tableIds.playersId.push(this.lastID)
        object.players[i-1].id = this.lastID
       
        if(i == object.players.length){
          resolve(object)
          }else{  i++
            db.run('INSERT INTO Players (gameId,'+Helper.createCardString(number)+') VALUES('+object.tableIds.gameId+','+Helper.convertCardArray(object.players[i-1].hand)+') ', {}, 
               function(err){
                if(err){
                  console.log("Error at insertMessagesRow Player 3")
                  throw err}
                object.tableIds.playersId.push(this.lastID)
                object.players[i-1].id = this.lastID
            
                if(i == object.players.length){
                resolve(object)
                }else{  i++
                  db.run('INSERT INTO Players (gameId,'+Helper.createCardString(number)+') VALUES('+object.tableIds.gameId+','+Helper.convertCardArray(object.players[i-1].hand)+') ', {}, 
                   function(err){
                    if(err){
                      console.log("Error at insertMessagesRow Player 4")
                      throw err}
                    
                    object.tableIds.playersId.push(this.lastID)
                    object.players[i-1].id = this.lastID

                    if(i == object.players.length){
                    resolve(object)
                    }else{  i++
                      db.run('INSERT INTO Players (gameId,'+Helper.createCardString(number)+') VALUES('+object.tableIds.gameId+','+Helper.convertCardArray(object.players[i-1].hand)+') ', {}, 
                       function(err){
                        if(err){
                          console.log("Error at insertMessagesRow Player 5")
                          throw err
                        };
                        object.tableIds.playersId.push(this.lastID)
                        object.players[i-1].id = this.lastID

                        resolve(object)
                      });
                    };
                  });
                 }
              });
           }
        });
      }
    });   
  });
},
  //This function updates score, livesLeft, hintsLeft
  updateHanabiGameRow(gameObject){
    console.log("Updating HanabiGame")
   return new Promise((resolve, reject) => { 
    var sql = `UPDATE HanabiGames
            SET score = ${gameObject.score}, hintsLeft = ${gameObject.hintsLeft}, livesLeft = ${gameObject.livesLeft}
            WHERE id = ${gameObject.tableIds.gameId}`
    db.run(sql, function(err){
     if(err){
      console.log("Error at updateDeck at Hanabi Game Table", sql)
        throw err
        }
      resolve(gameObject)
    })
   });  
  },
  //This function updates Tables: PlayingDeck, DiscardedCards, & PlayedCards
  updateDeck(object, tableName){
    console.log("Updating"+tableName)
   return new Promise((resolve, reject) => { 
      var deckLength = 25 //Max Length of decks
      var array = [];
     
      if(tableName === 'PlayingDeck'){
        deckLength = 50
        array = object.playingDeck
      }
       else if(tableName === 'PlayedCards'){
         array = object.playedCards
       }else{
         array = object.discardedCards
       }
    
      var setString =  Helper.convertCardArrayForUpdate(array, deckLength) //Converts Array to a Valid SQL String 
    
      var sql = `UPDATE ${tableName}
                 SET ${setString}
                 WHERE gameId = ${object.tableIds.gameId}`
    
      db.run(sql, function (err){
        if(err){
         reject(console.log("Error at updateDeck "+tableName, sql, err))
          throw err
          }
        else{
          resolve(object)
          }
        });
     });
    },
  updateMessages(object){
    console.log("updating Messages")
  return new Promise((resolve, reject) => { 
       var sql = `UPDATE Messages
               SET Messages = "${object.messages.join()}"
               WHERE gameId = ${object.tableIds.gameId}`
    
    db.run(sql, function(err){
      if(err){
        console.log("Error at Updating Messages")
        throw err
        }
        resolve(object)
      });
    });
  },
  //This function takes an individual playerObject as an argument and updates the row. 
  //gameObject is included to pass data to the next call in Database.update
  updatePlayerRow(playerObject, gameObject){
     console.log("updating Players")
    
   return new Promise((resolve, reject) => { 
     var setString = Helper.convertCardArrayForUpdate(playerObject.hand, playerObject.hand.length)
     var sql = `UPDATE Players
               SET  ${setString}, active = ${playerObject.active}
               WHERE id = ${playerObject.id}`
       console.log(sql)
     db.run(sql, function(err){
       if(err){
         console.log("Error at Player "+playerObject.id+" Updating Table", err)
       }
       resolve(gameObject)
     }) 
   })
  }
};

const Database = {
  insert(object){
    return new Promise((resolve, reject) => {
      Utils.insertHanabiGameRow(object)
      .then(object => Utils.insertOriginalDeckRow(object))
      .then(object => Utils.insertPlayingDeckRow(object))
      .then(object => Utils.insertDiscardedCardsRow(object))
      .then(object => Utils.insertPlayedCardsRow(object))
      .then(object => Utils.insertMessagesRow(object))
      .then(object => Utils.insertPlayersRows(object))
      .then(object => resolve(object))
    });
  },
  //Updates All Tables with Current Object. Returns the same Object
  update(object){
    return new Promise((resolve, reject) => { 
      Utils.updateHanabiGameRow(object)
      .then(object => Utils.updateDeck(object, "PlayingDeck"))
      .then(object => Utils.updateDeck(object, "PlayedCards"))
      .then(object => Utils.updateDeck(object, "DiscardedCards"))
      .then(object => Utils.updateMessages(object))
      .then(function(object){
        var promises = []   
        object.players.forEach(async function(player){
            promises.push(Utils.updatePlayerRow(player, object))
           });
        Promise.all(promises).then(objects => resolve(objects[0]))
         });  
      }); 
  },
  //Gets Data from All Table and Returns a Valid gameObject (see test/defaults.js - Defaults)
  get(id){
    return new Promise((resolve, reject) => {
     resolve({numberOfPlayer: 5})
    });
  }
};

module.exports = {Database, Utils, Helper}

 

//+++++++++++++++++++++++++++++
// Game Update
//+++++++++++++++++++++++++++++
/*
Database.updateGame = (object) =>{
 updateDeck(object.playingDeck, object.id, 'PlayingDeck') 
 updateDeck(object.playedCards, object.id, 'PlayedCards')
 updateDeck(object.discardedCards, object.id, 'DiscardedCards')
 updateHanabiGame(object)
 updateMessages(object)
 updatePlayers(object.players[0])
 updatePlayers(object.players[1])
  if(object.players.length > 2){ updatePlayers(object.players[2])}
  if(object.players.length > 3){ updatePlayers(object.players[3])}
  if(object.players.length > 4){ updatePlayers(object.players[4])}
}
*/
/* 
convertCardArrayForUpdate() converts a Card Object to a string to be
placed into the Database. (It also lengthens the string to include null values
for the places there may have been cards in the database. This assures that the whole row
will be overwritten)

array = Array to Update
length = Number of card slots in the Database Row 

Input: Card Object = {color: STRING, hints: ARRAY, number: INTEGER}
Output: String = "color|number|hint[0] hint[1] hint[2],"

*/

 


//This function takes an individual playerObject as an argument and updates the row. 
function updatePlayers(playerObject){
  var setString = Helper.convertCardArrayForUpdate(playerObject.hand, playerObject.hand.length)
  var sql = `UPDATE Players
            SET  ${setString}, active = ${playerObject.active}
            WHERE id = ${playerObject.id}`
  console.log(sql)
  db.run(sql, function(err){
    if(err){
      console.log("Error at Player "+playerObject.id+" Updating Table")
    }
  }
    )
}


