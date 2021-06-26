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

const arrayElements = ["🍎", "🍋", "🍇", "🍉", "🍌", "🍒"];
let element = []


const createElement = (column, row) => {
  const div = document.createElement("div");
  div.style.width = `${CELL_SIZE}px`;
  div.style.height = `${CELL_SIZE}px`;
  div.setAttribute("data-y", column);
  div.setAttribute("data-x", row);
  div.innerText = `${column}, ${row}`;
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
      element.push([selectedElement, selectedElement.getAttribute("data-x"),
      selectedElement.getAttribute("data-y")])
      console.log(element)
      if(element.length ===2){
        if(element[0][0]===element[1][0]){
            console.log("son iguales")
        }
        element=[]
      }
      
      
      
      // if(contador === 0){
      //     element1.push(selectedElement.getAttribute("data-x"),
      //     selectedElement.getAttribute("data-y"))
      //     contador++
      //   }
      //   else {
      //     element2.push(selectedElement.getAttribute("data-x"),
      //     selectedElement.getAttribute("data-y"))
      //   }
        
    
      
    

      console.log(
        selectedElement.getAttribute("data-x"),
        selectedElement.getAttribute("data-y")
      );
    });
  }
}

