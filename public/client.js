//Retrieves the Select Button From index.html
const selectedPlayers = document.getElementById('select');
const optionalCard = document.getElementById('optional-card');
const select = document.getElementById('game-init');
const allCards = document.getElementById('cardHolder');
const pdrag = document.getElementById('drag');

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
  if(event.target.value == 4){
    toggleClass(
    }else{
      }
  } else{
      toggleClass(select);
      toggleClass(allCards);
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


