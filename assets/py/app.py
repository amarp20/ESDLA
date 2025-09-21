from js import document, console
from urllib.parse import quote
from pyodide.ffi import create_proxy

console.log("PyScript: app.py cargado ✅")  # <-- si no ves esto en la consola del navegador, no está ejecutando

# Lista (asegúrate de que estos PDFs están en ESDLA/pdf/)
pdfList = [
    { "label": "AT-1 a 4 Ataque con armas", "file": "AT-1 a 4 Ataque con armas.pdf" },
    { "label": "AT-5 y 6 Garras-dientes y agarrar-desequilibrar", "file": "AT-5 y 6 Garras-dientes y agarrar-desequilibrar.pdf" },
    { "label": "AT-7 y 8 Ataques de hechizos de rayo y Bola", "file": "AT-7 y 8 Ataques de hechizos de rayo y Bola.pdf" },
    { "label": "AT-9 Ataques de hechizos básicos", "file": "AT-9 Ataques de hechizos basicos.pdf" },
    { "label": "BT-1 Bonificaciones por característica", "file": "BT-1 Bonificaciones por caracteristica.pdf" },
    { "label": "BT-2 Efecto de la bonificación por característica", "file": "BT-2 Efecto de la bonificacion por caracteristica.pdf" },
    { "label": "BT-3 Modificaciones especiales por raza", "file": "BT-3 Modificaciones especiales por raza.pdf" },
    { "label": "BT-4 Bonificaciones por grado de habilidad", "file": "BT-4 Bonificaciones por grado de habilidad.pdf" },
    { "label": "BT-5 Penalización por peso", "file": "BT-5 Penalizacion por peso.pdf" },
    { "label": "BT-6 Bonificaciones por profesión", "file": "BT-6 Bonificaciones por profesion.pdf" },
    { "label": "CGT-1 Grados de idiomas", "file": "CGT-1 Grados de idiomas.pdf" },
    { "label": "CGT-2 Opciones de historial", "file": "CGT-2 Opciones de historial.pdf" },
    { "label": "CGT-3 (GT-2) Razas", "file": "CGT-3 (GT-2) Razas.pdf" },
    { "label": "CGT-4 Puntos de desarrollo", "file": "CGT-4 Puntos de desarrollo.pdf" },  # <-- añade .pdf si el archivo lo tiene
    { "label": "CGT-5 Grados de habilidad en la adolescencia", "file": "CGT-5 Grados de habilidad en la adolescencia.pdf" },
    { "label": "CST-1 Características de las armas", "file": "CST-1 Caracteristicas de las armas.pdf" },
    { "label": "CST-2 Características de los animales", "file": "CST-2 Caracteristicas de los animales.pdf" },
    { "label": "CST-3 Carcaterísticas de los hechizos", "file": "CST-3 Carcateristicas de los hechizos.pdf" },
    { "label": "CT-1 a 4 Críticos de armas", "file": "CT-1 a 4 Críticos de armas.pdf" },
    { "label": "CT-5, 10 y 11 Críticos de presa y grandes criaturas", "file": "CT-5, 10 y 11 Criticos de presa y grandes criaturas.pdf" },
    { "label": "CT-6 a 9 Críticos de calor, frío, electricidad e impacto", "file": "CT-6 a 9 Criticos de calor, frio, electricidad e impacto.pdf" },
    { "label": "ET-1 a 5 Puntos de experiencia", "file": "ET-1 a 5 Puntos de experiencia.pdf" },
    { "label": "FT-1 a 4 Pifias", "file": "FT-1 a 4 Pifias.pdf" },
    { "label": "IHT-1 a 3 Deterioro, recuperación y efecto de resucitar", "file": "IHT-1 a 3 Deterioro, recuperacion y efecto de resucitar.pdf" },
    { "label": "MT-1 Maniobras y movimiento", "file": "MT-1 Maniobras y movimiento.pdf" },
    { "label": "MT-2 Maniobras estáticas", "file": "MT-2 Maniobras estaticas.pdf" },
    { "label": "ST-1 Idiomas de la Tierra Media", "file": "ST-1 Idiomas de la Tierra Media.pdf" },
    { "label": "ST-2 Resumen de criaturas (animales)", "file": "ST-2 Resumen de criaturas (animales).pdf" },
    { "label": "ST-2 Resumen de criaturas (monstruos)", "file": "ST-2 Resumen de criaturas (monstruos).pdf" },
    { "label": "ST-3 General de personajes (profesiones)", "file": "ST-3 General de personajes (profesiones).pdf" },
    { "label": "ST-4 Precios y equipo", "file": "ST-4 Precios y equipo.pdf" },
    { "label": "ST-5 Hierbas, enfermedades y venenos", "file": "ST-5 Hierbas, enfermedades y venenos.pdf" },
    { "label": "ST-6 Tesoros", "file": "ST-6 Tesoros.pdf" },
    { "label": "ST-7 Tasación de objetos mágicos", "file": "ST-7 Tasación de objetos mágicos.pdf" },
    { "label": "ST-8 Climática", "file": "ST-8 Climatica.pdf" },
    { "label": "ST-9 Velocidades de movimiento estratégico", "file": "ST-9 Velocidades de movimiento estrategico.pdf" },
    { "label": "ST-10 Encuentros", "file": "ST-10 Encuentros.pdf" },
    { "label": "ST-11 Acciones", "file": "ST-11 Acciones.pdf" },
    { "label": "ST-12 Riesgo en el uso de hechizos", "file": "ST-12 Riesgo en el uso de hechizos.pdf" },
    { "label": "TTR Tiradas de resistencia", "file": "TTR Tiradas de resistencia.pdf" },
]

openDocs = []

selectEl = document.getElementById("pdfSelect")
openBtn  = document.getElementById("openBtn")
gridEl   = document.getElementById("pdfGrid")
limitMsg = document.getElementById("limitMsg")

def class_toggle(el, cls, cond: bool):
    if cond: el.classList.add(cls)
    else:    el.classList.remove(cls)

def populate_select():
    # placeholder
    selectEl.innerHTML = ""
    ph = document.createElement("option")
    ph.value = ""
    ph.textContent = "— Elige un PDF —"
    ph.disabled = True
    ph.selected = True
    selectEl.appendChild(ph)

    # opciones
    for item in pdfList:
        opt = document.createElement("option")
        opt.value = item["file"]   # IMPORTANTE: solo el nombre del archivo
        opt.textContent = item["label"]
        selectEl.appendChild(opt)

    console.log(f"PyScript: cargadas {len(pdfList)} opciones en el select")

def render_grid():
    class_toggle(gridEl, "one", len(openDocs) == 1)
    class_toggle(gridEl, "multi", len(openDocs) >= 2)

    limitMsg.hidden = len(openDocs) < 4
    gridEl.innerHTML = ""

    for idx, doc in enumerate(openDocs[:4]):
        card = document.createElement("article")
        card.className = "pdf-card"

        iframe = document.createElement("iframe")
        iframe.className = "pdf-frame"
        iframe.title = doc["label"]
        iframe.src = "./pdf/" + quote(doc["file"])   # <-- aquí se usa la carpeta /pdf
        card.appendChild(iframe)

        footer = document.createElement("div")
        footer.className = "pdf-card-footer"

        btn = document.createElement("button")
        btn.className = "btn-close"
        btn.type = "button"
        btn.textContent = "Cerrar"

        def make_close_handler(index):
            def handler(evt=None):
                del openDocs[index]
                render_grid()
            return handler

        btn.addEventListener("click", create_proxy(make_close_handler(idx)))
        footer.appendChild(btn)

        card.appendChild(footer)
        gridEl.appendChild(card)

def open_selected(evt=None):
    file_val = selectEl.value
    if not file_val:
        return
    # buscar doc
    doc = next((p for p in pdfList if p["file"] == file_val), None)
    if not doc:
        console.warn("No se encontró el doc para:", file_val)
        return
    # evitar duplicados
    if any(d["file"] == doc["file"] for d in openDocs):
        idx = next(i for i, d in enumerate(openDocs) if d["file"] == doc["file"])
        card = gridEl.children.item(idx)
        if card is not None:
            card.scrollIntoView({"behavior": "smooth", "block": "center"})
        return
    # límite
    if len(openDocs) >= 4:
        limitMsg.hidden = False
        limitMsg.textContent = "Solo puedes abrir hasta 4 PDFs a la vez."
        return
    openDocs.append(doc)
    render_grid()

# eventos
openBtn.addEventListener("click", create_proxy(open_selected))
selectEl.addEventListener("change", create_proxy(open_selected))

# init
populate_select()
render_grid()
console.log("PyScript: inicialización OK")
