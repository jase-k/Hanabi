// server.js
// where your node app starts

// init project
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//import Modules
const WinningGifs = require('./assets/gifs.js')
const GamePlay = require('./modules/game_play.js')
const {Database, Helper} = require('./modules/database.js')

const colors = ['white', 'red', 'black', 'orange', 'blue']
const numbers = [1,2,3,4,5]
const hintOptions = {}
      hintOptions.color = colors
      hintOptions.number = numbers

const cors = require('cors')

app.use(cors());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);


db.serialize(() => { 
 /*
  db.run('DROP TABLE IF EXISTS Messages', error => {
    if (error) {
      throw error;
    }
  })
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
*/
  db.run('CREATE TABLE IF NOT EXISTS OriginalDeck(id INTEGER PRIMARY KEY, gameId TEXT, '+Helper.createCardString(50)+')');
  db.run('CREATE TABLE IF NOT EXISTS PlayingDeck(id INTEGER PRIMARY KEY, gameId TEXT, '+Helper.createCardString(50)+')');
  db.run('CREATE TABLE IF NOT EXISTS DiscardedCards(id INTEGER PRIMARY KEY, gameId TEXT, '+Helper.createCardString(25)+')');
  db.run('CREATE TABLE IF NOT EXISTS PlayedCards(id INTEGER PRIMARY KEY, gameId TEXT, '+Helper.createCardString(25)+')');
  db.run('CREATE TABLE IF NOT EXISTS Messages(id INTEGER PRIMARY KEY, gameId INTEGER, Messages TEXT)') 
  db.run('CREATE TABLE IF NOT EXISTS Players(id INTEGER PRIMARY KEY, gameId TEXT, name TEXT, active INTEGER, '+Helper.createCardString(5)+')');
  db.run('CREATE TABLE IF NOT EXISTS HanabiGames (id INTEGER PRIMARY KEY, numberOfPlayers INTEGER, dateCreated DATE, score INTEGER, hintsLeft INTEGER, livesLeft INTEGER, gameProgress TEXT)');
  
})


// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/winner', function(request, response){
  var gif = WinningGifs[Math.floor(Math.random()*WinningGifs.length)]
  
  response.json(gif)
});

app.get('/newgame/:numberOfPlayers', function(request, response) {

  var numberOfPlayers = request.params.numberOfPlayers
  var name = request.query.name
  var newGame = GamePlay.newGame(numberOfPlayers, name)

  if(numberOfPlayers == null || numberOfPlayers > 5){
      response.send("Error: Must have 2-5 players")
  }
  
  console.log('<<CREATING A NEW GAME>>')
 
   Database.insert(newGame)
  .then(results => response.json(results))
  
});

app.get('/joingame/:gameid', function(request, response){
  var name = request.query.name
  var gameId = request.params.gameid
  var gameObject = {}
  
  Database.get(gameId)
  .then(function(gameObject){
    
    let playerId = GamePlay.joinGame(gameObject, name)
   
    if(playerId){
      
      Database.joinGame(gameObject, name, playerId)
      .then(gameObject => Database.get(gameObject.id))
      .then(results =>   response.json(results))
      
    }else{
      response.send("Sorry Game is Full")
      }
    })
});

app.get('/game/:gameid/:name', function(request, response){
  var gameId = request.params.gameid
  var name = request.params.name
  
  Database.get(gameId)
  .then(function(results){
      response.json(results)
  });
});


//== Playing Choices ==//

app.get('/game/:gameid/:name/playcard', function(request, response){
var name = request.params.name
var cardIndex = request.query.cardIndex
var gameId = request.params.gameid

 Database.get(gameId).then(function(game){
    console.log("PLAY CARD GAME:", game)    
    
  GamePlay.playCard(game, cardIndex, name)
    
   
      Database.update(game)
      .then(results =>   response.json(results))
  })
});

app.get('/game/:gameid/:name/discard', function(request, response){
var name = request.params.name
var cardIndex = request.query.cardIndex
var gameId = request.params.gameid

  Database.get(gameId).then(function(results){
    
    GamePlay.discard(results, cardIndex, name)
 
    Database.update(results)
    .then(results =>  response.json(results))
  })
});
 
app.get('/game/:gameid/:name/givehint', function(request, response){
var name = request.params.name
console.log(name)

var hint = request.query.hint
var player = request.query.player //The Player Receiving the Hint! 
var gameId = request.params.gameid

  
//=== Getting Data from the DataBase==//
 Database.get(gameId).then(function(results){
  console.log(JSON.stringify(results))
  
  GamePlay.giveHint(results, hint, player, name)
   
  Database.update(results)
  .then(results => response.json(results))
 
 });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
