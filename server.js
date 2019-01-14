// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const gameCreation = require('./cool-file.js')
const Database = require('./database.js')

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
var card1to5 = 'card1, card2, card3, card4, card5'
var card6to25 = 'card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16, card17, card18, card19, card20, card21, card22, card23, card24, card25';
var card26to50 = 'card26, card27, card28, card29, card30, card31, card32, card33, card34, card35, card36, card37, card38, card39, card40, card41, card42, card43, card44, card45, card46, card47, card48, card49, card50'
// if ./.data/sqlite.db does not exist, create it, otherwise print records to console




// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.get('/newgame', function(request, response) {
//  console.log(request)
  var numberOfPlayers = request.query.players
  if(numberOfPlayers == null || numberOfPlayers > 5){
  response.send("Error: Must have 2-5 players")
  }
  var newDeck = gameCreation.createDeck(numberOfPlayers);
    
  console.log('<<CREATING A NEW GAME>>')

  var newGame = {};
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
  
Database.newGame(newGame).then(results => console.log(results))

  response.json('New GAME Created');

});

app.post('/test', function(request, response){
 var object = request.body.object;
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
  function create(object){
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
            console.log("DiscardedCards id:", currentGame.DiscardedCardsId);
  
db.run('INSERT INTO PlayedCards (gameId) VALUES('+currentGame.gameId+') ', {}, 
             function(err){
                if(err){throw err}
              currentGame.PlayedCardsId = this.lastID
            console.log("PlayedCards id:", currentGame.PlayedCardsId); 
   
  currentGame.PlayersId =[];
for(var i = 0; i < object.players.length; i++) {
  db.run('INSERT INTO Players (gameId) VALUES('+currentGame.gameId+') ', {}, 
             function(err){
                if(err){throw err}
              currentGame.PlayersId.push(this.lastID)
            console.log("Players id:", currentGame.PlayersId); 
  }); }//Ends INSERT INTO PLAYERS 

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
    console.log("Current Game's Players' ID", currentGame.playersId)
    response.send(currentGame)          
  });//Ends SELECT PlayingDeck
          });//Ends SELECT OriginalDeck
        });//Ends SELECT HanabiGames    
  
});//Ends INSERT INTO PlayedCards
  });//Ends INSERT INTO DiscardedCars
});//Ends INSERT INTO PlayingDeck
   }); //Ends INSERT INTO OriginalDeck
});//ENDs all db.run

 }
  
  create(object)
})




// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
