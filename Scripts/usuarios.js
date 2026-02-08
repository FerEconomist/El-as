// =========================================================
// CONFIGURACIÓN
// =========================================================

const API_URL = "http://127.0.0.1:8000/usuarios";

// =========================================================
// SELECTORES DEL DOM
// =========================================================

const tablaBody = document.querySelector(".usuarios-table tbody");
const emptyMsg = document.querySelector(".usuarios-table__empty");

// Inputs
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const profesion_oficio = document.getElementById("profesion_oficio");
const empresa = document.getElementById("empresa");
const telefono = document.getElementById("telefono");
const telefono_alt = document.getElementById("telefono_alt");
const email = document.getElementById("email");
const cuil_cuit = document.getElementById("cuil_cuit");

// Botones
const btnGuardar = document.getElementById("btnGuardar");
const btnActualizar = document.getElementById("btnActualizar");
const btnEliminar = document.getElementById("btnEliminar");
const btnLimpiar = document.getElementById("btnLimpiar");

// =========================================================
// ESTADO GLOBAL
// =========================================================

let usuarioSeleccionadoId = null;

// =========================================================
// REGEX (VALIDACIONES BÁSICAS)
// =========================================================

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTelefono = /^[0-9]{6,15}$/;
const regexCuil = /^[0-9\-]{10,15}$/;

// =========================================================
// VALIDACIÓN DE FORMULARIO
// =========================================================

function validarFormulario() {
  if (!nombre.value.trim()) {
    alert("El nombre es obligatorio");
    nombre.focus();
    return false;
  }

  if (!apellido.value.trim()) {
    alert("El apellido es obligatorio");
    apellido.focus();
    return false;
  }

  if (email.value && !regexEmail.test(email.value)) {
    alert("Email inválido");
    email.focus();
    return false;
  }

  if (telefono.value && !regexTelefono.test(telefono.value)) {
    alert("Teléfono inválido (solo números)");
    telefono.focus();
    return false;
  }

  if (cuil_cuit.value && !regexCuil.test(cuil_cuit.value)) {
    alert("CUIL / CUIT inválido");
    cuil_cuit.focus();
    return false;
  }

  return true;
}

// =========================================================
// API — GET
// =========================================================

async function cargarUsuarios() {
  tablaBody.innerHTML = "";
  usuarioSeleccionadoId = null;
  actualizarEstadoBotones();

  const res = await fetch(API_URL);
  const usuarios = await res.json();

  if (usuarios.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  usuarios.forEach(u => {
    const tr = document.createElement("tr");
    tr.dataset.id = u.id_usuario;

    tr.innerHTML = `
      <td>${u.nombre}</td>
      <td>${u.apellido}</td>
      <td>${u.empresa ?? ""}</td>
      <td>${u.profesion_oficio ?? ""}</td>
      <td>${u.telefono ?? ""}</td>
      <td>${u.telefono_alt ?? ""}</td>
      <td>${u.email ?? ""}</td>
      <td>${u.cuil_cuit ?? ""}</td>
    `;

    tr.addEventListener("click", () => seleccionarFila(tr, u));
    tablaBody.appendChild(tr);
  });
}

// =========================================================
// SELECCIÓN DE FILA
// =========================================================

function seleccionarFila(tr, usuario) {
  document
    .querySelectorAll(".usuarios-table tbody tr")
    .forEach(f => f.classList.remove("selected"));

  tr.classList.add("selected");
  usuarioSeleccionadoId = usuario.id_usuario;

  nombre.value = usuario.nombre ?? "";
  apellido.value = usuario.apellido ?? "";
  profesion_oficio.value = usuario.profesion_oficio ?? "";
  empresa.value = usuario.empresa ?? "";
  telefono.value = usuario.telefono ?? "";
  telefono_alt.value = usuario.telefono_alt ?? "";
  email.value = usuario.email ?? "";
  cuil_cuit.value = usuario.cuil_cuit ?? "";

  actualizarEstadoBotones();
}

// =========================================================
// API — POST
// =========================================================

async function guardarUsuario() {
  if (!validarFormulario()) return;

  const data = {
    nombre: nombre.value.trim(),
    apellido: apellido.value.trim(),
    profesion_oficio: profesion_oficio.value || null,
    empresa: empresa.value || null,
    telefono: telefono.value || null,
    telefono_alt: telefono_alt.value || null,
    email: email.value || null,
    cuil_cuit: cuil_cuit.value || null
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    alert("Error al guardar usuario");
    return;
  }

  limpiarFormulario();
  cargarUsuarios();
}

// =========================================================
// API — PUT
// =========================================================

async function actualizarUsuario() {
  if (!usuarioSeleccionadoId) {
    alert("Seleccioná un usuario para actualizar");
    return;
  }

  if (!validarFormulario()) return;

  const data = {
    nombre: nombre.value.trim(),
    apellido: apellido.value.trim(),
    profesion_oficio: profesion_oficio.value || null,
    empresa: empresa.value || null,
    telefono: telefono.value || null,
    telefono_alt: telefono_alt.value || null,
    email: email.value || null,
    cuil_cuit: cuil_cuit.value || null
  };

  const res = await fetch(`${API_URL}/${usuarioSeleccionadoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    alert("Error al actualizar usuario");
    return;
  }

  limpiarFormulario();
  cargarUsuarios();
}

// =========================================================
// API — DELETE
// =========================================================

async function eliminarUsuario() {
  if (!usuarioSeleccionadoId) {
    alert("Seleccioná un usuario para eliminar");
    return;
  }

  if (!confirm("¿Eliminar usuario seleccionado?")) return;

  const res = await fetch(`${API_URL}/${usuarioSeleccionadoId}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    alert("Error al eliminar usuario");
    return;
  }

  limpiarFormulario();
  cargarUsuarios();
}

// =========================================================
// UTILIDADES
// =========================================================

function limpiarFormulario() {
  document
    .querySelectorAll(".usuarios-form input")
    .forEach(i => (i.value = ""));

  usuarioSeleccionadoId = null;
  actualizarEstadoBotones();

  document
    .querySelectorAll(".usuarios-table tbody tr")
    .forEach(tr => tr.classList.remove("selected"));
}


// =========================================================
// Actualización de estado de botones (habilitar/deshabilitar según selección)
// =========================================================

function actualizarEstadoBotones() {
  const haySeleccion = usuarioSeleccionadoId !== null;

  btnGuardar.disabled = haySeleccion;
  btnActualizar.disabled = !haySeleccion;
  btnEliminar.disabled = !haySeleccion;
}





// =========================================================
// EVENTOS
// =========================================================

btnGuardar.addEventListener("click", guardarUsuario);
btnActualizar.addEventListener("click", actualizarUsuario);
btnEliminar.addEventListener("click", eliminarUsuario);
btnLimpiar.addEventListener("click", limpiarFormulario);

// =========================================================
// INIT
// =========================================================

cargarUsuarios();
