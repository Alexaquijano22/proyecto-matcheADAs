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
  for (let fila = gridElements.length - 1; fila >= 0; fila--) {
    for (let columna = gridElements.length - 1; columna >= 0; columna--) {
      if (gridElements[columna][fila] === "") {
        for (let i = columna; i > 0; i--) {
          console.log(i,fila);
          // console.log(columna,fila);
          if (gridElements[columna][i] !== "") {
            switchElements(gridElements[columna][i], gridElements[columna][fila], 'llenar')
          }
        }
      }
    }
  }
};

const deleteElements = (elementsToDelete) => {
  for (let i = 0; i < elementsToDelete.length; i++) {
    gridElements[elementsToDelete[i][0]][elementsToDelete[i][1]] = "";
  }
  renderGrid();
  updateColumns();
};

//******MATCH ELEMENTS******/
const matchElements = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      //ROWS
      if (
        j < grid.length - 2 &&
        grid[i][j] === grid[i][j + 1] &&
        grid[i][j] === grid[i][j + 2]
      ) {
        const dato = grid[i][j];

        for (let w = j; w < grid.length; w++) {
          if (grid[i][w] === dato) {
            elementsToDelete.push([i, w, grid[i][j]]);
          } else {
            break;
          }
        }
      }
      //COLUMNS
      if (
        j < grid.length - 2 &&
        grid[j][i] === grid[j + 1][i] &&
        grid[j][i] === grid[j + 2][i]
      ) {
        const dato = grid[j][i];

        for (let w = j; w < grid.length; w++) {
          if (grid[w][i] === dato) {
            elementsToDelete.push([w, i, grid[j][i]]);
          } else {
            break;
          }
        }
      }
    }
  }
  deleteElements(elementsToDelete);
};

const switchElements = (fruit1, fruit2, action) => {


  let aux = fruit1;
  gridElements[element[0][1]][element[0][2]] = fruit2;
  gridElements[element[1][1]][element[1][2]] = aux;

  renderGrid();
  matchElements(gridElements);
  
  element = [];
};

const clickFruit = (column, row, fruit) => {
  element.push([fruit, column, row]);

  if (element.length === 2) {
    if (!(element[0][1] === element[1][1] && element[0][2] === element[1][2])) {
      let differenceX = element[0][1] - element[1][1];
      let differenceY = element[0][2] - element[1][2];
      if (
        (-1 <= differenceX <= 1 && differenceY === 0) ||
        (differenceX === 0 && -1 <= differenceY <= 1)
      ) {
        switchElements(
          gridElements[element[0][1]][element[0][2]],
          gridElements[element[1][1]][element[1][2]]
        );
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
      const div = createElement(y, x, gridElements[y][x], CELL_SIZE);
      container.appendChild(div);
      div.addEventListener("click", () => {
        clickFruit(y, x, gridElements[y][x]);
      });
    }
  }
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
