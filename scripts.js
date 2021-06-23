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
const CELL_SIZE = WIDTH_GRID / ROWS;
container.style.width = `${WIDTH_GRID}px`;

const arrayElements = ["🍎", "🍋", "🍇", "🍉", "🍌", "🍒"]

const createElement = (column, row) => {
  const div = document.createElement("div");
  div.style.width = `${CELL_SIZE}px`;
  div.style.height = `${CELL_SIZE}px`;
  div.setAttribute("data-y", column);
  div.setAttribute("data-x", row);
  div.setAttribute ("draggable", true)
  div.innerText = `${column}, ${row}`
  let random = Math.floor(Math.random()*arrayElements.length);
  let span = document.createElement("span");
  let texto = document.createTextNode(arrayElements[random]); 
  span.appendChild(texto);
  div.appendChild(span);
  return div;
};

for (let y = 1; y <= COLUMNS; y++) {
  for (let x = 1; x <= ROWS; x++) {
    const div = createElement(y, x); 
    container.appendChild(div);
    // console.log(y, x);

    div.addEventListener("click", (e) => {
      const selectedElement = e.target;

      console.log(
        selectedElement.getAttribute("data-x"),
        selectedElement.getAttribute("data-y")
      );
    });
  }
}

