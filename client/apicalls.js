function helperFunction(object){

  return(
  <>
  )
}

fetch('https://puddle-catcher.glitch.me/newgame?players=3').then(response => {
  if(response.ok){
    return response.json();
  }
  throw new Error('Request failed');
}, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
  helperFunction(jsonResponse)
});
                                                   