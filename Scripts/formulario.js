(() => {
  let cargado = false;
  let cargandoPromise = null;

  // =========================
  // UTILIDADES
  // =========================
  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  // =========================
  // CARGA DEL HTML (UNA SOLA VEZ)
  // =========================
  async function cargarFormularioCliente() {
    if (cargado) return;
    if (cargandoPromise) return cargandoPromise;

    cargandoPromise = fetch("../formulario_cliente.html")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status} al cargar formulario_cliente.html`);
        return r.text();
      })
      .then((html) => {
        document.body.insertAdjacentHTML("beforeend", html);
        inicializarEventosFormularioCliente();
        cargado = true;
      })
      .catch((err) => {
        console.error("No se pudo cargar formulario_cliente.html:", err);
        throw err;
      });

    return cargandoPromise;
  }

  // =========================
  // MOSTRAR / OCULTAR
  // =========================
  function mostrarOverlayYFormulario() {
    const overlay = document.querySelector(".overlay");
    const formVentana = document.querySelector(".form-cliente-ventana");

    overlay.hidden = false;
    formVentana.hidden = false;

    document.body.classList.add("modal-abierto");
  }

  function ocultarOverlayYFormulario() {
    const overlay = document.querySelector(".overlay");
    const formVentana = document.querySelector(".form-cliente-ventana");

    overlay.hidden = true;
    formVentana.hidden = true;

    document.body.classList.remove("modal-abierto");
  }

  // =========================
  // RESET SIMPLE (sin reconstruir todo)
  // =========================
  function limpiarFormularioCliente() {
    const formVentana = qs(".form-cliente-ventana");
    if (!formVentana) return;

    const form = qs("form.form-cliente", formVentana);
    if (!form) return;

    // 1) Limpia inputs normales
    form.reset();

    // 2) Limpia mensajes de validez custom
    qsa("input", form).forEach((inp) => inp.setCustomValidity(""));

    // 3) Dejar 1 sola fila en campos personalizados (y vacía)
    const listaCampos = qs("#listaCampos", formVentana);
    if (listaCampos) {
      const items = qsa(".campo-item", listaCampos);
      items.forEach((item, idx) => {
        if (idx === 0) {
          const n = qs('input[name="campo_nombre[]"]', item);
          const v = qs('input[name="campo_valor[]"]', item);
          if (n) n.value = "";
          if (v) v.value = "";
        } else {
          item.remove();
        }
      });
    }
  }

  // =========================
  // REGEX SIMPLE OBLIGATORIOS
  // =========================
  function aplicarRegexObligatorios(formVentana) {
    // Nombre y Apellido son required en tu HTML :contentReference[oaicite:4]{index=4}
    const nombre = qs('input[name="nombre"]', formVentana);
    const apellido = qs('input[name="apellido"]', formVentana);

    // Letras (incluye acentos/ñ) + espacios, 2 a 40 chars
    const patronNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{2,40}$/;

    const wire = (input, label) => {
      if (!input) return;

      // Si preferís también podés setear pattern/title:
      // input.setAttribute("pattern", "^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{2,40}$");
      // input.setAttribute("title", `${label}: solo letras y espacios (2 a 40).`);

      input.addEventListener("input", () => {
        const v = input.value.trim();
        // required + regex
        if (v.length === 0) {
          input.setCustomValidity(`${label} es obligatorio.`);
        } else if (!patronNombre.test(v)) {
          input.setCustomValidity(`${label}: solo letras y espacios (2 a 40).`);
        } else {
          input.setCustomValidity("");
        }
      });

      // Para que al intentar guardar muestre el mensaje
      input.addEventListener("invalid", () => {
        const v = input.value.trim();
        if (v.length === 0) input.setCustomValidity(`${label} es obligatorio.`);
        else if (!patronNombre.test(v)) input.setCustomValidity(`${label}: solo letras y espacios (2 a 40).`);
      });
    };

    wire(nombre, "Nombre");
    wire(apellido, "Apellido");
  }

  // =========================
  // INICIALIZACIÓN DE EVENTOS
  // =========================
  function inicializarEventosFormularioCliente() {
    const overlay = qs(".overlay");
    const formVentana = qs(".form-cliente-ventana");

    if (!overlay || !formVentana) {
      console.warn("Formulario cliente: overlay o ventana no encontrados");
      return;
    }

    // IMPORTANTE:
    // stopPropagation va ACÁ: al click dentro del modal, para que no dispare cierres externos
    formVentana.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Cierres
    overlay.addEventListener("click", cerrarFormularioCliente);

    const btnCerrar = qs(".btn-cerrar-form", formVentana);
    if (btnCerrar) btnCerrar.addEventListener("click", cerrarFormularioCliente);

    // Cancelar: NO usar ".btn-secundario" a secas,
    // porque "Limpiar" también es btn-secundario :contentReference[oaicite:5]{index=5}
    const btnCancelar =
      qs(".btn-cancelar", formVentana) || qs(".btn-secundario:not(.btn-limpiar)", formVentana);

    if (btnCancelar) {
      btnCancelar.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        cerrarFormularioCliente();
      });
    }

    // Limpiar (no debe cerrar)
    const btnLimpiar = qs(".btn-limpiar", formVentana);
    if (btnLimpiar) {
      btnLimpiar.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        limpiarFormularioCliente();
      });
    }

    // ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !formVentana.hidden) {
        cerrarFormularioCliente();
      }
    });

    // Campos personalizados
    const btnAgregarCampo = qs(".btn-agregar-campo", formVentana);
    const listaCampos = qs("#listaCampos", formVentana);

    if (btnAgregarCampo && listaCampos) {
      btnAgregarCampo.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const div = document.createElement("div");
        div.className = "campo-item";
        div.innerHTML = `
          <input type="text" name="campo_nombre[]" placeholder="Nombre del campo">
          <input type="text" name="campo_valor[]" placeholder="Valor">
          <button type="button" class="btn-quitar-campo">Quitar</button>
        `;
        listaCampos.appendChild(div);
      });

      // Delegación para quitar
      listaCampos.addEventListener("click", (e) => {
        const btnQuitar = e.target.closest(".btn-quitar-campo");
        if (!btnQuitar) return;
        e.preventDefault();
        e.stopPropagation();

        const campoItem = btnQuitar.closest(".campo-item");
        if (campoItem) campoItem.remove();
      });
    }

    // Regex obligatorios
    aplicarRegexObligatorios(formVentana);

    // Submit (mock por ahora)
    const form = qs("form.form-cliente", formVentana);
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        // dispara validación HTML5 + customValidity
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        console.log("Formulario cliente enviado (mock)");
        cerrarFormularioCliente();
      });
    }
  }

  // =========================
  // API PÚBLICA
  // =========================
  window.abrirFormularioCliente = async function () {
    await cargarFormularioCliente();
    mostrarOverlayYFormulario();
  };

  window.cerrarFormularioCliente = function () {
    ocultarOverlayYFormulario();
  };
})();
