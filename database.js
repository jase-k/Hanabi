var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);
var card1to5 = 'card1, card2, card3, card4, card5'
var card6to25 = 'card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16, card17, card18, card19, card20, card21, card22, card23, card24, card25';
var card26to50 = 'card26, card27, card28, card29, card30, card31, card32, card33, card34, card35, card36, card37, card38, card39, card40, card41, card42, card43, card44, card45, card46, card47, card48, card49, card50'
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
  console.log(string)
  return string
}

function convertCardArray(array){
  var string = ''
  for(var i = 0; i < array.length; i++){
    if(i !== array.length-1){
  string += '"'+array[i].color+''+array[i].number+'",'
      }else{string += '"'+array[i].color+' '+array[i].number+'"'}
    }
  return string
}


const Database ={};
/*
db.serialize(() => { 

 db.run('DROP TABLE IF EXISTS HanabiGames', error => {
    if (error) {
      throw error;
    }
  })
     db.run('CREATE TABLE HanabiGames (id INTEGER PRIMARY KEY, numberOfPlayers INTEGER NOT NULL, dateCreated DATE, score INTEGER, originalDeckId INTEGER, playingDeckId INTEGER, discardedCardsId INTEGER, playedCardsId INTEGER, playersId INTEGER)');
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
   db.run('DROP TABLE IF EXISTS Players', error => {
    if (error) {
      throw error;
    }
  })
  db.run('CREATE TABLE OriginalDeck(id INTEGER PRIMARY KEY, gameId TEXT, '+createCardString(50)+')');
  db.run('CREATE TABLE PlayingDeck(id INTEGER PRIMARY KEY, gameId TEXT, '+createCardString(50)+')');
  db.run('CREATE TABLE DiscardedCards(id INTEGER PRIMARY KEY, gameId TEXT, '+createCardString(25)+')');
  db.run('CREATE TABLE PlayedCards(id INTEGER PRIMARY KEY, gameId TEXT, '+createCardString(25)+')');
  db.run('CREATE TABLE Players(id INTEGER PRIMARY KEY, gameId TEXT, name TEXT, '+createCardString(5)+')');
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
Database.newGame = function(object) {
var currentGame = {};
  
db.run('INSERT INTO HanabiGames(numberOfPlayers) VALUES('+object.numberOfPlayers+')',
         {}, 
  function(err){
    if(err){ console.log(err)};
    currentGame.gameId = this.lastID
    console.log("current game id", currentGame.gameId);
  
db.run('INSERT INTO OriginalDeck (gameId,'+createCardString(50)+') VALUES('+currentGame.gameId+','+convertCardArray(object.originalDeck)+') ', {}, 
             function(err){
                if(err){throw err}
              currentGame.originalDeckId = this.lastID
            console.log("originalDeck id:", currentGame.originalDeckId);
db.run('INSERT INTO PlayingDeck (gameId,'+createCardString(object.playingDeck.length)+') VALUES('+currentGame.gameId+','+convertCardArray(object.playingDeck)+') ', {}, 
             function(err){
                if(err){throw err}
              currentGame.playingDeckId = this.lastID
            console.log("playingDeck id:", currentGame.playingDeckId);
db.run('INSERT INTO DiscardedCards (gameId) VALUES('+currentGame.gameId+') ', {}, 
             function(err){
                if(err){throw err}
              currentGame.DiscardedCardsId = this.lastID
            console.log("playingDeck id:", currentGame.DiscardedCardsId);
db.run('INSERT INTO DiscardedCards (gameId) VALUES('+currentGame.gameId+') ', {}, 
             function(err){
                if(err){throw err}
              currentGame.DiscardedCardsId = this.lastID
            console.log("playingDeck id:", currentGame.DiscardedCardsId);
  
db.get('SELECT * from HanabiGames WHERE id = '+currentGame.gameId, 
             function(err, row) {
    console.log("Hanabi Table")  
    if ( row ) {
        console.log('record:', row);
      }
 db.get('SELECT * from OriginalDeck WHERE id = '+currentGame.originalDeckId, 
             function(err, row) {
    console.log("original Deck:")  
    if ( row ) {
        console.log('record:', row);
      };
  db.get('SELECT * from PlayingDeck WHERE id = '+currentGame.playingDeckId, 
             function(err, row) {
    console.log("playing Deck:")  
    if ( row ) {
        console.log('record:', row);
      }
    
            });//Ends SELECT PlayingDeck
          });//Ends SELECT OriginalDeck
        });//Ends SELECT HanabiGames    
});//Ends INSERT INTO PlayedCards
  });//Ends INSERT INTO DiscardedCars
});//Ends INSERT INTO PlayingDeck
   }); //Ends INSERT INTO OriginalDeck
});//ENDs all db.run

 }

module.exports = Database

/* db.each('SELECT * from OriginalDeck', function(err, row) {
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