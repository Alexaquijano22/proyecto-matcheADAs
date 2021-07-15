//CONTROLS
info.addEventListener("click", (e) => {
    welcome();
});
const clickActions = () => {
    timer();
    arrayPoints = [];
    points.innerText = `Puntaje: 0`;
    arrayCombos = [];
    combo.innerText = `Combo x1`;
};

redo.addEventListener("click", (e) => {
    swal({
        title: "¿Reiniciar juego?",
        text: "¡Perderás todo tu puntaje acumulado!",
        buttons: {
            cancelar: {
                value: "cancelar",
            },
            confirm: {
                text: "Nuevo juego",
                value: "level",
            },
        },
    }).then((value) => {

        selectLevel(value);
    });
    stopTimer();
});

//PUNTAJES
const countScore = () => {
    if (elementsToDelete.length > 0) {
        for (let i = 0; i < elementsToDelete.length; i++) {
            arrayPoints.push(elementsToDelete[i]);
            points.innerText = `Puntos: ${arrayPoints.length * 200}`;
            combo.innerText = `Combo x${arrayCombos.length}`;
        }
        arrayCombos = [];
    }
};