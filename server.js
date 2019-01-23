// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const gameCreation = require('./cool-file.js')
const Database = require('./database.js')
const ReactDOM = require('react-dom')
const React = require('react')

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

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console

/*
db.all('SELECT * from Players', function(err, rows){
  if(err){throw err}
  rows.forEach(function(row){console.log('record:', row)})
});
 */

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.get('/newgame/:numberOfPlayers', function(request, response) {
//  console.log(request)
  var numberOfPlayers = request.params.numberOfPlayers
  var name = request.query.name

  if(numberOfPlayers == null || numberOfPlayers > 5){
  response.send("Error: Must have 2-5 players")
  }
  
  var newDeck = gameCreation.createDeck(numberOfPlayers);
    
  console.log('<<CREATING A NEW GAME>>')

  var newGame = {};
newGame.numberOfPlayers = numberOfPlayers;
newGame.dateCreated = new Date();
newGame.score = null;
newGame.hintsLeft = 9;
newGame.livesLeft = 3;
newGame.originalDeck = newDeck.slice();

//deals Hand and Returns the rest of the Deck array and Player Hands
var dealtGame = gameCreation.dealHand(newDeck, numberOfPlayers, name);

newGame.playingDeck = dealtGame.deck;
newGame.discardedCards = [];
newGame.playedCards = [];
newGame.players = dealtGame.players;  
  
  //Sends the Object Created above to set the table data for the New Game 
  //The function below (found in database.js) Inserts New Rows in the Tables with the starting Data. 
Database.createRows(newGame).then(results => response.json(results))
  
});


app.get('/joingame/:gameid', function(request, response){
  var name = request.query.name
  var gameId = request.params.gameid
  Database.addPlayer(gameId, name) 
  Database.getCurrentGame(gameId).then(function(results){
     results.message = 'Success!'
  var failedName = true
    for(var i = 0; i< results.players.length; i++){
   if(results.players[i].name == name){ failedName = false}
  }  
   if(failedName){
     results.message = 'Name Not Found in the Game!'
     response.json(results)} else {response.json(results)}
  })
  });


app.get('/game/:gameid/:name', function(request, response){
  var gameId = request.params.gameid
  var name = request.params.name
  
  //Returning the Game Object and Adding a Failure Message for Debugging 
  Database.getCurrentGame(gameId).then(function(results){
     results.message = 'Success!'
    var failedName = true
    for(var i = 0; i< results.players.length; i++){
   if(results.players[i].name == name){ failedName = false}
  }  
   if(failedName){
     results.message = 'Name Not Found in the Game!'
     response.json(results)} else {response.json(results)}
  })
  
});

app.get('/game/:gameid/:name/playcard', function(request, response){

});
var name = 'Joe'
var cardIndex = 2
  Database.getCurrentGame(3).then(function(results){
    console.log(results)
//==== Replace the First Card undefined Card in the Played Cards Array========//  
  var playerIndex = results.players.findIndex(i => i.name === name);
  var playedCardIndex = results.playedCards.indexOf(undefined)
   results.playedCards.splice(playedCardIndex, 1, results.players[playerIndex].hand[cardIndex])
   console.log("Player Index", playerIndex)
   console.log("playedCardIndex", playedCardIndex)
   console.log("Played Cards", results.playedCards)
//==== Replace the Hand Card with the Next Card from the Deck ===//
  var nextCard = results.playingDeck.shift()
   console.log("nextCard from the Deck:", nextCard)
    
    console.log("new Results:", results
  })


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
