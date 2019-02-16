/*
/test/api_test.js

This document test the API Call from: 

https://puddle-catcher.glitch.me/

*/

describe("NEW GAME: /newgame/:numberOfPlayers?name=NAME", function(){
  it("should add a new game to the database", function(){
    const xhr = new XMLHttpRequest
    var url = 'https://puddle-catcher.glitch.me/newgame/2/Jase'
    
      xhr.responseType= "json";
      xhr.onreadystatechange = () => {
        if(xhr.readState === XMLHttpRequest.DONE){
          console.log(xhr.response)
        }
      }
    xhr.open('GET', url)
    xhr.send()
    
    })
});
