const container = document.getElementById("container");
const btnLevel = document.getElementsByClassName("btn-level");

/**
 * ROWS - Horizontales
 * COLUMNS - Verticales
 * Facil 9x9 56px
 * Medio 8x8 63px
 * Dificil 7x7 72px
 */

let ROWS = 7;
let COLUMNS = 7;
const WIDTH_GRID = 500;
const arrayElements = ["🍎", "🍋", "🍇", "🍉", "🍌", "🍒"];
let element = [];
let gridElements = [];
let elementsToDelete = [];

const changeLevel = (e) => {
  const button = e.target;
  const option = button.getAttribute("data-lvl");

  switch (option) {
    case "easy":
      ROWS = 9;
      COLUMNS = 9;
      fillArray();
      break;
    case "normal":
      ROWS = 8;
      COLUMNS = 8;
      fillArray();
      break;
    case "hard":
      ROWS = 7;
      COLUMNS = 7;
      fillArray();
      break;
  }
};

for (let i = 0; i < btnLevel.length; i++) {
  btnLevel[i].addEventListener("click", changeLevel);
}
const updateColumns = () => {
  console.log(gridElements);
  for (let columna = gridElements.length - 1; columna >= 0; columna--) {
    for (let fila = gridElements.length - 1; fila >= 0; fila--) {
        if (gridElements[fila][columna] === "") {
          console.log(`fila: ${fila}, columna: ${columna}`);
          if((fila - 1) < 0 ){
            renderGrid();
          }else{
            for (let i = fila - 1; i >= 0; i--) {
              if (gridElements[i][columna] !== "") {
                switchElements(fila, columna, i, columna);
                matchElements();
                
                break;
              }
            }
          }
        }
      }
  }
};

const deleteElements = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    gridElements[elements[i][0]][elements[i][1]] = "";
  }
  // if(elementsToDelete.length === 0){
  //   if(element.length === 2){
  //     setTimeout(() => {
  //       switchElements(element[0][1], element[0][2], element[1][1], element[1][2]);
  //     })
  //   }
  // }
  elementsToDelete = [];
  updateColumns();
};

//******MATCH ELEMENTS******/
const matchElements = () => {
  for (let i = 0; i < gridElements.length; i++) {
    for (let j = 0; j < gridElements[0].length; j++) {
      //ROWS
      if (
        j < gridElements.length - 2 &&
        gridElements[i][j] !== '' &&
        gridElements[i][j] === gridElements[i][j + 1] &&
        gridElements[i][j] === gridElements[i][j + 2]
      ) {
        const dato = gridElements[i][j];

        for (let w = j; w < gridElements.length; w++) {
          if (gridElements[i][w] === dato) {
            elementsToDelete.push([i, w, gridElements[i][j]]);
          } else {
            break;
          }
        }
      }
      //COLUMNS
      if (
        j < gridElements.length - 2 &&
        gridElements[j][i] !== '' &&
        gridElements[j][i] === gridElements[j + 1][i] &&
        gridElements[j][i] === gridElements[j + 2][i]
      ) {
        const dato = gridElements[j][i];

        for (let w = j; w < gridElements.length; w++) {
          if (gridElements[w][i] === dato) {
            elementsToDelete.push([w, i, gridElements[j][i]]);
          } else {
            break;
          }
        }
      }
    }
  }
  deleteElements(elementsToDelete);
};

const switchElements = (column1, row1, column2, row2) => {
  let aux = gridElements[column1][row1];
  gridElements[column1][row1] = gridElements[column2][row2];
  gridElements[column2][row2] = aux;
  element = [];
};

const clickFruit = (column, row, fruit) => {
  element.push([fruit, column, row]);

  if (element.length === 2) {
    if (!(element[0][1] === element[1][1] && element[0][2] === element[1][2])) {
      let differenceX = element[0][1] - element[1][1];
      let differenceY = element[0][2] - element[1][2];
      if (
        (-1 <= differenceX && differenceX <= 1 && differenceY === 0) ||
        (differenceX === 0 && -1 <= differenceY && differenceY <= 1)
      ) {
        switchElements(element[0][1], element[0][2], element[1][1], element[1][2]);
        matchElements();
       } else {
        element.shift();
      }
    } else {
      element = [];
    }
  }
};

const createElement = (column, row, fruit, CELL_SIZE) => {
  const div = document.createElement("div");
  div.style.width = `${CELL_SIZE}px`;
  div.style.height = `${CELL_SIZE}px`;
  div.setAttribute("data-y", column);
  div.setAttribute("data-x", row);
  let span = document.createElement("span");
  let texto = document.createTextNode(fruit);
  div.setAttribute("data-icon", fruit);
  span.appendChild(texto);
  div.appendChild(span);
  return div;
};

const renderGrid = () => {
  container.innerHTML = "";
  const CELL_SIZE = WIDTH_GRID / ROWS - 2;
  container.style.width = `${WIDTH_GRID}px`;
  for (let y = 0; y < gridElements.length; y++) {
    for (let x = 0; x < gridElements.length; x++) {
      if(gridElements[y][x] === ''){
        let random = Math.floor(Math.random() * arrayElements.length);
        gridElements[y][x] = arrayElements[random];
      }
      const div = createElement(y, x, gridElements[y][x], CELL_SIZE);
      container.appendChild(div);
      div.addEventListener("click", () => {
        clickFruit(y, x, gridElements[y][x]);
      });
    }
  };
  matchElements();
};

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
