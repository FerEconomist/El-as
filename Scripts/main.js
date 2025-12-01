
const btnClientes = document.getElementById("btnClientes");
const btnPresupuestos = document.getElementById("btnPresupuestos");
const btnNotas = document.getElementById("btnNotas");

const navClientes = document.getElementById("nav-clientes");
const navPresupuestos = document.getElementById("nav-presupuestos");
const navNotas = document.getElementById("nav-notas");

btnClientes.addEventListener("click", () => {
  navClientes.style.display = "flex";
  navPresupuestos.style.display = "none";
  navNotas.style.display = "none";
});


btnPresupuestos.addEventListener("click", () => {
  navClientes.style.display = "none";
  navPresupuestos.style.display = "flex";
  navNotas.style.display = "none";
});

btnNotas.addEventListener("click", () => {
  navClientes.style.display = "none";
  navPresupuestos.style.display = "none";
  navNotas.style.display = "flex";
});



/*
const btnClientes = document.getElementById("btnClientes");
const overlay = document.getElementById("overlay");
const cerrarModal = document.getElementById("cerrarModal");

// Abrir el modal al hacer clic en "Clientes"
btnClientes.addEventListener("click", () => {
  overlay.style.display = "flex";
});

// Cerrar el modal al hacer clic en "Cerrar"
cerrarModal.addEventListener("click", () => {
  overlay.style.display = "none";
});

// Opcional: cerrar si hago clic fuera del cuadro blanco
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});

*/