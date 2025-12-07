// BOTONES
const btnClientes = document.getElementById("btnClientes");
const btnPresupuestos = document.getElementById("btnPresupuestos");
const btnNotas = document.getElementById("btnNotas");


// MENÚS
const navClientes = document.getElementById("nav-clientes");
const navPresupuestos = document.getElementById("nav-presupuestos");
const navNotas = document.getElementById("nav-notas");

// Contenedores: 
const contSliderLateral = document.querySelector(".right-main");

// ARRAY de botones
const botonesPrincipales = [
  btnClientes,
  btnPresupuestos,
  btnNotas
];


// ARRAY de menús laterales
const menusLaterales = [
  navClientes,
  navPresupuestos,
  navNotas
];

// OCULTAR TODOS
function ocultarTodosLosMenus() {
  for (const menu of menusLaterales) {
    menu.style.display = "none";
  }
}

// CAMBIAR COLOR BOTON
function activarBoton (boton) {
  // 1. Quitar color a todos
  for (const b of botonesPrincipales) {
    b.classList.remove("boton-activo");
  }
  // 2. Activar solo el que corresponde
  boton.classList.add("boton-activo");
}

// MOSTRAR EL ELEGIDO
function mostrarMenu(menuElegido, botonPresionado) {
  ocultarTodosLosMenus();
  activarBoton(botonPresionado);
  contSliderLateral.classList.remove("right-main");
  contSliderLateral.classList.add("right-main-card");

  menuElegido.style.display = "flex";
}

// EVENTOS
btnClientes.addEventListener("click", () => mostrarMenu(navClientes, btnClientes));
btnPresupuestos.addEventListener("click", () => mostrarMenu(navPresupuestos, btnPresupuestos));
btnNotas.addEventListener("click", () => mostrarMenu(navNotas, btnNotas));

let miTemporizador = setTimeout(() => {
  console.log("¡Nunca me verás!");
}, 5000); // Planificado para 5 segundos





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