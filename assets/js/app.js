const pdfList = [
// Añadir aquí todos los pdf que quiero en el desplegable
  { label: "Puntos por crítico", file: "Puntos por critico.pdf" },
  { label: "Movimiento y maniobra", file: "Movimiento y maniobra.pdf" },
];

// Estado de los visores abiertos (array de objetos { label, file })
let openDocs = [];

const selectEl = document.getElementById("pdfSelect");
const openBtn  = document.getElementById("openBtn");
const gridEl   = document.getElementById("pdfGrid");
const limitMsg = document.getElementById("limitMsg");

// Poblar el <select> con la lista de PDFs
function populateSelect() {
  selectEl.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "— Elige un PDF —";
  placeholder.disabled = true;
  placeholder.selected = true;
  selectEl.appendChild(placeholder);

  pdfList.forEach(({ label, file }) => {
    const opt = document.createElement("option");
    opt.value = file;
    opt.textContent = label;
    selectEl.appendChild(opt);
  });
}

// Renderizar el grid 2x2 según openDocs, con botón Cerrar
function renderGrid() {
  // Gestión de clases para centrar 1 visor o grid 2x2 para 2-4
  gridEl.classList.toggle("one", openDocs.length === 1);
  gridEl.classList.toggle("multi", openDocs.length >= 2);

  // Limitar mensaje
  limitMsg.hidden = openDocs.length < 4;

  // Vaciar grid
  gridEl.innerHTML = "";

  // Insertar tarjetas en orden (llenado: 1 izq-arriba, 2 dcha-arriba, 3 izq-abajo, 4 dcha-abajo)
  openDocs.slice(0, 4).forEach((doc, idx) => {
    const card = document.createElement("article");
    card.className = "pdf-card";

    const iframe = document.createElement("iframe");
    // encodeURIComponent maneja espacios y caracteres especiales
    iframe.src = "./pdf/" + encodeURIComponent(doc.file);
    iframe.title = doc.label;
    iframe.className = "pdf-frame";

    const footer = document.createElement("div");
    footer.className = "pdf-card-footer";

    const closeBtn = document.createElement("button");
    closeBtn.className = "btn-close";
    closeBtn.type = "button";
    closeBtn.textContent = "Cerrar";
    closeBtn.setAttribute("aria-label", `Cerrar ${doc.label}`);

    closeBtn.addEventListener("click", () => {
      // Al cerrar: eliminar este doc y re-render (los siguientes se desplazan)
      openDocs.splice(idx, 1);
      renderGrid();
    });

    footer.appendChild(closeBtn);
    card.appendChild(iframe);
    card.appendChild(footer);
    gridEl.appendChild(card);
  });
}

// Abrir desde el select (añadir si no está abierto)
function openSelected() {
  const file = selectEl.value;
  if (!file) return;

  // Buscar datos del PDF
  const doc = pdfList.find(p => p.file === file);
  if (!doc) return;

  // Evitar duplicados
  const alreadyOpen = openDocs.some(d => d.file === doc.file);
  if (alreadyOpen) {
    // Opcional: hacer scroll hasta el visor ya abierto
    const idx = openDocs.findIndex(d => d.file === doc.file);
    const card = gridEl.children[idx];
    if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // Máximo 4
  if (openDocs.length >= 4) {
    limitMsg.hidden = false;
    limitMsg.textContent = "Solo puedes abrir hasta 4 PDFs a la vez.";
    limitMsg.focus?.();
    return;
  }

  openDocs.push(doc);
  renderGrid();
}

// Eventos
openBtn.addEventListener("click", openSelected);
selectEl.addEventListener("change", (e) => {
  // Opcional: abrir instantáneamente al elegir (comenta si prefieres usar el botón)
  openSelected();
});

// Inicialización
populateSelect();
renderGrid();
