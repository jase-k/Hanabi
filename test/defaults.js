/*
Defaults.js

Defaults contains methods that return specific parts
of the game object for testing purposes. 

This Document is only used for testing Purposes in *test.js
*/

const Defaults = {  
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
   ]
  )
},
  shuffledDeckOfCards(){
return (
  [ { color: 'white', hints: [], number: 3 },
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
  lossExample1(){ //First instance of a Card is too far into the deck
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
  lossExample2(){ 
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