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

const createElement = (column, row) => {
  const div = document.createElement("div");
  div.style.width = `${CELL_SIZE}px`;
  div.style.height = `${CELL_SIZE}px`;
  div.setAttribute("data-y", column);
  div.setAttribute("data-x", row);
  let random = Math.floor(Math.random() * arrayElements.length);
  let span = document.createElement("span");
  const icon = arrayElements[random]
  let texto = document.createTextNode(icon);
  div.setAttribute('data-icon', icon);
  span.appendChild(texto);
  div.appendChild(span);
  return div;
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
        element[0][0].innerHTML = element[1][0].innerHTML;
        element[1][0].innerHTML = aux;
        element = [];
      } else {
        element.shift();
      }
    } else {
      element = [];
    }
  }
};

for (let y = 1; y <= COLUMNS; y++) {
  for (let x = 1; x <= ROWS; x++) {
    const div = createElement(y, x);
    container.appendChild(div);
    div.addEventListener("click", switchElements);
  }
}
