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
  }
};

const Database = {
  insert(object){
    return new Promise((resolve, reject) => {
      Utils.insertHanabiGameRow(object)
      .then(object => Utils.insertOriginalDeckRow(object))
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
 
function InsertPlayedCardsRow(object){
return new Promise((resolve, reject) => {
  db.run('INSERT INTO PlayedCards (gameId) VALUES('+object.tableIds.gameId+') ', {}, 
             function(err){
                if(err){throw err}
              object.tableIds.PlayedCardsId = this.lastID
            console.log("PlayedCards id:", object.tableIds.PlayedCardsId); 
    resolve(object)
    });  
  });
}
function InsertPlayersRows(object){
return new Promise((resolve, reject) => {
  object.tableIds.playersId = []
  var i = 1
  var number = object.players[i].hand.length
  db.run('INSERT INTO Players (gameId, name, active,  '+createCardString(number)+') VALUES('+object.tableIds.gameId+',"'+object.players[0].name+'", 1 ,'+convertCardArray(object.players[i-1].hand)+') ', {}, 
             function(err){
                if(err){throw err}
    object.tableIds.playersId.push(this.lastID)
    
    if(i == object.players.length){
      resolve(object)
    }else{ i++
          
db.run('INSERT INTO Players (gameId,'+createCardString(number)+') VALUES('+object.tableIds.gameId+','+convertCardArray(object.players[i-1].hand)+') ', {}, 
             function(err){
                if(err){throw err}
    object.tableIds.playersId.push(this.lastID)
    
    if(i == object.players.length){
      resolve(object)
    }else{ i++
db.run('INSERT INTO Players (gameId,'+createCardString(number)+') VALUES('+object.tableIds.gameId+','+convertCardArray(object.players[i-1].hand)+') ', {}, 
             function(err){
                if(err){throw err}
    object.tableIds.playersId.push(this.lastID)
    
    if(i == object.players.length){
      resolve(object)
    }else{ i++
db.run('INSERT INTO Players (gameId,'+createCardString(number)+') VALUES('+object.tableIds.gameId+','+convertCardArray(object.players[i-1].hand)+') ', {}, 
             function(err){
                if(err){throw err}
    object.tableIds.playersId.push(this.lastID)
    
    if(i == object.players.length){
      resolve(object)
    }else{i++
db.run('INSERT INTO Players (gameId,'+createCardString(number)+') VALUES('+object.tableIds.gameId+','+convertCardArray(object.players[i-1].hand)+') ', {}, 
             function(err){
                if(err){throw err}
    object.tableIds.playersId.push(this.lastID)
      resolve(object)
});
    }
});
    }
});
    }
});
    }
  });
     
    
  });
}
function InsertMessagesRow(object){
return new Promise((resolve, reject) =>{
  db.run('INSERT INTO Messages (gameId) VALUES('+object.tableIds.gameId+') ', {}, 
             function(err){
                if(err){throw err}
              object.tableIds.messageId = this.lastID
            console.log("Messages Table id:", object.tableIds.playingDeckId);
    resolve(object)
    });
  })
}
Database.createRows = function(object){
  return new Promise((resolve, reject) =>{
  InsertHanabiRow(object)
  .then(object => InsertOriginalDeckRow(object))
  .then(object => InsertPlayingDeckRow(object))
  .then(object => InsertDiscardedCardsRow(object))
  .then(object => InsertPlayedCardsRow(object))
  .then(object => InsertPlayersRows(object))
  .then(object => InsertMessagesRow(object))
  .then(object => resolve(object))
  })
}
