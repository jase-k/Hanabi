var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);
const gameCreation = require('./cool-file.js')
var sampleDeck = gameCreation.createDeck(5)
//Create a string of mulitple cards
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

var cardString = [{"color":"blue","number":"4","hints":['not red', 3, 'not white']},
                  {"color":"blue","number":"2","hints":['not red', 'white', 'not 3']},
                  {"color":"red","number":"4","hints":['red', 'not white', 'not 3']},
                  {"color":"black","number":"5","hints":['red', 'not white', 3]},null]

var newstring = convertCardArray(cardString);
var objectnew = cardStringToObject(newstring);

//console.log(newstring)
//console.log(objectnew)

const Database ={};

  //db.run('CREATE TABLE Players(id INTEGER PRIMARY KEY, gameId TEXT, name TEXT, active INTEGER, '+createCardString(5)+')');
 

/*
db.serialize(() => { 

 db.run('DROP TABLE IF EXISTS Players', error => {
    if (error) {
      throw error;
    }
  })

 db.run('DROP TABLE IF EXISTS HanabiGames', error => {
    if (error) {
      throw error;
    }
  })
     db.run('CREATE TABLE HanabiGames (id INTEGER PRIMARY KEY, numberOfPlayers INTEGER NOT NULL, dateCreated DATE, score INTEGER, hintsLeft INTEGER, livesLeft INTEGER)');
 
 db.each('SELECT * from HanabiGames', function(err, row) {
    console.log("Hanabi Table")  
    if ( row ) {
        console.log('record:', row);
      }
    }); 

  db.run('DROP TABLE IF EXISTS OriginalDeck', error => {
    if (error) {
      throw error;
    }
  })
   db.run('DROP TABLE IF EXISTS PlayingDeck', error => {
    if (error) {
      throw error;
    }
  })
   db.run('DROP TABLE IF EXISTS DiscardedCards', error => {
    if (error) {
      throw error;
    }
  })
   db.run('DROP TABLE IF EXISTS PlayedCards', error => {
    if (error) {
      throw error;
    }
  })

  db.run('CREATE TABLE OriginalDeck(id INTEGER PRIMARY KEY, gameId TEXT, '+createCardString(50)+')');
  db.run('CREATE TABLE PlayingDeck(id INTEGER PRIMARY KEY, gameId TEXT, '+createCardString(50)+')');
  db.run('CREATE TABLE DiscardedCards(id INTEGER PRIMARY KEY, gameId TEXT, '+createCardString(25)+')');
  db.run('CREATE TABLE PlayedCards(id INTEGER PRIMARY KEY, gameId TEXT, '+createCardString(25)+')');
  db.run('INSERT INTO PlayingDeck(gameId, '+createCardString(50)+') VALUES ("sample", '+convertCardArray(sampleDeck)+')',
         function(err){if(err){throw err}}); 
  db.run('INSERT INTO Players(gameId) VALUES ("sample")');
  db.run('INSERT INTO OriginalDeck(gameId) VALUES ("sample")');
//  db.run('INSERT INTO HanabiGames (numberOfPlayers, dateCreated, originalDeckId, playingDeckId, discardedCardsId, playedCardsId, playersId) VALUES(5, "2019-01-12T15:08:50.122Z", 0000, 0000, 0000, 0000, 0000)')
  
  db.each('SELECT * from OriginalDeck', function(err, row) {
 console.log('OriginalDeck')
    if(err){
    throw err}
  if(row){
    console.log('record:', row) 
    }
  });
  db.each('SELECT * from PlayingDeck', function(err, row) {
 console.log('PlayingDeck')
    if(err){
    throw err}
  if(row){
    console.log('record:', row) 
    }
  });
  db.each('SELECT * from DiscardedCards', function(err, row) {
 console.log('DiscardedCards')
    if(err){
    throw err}
  if(row){
    console.log('record:', row) 
    }
  });
  db.each('SELECT * from PlayedCards', function(err, row) {
 console.log('PlayedCards')
    if(err){
    throw err}
  if(row){
    console.log('record:', row) 
    }
  });
  db.each('SELECT * from Players', function(err, row) {
 console.log('Players')
    if(err){
    throw err}
  if(row){
    console.log('record:', row) 
    }
  }); 
}); 
  */


//============================
// Creating New Game (6 tables)
//============================
// Object Keys: 
/* numberOfPlayers
   originalDeck
   playingDeck
   players{
     name
      hand: []
      }
    */
var i;
function InsertHanabiRow(object) {
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
}
function InsertOriginalDeckRow(object){
 return new Promise((resolve, reject) =>{
  db.run('INSERT INTO OriginalDeck (gameId,'+createCardString(50)+') VALUES('+object.tableIds.gameId+','+convertCardArray(object.originalDeck)+') ', {}, 
             function(err){
                if(err){throw err}
              object.tableIds.originalDeckId = this.lastID
            console.log("originalDeck id:", object.tableIds.originalDeckId);
      resolve(object)
    })
  });
}
function InsertPlayingDeckRow(object){
return new Promise((resolve, reject) =>{
  db.run('INSERT INTO PlayingDeck (gameId,'+createCardString(object.playingDeck.length)+') VALUES('+object.tableIds.gameId+','+convertCardArray(object.playingDeck)+') ', {}, 
             function(err){
                if(err){throw err}
              object.tableIds.playingDeckId = this.lastID
            console.log("playingDeck id:", object.tableIds.playingDeckId);
    resolve(object)
    });
  })
}
function InsertDiscardedCardsRow(object){
return new Promise ((resolve, reject) =>{
  db.run('INSERT INTO DiscardedCards (gameId) VALUES('+object.tableIds.gameId+') ', {}, 
             function(err){
                if(err){throw err}
              object.tableIds.DiscardedCardsId = this.lastID
            console.log("DiscardedCards id:", object.tableIds.DiscardedCardsId);
    resolve(object)
    });
  });
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

Database.createRows = function(object){
  return new Promise((resolve, reject) =>{
  InsertHanabiRow(object)
  .then(object => InsertOriginalDeckRow(object))
  .then(object => InsertPlayingDeckRow(object))
  .then(object => InsertDiscardedCardsRow(object))
  .then(object => InsertPlayedCardsRow(object))
  .then(object => InsertPlayersRows(object))
  .then(object => resolve(object))
  })
}


/*

db.each('SELECT * from OriginalDeck', function(err, row) {
 console.log('OriginalDeck')
    if(err){
    throw err}
  if(row){
    console.log('record:', row) 
    }
  });
  db.each('SELECT * from PlayingDeck', function(err, row) {
 console.log('PlayingDeck')
    if(err){
    throw err}
  if(row){
    console.log('record:', row) 
    }
  });
  db.each('SELECT * from DiscardedCards', function(err, row) {
 console.log('DiscardedCards')
    if(err){
    throw err}
  if(row){
    console.log('record:', row) 
    }
  });
  db.each('SELECT * from PlayedCards', function(err, row) {
 console.log('PlayedCards')
    if(err){
    throw err}
  if(row){
    console.log('record:', row) 
    }
  });
  db.each('SELECT * from Players', function(err, row) {
 console.log('Players')
    if(err){
    throw err}
  if(row){
    console.log('record:', row) 
    }
  });  */


//============================================
// Return Game Data from GameId and Name
//============================================
function getGameObject(object){
return new Promise ((resolve, reject) => {
  db.get('SELECT * FROM HanabiGames WHERE id = $id', {$id: object.id}, function (err, row){
    if(err){console.log("Error @ Database.getGameObject", err)}
    object = {
    id: row.id,
    score: row.score,
    dateCreated: row.dateCreated,
    hintsLeft: row.hintsLeft,
    livesLeft: row.livesLeft
    }
    resolve(object)
    });
  });
}
function getPlayers(object){
return new Promise ((resolve, reject) => {
  object.players = []
  var playerObject = { }
  db.all('SELECT * FROM Players WHERE gameId ='+object.id, 
    function(err, rows){
      if(err){throw err}
      rows.forEach(function(row){
        playerObject = {
          id: row.id, 
          name: row.name,
          active: row.active
        }
       playerObject.hand = [cardStringToObject(row.card1), cardStringToObject(row.card2), cardStringToObject(row.card3), cardStringToObject(row.card4), cardStringToObject(row.card5)]
       object.players.push(playerObject)                 
      })
        resolve(object)    
    });//ENDS db All
  });
}
function getPlayingDeck(object){
return new Promise ((resolve, reject) => {
  object.playingDeck = []
  db.get('SELECT * FROM PlayingDeck WHERE gameId ='+object.id, 
    function(err, row){
      if(err){throw err}
    
 for(var i = 1; i <= 50; i++){
     object.playingDeck.push(cardStringToObject(row['card'+i]))
    }
        resolve(object)
    });//ENDS db All
  })    
}

function getPlayedCards(object){
return new Promise ((resolve, reject) => {
  object.playedCards = []
  db.get('SELECT * FROM PlayedCards WHERE gameId ='+object.id, 
    function(err, row){
      if(err){throw err}
    
 for(var i = 1; i <= 25; i++){
     object.playedCards.push(cardStringToObject(row['card'+i]))
    }
        resolve(object)
    });//ENDS db All
  })
}
function getDiscardedCards(object){
return new Promise ((resolve, reject) => {
  object.discardedCards = [];
  db.get('SELECT * FROM DiscardedCards WHERE gameId ='+object.id, 
    function(err, row){
      if(err){throw err}
    
 for(var i = 1; i <= 25; i++){
     object.discardedCards.push(cardStringToObject(row['card'+i]))
    }
        resolve(object)
    });//ENDS db All
  })
}


Database.getCurrentGame = (gameId) => {
return new Promise((resolve, reject) => { 
  var gameObject = {
    id: gameId
  }
  getGameObject(gameObject).then(object => getPlayingDeck(object))
  .then(object => getPlayedCards(object))
  .then(object => getDiscardedCards(object))
  .then(object => getPlayers(object))
  .then(object => resolve(object))
  });
};

//===========================================
// Join a Game 
//===========================================
Database.addPlayer = (gameId, name) => {
  var playerId;
  db.each('SELECT * FROM Players WHERE gameId = $id', 
          {$id: gameId}, 
          function(err,row){
    if(err){console.log("Error at addPlayer SELECT", err)} 
if(row.name !== name){
  if(!playerId){
      console.log("Checking Name..")
      console.log(row.name)
      console.log(name)
   if(!row.name){  
        console.log("Player Row:", row)
         playerId = row.id
        console.log("Player Id", playerId)
         }
      }
  }else{
    console.log("Whoops Rows Equal Each Other!"); 
    playerId = row.id }
    },
      function(err, Allrows){
    console.log(playerId)
    db.run('UPDATE Players Set name = $name WHERE id = $id', {$name: name, $id: playerId})    
  })
}


//========================================
//  Update Game
//=======================================

Database.updateGame = (object) =>{

}

function updatePlayingDeck(deck, id){
  var sql = `UPDATE PlayingDeck
            SET
            WHERE gameId = ${id}`
  db.run(sql)
}

//=========================================
// Play a Card
//========================================
//name is the player Playing the Card, cardNumber is the Number (1-5)
function playCard(gameId, name, cardIndex){
var object = {};
    object.cardIndex = cardIndex;
  db.get('SELECT * FROM Players WHERE gameId = $id AND name = $name', {$id: gameId, $name:name}, function(err, row){
  if(err){ console.log("Error at playCard()", err)}
    object.playerRowId = row.id
  db.get('SELECT * FROM PlayingDeck WHERE gameId = $id',{$id: gameId}, function(err, row){
    console.log(row, object)
    })
  })
}
//playCard(2, 'Kiana', 0) 



//Database.getCurrentGame(1).then(data => console.log(data))
module.exports = Database

