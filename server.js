// server.js
// where your node app starts

// init project
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//import Modules
const gameCreation = require('./cool-file.js')
const database = require('./database.js')
const WinningGifs = require('./assets/gifs.js')

//import New Modules
const GamePlay = require('./modules/game_play.js')
const {Database} = require('./modules/database.js')

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

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console



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
  .then(function(results){
    
    GamePlay.joinGame(results, name)
    
    console.log(results)
    
    Database.update(results)
    
    response.json(results)
  })
});


app.get('/game/:gameid/:name', function(request, response){
  var gameId = request.params.gameid
  var name = request.params.name
  
  Database.get(gameId)
  .then(function(results){
    
    var gameObject = GamePlay.joinGame(results, name)
    
    if(gameObject){
      Database.update(gameObject)
      response.json(gameObject)
    }else{
      response.send("Game is full and couldn't Find Player in Game")
    }
  });
});


//== Playing Choices ==//

app.get('/game/:gameid/:name/playcard', function(request, response){
var name = request.params.name
var cardIndex = request.query.cardIndex
var gameId = request.params.gameid

 Database.get(gameId).then(function(game){
    console.log(game)    
    
   var game = GamePlay.playCard(game, cardIndex, name)
    
   if(game){
      Database.update(game)
      response.send(game)
   }else{
     GamePlay.discard(game)
     Database.update(game)
     response.json(game)
   }
  })
});


//=============================================
// Discard Card
//============================================

app.get('/game/:gameid/:name/discard', function(request, response){
var name = request.params.name
var cardIndex = request.query.cardIndex
var gameId = request.params.gameid

  database.getCurrentGame(gameId).then(function(results){
    console.log(JSON.stringify(results))
    

//==== Replace the First Card undefined Card in the Discarded Cards Array========//  
  var playerIndex = results.players.findIndex(i => i.name === name);
     if(playerIndex == -1){ response.send("Couldn't Find Player!"); return; } // Returns if name isn't Found
     if(!results.players[playerIndex].active){ response.send("Sorry, it's not your Turn!"); return;} //Returns if name isn't active

    var card = results.players[playerIndex].hand[cardIndex]
    console.log('=====Discarded Card===========', card) 
    
  var discardedCardIndex = results.discardedCards.indexOf(undefined)
  results.discardedCards.splice(discardedCardIndex, 1, card)


//==== Replace the Hand Card with the Next Card from the Deck ===//
  var nextCard = results.playingDeck.shift()
  
  
    results.players[playerIndex].hand.splice(cardIndex, 1, nextCard)    
  
  

//===== Switch the Active Player ====//
    results.players[playerIndex].active = 0
    
var nextPlayersIndex = (playerIndex+1) % results.players.length
    
    results.players[nextPlayersIndex].active = 1
  
//=== Add a Hint After Discarding ==//
    results.hintsLeft++
   
// === Sends Message to What Card was Discarded ===//
   results.messages.push(name+" discarded a "+card.color+" "+card.number)
    
  database.updateGame(results)
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
 database.getCurrentGame(gameId).then(function(results){
    console.log(JSON.stringify(results))
   
  var nameIndex = results.players.findIndex(i => i.name === name)
    if(nameIndex == -1){ response.send("Couldn't Find You!");  return; } // Returns if name isn't found
    if(!results.players[nameIndex].active){ response.send("Sorry, it's not your Turn!"); return;} //Returns if name isn't active
   
  var playerIndex = results.players.findIndex(i => i.name === player);
    if(playerIndex == -1){    response.send("Couldn't Find Player!");  return; } // Returns if player isn't found
   
   var hand = results.players[playerIndex].hand
   console.log('hand', hand)
 
//==== Parsing the hint ====//
var hintType = determineHintType(hint)
 
function determineHintType(string){
  var type = ''
  for(var i = 0; i < colors.length; i++){
     if(string.includes(colors[i]) || string === colors[i]){
      type = 'color'
     break;
      }else{ type = 'number'}
   }
  return type
}
   
console.log('hintType', hintType) 
 
for(var i =0; i < hand.length; i++){
     var card = hand[i]
  appendHints(hintType, card)
     }
       
  
function appendHints(hintType, card){  
     console.log("card:", card)
      console.log("hint:", hint)

  if(card){ //makes sure the card is not null

    if(card[hintType] == hint){ //The Card.color or card.number is a match with the hint 
       
    for(var index = 0; index < card.hints.length;){  //Removes all Other Hints of the hintType before adding the new hint
        for(var j = 0; j < hintOptions[hintType].length; j++){
            console.log('index', index)
              if(card.hints[index].includes(hintOptions[hintType][j])){ //Does this hint include the newhint Type?
                  card.hints.splice(index, 1)
                index--
                break;
              }
            console.log(card.hints)
          }
      index++
    }
      
      card.hints.push(hint) //After all the hints with the same type are removed the new hint is added. 
      
      
      }else{ //if the hint matches the card value push the hint
       var addHint = true;  
        
        card.hints.forEach(function(cardhint){
           var type = determineHintType(cardhint)
          if(cardhint === 'not '+hint){ addHint = false}
          
          if(!cardhint.includes('not') && type === hintType){ //if the hint doesn't contain not and the 
            addHint = false
          }
        }) //Sets addHint to false if any of the old hints meet the criteria
        
        if(addHint){
        card.hints.push('not '+hint)
        }
      }
    
  }
  console.log("new card:", card)
}

  
   
//===== Switch the Active Player ====//
    results.players[nameIndex].active = 0
var newIndex = (nameIndex+1) % results.players.length
    results.players[newIndex].active = 1
   
//==== Adds to Messages ====//
   results.messages.push(`${name} gave ${player} a hint about their ${hint}'s`) 
    console.log("Messages", results.messages)
results.hintsLeft -= 1;  
database.updateGame(results)
response.send(results)
 
 });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
