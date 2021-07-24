const container = document.getElementById("container");
const time = document.getElementById("time");
const info = document.getElementById("infoIcon");
const redo = document.getElementById("reDoIcon");
const points = document.getElementById("points");
const combo = document.getElementById("combo");


let ROWS = 7;
let COLUMNS = 7;
let WIDTH_GRID = 400;
const arrayElements = ["☀️", "☁️", "🌵", "❄️", "🌈", "🌸"];
let element = [];
let gridElements = [];
let elementsToDelete = [];
let interval;
let arrayPoints = [];
let arrayCombos = [];
let stopTime;
let sec;

//FILL ARRAY
const fillArray = () => {
  gridElements = [];
  for (let y = 0; y < COLUMNS; y++) {
    const aux = [];
    for (let x = 0; x < ROWS; x++) {
      let random = Math.floor(Math.random() * arrayElements.length);
      let fruit = arrayElements[random];
      aux.push(fruit);
    }
    gridElements.push(aux);
  }
  renderGrid();
};

welcome();

//MEDIA QUERY
const mediaQuery = window.matchMedia('(max-width: 500px)');
if (mediaQuery.matches){
  WIDTH_GRID = 320
}
else{
  WIDTH_GRID = 400
}