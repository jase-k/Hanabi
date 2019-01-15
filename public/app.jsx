const React = require('react');
//const ReactDOM = require('react-dom');
//const API = require('../client/apicalls.js');
//Retrieves the Select Button From index.html
const selectedPlayers = document.getElementById('select');
const optionalCard = document.getElementById('optional-card');
const select = document.getElementById('game-init');
const allCards = document.getElementById('cardHolder');
const pdrag = document.getElementById('drag');
const teamContainer = document.getElementById('teamateContainer')
const startGameButton = document.getElementById('startGame')
const newGameButton = document.getElementById('newGame');
const joinGameButton = document.getElementById('joinGame');
const howManyPlayers = document.getElementById('howManyPlayers')
const nameInput = document.getElementById('nameInput')
const teamates = [];
for(var i =0; i<4; i++){
 teamates[i] = document.getElementById('player'+(i+1))
}

function hideClass(element){
  console.log(element);
  element.classList.add("hide")
};

function toggleClass(element){
  console.log('toggling Class')
  element.classList.toggle("hide")
}
newGameButton.onclick = () => {
  toggleClass(howManyPlayers)
  toggleClass(document.getElementById('firstStep'))
}

startGameButton.onclick = () =>{
  console.log('This should be 1-5:', selectedPlayers.value)
  if(!nameInput.value){
    alert('Need to Put a Name to start the Game')
      return
    }
  if(!selectedPlayers.value){
    alert('Select the Number of Players to start the Game')
      return;
    };
  
 // ReactDOM.render(API.createNewGame(selectedPlayers.value, nameInput.value), document.getElementById('teamateContainer') )
      
  /*if(selectedPlayers.value == 4 || selectedPlayers.value == 5){
        console.log('Adding Hide Class to Card5');
        optionalCard.style.display = "none";
        toggleClass(select);
        toggleClass(allCards);
        toggleClass(teamContainer);
     if(selectedPlayers.value == 4){
         console.log("Toggling this Playe:r",teamates[3])
        teamates[3].style.display = "none";
        }
      } else{
          toggleClass(select);
          toggleClass(allCards);
          toggleClass(teamContainer);
          teamates[3].style.display = "none";
          teamates[2].style.display = "none";
        if(selectedPlayers.value == 2){
          teamates[1].style.display = "none";
      } 
    }*/
  }


document.ondragstart = (event) =>{
 // handleDragStart(event)
  console.log(event)
   console.log("dragStart");
  
  //Get Element's ID: and whole Element
  var id = event.srcElement.id
  var element = document.getElementById(id)
  
  // Change the source element's background color to signify drag has started
 element.style.border = "blue";
 
  // Set the drag's format and data. Use the event target's id for the data 
 event.dataTransfer.setData("text/plain", id);
  console.log(id, element)
  
};

document.ondragover = (event) => {
 event.preventDefault();
  console.log("Something is being Drug") }


