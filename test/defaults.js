/*
Defaults.js

Defaults contains methods that return specific parts
of the game object for testing purposes. 

This Document is only used for testing Purposes in *test.js
*/

const Defaults = {  
  gameSettings2Player(){ //Boiler Template for a New Game After Hand Dealt (2-players)
     return {
                dateCreated: new Date(), 
                discardedCards: [],
                hintsLeft: 8, 
                livesLeft: 3, 
                messages: [],
                numberOfPlayers: 3,
                originalDeck: this.shuffledDeckOfCards(),
                playedCards: [],
                players: [{
                    active: 1,
                    name: "John Doe", 
                    hand: [{
                        color: "blue", 
                        hints: [],
                        number: 1
                      },{
                        color: "black", 
                        hints: [],
                        number: 2
                      },{
                        color: "white", 
                        hints: [],
                        number: 3
                      },{
                        color: "orange", 
                        hints: [],
                        number: 4
                      },{
                        color: "red", 
                        hints: [],
                        number: 5
                      },
                          ]
                  },{
                    active: 0,
                    name: "Jane Doe", 
                    hand: [{
                        color: "blue", 
                        hints: [],
                        number: 1
                      },{
                        color: "black", 
                        hints: [],
                        number: 2
                      },{
                        color: "white", 
                        hints: [],
                        number: 3
                      },{
                        color: "orange", 
                        hints: [],
                        number: 4
                      },{
                        color: "red", 
                        hints: [],
                        number: 5
                      },
                          ]
                  }
                         ],
                playingDeck: this.shuffledDeckOfCards().slice(0,40),
                score: 0,
                tableIds: []
              }
   },
  gameSettings5Player(){ //Boiler Template for a New Game After Hand Dealt (5-players)
     return {
                dateCreated: new Date(), 
                discardedCards: [],
                hintsLeft: 8, 
                livesLeft: 3, 
                messages: [],
                numberOfPlayers: 3,
                originalDeck: this.shuffledDeckOfCards(),
                playedCards: [],
                players: [
                  {
                    active: 1,
                    name: "John Doe", 
                    hand: [{
                        color: "blue", 
                        hints: [],
                        number: 1
                      },{
                        color: "black", 
                        hints: [],
                        number: 2
                      },{
                        color: "white", 
                        hints: [],
                        number: 3
                      },{
                        color: "orange", 
                        hints: [],
                        number: 4
                      },{
                        color: "red", 
                        hints: [],
                        number: 5
                      },
                          ]
                  },{
                    active: 0,
                    name: "Jane Doe", 
                    hand: [{
                        color: "blue", 
                        hints: [],
                        number: 1
                      },{
                        color: "black", 
                        hints: [],
                        number: 2
                      },{
                        color: "white", 
                        hints: [],
                        number: 3
                      },{
                        color: "orange", 
                        hints: [],
                        number: 4
                      },{
                        color: "red", 
                        hints: [],
                        number: 5
                      },
                          ]
                  },{
                    active: 0,
                    name: "Marlin Doe", 
                    hand: [{
                        color: "blue", 
                        hints: [],
                        number: 1
                      },{
                        color: "black", 
                        hints: [],
                        number: 2
                      },{
                        color: "white", 
                        hints: [],
                        number: 3
                      },{
                        color: "orange", 
                        hints: [],
                        number: 4
                      },{
                        color: "red", 
                        hints: [],
                        number: 5
                      },
                          ]
                  },{
                    active: 0,
                    name: "Howard Duck", 
                    hand: [{
                        color: "blue", 
                        hints: [],
                        number: 1
                      },{
                        color: "black", 
                        hints: [],
                        number: 2
                      },{
                        color: "white", 
                        hints: [],
                        number: 3
                      },{
                        color: "orange", 
                        hints: [],
                        number: 4
                      },{
                        color: "red", 
                        hints: [],
                        number: 5
                      },
                          ]
                  },{
                    active: 0,
                    name: "Buck Doe", 
                    hand: [{
                        color: "blue", 
                        hints: [],
                        number: 1
                      },{
                        color: "black", 
                        hints: [],
                        number: 2
                      },{
                        color: "white", 
                        hints: [],
                        number: 3
                      },{
                        color: "orange", 
                        hints: [],
                        number: 4
                      },{
                        color: "red", 
                        hints: [],
                        number: 5
                      },
                          ]
                  }
                         ],
                playingDeck: this.shuffledDeckOfCards().slice(0,30),
                score: 0,
                tableIds: []
              }
   },
  deckOfCards(){
 return( [
  {
    color: 'black', 
    hints: [],
    number: 1
  },
  {
    color: 'black', 
    hints: [],
    number: 1
  },
  {
    color: 'black', 
    hints: [],
    number: 1
  },
  {
    color: 'black', 
    hints: [],
    number: 2
  },
  {
    color: 'black', 
    hints: [],
    number: 2
  },
  {
    color: 'black', 
    hints: [],
    number: 3
  },
  {
    color: 'black', 
    hints: [],
    number: 3
  },
  {
    color: 'black', 
    hints: [],
    number: 4
  },
  {
    color: 'black', 
    hints: [],
    number: 4
  },
  {
    color: 'black', 
    hints: [],
    number: 5
  },
  {
    color: 'blue', 
    hints: [],
    number: 1
  },
  {
    color: 'blue', 
    hints: [],
    number: 1
  },
  {
    color: 'blue', 
    hints: [],
    number: 1
  },
  {
    color: 'blue', 
    hints: [],
    number: 2
  },
  {
    color: 'blue', 
    hints: [],
    number: 2
  },
  {
    color: 'blue', 
    hints: [],
    number: 3
  },
  {
    color: 'blue', 
    hints: [],
    number: 3
  },
  {
    color: 'blue', 
    hints: [],
    number: 4
  },
  {
    color: 'blue', 
    hints: [],
    number: 4
  },
  {
    color: 'blue', 
    hints: [],
    number: 5
  },
   {
    color: 'orange', 
    hints: [],
    number: 1
  },
  {
    color: 'orange', 
    hints: [],
    number: 1
  },
  {
    color: 'orange', 
    hints: [],
    number: 1
  },
  {
    color: 'orange', 
    hints: [],
    number: 2
  },
  {
    color: 'orange', 
    hints: [],
    number: 2
  },
  {
    color: 'orange', 
    hints: [],
    number: 3
  },
  {
    color: 'orange', 
    hints: [],
    number: 3
  },
  {
    color: 'orange', 
    hints: [],
    number: 4
  },
  {
    color: 'orange', 
    hints: [],
    number: 4
  },
  {
    color: 'orange', 
    hints: [],
    number: 5
  },
   {
    color: 'red', 
    hints: [],
    number: 1
  },
  {
    color: 'red', 
    hints: [],
    number: 1
  },
  {
    color: 'red', 
    hints: [],
    number: 1
  },
  {
    color: 'red', 
    hints: [],
    number: 2
  },
  {
    color: 'red', 
    hints: [],
    number: 2
  },
  {
    color: 'red', 
    hints: [],
    number: 3
  },
  {
    color: 'red', 
    hints: [],
    number: 3
  },
  {
    color: 'red', 
    hints: [],
    number: 4
  },
  {
    color: 'red', 
    hints: [],
    number: 4
  },
  {
    color: 'red', 
    hints: [],
    number: 5
  },
   {
    color: 'white', 
    hints: [],
    number: 1
  },
  {
    color: 'white', 
    hints: [],
    number: 1
  },
  {
    color: 'white', 
    hints: [],
    number: 1
  },
  {
    color: 'white', 
    hints: [],
    number: 2
  },
  {
    color: 'white', 
    hints: [],
    number: 2
  },
  {
    color: 'white', 
    hints: [],
    number: 3
  },
  {
    color: 'white', 
    hints: [],
    number: 3
  },
  {
    color: 'white', 
    hints: [],
    number: 4
  },
  {
    color: 'white', 
    hints: [],
    number: 4
  },
  {
    color: 'white', 
    hints: [],
    number: 5
  }
   ] )
},
  shuffledDeckOfCards(){ // This Deck is Winnable for All Players
return ( 
  [ 
  { color: 'white', hints: [], number: 3 },
  { color: 'white', hints: [], number: 4 },
  { color: 'orange', hints: [], number: 3 },
  { color: 'blue', hints: [], number: 1 },
  { color: 'red', hints: [], number: 4 },
  { color: 'blue', hints: [], number: 1 },
  { color: 'red', hints: [], number: 5 },
  { color: 'orange', hints: [], number: 3 },
  { color: 'white', hints: [], number: 1 },
  { color: 'orange', hints: [], number: 2 },
  { color: 'red', hints: [], number: 3 },
  { color: 'red', hints: [], number: 1 },
  { color: 'white', hints: [], number: 2 },
  { color: 'red', hints: [], number: 1 },
  { color: 'red', hints: [], number: 4 },
  { color: 'black', hints: [], number: 1 },
  { color: 'black', hints: [], number: 3 },
  { color: 'orange', hints: [], number: 1 },
  { color: 'white', hints: [], number: 1 },
  { color: 'black', hints: [], number: 4 },
  { color: 'white', hints: [], number: 3 },
  { color: 'blue', hints: [], number: 3 },
  { color: 'blue', hints: [], number: 2 },
  { color: 'white', hints: [], number: 2 },
  { color: 'blue', hints: [], number: 4 },
  { color: 'black', hints: [], number: 2 },
  { color: 'white', hints: [], number: 4 },
  { color: 'red', hints: [], number: 3 },
  { color: 'orange', hints: [], number: 4 },
  { color: 'white', hints: [], number: 5 },
  { color: 'black', hints: [], number: 5 },
  { color: 'orange', hints: [], number: 1 },
  { color: 'red', hints: [], number: 2 },
  { color: 'blue', hints: [], number: 1 },
  { color: 'red', hints: [], number: 2 },
  { color: 'blue', hints: [], number: 5 },
  { color: 'orange', hints: [], number: 4 },
  { color: 'black', hints: [], number: 1 },
  { color: 'orange', hints: [], number: 2 },
  { color: 'red', hints: [], number: 1 },
  { color: 'black', hints: [], number: 3 },
  { color: 'black', hints: [], number: 4 },
  { color: 'blue', hints: [], number: 2 },
  { color: 'orange', hints: [], number: 1 },
  { color: 'orange', hints: [], number: 5 },
  { color: 'black', hints: [], number: 2 },
  { color: 'white', hints: [], number: 1 },
  { color: 'black', hints: [], number: 1 },
  { color: 'blue', hints: [], number: 3 },
  { color: 'blue', hints: [], number: 4 } ]
       )
},
  //First Instance of White 2's came too late
  lossDeck1(){ //First instance of a Card is too far into the deck
return( [
  {
    color: 'black', 
    hints: [],
    number: 1
  },
  {
    color: 'black', 
    hints: [],
    number: 1
  },
  {
    color: 'black', 
    hints: [],
    number: 1
  },
  {
    color: 'black', 
    hints: [],
    number: 2
  },
  {
    color: 'black', 
    hints: [],
    number: 2
  },
  {
    color: 'black', 
    hints: [],
    number: 3
  },
  {
    color: 'black', 
    hints: [],
    number: 3
  },
  {
    color: 'black', 
    hints: [],
    number: 4
  },
  {
    color: 'black', 
    hints: [],
    number: 4
  },
  {
    color: 'black', 
    hints: [],
    number: 5
  },
  {
    color: 'blue', 
    hints: [],
    number: 1
  },
  {
    color: 'blue', 
    hints: [],
    number: 1
  },
  {
    color: 'blue', 
    hints: [],
    number: 1
  },
  {
    color: 'blue', 
    hints: [],
    number: 2
  },
  {
    color: 'blue', 
    hints: [],
    number: 2
  },
  {
    color: 'blue', 
    hints: [],
    number: 3
  },
  {
    color: 'blue', 
    hints: [],
    number: 3
  },
  {
    color: 'blue', 
    hints: [],
    number: 4
  },
  {
    color: 'blue', 
    hints: [],
    number: 4
  },
  {
    color: 'blue', 
    hints: [],
    number: 5
  },
   {
    color: 'orange', 
    hints: [],
    number: 1
  },
  {
    color: 'orange', 
    hints: [],
    number: 1
  },
  {
    color: 'orange', 
    hints: [],
    number: 1
  },
  {
    color: 'orange', 
    hints: [],
    number: 2
  },
  {
    color: 'orange', 
    hints: [],
    number: 2
  },
  {
    color: 'orange', 
    hints: [],
    number: 3
  },
  {
    color: 'orange', 
    hints: [],
    number: 3
  },
  {
    color: 'orange', 
    hints: [],
    number: 4
  },
  {
    color: 'orange', 
    hints: [],
    number: 4
  },
  {
    color: 'orange', 
    hints: [],
    number: 5
  },
   {
    color: 'red', 
    hints: [],
    number: 1
  },
  {
    color: 'red', 
    hints: [],
    number: 1
  },
  {
    color: 'red', 
    hints: [],
    number: 1
  },
  {
    color: 'red', 
    hints: [],
    number: 2
  },
  {
    color: 'red', 
    hints: [],
    number: 2
  },
  {
    color: 'red', 
    hints: [],
    number: 3
  },
  {
    color: 'red', 
    hints: [],
    number: 3
  },
  {
    color: 'red', 
    hints: [],
    number: 4
  },
  {
    color: 'red', 
    hints: [],
    number: 4
  },
  {
    color: 'red', 
    hints: [],
    number: 5
  },
  {
    color: 'white', 
    hints: [],
    number: 2
  },
  {
    color: 'white', 
    hints: [],
    number: 2
  },
  {
    color: 'white', 
    hints: [],
    number: 3
  },
  {
    color: 'white', 
    hints: [],
    number: 3
  },
  {
    color: 'white', 
    hints: [],
    number: 4
  },
  {
    color: 'white', 
    hints: [],
    number: 4
  },
   {
    color: 'white', 
    hints: [],
    number: 1
  },
  {
    color: 'white', 
    hints: [],
    number: 1
  },
  {
    color: 'white', 
    hints: [],
    number: 1
  },
  {
    color: 'white', 
    hints: [],
    number: 5
  }
   ])
  },
  //Too Many Cards needed to be held in hand before being able to be played
  lossDeck2(){ 
  return( [
  {
    color: 'white', 
    hints: [],
    number: 5
  },
  {
    color: 'white', 
    hints: [],
    number: 4
  },
  {
    color: 'white', 
    hints: [],
    number: 4
  },
  {
    color: 'black', 
    hints: [],
    number: 4
  },
  {
    color: 'black', 
    hints: [],
    number: 5
  },
  {
    color: 'blue', 
    hints: [],
    number: 4
  },
  {
    color: 'blue', 
    hints: [],
    number: 4
  },
    {
    color: 'orange', 
    hints: [],
    number: 4
  },
  {
    color: 'orange', 
    hints: [],
    number: 4
  },
  {
    color: 'orange', 
    hints: [],
    number: 5
  },
  {
    color: 'blue', 
    hints: [],
    number: 5
  },
  {
    color: 'black', 
    hints: [],
    number: 1
  },
  {
    color: 'black', 
    hints: [],
    number: 1
  },
  {
    color: 'black', 
    hints: [],
    number: 1
  },
  {
    color: 'black', 
    hints: [],
    number: 2
  },
  {
    color: 'black', 
    hints: [],
    number: 2
  },
  {
    color: 'black', 
    hints: [],
    number: 3
  },
  {
    color: 'black', 
    hints: [],
    number: 3
  },
  {
    color: 'black', 
    hints: [],
    number: 4
  },
  {
    color: 'red', 
    hints: [],
    number: 4
  },
  {
    color: 'red', 
    hints: [],
    number: 4
  },
  {
    color: 'red', 
    hints: [],
    number: 5
  },
  {
    color: 'blue', 
    hints: [],
    number: 1
  },
  {
    color: 'blue', 
    hints: [],
    number: 1
  },
  {
    color: 'blue', 
    hints: [],
    number: 1
  },
  {
    color: 'blue', 
    hints: [],
    number: 2
  },
  {
    color: 'blue', 
    hints: [],
    number: 2
  },
  {
    color: 'blue', 
    hints: [],
    number: 3
  },
  {
    color: 'blue', 
    hints: [],
    number: 3
  },
   {
    color: 'orange', 
    hints: [],
    number: 1
  },
  {
    color: 'orange', 
    hints: [],
    number: 1
  },
  {
    color: 'orange', 
    hints: [],
    number: 1
  },
  {
    color: 'orange', 
    hints: [],
    number: 2
  },
  {
    color: 'orange', 
    hints: [],
    number: 2
  },
  {
    color: 'orange', 
    hints: [],
    number: 3
  },
  {
    color: 'orange', 
    hints: [],
    number: 3
  },
   {
    color: 'red', 
    hints: [],
    number: 1
  },
  {
    color: 'red', 
    hints: [],
    number: 1
  },
  {
    color: 'red', 
    hints: [],
    number: 1
  },
  {
    color: 'red', 
    hints: [],
    number: 2
  },
  {
    color: 'red', 
    hints: [],
    number: 2
  },
  {
    color: 'red', 
    hints: [],
    number: 3
  },
  {
    color: 'red', 
    hints: [],
    number: 3
  },
  
   {
    color: 'white', 
    hints: [],
    number: 1
  },
  {
    color: 'white', 
    hints: [],
    number: 1
  },
  {
    color: 'white', 
    hints: [],
    number: 1
  },
  {
    color: 'white', 
    hints: [],
    number: 2
  },
  {
    color: 'white', 
    hints: [],
    number: 2
  },
  {
    color: 'white', 
    hints: [],
    number: 3
  },
  {
    color: 'white', 
    hints: [],
    number: 3
  }
   ]
  )

  }
}

module.exports = Defaults
