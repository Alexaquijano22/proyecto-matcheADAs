//UPDATE COLUMNS
const updateColumns = () => {
    for (let columna = gridElements.length - 1; columna >= 0; columna--) {
        for (let fila = gridElements.length - 1; fila >= 0; fila--) {
            if (gridElements[fila][columna] === "") {
                if (fila - 1 < 0) {
                    renderGrid();
                } else {
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

//DELETE ELEMENTS
const deleteElements = (elements) => {
    for (let i = 0; i < elements.length; i++) {
        gridElements[elements[i][0]][elements[i][1]] = "";
    }
    countScore();
    elementsToDelete = [];
    updateColumns();
};

//MATCH ELEMENTS
const matchElements = () => {
    for (let i = 0; i < gridElements.length; i++) {
        for (let j = 0; j < gridElements[0].length; j++) {
            //ROWS
            if (
                j < gridElements.length - 2 &&
                gridElements[i][j] !== "" &&
                gridElements[i][j] === gridElements[i][j + 1] &&
                gridElements[i][j] === gridElements[i][j + 2]
            ) {
                const dato = gridElements[i][j];
                arrayCombos.push(dato);
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
                gridElements[j][i] !== "" &&
                gridElements[j][i] === gridElements[j + 1][i] &&
                gridElements[j][i] === gridElements[j + 2][i]
            ) {
                const dato = gridElements[j][i];
                arrayCombos.push(dato);
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
    setTimeout(() => {
        deleteElements(elementsToDelete);
    }, 500)
};

//SWITCH ELEMENTS
const switchElements = (column1, row1, column2, row2) => {
    let aux = gridElements[column1][row1];
    gridElements[column1][row1] = gridElements[column2][row2];
    gridElements[column2][row2] = aux;
    element = [];
};

//CLICK FRUIT
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
                switchElements(
                    element[0][1],
                    element[0][2],
                    element[1][1],
                    element[1][2]
                );
                matchElements();
            } else {
                element.shift();
            }
        } else {
            element = [];
        }
    }
};
//CREATE ELEMENT
const createElement = (column, row, fruit, CELL_SIZE) => {
    const div = document.createElement("div");
    div.style.width = `${CELL_SIZE}px`;
    div.style.height = `${CELL_SIZE}px`;
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.setAttribute("data-y", column);
    div.setAttribute("data-x", row);
    let span = document.createElement("span");
    span.style.fontSize = "22px";
    span.style.cursor = "pointer";
    let texto = document.createTextNode(fruit);
    div.setAttribute("data-icon", fruit);
    span.appendChild(texto);
    div.appendChild(span);
    return div;
};

//RENDER GRID
const renderGrid = () => {
    container.innerHTML = "";
    const CELL_SIZE = WIDTH_GRID / ROWS - 2;
    container.style.width = `${WIDTH_GRID}px`;
    for (let y = 0; y < gridElements.length; y++) {
        for (let x = 0; x < gridElements.length; x++) {
            if (gridElements[y][x] === "") {
                let random = Math.floor(Math.random() * arrayElements.length);
                gridElements[y][x] = arrayElements[random];
            }
            const div = createElement(y, x, gridElements[y][x], CELL_SIZE);
            container.appendChild(div);
            div.addEventListener("click", () => {
                clickFruit(y, x, gridElements[y][x]);
                div.style.border = "1px solid #ffffff50";
                div.style.borderRadius = "5px";
            });
            div.addEventListener("mouseover", () => {
                div.style.transition = "0.3s";
                div.style.backgroundColor = "#ffffff30";
            });
            div.addEventListener("mouseout", () => {
                div.style.transition = "0.3s";
                div.style.backgroundColor = "transparent";
            });
        }
    }
    matchElements();
    setTimeout(() => {
        combo.innerText = `Combo x1`;
    }, 2000);
};