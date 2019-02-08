/*
'/test/database_test.js'
This Tests the Module Database from '/modules/database.js

database.js's purpose is to insert, update, and get data from 
the sqlite Database

*/

const assert = require('chai').assert

//Import Database
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);


//Import Module:
const Database = require('../modules/database.js')
const Defaults = require('./defaults.js')

describe("Database", function(){
  describe(".insert", function(){
    it("Should insert a new row in Hanabi_Games", async function(done){   
      const gameObject = Defaults.gameSettings2Player 
      
      var results = await Database.insert(gameObject)
      
      done();
      db.get("SELECT * Hanabi_Games WHERE id = $id", {$id:results.id}, function(err){
        if(err){
          console.log(err)
        }
          assert.notOk(err)
          assert.ok(results.id)
      });
      
    });  
  });
  describe(".updateGame", function(){});
  describe(".getGame", function(){});
});
