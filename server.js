// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

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
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE Dreams (dream TEXT)');
    console.log('New table Dreams created!');
    
    // insert default dreams
    db.serialize(function() {
      db.run('INSERT INTO Dreams (dream) VALUES ("Find and count some sheep"), ("Climb a really tall mountain"), ("Wash the dishes")');
    });
  }
  else {
    console.log('Database "Dreams" ready to go!');
    db.each('SELECT * from Dreams', function(err, row) {
      if ( row ) {
        console.log('record:', row);
      }
    });
  }
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

  var gameDeck = [];
  
function newDeck() {
  var cardColors = ['orange', 'blue', 'black', 'white', 'red']
  var cardNumbers = [1,1,1,2,2,3,3,4,4,5]
  var array = [];
 
  // loops through both arrays to build the deck
  for(var i = 0; i < cardColors.length; i++){
    for(var j =0; j < cardNumbers.length; j++){
      array.push(cardColors[i]+''+cardNumbers[j])
    }
  }
  return array
}

function shuffleDeck(array) {
  var shuffleArray = [];
  var number;  
    for(var i=0; i < array.length;){
    number = Math.floor(Math.random()*array.length)
      console.log(number)
      shuffleArray.push(array[number])
      array.splice(number, 1)
    }    
    
  return shuffleArray
    };

function checkIfWinIsPossible(array){
      

  };
  
  
  gameDeck = shuffleDeck(newDeck());
  
  console.log(gameDeck.length)

response.json(gameDeck)
})






// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
