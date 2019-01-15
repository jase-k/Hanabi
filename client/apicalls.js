import React from 'react';
import ReactDOM from 'react-dom';
const API = {}

API.renderTeamatesHands = function(object){
  return(
  <div class="container">
      <div id="player1" class="teamatesHand">
        <div>
          Player 1
        </div>
        <div class="teamatesCard">
          <h3>
            {object.players[0].hand[0].color}
          </h3>
          <h4>
            {object.players[0].hand[0].number}
          </h4>
        </div>
        <div class="teamatesCard">
          <h3>
            Color
          </h3>
          <h4>
          {object.players[0].hand[0].number}
          </h4>
        </div>
        <div class="teamatesCard">
          <h3>
            Color
          </h3>
          <h4>
            {object.players[0].hand[0].number}            
          </h4>
        </div>
        <div class="teamatesCard">
          <h3>
            Color
          </h3>
          <h4>
            {object.players[0].hand[0].number}            
          </h4>
        </div>
      </div>
      {object.numberOfPlayers > 2 &&<div id="player2" class="teamatesHand">
        <div>
          Player 2
        </div>
        <div class="teamatesCard">
          <h3>
            Color
          </h3>
          <h4>
            Number
          </h4>
        </div>
        <div class="teamatesCard">
          <h3>
            Color
          </h3>
          <h4>
            Number
          </h4>
        </div>
        <div class="teamatesCard">
          <h3>
            Color
          </h3>
          <h4>
            Number
          </h4>
        </div>
        <div class="teamatesCard">
          <h3>
            Color
          </h3>
          <h4>
            Number
          </h4>
        </div>
      </div>}
      {object.numberOfPlayers > 3 && <div id="player3" class="teamatesHand">
        <div>
          Player 3
        </div>
        <div class="teamatesCard">
          <h3>
            Color
          </h3>
          <h4>
            Number
          </h4>
        </div>
        <div class="teamatesCard">
          <h3>
            Color
          </h3>
          <h4>
            Number
          </h4>
        </div>
        <div class="teamatesCard">
          <h3>
            Color
          </h3>
          <h4>
            Number
          </h4>
        </div>
        <div class="teamatesCard">
          <h3>
            Color
          </h3>
          <h4>
            Number
          </h4>
        </div>
      </div>}
      {object.numberOfPlayers == 5 && <div id="player4" class="teamatesHand">
        <div>
          Player 4
        </div>
        <div class="teamatesCard">
          <h3>
            Color
          </h3>
          <h4>
            Number
          </h4>
        </div>
        <div class="teamatesCard">
          <h3>
            Color
          </h3>
          <h4>
            Number
          </h4>
        </div>
        <div class="teamatesCard">
          <h3>
            Color
          </h3>
          <h4>
            Number
          </h4>
        </div>
        <div class="teamatesCard">
          <h3>
            Color
          </h3>
          <h4>
            Number
          </h4>
        </div>
      </div>}
      </div>
  )
}
API.createNewGame = function(numberOfPlayers, name){
fetch('https://puddle-catcher.glitch.me/newgame?players='+numberOfPlayers).then(response => {
  if(response.ok){
    return response.json();
  }
  throw new Error('Request failed');
}, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
  API.renderTeamatesHand(jsonResponse)
});
}

module.exports = API
