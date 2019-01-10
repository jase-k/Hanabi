//Retrieves the Select Button From index.html
const selectedPlayers = document.getElementById('select');
const optionalCard = document.getElementById('optional-card');
const select = document.getElementById('game-init');
const allCards = document.getElementById('cardHolder');
const pdrag = document.getElementById('drag');
const hideDiv = document.getElementById('hold');

function hideClass(element){
  console.log(element);
  element.classList.add("hide")
};

function toggleClass(element){
  console.log('toggling Class')
  element.classList.toggle("hide")
}

selectedPlayers.onchange = (event) =>{
  console.log('This should be 1-5:', event.target.value)
  if(event.target.value == 4 || event.target.value == 5){
    console.log('Adding Hide Class to Card5');
    optionalCard.style.display = "none";
    toggleClass(select);
    toggleClass(allCards);  
    toggleClass(instDiv);
    toggleClass(hideDiv);
  } else{
      toggleClass(select);
      toggleClass(allCards);
      toggleClass(instDiv);
      toggleClass(hideDiv);
  }
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


///////////////////////////////
// Below Creates Drop Events in Each Card Space
////////////////////////////////
var cards = [];
cards.push(document.getElementById("card1"))
cards.push(document.getElementById("card2"))
cards.push(document.getElementById("card3"))
cards.push(document.getElementById("card4"))
cards.push(document.getElementById("card5"))

cards.forEach(card =>
  card.ondrop = (event) => {
   event.preventDefault();
 // handleDrop(event)
 console.log("Drop");
  
 event.preventDefault();
 // Get the data, which is the id of the drop target
  
 var data = event.dataTransfer.getData("text");
  if(event.target.nodeName == "DIV"){
     event.target.appendChild(document.getElementById(data));
    console.log(event)
  //Adding the Child back into the hold 'DIV'
    var newp = document.createElement("p")
    var hold = document.getElementById("hold");
      newp.innerHTML = event.toElement.lastChild.innerText
      newp.draggable = "true"
      newp.id = Math.floor(Math.random()*1000)
      console.log(newp)
      hold.appendChild(newp);
  }
  
// Clear the drag data cache (for all formats/types)
 event.dataTransfer.clearData();
}
              );

const buttons = document.getElementsByClassName('button')
const instructionButton = document.getElementById('instructions-button')
const instDiv =  document.getElementById('instructions')

console.log(buttons)

for(var i =0; i<buttons.length; i++){
buttons[i].onclick = (event) => {
    console.log("Button Was Clicked")
    console.log(event)
  var sibling = event.target.nextSibling.nextSibling
  console.log(sibling)  
  for(var i = 0; i < sibling.childNodes.length;){
  sibling.removeChild(sibling.childNodes[i]);
  }
  }
}

instructionButton.onclick = (event) =>{
  console.log("ButtonClicked", instDiv)
  toggleClass(instDiv);
}