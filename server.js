// server.js
// where your node app starts

// init project
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const gameCreation = require('./cool-file.js')
const Database = require('./database.js')
const ReactDOM = require('react-dom')
const React = require('react')
const colors = ['white', 'red', 'black', 'orange', 'blue']
const numbers = [1,2,3,4,5]

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


//== Playing Choices ==//

app.get('/game/:gameid/:name/playcard', function(request, response){
var name = request.params.name
var cardIndex = request.query.cardIndex
var gameId = request.params.gameid
  Database.getCurrentGame(gameId).then(function(results){
    console.log(JSON.stringify(results))
    
//==== Replace the First Card undefined Card in the Played Cards Array========//  
  var playerIndex = results.players.findIndex(i => i.name === name);
    console.log("player index", playerIndex)
  if(playerIndex == -1){
    response.send("Couldn't Find Player!")
    return; 
   }
    if(!results.players[playerIndex].active){ response.send("Sorry, it's not your Turn!"); return;} //Returns if name isn't active
    
// ==== Checks to see if the Card Plays ===== //
  var card = results.players[playerIndex].hand[cardIndex]

  //Filters out the color of the played Cards
  console.log("Color of Card", card.color)
  var colorArray = results.playedCards.filter(playedcard => playedcard).filter(playedcard => playedcard.color === card.color)
  console.log("colorArray", colorArray)
  var max =  Math.max.apply(null, colorArray.map(element => element.number))
    
  console.log("Max:", max)
  if(max == -Infinity){ max = 0 }
    
 if(max+1 == card.number){ 
  var playedCardIndex = results.playedCards.indexOf(undefined)
   results.playedCards.splice(playedCardIndex, 1, card)
   results.message = "Success! Good Job"
   results.score++
   if(card.number == 5){results.hintsLeft++}
 }else{
    var discardedCardIndex = results.discardedCards.indexOf(undefined)
 results.discardedCards.splice(discardedCardIndex, 1, results.players[playerIndex].hand[cardIndex])
   results.livesLeft--   
   results.message = "Sorry, card didn't Play"
 }
//==== Replace the Hand Card with the Next Card from the Deck ===//
  var nextCard = results.playingDeck.shift()
  results.players[playerIndex].hand.splice(cardIndex, 1, nextCard)    
  console.log("new Results:", JSON.stringify(results))
    
//===== Switch the Active Player ====//
    results.players[playerIndex].active = 0
var newIndex = (playerIndex+1) % results.players.length
    results.players[newIndex].active = 1
    

  Database.updateGame(results)
  response.send(results)
  })
});


//=============================================

app.get('/game/:gameid/:name/discard', function(request, response){
var name = request.params.name
var cardIndex = request.query.cardIndex
var gameId = request.params.gameid

  Database.getCurrentGame(gameId).then(function(results){
    console.log(JSON.stringify(results))
    
//==== Replace the First Card undefined Card in the Discarded Cards Array========//  
  var playerIndex = results.players.findIndex(i => i.name === name);
     if(playerIndex == -1){ response.send("Couldn't Find Player!"); return; } // Returns if name isn't Found
     if(!results.players[playerIndex].active){ response.send("Sorry, it's not your Turn!"); return;} //Returns if name isn't active
    
  var discardedCardIndex = results.discardedCards.indexOf(undefined)
 results.discardedCards.splice(discardedCardIndex, 1, results.players[playerIndex].hand[cardIndex])

//==== Replace the Hand Card with the Next Card from the Deck ===//
  var nextCard = results.playingDeck.shift()
  results.players[playerIndex].hand.splice(cardIndex, 1, nextCard)    
  console.log("new Results:", JSON.stringify(results))

//===== Switch the Active Player ====//
    results.players[playerIndex].active = 0
var newIndex = (playerIndex+1) % results.players.length
    results.players[newIndex].active = 1
  
//=== Add a Hint After Discarding ==//
    results.hintsLeft++
    
  Database.updateGame(results)
  response.send(results)
  })
});
 
app.get('/game/:gameid/:name/givehint', function(request, response){
var name = request.params.name
console.log(name)

var hint = request.query.hint
var player = request.query.player //The Player Receiving the Hint! 
var gameId = request.params.gameid

  
//=== Getting Data from the DataBase==//
 Database.getCurrentGame(gameId).then(function(results){
    console.log(JSON.stringify(results))
   
  var nameIndex = results.players.findIndex(i => i.name === name)
    if(nameIndex == -1){ response.send("Couldn't Find You!");  return; } // Returns if name isn't found
    if(!results.players[nameIndex].active){ response.send("Sorry, it's not your Turn!"); return;} //Returns if name isn't active
   
  var playerIndex = results.players.findIndex(i => i.name === player);
    if(playerIndex == -1){    response.send("Couldn't Find Player!");  return; } // Returns if player isn't found
   
   var hand = results.players[playerIndex].hand
   console.log('hand', hand)
 
//==== Parsing the hint ====//
var hintType;
  for(var i = 0; i < colors.length; i++){
     if(hint.includes(colors[i])){
      hintType = 'color'
     break;
      }else{hintType = 'number'}
   }  
console.log('hintType', hintType) 
 
for(var i =0; i < hand.length; i++){
     var card = hand[i]
|
function appendHints(hintType, card){  
     console.log("card:", card)
    if(card){ //makes sure the card is not null
    
      if(card[hintType] == hint){ 
        results.players[playerIndex].hand[i].hints.push(hint) }else{ //if the hint matches the card value push the hint
          hand[i].hints.push('not '+hint)
        }
function appendHints(array, hintType){
  console.log("Array =", array)
array.forEach(function(card, index){
console.log(`${card} is being checked`)
   if(hintType == 'color'){
     for(var j = 0; j < colors.length; j++){
       if(card.includes(colors[j])){
           array.splice(index, 1)
          }
        }
      }else{
  for(var j = 0; j < numbers.length; j++){
       if(array[i].includes(numbers[j])){
           array.splice(index, 1)
          }
        }
      }
    })
}
    
    }
  }
}

  
   
//===== Switch the Active Player ====//
    results.players[nameIndex].active = 0
var newIndex = (nameIndex+1) % results.players.length
    results.players[newIndex].active = 1

results.hintsLeft -= 1;  
Database.updateGame(results)
response.send(results)
 
 });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
