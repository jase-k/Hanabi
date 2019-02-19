/*
./modules/game_simulation.js

This modules contains game simulations for future updates Including: 
-Check if a Game is Winnable
-Check the probability of a Card that Plays
*/
var i;

const Simulate = {  
  checkWinnability(players, playingDeck){
    var playedCards = [];
    var discardedCards = [];
    var hintsLeft = 8;
    var p = 0 //p represents the PlayerIndex
    var c = 0 //c represents the cardIndex in the Players Hand
    var numberOfPlayers = players.length

PlayersTurn:     
    while(playedCards.length < 25 && playingDeck.length > 0){// Simulates A Players Turn
        
        if(this.doesAnyCardPlay(players[p % numberOfPlayers], playedCards, playingDeck)){
          continue PlayersTurn
        }
      
        if(hintsLeft){ //Gives Hints if hints are left 
           hintsLeft--
          continue PlayersTurn;
        }
      
      for(c = 0; c < players[p % numberOfPlayers].hand.length; c++){ //For Loop looks for a potential Discard
          var card = players[p % numberOfPlayers].hand[c]
          var filteredPlayedCardArray = playedCards.filter(cards => cards.color+""+cards.number == card.color+""+card.number)
          var filterdDiscardedCardArray = discardedCards.filter(cards => cards.color+""+cards.number == card.color+""+card.number)
          
        if(filteredPlayedCardArray !== []){ //if Card is in the Playing Deck Discard First
           discardedCards.push(card)
           players[p % numberOfPlayers].hand.splice(c, 1, playingDeck.shift())
          hintsLeft++ 
          continue PlayersTurn;
        };
        if(filterdDiscardedCardArray !== [] && card.number !== 5){ //if Card is not a 5 and notin the discardedCards Discard First
           discardedCards.push(card)
           players[p % numberOfPlayers].hand.splice(c, 1, playingDeck.shift())
          hintsLeft++ 
          continue PlayersTurn;
        };
    };
      p++
    }
      return playedCards
  },
  doesCardPlay(cardToCheck, playedCards){
    
    var playedCardColorPile = playedCards.filter(function(card){
      return card.color == cardToCheck.color
    })
    
    // (...) is needed below for Math.max to recognize the array as numbers instead of an object
    var highestCardInPile = Math.max(...playedCardColorPile.map(card => card.number)) 
    
    if(cardToCheck.number == highestCardInPile+1){ 
       return true
      }else if(highestCardInPile == -Infinity && cardToCheck.number == 1){
       return true 
      }else{
       return false
    }
  },
  doesAnyCardPlay(player, playedCards, playingDeck){
    for(i = 0; i < player.hand.length; i++){ //For Loop looks for a potential Card to Play 
       var card = player.hand[i]
          
       if(this.doesCardPlay(card, playedCards)){ //Plays Card and Replaces card if Possible
             playedCards.push(card)
             player.hand.splice(i, 1, playingDeck.shift())
              return true;   
        }
    }
    return false
  },
  isGameOver(gameObject){
    if(gameObject.playedCards.length === 25){
      return 'won'
    }
    else if(gameObject.livesLeft == 0){
      return 'lost'
    }
    else {
      return 'in progress'
    }
  }
}

module.exports = Simulate; 