/*
/test/api_test.js

This document test the API Call from: 

https://puddle-catcher.glitch.me/

*/
const rp = require('request-promise');

const Defaults = require('./defaults');

describe("NEW GAME: /newgame/:numberOfPlayers?name=NAME", function(){
  it("should add a new game to the database", function(done){
    var game = Defaults.gameSettings2Player();
    var url = 'https://puddle-catcher.glitch.me/newgame/2?name=Frodo"
    
    rp()
    

    
    })
});
