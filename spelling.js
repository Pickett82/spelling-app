var synth = window.speechSynthesis;
const msg = new SpeechSynthesisUtterance();
var voices;
var f;
var errors=0;
var score=0;
const correctSound = document.getElementById("correctSound"); 
const wrongSound = document.getElementById("wrongSound"); 
const scoreCounter = document.getElementById("score");


    voices = synth.getVoices();


 function checkSpelling() {
    var currentText = textInput.value;
    if(currentText.toLowerCase() == currentword.toLowerCase().substring(0,currentText.length))
    {
        textInput.className = "correct";
        //console.log('yes');
    } else {
        textInput.className = "wrong";
        wrongSound.play();
        errors++;
            if(errors>=3)
            {
                errors=0;
                nextWord();
            }
        //error sound
        //console.log('no');
        //console.log(currentText.toLowerCase())
        //console.log(currentword.toLowerCase().substring(0,currentText.length-1))
    }
}

function checkSpellingComplete(event) {
    if(event.key=="Enter"){
        if(textInput.value.toLowerCase()==currentword.toLowerCase())
        {
            //ding sound
            correctSound.currentTime=0
            correctSound.play();
            score++;
            scoreCounter.innerText=score;
            nextWord();
        }
        else
        {
            textInput.className = "wrong";
            //error sound
            wrongsound.currentTime=0
            wrongSound.play();
            errors++;
            if(errors>=3)
            {
                errors=0;
                nextWord();
            }
        }
    }
    
}

function nextWord() {
    currentWordIndex = Math.floor(Math.random() * words.length);
    currentword=words[currentWordIndex];
    setTimeout(() => {speakWord()}, 500);
    
    textInput.value="";
}

function speakWord() {
    synth.cancel();
    msg.text = currentword;
    synth.speak(msg);
}

function startGame() {
    f = voices.find(v => v.name == "Google UK English Female");
    if(f===undefined){
        f = voices.find(v => v.default);
    }
    msg.voice = f;
    body.className = 'test';
    setupDiv.className = 'hidden';
    testDiv.className = '';
    words = ['January','February','March','April','May','June','July','August','September','October','November','December']
    nextWord();
}

function endGame()
{
    synth.cancel();
    body.className = '';
    setupDiv.className = '';
    testDiv.className = 'hidden';
}


const textInput = document.querySelector('#typingarea');
const speakButton = document.querySelector('#sayWord');
textInput.addEventListener('input', checkSpelling);
textInput.addEventListener('keydown', checkSpellingComplete);
speakButton.addEventListener('click', speakWord)
const startButton = document.querySelector('#start');
startButton.addEventListener('click',startGame);
const endButton = document.querySelector('#endgame');
endButton.addEventListener('click',endGame);
const body = document.querySelector('body');
const setupDiv = document.querySelector('#setup');
const testDiv = document.querySelector('#test');




