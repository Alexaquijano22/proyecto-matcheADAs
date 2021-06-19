const container = document.getElementById("container");
const btnLevel = document.getElementsByClassName(".btn-level");

/**
 * Filas - Horizontales
 * Columnas - Verticales
 * Facil 9x9 56px
 * Medio 8x8 63px
 * Dificil 7x7 72px
 */

const FILAS = 7;
const COLUMNAS = 7;
const ANCHO_MATRIZ = 500;
const TAMANIO_CELDA = ANCHO_MATRIZ / FILAS;
container.style.width = `${ANCHO_MATRIZ}px`;

const createElement = (columna, fila) => {
  const div = document.createElement("div");
  div.style.width = `${TAMANIO_CELDA}px`;
  div.style.height = `${TAMANIO_CELDA}px`;
  div.setAttribute("data-y", columna);
  div.setAttribute("data-x", fila);
  div.innerText = `${columna}, ${fila}`
  return div;
};

for (let y = 1; y <= COLUMNAS; y++) {
  for (let x = 1; x <= FILAS; x++) {
    const div = createElement(y, x);
    container.appendChild(div);
    console.log(y, x);

    div.addEventListener("click", (e) => {
      const selectedElement = e.target;

      console.log(
        selectedElement.getAttribute("data-x"),
        selectedElement.getAttribute("data-y")
      );
    });
  }
}
