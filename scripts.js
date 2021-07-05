const container = document.getElementById("container");
const btnLevel = document.getElementsByClassName(".btn-level");

/**
 * ROWS - Horizontales
 * COLUMNS - Verticales
 * Facil 9x9 56px
 * Medio 8x8 63px
 * Dificil 7x7 72px
 */

const ROWS = 7;
const COLUMNS = 7;
const WIDTH_GRID = 500;
const CELL_SIZE = WIDTH_GRID / ROWS - 2;
container.style.width = `${WIDTH_GRID}px`;

const arrayElements = ["🍎", "🍋", "🍇", "🍉", "🍌", "🍒"];
let element = [];
let gridElements = [];

const createElement = (column, row) => {
  const div = document.createElement("div");
  div.style.width = `${CELL_SIZE}px`;
  div.style.height = `${CELL_SIZE}px`;
  div.setAttribute("data-y", column);
  div.setAttribute("data-x", row);
  let random = Math.floor(Math.random() * arrayElements.length);
  let span = document.createElement("span");
  const icon = arrayElements[random];
  let texto = document.createTextNode(icon);
  div.setAttribute("data-icon", icon);
  span.appendChild(texto);
  div.appendChild(span);
  return div;
};

const updateGrid = (firstSelected, secondSelected) => {
  gridElements[firstSelected.getAttribute("data-y")][
    firstSelected.getAttribute("data-x")
  ] = firstSelected.getAttribute("data-icon");
  gridElements[secondSelected.getAttribute("data-y")][
    secondSelected.getAttribute("data-x")
  ] = secondSelected.getAttribute("data-icon");

  matchElements(gridElements)

};

const switchElements = (e) => {
  const selectedElement = e.target;
  selectedElement.style.border = "1px solid #000";
  element.push([
    selectedElement,
    selectedElement.getAttribute("data-x"),
    selectedElement.getAttribute("data-y"),
  ]);

  if (element.length === 2) {
    if (!(element[0][1] === element[1][1] && element[0][2] === element[1][2])) {
      let differenceX = element[0][1] - element[1][1];
      let differenceY = element[0][2] - element[1][2];
      if (
        (-1 <= differenceX <= 1 && differenceY === 0) ||
        (differenceX === 0 && -1 <= differenceY <= 1)
      ) {
        let aux = element[0][0].innerHTML;
        let auxIcon = element[0][0].getAttribute("data-icon");
        element[0][0].setAttribute(
          "data-icon",
          element[1][0].getAttribute("data-icon")
        );
        element[1][0].setAttribute("data-icon", auxIcon);

        element[0][0].innerHTML = element[1][0].innerHTML;
        element[1][0].innerHTML = aux;

        updateGrid(element[0][0], element[1][0]);
        element = [];
      } else {
        element.shift();
      }
    } else {
      element = [];
    }
  }
};

for (let y = 0; y < COLUMNS; y++) {
  const aux = [];
  for (let x = 0; x < ROWS; x++) {
    const div = createElement(y, x);
    container.appendChild(div);
    div.addEventListener("click", switchElements);
    aux.push(div.getAttribute("data-icon"));
  }
  gridElements.push(aux);
}

//******MATCH ELEMENTS******/

const matchElements = (grid) => {

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      //ROWS
      if ((j < grid.length - 2) && grid[i][j] === grid[i][j + 1] && grid[i][j] === grid[i][j + 2]) {
        
        const dato = grid[i][j];
        
        for (let w = j; w < grid.length; w++) {
          if (grid[i][w] === dato) {
            grid[i][w] = 0;
          } else {
            break;
          }
        }
      }
      //COLUMNS
      if ((j < grid.length - 2) && grid[j][i] === grid[j + 1][i] && grid[j][i] === grid[j + 2][i]) {
        
        const dato = grid[j][i];
        
        for (let w = j; w < grid.length; w++) {
          if (grid[w][i] === dato) {
            grid[w][i] = 0;
          } else {
            break;
          }
        }
      }
    }
    
  }
  console.log(grid)
  
}
// console.log((j < grid.length -2) && grid[i][j]===(grid[i][j-1] && grid[i][j-2]) && grid[i][j]=== ((grid[i-1][j] && grid[i-2][j]) || (grid[i+1][j] && grid[i+2][j])));
// if(){
//   console.log("entre")

// }
// else if((grid[i][j+1] && grid[i][j+2]) && grid[i][j]=== ((grid[i-1][j] && grid[i-2][j]) || (grid[i+1][j] && grid[i+2][j]))){
//   console.log("entre2")

// }

// if ((j < grid.length - 2) && (grid[i][j] === grid[i - 1][j] && grid[i][j] === grid[i - 2][j])){
//   console.log("entre");
// }