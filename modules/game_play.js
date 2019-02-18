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
const hintOptions = {
      color: colors,
      number: ["1","2","3","4","5"]
}

//Import other Modules
const Simulate = require('./game_simulation.js')

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
  setHint(card, hint){
    if(card.hints.includes(hint)){ return }
    
    var hintType = this.getHintType(hint)
    
    if(card[hintType] == hint){ 
    
      for(i =0; i < card.hints.length; ){
        var remove = hintOptions[hintType].findIndex(hintOption => card.hints[i].includes(hintOption))  
        
        if(remove !== -1){
          card.hints.splice(i, 1)
        }else{
          i++
        }
      };
      
     card.hints.push(hint)
    }else{
      card.hints.push(`not ${hint}`)
    }
    return card
  },
  getHintType(hint){
    if(colors.includes(hint)){
      return "color"
       }else{
       return "number"
       }
    
  },
  switchActivePlayer(game, numberOfPlayers, playerIndex){
    game.players[playerIndex].active = 0 
    game.players[playerIndex+1].active = 1
  },
  
/*=========== Public ===================*/  
  newGame(numberOfPlayers, name){
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
     gameObject.players[0].name = name
     gameObject.players[0].active = 1
    
    return gameObject
  },
  joinGame(gameObject, name){
    var foundName = false
    
    for(var i = 0; i < gameObject.players.length; i++){
      if(!gameObject.players[i].name || gameObject.players[i].name === name){
        gameObject.players[i].name = name
        foundName = true
        break;
      } 
    }
    if(foundName){
      return gameObject
    }else{
      return false
    }
    
  },
  playCard(gameObject, cardIndex, playerOfCard){
    var playerIndex = gameObject.players.findIndex(player => player.name === playerOfCard),
        player = gameObject.players[playerIndex], 
        card =  player.hand[cardIndex],
        plays = Simulate.doesCardPlay(card, gameObject.playedCards) 

    this.switchActivePlayer(gameObject, gameObject.numberOfPlayers, playerIndex)
    
    if(plays){
        if(card.number == 5){ gameObject.hintsLeft++ }
    
        gameObject.playedCards.push(card) 
       
        gameObject.players[playerIndex].hand[cardIndex] = gameObject.playingDeck.shift();
      
        gameObject.messages.push(`Success! ${playerOfCard} played a ${card.color} ${card.number}`)
          
      return gameObject
      
    }else{
      gameObject.livesLeft--
      
      gameObject.messages.push(`Whoops! ${playerOfCard} tried playing a ${card.color} ${card.number} and it did not play`)
      
      return false 
    }
  },
  discard(gameObject, cardIndex, playerOfCard){
    var playerIndex = gameObject.players.findIndex(player => player.name == playerOfCard),
        card = gameObject.players[playerIndex].hand[cardIndex]
    
    gameObject.discardedCards.push(card)
    
    gameObject.players[playerIndex].hand[cardIndex] = gameObject.playingDeck.shift();

    gameObject.hintsLeft++
    
    gameObject.messages.push(`${playerOfCard} discarded a ${card.color} ${card.number}`)
    
    return gameObject
  },
  giveHint(gameObject, hint, hintReceiver, hintGiver){
    var receiverIndex = gameObject.players.findIndex(player => player.name == hintReceiver)
    
    gameObject.hintsLeft--

    gameObject.players[receiverIndex].hand.forEach(function(card){
        GamePlay.setHint(card, hint)
    })
    
    gameObject.messages.push(`${hintGiver} gave ${hintReceiver} a hint about his/her ${hint}'s`)
    
  },
}



module.exports = GamePlay


