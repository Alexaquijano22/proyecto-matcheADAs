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
  const option = button.getAttribute('data-lvl');

  switch(option){
    case "easy":
      ROWS = 9;
      COLUMNS = 9;
      createGrid();
    break;
    case "normal":
      ROWS = 8;
      COLUMNS = 8;
      createGrid();
    break;
    case "hard":
      ROWS = 7;
      COLUMNS = 7;
      createGrid();
    break;
  }
}

for(let i =0; i< btnLevel.length; i++){
  btnLevel[i].addEventListener('click', changeLevel)
}

const createElement = (column, row, CELL_SIZE) => {
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
  elementsToDelete = [];
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

const createGrid = () => {
  const CELL_SIZE = WIDTH_GRID / ROWS -2;
  container.style.width = `${WIDTH_GRID}px`;
  for (let y = 0; y < COLUMNS; y++) {
    const aux = [];
    for (let x = 0; x < ROWS; x++) {
      const div = createElement(y, x, CELL_SIZE);
      container.appendChild(div);
      div.addEventListener("click", switchElements);
      aux.push(div.getAttribute("data-icon"));
    }
    gridElements.push(aux);
  }
  console.log(gridElements);
}

const renderGrid = (array) => {
  // aca tienen que recibir el array grdiElements siempre con la utlima actualizacion
  // crear el elemento del dom que va a contener el icono
  // Basicamente tienen que resolver todo lo de la funcion createGrid pero tomando los elementos
  // den array que recibio la funcion como parametro.

  container.innerHTML = '';
  const CELL_SIZE = WIDTH_GRID / ROWS -2;
  container.style.width = `${WIDTH_GRID}px`;
  for (let y = 0; y < COLUMNS; y++) {
    const aux = [];
    for (let x = 0; x < ROWS; x++) {
      const div = createElement(y, x, CELL_SIZE);
      container.appendChild(div);
      div.addEventListener("click", switchElements);
      aux.push(div.getAttribute("data-icon"));
    }
  }
  console.log(gridElements);
}

const llenarArray = () => {
  // aca tienen que llenar gridElements con frutas aleatorias
}


const deleteElements = (elementsToDelete) => {
  for(let i=0; i < elementsToDelete.length; i++){
    gridElements[elementsToDelete[i][0]][elementsToDelete[i][1]] = 0;
  }
  console.log(gridElements);
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
            elementsToDelete.push([i, w, grid[i][j]])
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
            elementsToDelete.push([w, i, grid[j][i]])
          } else {
            break;
          }
        }
      }
    }
    
  }
  deleteElements(elementsToDelete);
  
}