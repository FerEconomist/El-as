const filas = document.querySelectorAll(".usuarios-table tbody tr");

filas.forEach(fila => {
  fila.addEventListener("click", () => {

    // quitar selección previa
    filas.forEach(f => f.classList.remove("selected"));

    // seleccionar la fila clickeada
    fila.classList.add("selected");
  });
});