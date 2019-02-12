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

*/

//Establishes a Database
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);


//Declare variables
var i;

const Utils = {
  insertHanabiGameRow(object) { //Insert Row and Return Object with Game ID
    return new Promise((resolve, reject) => {
      object.tableIds = {}
      db.run('INSERT INTO HanabiGames(numberOfPlayers, dateCreated, hintsLeft, livesLeft) VALUES('+object.numberOfPlayers+',"'+object.dateCreated+'",'+ object.hintsLeft+','+object.livesLeft+')',
           {}, 
          function(err){
            if(err){ console.log(err)
             reject(console.log('Operation was Rejected at Hanabi Table'))
             };
          object.tableIds.gameId= this.lastID
          console.log("current game id", object.tableIds.gameId);
          resolve(object)
        })
    });
  },
  insertOriginalDeckRow(object){
 return new Promise((resolve, reject) =>{
  db.run('INSERT INTO OriginalDeck (gameId,'+createCardString(50)+') VALUES('+object.tableIds.gameId+','+convertCardArray(object.originalDeck)+') ', {}, 
             function(err){
                if(err){throw err}
              object.tableIds.originalDeckId = this.lastID
            console.log("originalDeck id:", object.tableIds.originalDeckId);
      resolve(object)
    })
  });
},
  insertPlayingDeckRow(object){
  return new Promise((resolve, reject) =>{
    db.run('INSERT INTO PlayingDeck (gameId,'+createCardString(object.playingDeck.length)+') VALUES('+object.tableIds.gameId+','+convertCardArray(object.playingDeck)+') ', {}, 
             function(err){
                if(err){throw err}
              object.tableIds.playingDeckId = this.lastID
            console.log("playingDeck id:", object.tableIds.playingDeckId);
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
            console.log("DiscardedCards id:", object.tableIds.discardedCardsId);
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
            console.log("PlayedCards id:", object.tableIds.playedCardsId); 
        resolve(object)
      });  
    });
  },
  insertMessagesRow(object){
    return new Promise((resolve, reject) =>{
    db.run('INSERT INTO Messages (gameId) VALUES('+object.tableIds.gameId+') ', {}, 
             function(err){
                if(err){throw err}
              object.tableIds.messagesId = this.lastID
            console.log("Messages Table id:", object.tableIds.messagesId);
      resolve(object)
      });
    })
  },
  insertPlayersRows(object){
    return new Promise((resolve, reject) => {
      object.tableIds.playersId = []
      var i = 1
      var number = object.players[i].hand.length
    db.run('INSERT INTO Players (gameId, name, active,  '+createCardString(number)+') VALUES('+object.tableIds.gameId+',"'+object.players[0].name+'", 1 ,'+convertCardArray(object.players[i-1].hand)+') ', {}, 
             function(err){
                if(err){throw err}
      object.tableIds.playersId.push(this.lastID)
      object.players[i-1].id = this.lastID
      console.log("Players Table id:", this.lastID);

      if(i == object.players.length){
        resolve(object)
      }else{ i++
          
    db.run('INSERT INTO Players (gameId,'+createCardString(number)+') VALUES('+object.tableIds.gameId+','+convertCardArray(object.players[i-1].hand)+') ', {}, 
      function(err){
        if(err){throw err}
        object.tableIds.playersId.push(this.lastID)
        object.players[i-1].id = this.lastID
        console.log("Players Table id:", this.lastID);

        if(i == object.players.length){
          resolve(object)
          }else{  i++
            db.run('INSERT INTO Players (gameId,'+createCardString(number)+') VALUES('+object.tableIds.gameId+','+convertCardArray(object.players[i-1].hand)+') ', {}, 
               function(err){
                if(err){throw err}
                object.tableIds.playersId.push(this.lastID)
                object.players[i-1].id = this.lastID
                console.log("Players Table id:", this.lastID);

                if(i == object.players.length){
                resolve(object)
                }else{  i++
                  db.run('INSERT INTO Players (gameId,'+createCardString(number)+') VALUES('+object.tableIds.gameId+','+convertCardArray(object.players[i-1].hand)+') ', {}, 
                   function(err){
                    if(err){throw err}
                    object.tableIds.playersId.push(this.lastID)
                     object.players[i-1].id = this.lastID
                    console.log("Players Table id:", this.lastID);

                    if(i == object.players.length){
                    resolve(object)
                    }else{  i++
                      db.run('INSERT INTO Players (gameId,'+createCardString(number)+') VALUES('+object.tableIds.gameId+','+convertCardArray(object.players[i-1].hand)+') ', {}, 
                       function(err){
                        if(err){throw err};
                        object.tableIds.playersId.push(this.lastID)
                         object.players[i-1].id = this.lastID
                        console.log("Players Table id:", this.lastID);

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
    var sql = `UPDATE HanabiGames
            SET score = ${gameObject.score}, hintsLeft = ${gameObject.hintsLeft}, livesLeft = ${gameObject.livesLeft}
            WHERE id = ${gameObject.tableIds.gameId}`
    db.run(sql, function(err){
     if(err){
      console.log("Error at updateDeck at Hanabi Game Table", sql)
        throw err
        }
    })
  },
  //This function updates Tables: PlayingDeck, DiscardedCards, & PlayedCards
  updateDeck(array, id, tableName){
    var deckLength = 25 //Max Length of decks
    if(tableName === 'PlayingDeck'){
      deckLength = 50
    }
    
    var setString =  convertCardArrayForUpdate(array, deckLength) //Converts Array to a Valid SQL String 
    
    var sql = `UPDATE ${tableName}
               SET ${setString}
               WHERE gameId = ${id}`
    
    db.run(sql, function (err){
      if(err){
      console.log("Error at updateDeck "+tableName, sql)
        throw err
        }
      })
    },
  updateMessages(object){
    var sql = `UPDATE Messages
               SET Messages = "${object.messages.join()}"
               WHERE gameId = ${object.tableIds.gameId}`
    
    db.run(sql, function(err){
      if(err){
        console.log("Error at Updating Messages")
        throw err
      }
    });
  },
  //This function takes an individual playerObject as an argument and updates the row. 
  updatePlayerRow(playerObject){
    var setString = convertCardArrayForUpdate(playerObject.hand, playerObject.hand.length)
    var sql = `UPDATE Players
              SET  ${setString}, active = ${playerObject.active}
              WHERE id = ${playerObject.id}`
    console.log(sql)
    db.run(sql, function(err){
      if(err){
        console.log("Error at Player "+playerObject.id+" Updating Table")
      }
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
  }
};

module.exports = {Database, Utils}

function createCardString(number){
 var string = '' 
  for(var i = 1; i <= number; i++){
    if(i !== number){ 
    string += 'card'+i+','
      }else{string += 'card'+i}
    }
  return string
}

function convertCardArray(array){
  var string = ''
  for(var i = 0; i < array.length; i++){  
    if(array[i]){
      string += '"'+array[i].color+'|'+array[i].number
      for(var j = 0; j < array[i].hints.length; j++){
        string += '|'+array[i].hints[j]
        }
    if(i !== array.length-1){
           string += '",'
        }else{string += '"'}
    }
  }
  return string
}

function cardStringToObject(string){
var object;
  if(string){
var array = string.split("|")
object = {
    color: array[0],
    number: array[1],
    hints: []    
  }
for(var i = 2; i <array.length; i++){
    object.hints.push(array[i])
    }  
  }
  return object
}
 

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

function convertCardArrayForUpdate(array, length){
  var string = ''
  for(var i = 0; i < length; i++){  //Converts Each Array Object to String format to be inserted into the Table 
    if(array[i]){
      string += 'card'+(i+1)+'="'+array[i].color+'|'+array[i].number
        for(var j = 0; j < array[i].hints.length; j++){
          string += '|'+array[i].hints[j]
            } 
        if(i === length-1){
        string += '"'
          }else{ string +='",'}
        
    }else if(i < length-1){ //Changes the Last spots to null to clear the table of those cards
        string += 'card'+(i+1)+'=null,'
    
    }else{ 
      string += 'card'+(i+1)+'=null'
    };
 };
  return string
}; 


//This function takes an individual playerObject as an argument and updates the row. 
function updatePlayers(playerObject){
  var setString = convertCardArrayForUpdate(playerObject.hand, playerObject.hand.length)
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


