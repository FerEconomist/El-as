// =========================
// BOTONES PRINCIPALES
// =========================
const btnClientes     = document.getElementById("btnClientes");
const btnPresupuestos = document.getElementById("btnPresupuestos");
const btnNotas        = document.getElementById("btnNotas");

// =========================
// MENÚS
// =========================
const navClientes     = document.getElementById("nav-clientes");
const navPresupuestos = document.getElementById("nav-presupuestos");
const navNotas        = document.getElementById("nav-notas");

// =========================
// CONTENEDOR LATERAL
// =========================
const contSliderLateral = document.querySelector(".right-main");

// =========================
// ARRAYS
// =========================
const botonesPrincipales = [btnClientes, btnPresupuestos, btnNotas];
const menusLaterales     = [navClientes, navPresupuestos, navNotas];

// =========================
// FUNCIONES DE MENÚ
// =========================
function ocultarTodosLosMenus() {
  menusLaterales.forEach(menu => menu.style.display = "none");
}

function activarBoton(boton) {
  botonesPrincipales.forEach(b => b.classList.remove("boton-activo"));
  boton.classList.add("boton-activo");
}

function mostrarMenu(menuElegido, botonPresionado) {
  ocultarTodosLosMenus();
  activarBoton(botonPresionado);

  contSliderLateral.classList.remove("right-main");
  contSliderLateral.classList.add("right-main-card");

  menuElegido.style.display = "flex";
}

// =========================
// EVENTOS BOTONES PRINCIPALES
// =========================
btnClientes.addEventListener("click", () =>
  mostrarMenu(navClientes, btnClientes)
);

btnPresupuestos.addEventListener("click", () =>
  mostrarMenu(navPresupuestos, btnPresupuestos)
);

btnNotas.addEventListener("click", () =>
  mostrarMenu(navNotas, btnNotas)
);

// =========================
// BOTONES SECUNDARIOS – CLIENTES
// =========================
const btnRegistrarCliente    = document.getElementById("btnRegistrarDatos");
const btnActualizarCliente   = document.getElementById("btnActualizarDatos");
const btnPresupuestarCliente = document.getElementById("btnPresupuestarCliente");
const btnAnotarCliente       = document.getElementById("btnAnotarCliente");
const btnInfoCompletaCliente = document.getElementById("btnInfoCompletaCliente");

// =========================
// BOTONES SECUNDARIOS – PRESUPUESTOS
// =========================
const btnNuevoPresupuesto    = document.getElementById("btnNuevoPresupuesto");
const btnClonarPresupuesto   = document.getElementById("btnClonarPresupuesto");
const btnAnotarPresupuesto   = document.getElementById("btnAnotarPresupuesto");
const btnDetallesPresupuesto = document.getElementById("btnDetallesPresupuesto");

// =========================
// BOTONES SECUNDARIOS – NOTAS
// =========================
const btnNotaGeneral  = document.getElementById("btnNotaGeneral");
const btnEditarNota   = document.getElementById("btnEditarNota");
const btnVincularNota = document.getElementById("btnVincularNota");
const btnNotaCompleta = document.getElementById("btnNotaCompleta");


// =========================
// CONFIG MENU (mínimo)
// =========================

const btnConfig   = document.querySelector(".config");
const configMenu  = document.querySelector(".config-menu");

// abrir / cerrar con el botón
btnConfig.addEventListener("click", (e) => {
  e.stopPropagation(); // evita que se cierre inmediatamente
  configMenu.hidden = !configMenu.hidden;
});

// cerrar al hacer click afuera
document.addEventListener("click", () => {
  configMenu.hidden = true;
});

// evitar que clicks dentro del menú lo cierren
configMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});














// EVENTO: ABRIR FORMULARIO
if (btnRegistrarCliente) {
  btnRegistrarCliente.addEventListener("click", () => {
    if (typeof abrirFormularioCliente === "function") abrirFormularioCliente();
    else console.warn("abrirFormularioCliente no está disponible. Revisá Scripts/formulario.js");
  });
}

document.querySelectorAll(".overlay").length
document.querySelectorAll(".form-cliente-ventana").length


