/*
/test/api_test.js

This document test the API Call from: 

https://puddle-catcher.glitch.me/

*/
//Import dependencies
const rp = require('request-promise');
const assert = require('chai').assert;

//Import Local Modules
const Defaults = require('./defaults');

describe("NEW GAME: /newgame/:numberOfPlayers?name=NAME", function(){
  it("should add a new game to the database", function(done){
    var game = Defaults.gameSettings2Player();
    var url = 'https://puddle-catcher.glitch.me/newgame/2?name=Frodo'
    
    rp(url)
    .then(function(results){
      console.log(results)
      var object = JSON.parse(results)
      assert.equal(object.numberOfPlayers, 2)
      done();
      assert.ok(results)
      
    })
    

    
    })
});
