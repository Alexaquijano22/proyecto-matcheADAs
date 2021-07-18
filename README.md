# 🍒proyecto-matcheADAs🍒

## Este proyecto fue realizado por:
- [Juliana Baez](https://github.com/julianabaezz)
- [Alexandra Quijano](https://github.com/Alexaquijano22)

### En este proyecto realizamos un juego de navegador conocido como match-3. Creamos una aplicación interactiva, en la que el usuario debe mover elementos dentro de una grilla para hacerlos coincidir, eliminarlos y sumar puntaje. También puede elegir el nivel de dificultad y hacer combinaciones que le permitan sumar más puntos.

### Tecnologías utilizadas:
- HTML5
- CSS3
- JavaScript
- Librería de modales SweetAlert

### Funcionalidades:
- Creación de grilla con ítems aleatorios, sin formar grupos de coincidencias al comenzar una nueva partida.
- Selección de ítem al hacer click. Al clickear un nuevo ítem, si se encuentra adyacente al anterior y se dan las condiciones para el "match", se intercambia el lugar. Caso contrario, se selecciona el segundo ítem como ítem nuevo.
- Verificación de grupos horizontales (fila) o verticales (columna) de 3 o más ítems iguales. En caso de encontrar esa coincidencia, se eliminan los ítems, se vacían esos lugares de la grilla y se ocupan con nuevos elementos de manera aleatoria.
- Recuento de puntaje al eliminar ítems, que se reinicia al comenzar una nueva partida. 
- Duración de partida de 30 segundos. Al finalizar se pregunta al usuario si quiere iniciar una nueva partida.
- Selección de dificultad: Fácil (grilla de 9x9), Normal (grilla de 8x8), Difícil (grilla de 7x7).
- Modificación de puntaje en base a un modificador de combos (combinación de grupos de ítems).

## 🕹️ Hace click [aquí](https://alexaquijano22.github.io/proyecto-matcheADAs/) para ver nuestro proyecto deployado.
