
//Declaring----------------------------------------------------------------------

var letters = []
var matchCount = 0;
var liveCount = 5;
var winCount = 0;
var mistakes = 0;
//Fetching----------------------------------------------------------------------
function randomWord() {
  return fetch('https://random-word-api.herokuapp.com/word?number=1')
  .then((response) => response.json())
  .then((data) => blanks(data));
}

//CreatingBlanks----------------------------------------------------------------------
function blanks(data){
  const [word] = data
  //console.log(word)
 letters = word.split('')
  console.log(letters)

    letters.map((letter,index) => {       
    let blank = document.createElement('div') 
    blank.classList.add('input') 
    blank.id=`letter-${letter}`    
    blank.innerHTML = `<span id =${index}>_</span>`      
    let blankDiv = document.getElementById('blanks')
    blankDiv.appendChild(blank); 
  })

}


//ConditionsForCounter----------------------------------------------------------------------
let counterP = document.createElement('p')
document.querySelector('#counter').appendChild(counterP)
const buttons = document.querySelectorAll(".letters-button")

buttons.forEach(button => {
  button.addEventListener("click", (e) =>{
    function updateHangmanPicture() {
      document.getElementById('hangmanPic').src = './images/hangman/' + mistakes + '.jpg';
    }
  
     button.setAttribute("disabled", "")
    searchLetterFromWord(button.innerText)
    
    if(matchCount === 0){
      //liveCount--
      console.log(mistakes);
      mistakes++
      counterP.innerText = `You have ${liveCount} lives!`;
      updateHangmanPicture()

       if(liveCount  === 0){
        counterP.innerText = 'Game Over!';
        counterP.style.color = "red";
      }

      else if(liveCount  < 0){
        return ;
      }
      console.log(matchCount)
      //console.log(liveCount)
      liveCount--
    }

    for (let i = 0; i < letters.length; i++) {

      if (winCount === letters.length) {

      counterP.innerHTML = "You Win!";
      counterP.style.color = "green";
      }
    }
    clearMatches()
  })
  
});

//PlayAgainButton----------------------------------------------------------------------
  let resetB = document.getElementById('reset')   
   resetB.addEventListener('click',(e) => {        
   window.location.reload();             
  });

//If we have match!----------------------------------------------------------------------
function searchLetterFromWord(inputLetter){
  console.log(inputLetter)
  for (let i=0; i<letters.length; i++){
      const letter = letters[i]
      if(letter === inputLetter)
    {
      let elements = document.querySelectorAll(`#letter-${letter}`);
      
      elements.forEach((letterElement)=>{ 
        letterElement.innerHTML = letter
      })
     winCount++
      matchCount++
    }  
  }
}
function clearMatches(){
  matchCount = 0;
}

randomWord();
