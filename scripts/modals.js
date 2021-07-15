// MODALES 
//BUTTONS
const changeLevel = (option) => {
    switch (option) {
        case "easy":
            ROWS = 9;
            COLUMNS = 9;
            fillArray();
            stopTime = false;
            clearTimer();
            clickActions();
            break;
        case "normal":
            ROWS = 8;
            COLUMNS = 8;
            stopTime = false;
            fillArray();
            clearTimer();
            clickActions();
            break;
        case "hard":
            ROWS = 7;
            COLUMNS = 7;
            stopTime = false;
            fillArray();
            clearTimer();
            clickActions();
            break;
    }
};

const selectLevel = (value) => {
    switch (value) {
        case "level":
            swal({
                title: "Nuevo Juego",
                text: "Seleccioná una dificultad",
                buttons: {
                    fácil: {
                        value: "easy",
                    },
                    normal: {
                        value: "normal",
                    },
                    difícil: {
                        value: "hard",
                    },
                },
            }).then((value) => {
                changeLevel(value);
            });
            break;

        case "cancelar":
            stopTime = false;
            break
    }
};

const welcome = () => {
    swal({
        title: "¡Bienvenida!",
        text: `En MatcheADAs tu objetivo es juntar tres o más ítems del mismo tipo ya sea en fila o columna.
            Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar. Si se forma un grupo, esos ítems se eliminarán y ganarás puntos.
            ¡Seguí armando grupos de 3 o más antes de que se acabe el tiempo!`,
        buttons: {
            catch: {
                text: "¡A jugar!",
                value: "level",
            },
        },
    }).then((value) => {
        selectLevel(value);
    });
};