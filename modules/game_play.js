/*
/test/modules/game_play.js

This Module is base around a Game Object

This game object is created in the .newGame() Function
After the initiation, the game object will alway be retrieved by

Database.getGame(GAMEID)

Sample GameObject: {
   dateCreated: STRING *new Date()*,  
   discardedCards: [/ARRAY *Max Length: 25* of CARD OBJECTS/],
   hintsLeft: INTEGER *Default Start: 8*, 
   livesLeft: INTEGER *Default Start: 3*, 
   messages: [ARRAY OF STRINGS], 
   numberOfPlayers: INTEGER (2-5),
   originalDeck: [/ARRAY *Max Length of 50* CARD OBJECTS/],
   playedCards: [/ARRAY *Max Length: 25* of CARD OBJECTS/],
   players: [/ARRAY *1 < Length < 6* of PLAYER OBJECTS/],
   playingDeck: [/ARRAY *Length of (50 - (players[*].hand + playedCards + discardedCards))* of CARD OBJECTS/],
   score: INTEGER *Length of playedCards Array*,
   tableIds: [INTEGERS *Primary Keys of All Database Tables for the Game*]
};
Sample CardObject:{
  color: STRING, 
  hints: [ARRAY of STRINGS],
  number: INTEGER
};

Sample PlayerObject: {
  active: BOOLEAN,
  name: STRING, 
  hand: [ARRAY *Length === 4 || 5* of CARD OBJECTS]
};
*/

var i;
const colors = ["black", "blue", "orange", "red", "white"]
const numbers = [1,1,1,2,2,3,3,4,4,5]

var GamePlay = {
/*=============== Private =============== */  
  createDeck(){
    var array = [];
    
    for(i = 0; i < colors.length; i++){
      for(var j = 0; j < numbers.length; j++){
       array.push({
         color: colors[i], 
         hints: [],
         number: numbers[j]
       }) 
      }
    }
    return array
  },
  shufflesDeck(deck){
    var shuffledArray = [];
    var index;  
      for(var i=0; i < deck.length;){
      index = Math.floor(Math.random()*deck.length)
        shuffledArray.push(deck[index])
        deck.splice(index, 1)
      }        
    return shuffledArray
  },
  dealsHands(numberOfPlayers, deck){
    var handSize;
    var cloneDeck = deck.slice() // Creates a clone of the deck so we don't affect Original Deck
    
    if(numberOfPlayers < 4){
      handSize = 5;
    }else{
      handSize = 4;
    };
    
    var object = {
      players: [],
      playingDeck: [],
    };
    
  for(i = 0; i < numberOfPlayers; i++){
    object.players.push({
      name: "", 
      hand: [],
      active: 0,
    });
    for(var j = 0; j < handSize; j++){
      object.players[i].hand.push(
        cloneDeck.shift()
      );
    };
  };
    
    object.playingDeck = cloneDeck //Sets the Playing Deck to the remaining cards
      
    return object
  },
  
/*=========== Public ===================*/  
  newGame(numberOfPlayers){
  var gameObject = {
      dateCreated: new Date(),
      discardedCards: [], 
      hintsLeft: 8, //Game Always Starts with 8 Hints 
      livesLeft: 3, //Game Always Begins with 3 lives
      messages: [],
      numberOfPlayers: numberOfPlayers, 
      // Creates and Shuffles Original Deck
      originalDeck: this.shufflesDeck(this.createDeck()),
      playedCards: [], //updated below
      players: [], //updated below
      playingDeck: [],
      score: 0,
      tableIds: [],
    }
  
  //dealtGame holds the PlayingDeck and Players Array
  //After the Original deck was shuffled
 var dealtGame = this.dealsHands(numberOfPlayers, gameObject.originalDeck)

     gameObject.playingDeck = dealtGame.playingDeck
     gameObject.players = dealtGame.players
    
    return gameObject
  },
  joinGame(gameObject, name){
    
    for(var i = 0; i < gameObject.players.length; i++){
      if(!gameObject.players[i].name || gameObject.players[i].name === name){
        gameObject.players[i].name = name
        break;
      } 
    }
    
    return gameObject
  },
  playCard(gameObject, cardIndex, playerOfCard){
    
    var playerIndex = gameObject.players.findIndex(player => player.name === playerOfCard),
        player = gameObject.players[playerIndex], 
        card =  player.hand[cardIndex]
    
        gameObject.playedCards.push(card) 
    
        card = gameObject.playingDeck.shift();
        
    return gameObject
  },
}



module.exports = {GamePlay}


