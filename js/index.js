
const startButton = document.querySelector('#startButton');
const score = document.querySelector('#score');
const lightHost = document.querySelector('#lightHost');
const gameHost = document.querySelector('#gameHost');
const lastColor = document.querySelector('#lastColor');

// parameters
let interval = null;
const colorsArray= [
    "pink",
    "red",
    "blue",
    "green",
    "yellow"
];
const lightsArray= [];
const pointsArray=[];
let scoreCalculate= 0;
let pressed = false;


// changes elements innerHTML to string
const changeText= (element, string)=>{
  element.innerHTML = string;
};

// score changing functions
const printScore = () => {
  score.innerHTML = scoreCalculate;
};

//resets the points and screen for next game
const resetScore = () =>{
  scoreCalculate=0;
  for(let i= 0; i < pointsArray.length; i++){
    pointsArray[i]=0;
    changeText(lightsArray[i].firstChild, pointsArray[i]);
  }
  changeText(lastColor,"Press button to score!");
  printScore();
};

//changes the score depending of the boolean. adds bonuspoints depending on the elements bgcolor
const changeScore = (boolean, element) => {
  if(boolean){
    scoreCalculate += (10 * colorsArray.indexOf(element.style.backgroundColor)) + 10;
  }else{
    scoreCalculate -=10;
  }
  printScore();
};

// generating x number of lights, giving each click function and pushing them to appropriate arrays
const generateLights= (number) =>{

  for(let i=0; i<number; i++) {
    const light = document.createElement('div');
    const points = document.createElement('p');
    light.className += 'gameButton';
    points.className += 'buttonText';

    let pointScore= 0;

    points.innerHTML= pointScore;
    pointsArray.push(pointScore);
    light.appendChild(points);
    lightHost.appendChild(light);
    lightsArray.push(light);


    light.addEventListener('click',()=>{
      if(interval) {
        if (lightsArray[i].style.backgroundColor !== 'black') {
          pressed= true;
          changeScore(true, lightsArray[i]);
          pointsArray[i]++;
          changeText(lightsArray[i].firstChild, pointsArray[i]);
          lastPressedColor(lightsArray[i]);
          setColor(lightsArray[i], 'black');
        } else {
          changeScore(false);
          changeText(lastColor, "Ouch! -10 points!!");
        }
      }});
  }
};

// changes the id= lastColor to colour of element
const lastPressedColor=(element)=>{
  changeText(lastColor,`${element.style.backgroundColor.charAt(0).toUpperCase()}${element.style.backgroundColor.slice(1)}
  ${(10 * colorsArray.indexOf(element.style.backgroundColor)) +10} points!!`);
};
const allToBlack = (lightsArray) => {
  for(light of lightsArray){
    setColor(light,'black');
  }
};
// First changes everything to black, then to one random color
const changeColor=(lightsArray, colorsArray)=>{
    allToBlack(lightsArray);
    setColor(randNumFromArray(lightsArray),randNumFromArray(colorsArray));
};

// random number between 0 and max
const getRandomInt = (max) => {
  return Math.floor(Math.random()* Math.floor(max));
};

// gives random parameter from given array
const randNumFromArray= (array) =>{
  return array[getRandomInt(array.length)];
};

// sets the background color of the element
const setColor = (element, color) => {
  element.style.backgroundColor = color;
  element.style.borderColor = color;
};

// gets the stuff started
generateLights(5);
changeText(lastColor,"Press button to score!");

const stopGame=()=>{
  allToBlack(lightsArray);
  clearInterval(interval);
  interval=null;
  startButton.innerHTML = 'START';
};
// gives button a function that starts the game
startButton.addEventListener('click',()=>{
    pressed= true;
    if(!interval) {
      resetScore();
      interval= setInterval(()=>{
        if(pressed){
          pressed = false;
          changeColor(lightsArray,colorsArray);
          console.log(pointsArray);
        }else{
          stopGame();
          changeText(lastColor,"Not fast enough!");

        }

      },1000);
      startButton.innerHTML = 'STOP';
    } else {
      stopGame();

    }

});