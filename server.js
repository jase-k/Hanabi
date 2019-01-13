// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const gameCreation = require('./cool-file.js')

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);
var table = 'card1, card2, card3, card4'

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console


db.serialize(() => { 
  db.run('DROP TABLE IF EXISTS Hanabi_Games', error => {
    if (error) {
      throw error;
    }
  })
   db.run('DROP TABLE IF EXISTS Original_Deck', error => {
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
  db.run('CREATE TABLE Hanabi_Games (id TEXT PRIMARY KEY, numberOfPlayers INTEGER NOT NULL, dateCreated DATE, score INTEGER, originalDeckId INTEGER, playingDeckId INTEGER, discardedCardsId INTEGER, playedCardsId INTEGER, playersId INTEGER)');
  db.run('CREATE TABLE Original_Deck(id INTEGER, gameId TEXT, card1 TEXT, card2 TEXT, card3 TEXT, card4 TEXT)');
  db.run('CREATE TABLE Playing_Deck(id INTEGER)');
  db.run('CREATE TABLE DiscardedCards(id INTEGER)');
  db.run('CREATE TABLE PlayedCards(id INTEGER)');
  db.run('CREATE TABLE Players(id INTEGER)');
  db.run('INSERT INTO Original_Deck(id, gameId, '+table+') VALUES (0000, "sample", "red 5", "blue 3", "white 2", "green 2")');
  db.run('INSERT INTO Hanabi_Games (id, numberOfPlayers, dateCreated, originalDeckId, playingDeckId, discardedCardsId, playedCardsId, playersId) VALUES("sample", 5, "2019-01-12T15:08:50.122Z", 0000, 0000, 0000, 0000, 0000)')
  db.each('SELECT * from Hanabi_Games', function(err, row) {
    console.log("Hanabi Table")  
    if ( row ) {
        console.log('record:', row);
      }
    });
  db.each('SELECT * from Original_Deck', function(err, row) {
 console.log('Original_Deck')
    if(err){
    throw err}
  if(row){
    console.log('record:', row) 
    }
  });
});
  

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// endpoint to get all the dreams in the database
// currently this is the only endpoint, ie. adding dreams won't update the database
// read the sqlite3 module docs and try to add your own! https://www.npmjs.com/package/sqlite3
app.get('/getDreams', function(request, response) {
  db.all('SELECT * from Dreams', function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});





app.get('/newgame', function(request, response) {
  console.log(request)
  var newGame = {};
  var numberOfPlayers = request.query.players
  if(numberOfPlayers == null || numberOfPlayers > 5){
  response.send("Error: Must have 2-5 players")
  }
  var newDeck = gameCreation.createDeck(numberOfPlayers);
  
newGame.id = gameCreation.createId();
newGame.numberOfPlayers = numberOfPlayers;
newGame.dateCreated = new Date();
newGame.score = null;
newGame.originalDeck = newDeck.slice();

//deals Hand and Returns the rest of the Deck array and Player Hands
var dealtGame = gameCreation.dealHand(newDeck, numberOfPlayers);

newGame.playingDeck = dealtGame.deck;
newGame.discardedCards = [];
newGame.playedCards = [];
newGame.players = dealtGame.players;  
  
  response.json(newGame);

});






// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
