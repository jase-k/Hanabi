/*
'/test/database_test.js'
This Tests the Module Database from '/modules/database.js

database.js's purpose is to insert, update, and get data from 
the sqlite Database

*/

const assert = require('chai').assert

//Import Module:
const Database = require('../modules/database.js')
const Defaults = require('./defaults.js')

describe("Database", function(){
  describe(".insert", function(){
    it("Should insert a new row in Hanabi_Games", function(){   
      const gameObject = Defaults.gameSettings2Player 
      
      Database.insert(gameObject)
      .then(function(results){
        assert.ok(results.id) //results id is the row ID of the new Table
        assert.equal(results.hintsLeft, gameObject.hintsLeft)
      });
      
    });  
  });
  describe(".updateGame", function(){});
  describe(".getGame", function(){});
});
