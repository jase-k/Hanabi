/*
/modules/database.js

This Module is in Take the GameObject modified by game_play.js
and inserts it into the sqlite Database. 

It has three public functions: 
.insert(GAME OBJECT)
.get(GAMEID
.update(GAME Object)

The Object Utils and Helper contains Private Helper Functions for 
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
        hints: array[2] ? array[2].split(',') : [],
        number: array[1]
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
      db.run('INSERT INTO HanabiGames(numberOfPlayers, dateCreated, hintsLeft, livesLeft, score) VALUES('+object.numberOfPlayers+',"'+object.dateCreated+'",'+ object.hintsLeft+','+object.livesLeft+','+object.score+')',
         {}, 
         function(err){
           if(err){ 
             reject(console.log('Operation was Rejected at Hanabi Table', err))
             };
        
           object.tableIds.gameId= this.lastID
           object.id = this.lastID
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
  },
  getHanabiGameRow(id){
    var object = {};
    return new Promise ((resolve, reject) => {
      db.get('SELECT * FROM HanabiGames WHERE id = $id', {$id: id}, function (err, row){
        if(err){console.log("Error @ Database.getGameObject", err)}
        object = {
          dateCreated: row.dateCreated,
          hintsLeft: row.hintsLeft,
          id: row.id,
          livesLeft: row.livesLeft,
          numberOfPlayers: row.numberOfPlayers,
          score: row.score
        }
        resolve(object)
      });
    });
  },
  getPlayingDeck(object){
    return new Promise ((resolve, reject) => {
      var array = []
          object.playingDeck = []
      db.get('SELECT * FROM PlayingDeck WHERE gameId ='+object.id, 
        function(err, row){
          if(err){throw err}
    
          for(var i = 1; i <= 50; i++){
             array.push(Helper.cardStringToObject(row['card'+i]))
          }
        
          object.playingDeck = array.filter(card => card)
          
        resolve(object)
      });
    })    
  },
  getDiscardedCards(object){
    return new Promise ((resolve, reject) => {
      var array = []
      object.discardedCards = [];
      db.get('SELECT * FROM DiscardedCards WHERE gameId ='+object.id, 
        function(err, row){
          if(err){throw err}
    
          for(var i = 1; i <= 25; i++){
           array.push(Helper.cardStringToObject(row['card'+i]))
          }
        object.discardedCards = array.filter(card => card)
        
        resolve(object)
    });
  })
},
  getPlayedCards(object){
    return new Promise ((resolve, reject) => {
      object.playedCards = []
      db.get('SELECT * FROM PlayedCards WHERE gameId ='+object.id, 
        function(err, row){
          if(err){throw err}
    
         for(var i = 1; i <= 25; i++){
           object.playedCards.push(Helper.cardStringToObject(row['card'+i]))
          }
        
        resolve(object)
    });
  })
},
  getMessages(object){
    return new Promise((resolve, reject) => {
      object.messages = [];
      db.get('SELECT * FROM Messages WHERE gameId = '+object.id,
           function(err, row){
            if(err){
              console.log("Error at Get Messages", err)
              throw err
            }
        if(row.Messages){
          object.messages = row.Messages.split(",")
          } 
        resolve(object)
    });
   });
  },
  getPlayers(object){
    return new Promise ((resolve, reject) => {
      object.players = []
      var playerObject = { }
      db.all('SELECT * FROM Players WHERE gameId ='+object.id, 
        function(err, rows){
          if(err){throw err}
          
        rows.forEach(function(row){
            var array = []
          
            for(var i = 1; i <= 5; i++){
             array.push(Helper.cardStringToObject(row['card'+i]))
            }
            
          playerObject = {
              active: row.active,
              id: row.id, 
              hand: array,
              name: row.name
            }
            object.players.push(playerObject)                 
      });
        resolve(object)    
    });
  });
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

 





Database.getCurrentGame = (gameId) => {
return new Promise((resolve, reject) => { 
  var gameObject = {
    id: gameId
  }
  getGameObject(gameObject).then(object => getPlayingDeck(object))
  .then(object => getPlayedCards(object))
  .then(object => getDiscardedCards(object))
  .then(object => getPlayers(object))
  .then(object => getMessages(object))
  .then(object => resolve(object))
  });
};


