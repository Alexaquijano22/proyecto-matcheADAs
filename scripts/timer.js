//TIMER
const sign = () => {
    const span = document.createElement("span");
    let texto = document.createTextNode("00:00");
    time.appendChild(span);
    span.appendChild(texto);
    swal({
        title: "Juego terminado",
        text: `Puntaje final: ${arrayPoints.length * 100}`,
        buttons: {
            confirm: {
                text: "Nuevo juego",
                value: "level",
            },
        },
    }).then((value) => {
        selectLevel(value);
    });
};
const showTime = () => {
    if (sec < 10) {
        time.innerHTML = `00:0${sec}`;
    } else {
        time.innerHTML = `00:${sec}`;
    }
};
const clearTimer = () => {
    clearInterval(interval);
}

const stopTimer = () => {
    stopTime = true
}

const counter = () => {
    showTime();
    if (sec <= -1) {
        clearTimer();
        time.innerHTML = "";
        sign();
    }
    if (!stopTime) {
        sec--;
    }

};
const timer = () => {
    sec = 30;
    interval = setInterval(counter, 1000);
};