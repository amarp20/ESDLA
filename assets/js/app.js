/* =========================
   A) LÓGICA DE INDEX.HTML
   ========================= */

const pdfList = [
  { label: "AT-1 a 4 Ataque con armas", file: "AT-1 a 4 Ataque con armas.pdf" },
  { label: "AT-5 y 6 Garras-dientes y agarrar-desequilibrar", file: "AT-5 y 6 Garras-dientes y agarrar-desequilibrar.pdf" },
  { label: "AT-7 y 8 Ataques de hechizos de rayo y Bola", file: "AT-7 y 8 Ataques de hechizos de rayo y Bola.pdf" },
  { label: "AT-9 Ataques de hechizos básicos", file: "AT-9 Ataques de hechizos basicos.pdf" },
  { label: "BT-1 Bonificaciones por característica", file: "BT-1 Bonificaciones por caracteristica.pdf" },
  { label: "BT-2 Efecto de la bonificación por característica", file: "BT-2 Efecto de la bonificacion por caracteristica.pdf" },
  { label: "BT-3 Modificaciones especiales por raza", file: "BT-3 Modificaciones especiales por raza.pdf" },
  { label: "BT-4 Bonificaciones por grado de habilidad", file: "BT-4 Bonificaciones por grado de habilidad.pdf" },
  { label: "BT-5 Penalización por peso", file: "BT-5 Penalizacion por peso.pdf" },
  { label: "BT-6 Bonificaciones por profesión", file: "BT-6 Bonificaciones por profesion.pdf" },
  { label: "CGT-1 Grados de idiomas", file: "CGT-1 Grados de idiomas.pdf" },
  { label: "CGT-2 Opciones de historial", file: "CGT-2 Opciones de historial.pdf" },
  { label: "CGT-3 (GT-2) Razas", file: "CGT-3 (GT-2) Razas.pdf" },
  { label: "CGT-4 Puntos de desarrollo", file: "CGT-4 Puntos de desarrollo.pdf" },
  { label: "CGT-5 Grados de habilidad en la adolescencia", file: "CGT-5 Grados de habilidad en la adolescencia.pdf" },
  { label: "CST-1 Características de las armas", file: "CST-1 Caracteristicas de las armas.pdf" },
  { label: "CST-2 Características de los animales", file: "CST-2 Caracteristicas de los animales.pdf" },
  { label: "CST-3 Carcaterísticas de los hechizos", file: "CST-3 Carcateristicas de los hechizos.pdf" },
  { label: "CT-1 a 4 Críticos de armas", file: "CT-1 a 4 Críticos de armas.pdf" },
  { label: "CT-5, 10 y 11 Críticos de presa y grandes criaturas", file: "CT-5, 10 y 11 Criticos de presa y grandes criaturas.pdf" },
  { label: "CT-6 a 9 Críticos de calor, frío, electricidad e impacto", file: "CT-6 a 9 Criticos de calor, frio, electricidad e impacto.pdf" },
  { label: "ET-1 a 5 Puntos de experiencia", file: "ET-1 a 5 Puntos de experiencia.pdf" },
  { label: "FT-1 a 4 Pifias", file: "FT-1 a 4 Pifias.pdf" },
  { label: "IHT-1 a 3 Deterioro, recuperación y efecto de resucitar", file: "IHT-1 a 3 Deterioro, recuperacion y efecto de resucitar.pdf" },
  { label: "MT-1 Maniobras y movimiento", file: "MT-1 Maniobras y movimiento.pdf" },
  { label: "MT-2 Maniobras estáticas", file: "MT-2 Maniobras estaticas.pdf" },
  { label: "ST-1 Idiomas de la Tierra Media", file: "ST-1 Idiomas de la Tierra Media.pdf" },
  { label: "ST-2 Resumen de criaturas (animales)", file: "ST-2 Resumen de criaturas (animales).pdf" },
  { label: "ST-2 Resumen de criaturas (monstruos)", file: "ST-2 Resumen de criaturas (monstruos).pdf" },
  { label: "ST-3 General de personajes (profesiones)", file: "ST-3 General de personajes (profesiones).pdf" },
  { label: "ST-4 Precios y equipo", file: "ST-4 Precios y equipo.pdf" },
  { label: "ST-5 Hierbas, enfermedades y venenos", file: "ST-5 Hierbas, enfermedades y venenos.pdf" },
  { label: "ST-6 Tesoros", file: "ST-6 Tesoros.pdf" },
  { label: "ST-7 Tasación de objetos mágicos", file: "ST-7 Tasación de objetos mágicos.pdf" },
  { label: "ST-8 Climática", file: "ST-8 Climatica.pdf" },
  { label: "ST-9 Velocidades de movimiento estratégico", file: "ST-9 Velocidades de movimiento estrategico.pdf" },
  { label: "ST-10 Encuentros", file: "ST-10 Encuentros.pdf" },
  { label: "ST-11 Acciones", file: "ST-11 Acciones.pdf" },
  { label: "ST-12 Riesgo en el uso de hechizos", file: "ST-12 Riesgo en el uso de hechizos.pdf" },
  { label: "TTR Tiradas de resistencia", file: "TTR Tiradas de resistencia.pdf" },
];

(function initIndexPage() {
  const selectEl = document.getElementById("pdfSelect");
  const openBtn  = document.getElementById("openBtn");
  const gridEl   = document.getElementById("pdfGrid");
  const limitMsg = document.getElementById("limitMsg");
  if (!selectEl || !openBtn || !gridEl) return;

  let openDocs = [];

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

  function renderGrid() {
    gridEl.classList.toggle("one", openDocs.length === 1);
    gridEl.classList.toggle("multi", openDocs.length >= 2);
    limitMsg.hidden = openDocs.length < 4;
    gridEl.innerHTML = "";

    openDocs.slice(0, 4).forEach((doc, idx) => {
      const card = document.createElement("article");
      card.className = "pdf-card";

      const iframe = document.createElement("iframe");
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
      closeBtn.addEventListener("click", () => { openDocs.splice(idx, 1); renderGrid(); });

      footer.appendChild(closeBtn);
      card.appendChild(iframe);
      card.appendChild(footer);
      gridEl.appendChild(card);
    });
  }

  function openSelected() {
    const file = selectEl.value;
    if (!file) return;
    const doc = pdfList.find(p => p.file === file);
    if (!doc) return;

    if (openDocs.some(d => d.file === doc.file)) {
      const idx = openDocs.findIndex(d => d.file === doc.file);
      const card = gridEl.children[idx];
      if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (openDocs.length >= 4) { limitMsg.hidden = false; limitMsg.textContent = "Solo puedes abrir hasta 4 PDFs a la vez."; return; }

    openDocs.push(doc);
    renderGrid();
  }

  openBtn.addEventListener("click", openSelected);
  selectEl.addEventListener("change", openSelected);
  populateSelect(); renderGrid();
})();

/* =========================
   B) LÓGICA DE COMBATE.HTML
   ========================= */

(function initCombatePage() {
  const armaSelect      = document.getElementById("armaSelect");
  const boInput         = document.getElementById("boInput");
  const bdInput         = document.getElementById("bdInput");
  const tiradaInput     = document.getElementById("tiradaInput");
  const armaduraSelect  = document.getElementById("armaduraSelect");
  const calcBtn         = document.getElementById("calcBtn");
  const calcResultado   = document.getElementById("calcResultado");
  if (!armaSelect || !boInput || !bdInput || !tiradaInput || !armaduraSelect || !calcBtn) return;

  const toIntOrNaN = (v) => {
    if (typeof v !== "string") v = String(v ?? "");
    v = v.trim().replace(",", ".");
    return /^-?\d+$/.test(v) ? parseInt(v, 10) : NaN;
  };

  function outcomeFiloCoraza(total) {
    if (total >= 1 && total <= 8)   return "Pifia";
    if (total >= 9 && total <= 45)  return "0 PV";
    if (total >= 46 && total <= 50) return "-1 PV";
    if (total >= 51 && total <= 55) return "-1 PV";
    if (total >= 56 && total <= 60) return "-2 PV";
    if (total >= 61 && total <= 65) return "-2 PV";
    if (total >= 66 && total <= 70) return "-3 PV";
    if (total >= 71 && total <= 75) return "-3 PV";
    if (total >= 76 && total <= 80) return "-4 PV";
    if (total >= 81 && total <= 85) return "-5 PV";
    if (total >= 86 && total <= 90) return "-5 PV";
    if (total >= 91 && total <= 95) return "-6 PV";
    if (total >= 96 && total <= 100) return "-6 PV";
    if (total >= 101 && total <= 105) return "-7 PV";
    if (total >= 106 && total <= 110) return "-8 PV";
    if (total >= 111 && total <= 115) return "-8 PV Crit A";
    if (total >= 116 && total <= 120) return "-9 PV Crit A";
    if (total >= 121 && total <= 125) return "-9 PV Crit A";
    if (total >= 126 && total <= 130) return "-10 PV Crit B";
    if (total >= 131 && total <= 135) return "-10 PV Crit B";
    if (total >= 136 && total <= 140) return "-11 PV Crit C";
    if (total >= 141 && total <= 145) return "-12 PV Crit D";
    if (total >= 146)                return "-12 PV Crit E";
    return "Sin efecto (rango no definido)";
  }
  
  function outcomeFiloCotaDeMalla(total) {
    if (total >= 1 && total <= 8)   return "Pifia";
    if (total >= 9 && total <= 50)  return "0 PV";
    if (total >= 51 && total <= 55) return "-1 PV";
    if (total >= 56 && total <= 60) return "-1 PV";
    if (total >= 61 && total <= 65) return "-2 PV";
    if (total >= 66 && total <= 70) return "-3 PV";
    if (total >= 71 && total <= 75) return "-4 PV";
    if (total >= 76 && total <= 80) return "-5 PV";
    if (total >= 81 && total <= 85) return "-6 PV";
    if (total >= 86 && total <= 90) return "-7 PV";
    if (total >= 91 && total <= 95) return "-8 PV";
    if (total >= 96 && total <= 100) return "-9 PV";
    if (total >= 101 && total <= 105) return "-10 PV Crit A";
    if (total >= 106 && total <= 110) return "-11 PV Crit A";
    if (total >= 111 && total <= 115) return "-12 PV Crit B";
    if (total >= 116 && total <= 120) return "-13 PV Crit B";
    if (total >= 121 && total <= 125) return "-13 PV Crit C";
    if (total >= 126 && total <= 130) return "-14 PV Crit C";
    if (total >= 131 && total <= 135) return "-15 PV Crit C";
    if (total >= 136 && total <= 140) return "-16 PV Crit D";
    if (total >= 141 && total <= 145) return "-17 PV Crit D";
    if (total >= 146)                return "-18 PV Crit E";
    return "Sin efecto (rango no definido)";
  }

  function outcomeFiloCueroEndurecido(total) {
    if (total >= 1 && total <= 8)   return "Pifia";
    if (total >= 9 && total <= 50)  return "0 PV";
    if (total >= 51 && total <= 55) return "0 PV";
    if (total >= 56 && total <= 60) return "0 PV";
    if (total >= 61 && total <= 65) return "0 PV";
    if (total >= 66 && total <= 70) return "-2 PV";
    if (total >= 71 && total <= 75) return "-3 PV";
    if (total >= 76 && total <= 80) return "-5 PV";
    if (total >= 81 && total <= 85) return "-6 PV";
    if (total >= 86 && total <= 90) return "-7 PV Crit A";
    if (total >= 91 && total <= 95) return "-9 PV Crit A";
    if (total >= 96 && total <= 100) return "-10 PV Crit B";
    if (total >= 101 && total <= 105) return "-11 PV Crit B";
    if (total >= 106 && total <= 110) return "-12 PV Crit B";
    if (total >= 111 && total <= 115) return "-13 PV Crit C";
    if (total >= 116 && total <= 120) return "-15 PV Crit C";
    if (total >= 121 && total <= 125) return "-16 PV Crit C";
    if (total >= 126 && total <= 130) return "-17 PV Crit D";
    if (total >= 131 && total <= 135) return "-18 PV Crit D";
    if (total >= 136 && total <= 140) return "-20 PV Crit D";
    if (total >= 141 && total <= 145) return "-21 PV Crit E";
    if (total >= 146)                return "-22 PV Crit E";
    return "Sin efecto (rango no definido)";
  }

    function outcomeFiloCuero(total) {
    if (total >= 1 && total <= 8)   return "Pifia";
    if (total >= 9 && total <= 50)  return "0 PV";
    if (total >= 51 && total <= 55) return "0 PV";
    if (total >= 56 && total <= 60) return "0 PV";
    if (total >= 61 && total <= 65) return "0 PV";
    if (total >= 66 && total <= 70) return "-3 PV";
    if (total >= 71 && total <= 75) return "-5 PV";
    if (total >= 76 && total <= 80) return "-7 PV Crit A";
    if (total >= 81 && total <= 85) return "-9 PV Crit A";
    if (total >= 86 && total <= 90) return "-10 PV Crit B";
    if (total >= 91 && total <= 95) return "-12 PV Crit B";
    if (total >= 96 && total <= 100) return "-13 PV Crit B";
    if (total >= 101 && total <= 105) return "-14 PV Crit C";
    if (total >= 106 && total <= 110) return "-15 PV Crit C";
    if (total >= 111 && total <= 115) return "-17 PV Crit C";
    if (total >= 116 && total <= 120) return "-18 PV Crit D";
    if (total >= 121 && total <= 125) return "-19 PV Crit D";
    if (total >= 126 && total <= 130) return "-20 PV Crit D";
    if (total >= 131 && total <= 135) return "-22 PV Crit D";
    if (total >= 136 && total <= 140) return "-23 PV Crit E";
    if (total >= 141 && total <= 145) return "-24 PV Crit E";
    if (total >= 146)                return "-25 PV Crit E";
    return "Sin efecto (rango no definido)";
  }

      function outcomeFiloSinArmadura(total) {
    if (total >= 1 && total <= 8)   return "Pifia";
    if (total >= 9 && total <= 50)  return "0 PV";
    if (total >= 51 && total <= 55) return "0 PV";
    if (total >= 56 && total <= 60) return "0 PV";
    if (total >= 61 && total <= 65) return "0 PV";
    if (total >= 66 && total <= 70) return "0 PV";
    if (total >= 71 && total <= 75) return "0 PV";
    if (total >= 76 && total <= 80) return "-7 PV";
    if (total >= 81 && total <= 85) return "-9 PV Crit A";
    if (total >= 86 && total <= 90) return "-10 PV Crit A";
    if (total >= 91 && total <= 95) return "-11 PV Crit B";
    if (total >= 96 && total <= 100) return "-13 PV Crit C";
    if (total >= 101 && total <= 105) return "-15 PV Crit C";
    if (total >= 106 && total <= 110) return "-17 PV Crit D";
    if (total >= 111 && total <= 115) return "-19 PV Crit D";
    if (total >= 116 && total <= 120) return "-20 PV Crit D";
    if (total >= 121 && total <= 125) return "-21 PV Crit E";
    if (total >= 126 && total <= 130) return "-23 PV Crit E";
    if (total >= 131 && total <= 135) return "-25 PV Crit E";
    if (total >= 136 && total <= 140) return "-27 PV Crit E";
    if (total >= 141 && total <= 145) return "-28 PV Crit E";
    if (total >= 146)                return "-30 PV Crit E";
    return "Sin efecto (rango no definido)";
  }
  // ===== Mapa arma → armadura → función =====
  const outcomesByWeapon = {
    FILO: {
      CORAZA:          outcomeFiloCoraza,
      COTA_DE_MALLA:   outcomeFiloCotaDeMalla,
      CUERO_ENDURECIDO: outcomeFiloCueroEndurecido,
      CUERO:            outcomeFiloCuero,
      SIN_ARMADURA:     outcomeFiloSinArmadura,
    },
    CONTUNDENTE: {
      CORAZA: outcomeContundenteCoraza,
      COTA_DE_MALLA: outcomeContundenteCotaDeMalla,
      CUERO_ENDURECIDO: outcomeContundenteCueroEndurecido,
      CUERO: outcomeContundenteCuero,
      SIN_ARMADURA: outcomeContundenteSinArmadura,
    },
    A_2_MANOS: {
      CORAZA: outcomeA2ManosCoraza,
      COTA_DE_MALLA: outcomeA2ManosCotaDeMalla,
      CUERO_ENDURECIDO: outcomeA2ManosCueroEndurecido, 
      CUERO: outcomeA2ManosCuero,
      SIN_ARMADURA: outcomeA2ManosSinArmadura,
    },
    PROYECTILES: {
      CORAZA: outcomeProyectilesCoraza,
      COTA_DE_MALLA: outcomeProyectilesCotaDeMalla,
      CUERO_ENDURECIDO: outcomeProyectilesCueroEndurecido,
      CUERO: outcomeProyectilesCuero,
      SIN_ARMADURA: outcomeProyectilesSinArmadura, 
    },
    GARRAS_DIENTES_DIMINUTO: {
      CORAZA: outcomeGarrasDientesDiminutoCoraza,
      COTA_DE_MALLA: outcomeGarrasDientesDiminutoCotaDeMalla,
      CUERO_ENDURECIDO: outcomeGarrasDientesDiminutoCueroEndurecido,
      CUERO: outcomeGarrasDientesDiminutoCuero,
      SIN_ARMADURA: outcomeGarrasDientesDiminutoSinArmadura, 
    },
    GARRAS_DIENTES_PEQUENO: {
      CORAZA: outcomeGarrasDientesPequenoCoraza,
      COTA_DE_MALLA: outcomeGarrasDientesPequenoCotaDeMalla,
      CUERO_ENDURECIDO: outcomeGarrasDientesPequenoCueroEndurecido,
      CUERO: outcomeGarrasDientesPequenoCuero,
      SIN_ARMADURA: outcomeGarrasDientesPequenoSinArmadura,
    },
    GARRAS_DIENTES_MEDIANO: {
      CORAZA: outcomeGarrasDientesMedianoCoraza,
      COTA_DE_MALLA: outcomeGarrasDientesMedianoCotaDeMalla,
      CUERO_ENDURECIDO: outcomeGarrasDientesMedianoCueroEndurecido,
      CUERO: outcomeGarrasDientesMedianoCuero,
      SIN_ARMADURA: outcomeGarrasDientesMedianoSinArmadura,
    },
    GARRAS_DIENTES_GRANDE: {
      CORAZA: outcomeGarrasDientesGrandeCoraza,
      COTA_DE_MALLA: outcomeGarrasDientesGrandeCotaDeMalla,
      CUERO_ENDURECIDO: outcomeGarrasDientesGrandeCueroEndurecido,
      CUERO: outcomeGarrasDientesGrandeCuero,
      SIN_ARMADURA: outcomeGarrasDientesGrandeSinArmadura,
    },
    GARRAS_DIENTES_ENORME: {
      CORAZA: outcomeGarrasDientesEnormeCoraza,
      COTA_DE_MALLA: outcomeGarrasDientesEnormeCotaDeMalla,
      CUERO_ENDURECIDO: outcomeGarrasDientesEnormeCueroEndurecido,
      CUERO: outcomeGarrasDientesEnormeCuero,
      SIN_ARMADURA: outcomeGarrasDientesEnormeSinArmadura,
    },
    AGARRAR_DESEQUILIBRAR_DIMINUTO: {
      CORAZA: outcomeAgarrarDesequilibrarDiminutoCoraza,
      COTA_DE_MALLA: outcomeAgarrarDesequilibrarDiminutoCotaDeMalla,
      CUERO_ENDURECIDO: outcomeAgarrarDesequilibrarDiminutoCueroEndurecido,
      CUERO: outcomeAgarrarDesequilibrarDiminutoCuero,
      SIN_ARMADURA: outcomeAgarrarDesequilibrarDiminutoSinArmadura,
    },
    AGARRAR_DESEQUILIBRAR_PEQUENO: {
      CORAZA: outcomeAgarrarDesequilibrarPequenoCoraza,
      COTA_DE_MALLA: outcomeAgarrarDesequilibrarPequenoCotaDeMalla,
      CUERO_ENDURECIDO: outcomeAgarrarDesequilibrarPequenoCueroEndurecido,
      CUERO: outcomeAgarrarDesequilibrarPequenoCuero,
      SIN_ARMADURA: outcomeAgarrarDesequilibrarPequenoSinArmadura,
    },
    AGARRAR_DESEQUILIBRAR_MEDIANO: {
      CORAZA: outcomeAgarrarDesequilibrarMedianoCoraza,
      COTA_DE_MALLA: outcomeAgarrarDesequilibrarMedianoCotaDeMalla,
      CUERO_ENDURECIDO: outcomeAgarrarDesequilibrarMedianoCueroEndurecido,
      CUERO: outcomeAgarrarDesequilibrarMedianoCuero,
      SIN_ARMADURA: outcomeAgarrarDesequilibrarMedianoSinArmadura,
    },
    AGARRAR_DESEQUILIBRAR_GRANDE: {
      CORAZA: outcomeAgarrarDesequilibrarGrandeCoraza,
      COTA_DE_MALLA: outcomeAgarrarDesequilibrarGrandeCotaDeMalla,
      CUERO_ENDURECIDO: outcomeAgarrarDesequilibrarGrandeCueroEndurecido,
      CUERO: outcomeAgarrarDesequilibrarGrandeCuero,
      SIN_ARMADURA: outcomeAgarrarDesequilibrarGrandeSinArmadura,
    },
    AGARRAR_DESEQUILIBRAR_ENORME: {
      CORAZA: outcomeAgarrarDesequilibrarEnormeCoraza,
      COTA_DE_MALLA: outcomeAgarrarDesequilibrarEnormeCotaDeMalla,
      CUERO_ENDURECIDO: outcomeAgarrarDesequilibrarEnormeCueroEndurecido,
      CUERO: outcomeAgarrarDesequilibrarEnormeCuero,
      SIN_ARMADURA: outcomeAgarrarDesequilibrarEnormeSinArmadura,
    },
    HECHIZOS_BASICOS: {
      CORAZA: outcomeHechizosBasicosCoraza,
      COTA_DE_MALLA: outcomeHechizosBasicosCotaDeMalla,
      CUERO_ENDURECIDO: outcomeHechizosBasicosCueroEndurecido,
      CUERO: outcomeHechizosBasicosCuero,
      SIN_ARMADURA: outcomeHechizosBasicosSinArmadura,
    },
    HECHIZOS_RAYO_DESCARGA: {
      CORAZA: outcomeHechizosRayoDescargaCoraza,
      COTA_DE_MALLA: outcomeHechizosRayoDescargaCotaDeMalla,
      CUERO_ENDURECIDO: outcomeHechizosRayoDescargaCueroEndurecido,
      CUERO: outcomeHechizosRayoDescargaCuero,
      SIN_ARMADURA: outcomeHechizosRayoDescargaSinArmadura,
    },
    HECHIZOS_RAYO_AGUA: {
      CORAZA: outcomeHechizosRayoAguaCoraza,
      COTA_DE_MALLA: outcomeHechizosRayoAguaCotaDeMalla,
      CUERO_ENDURECIDO: outcomeHechizosRayoAguaCueroEndurecido,
      CUERO: outcomeHechizosRayoAguaCuero,
      SIN_ARMADURA: outcomeHechizosRayoAguaSinArmadura,
    },
    HECHIZOS_RAYO_HIELO: {
      CORAZA: outcomeHechizosRayoHieloCoraza,
      COTA_DE_MALLA: outcomeHechizosRayoHieloCotaDeMalla,
      CUERO_ENDURECIDO: outcomeHechizosRayoHieloCueroEndurecido,
      CUERO: outcomeHechizosRayoHieloCuero,
      SIN_ARMADURA: outcomeHechizosRayoHieloSinArmadura,
    },
    HECHIZOS_RAYO_RELAMPAGOS_IGNEOS: {
      CORAZA: outcomeHechizosRayoRelampagosIgneosCoraza,
      COTA_DE_MALLA: outcomeHechizosRayoRelampagosIgneosCotaDeMalla,
      CUERO_ENDURECIDO: outcomeHechizosRayoRelampagosIgneosCueroEndurecido,
      CUERO: outcomeHechizosRayoRelampagosIgneosCuero,
      SIN_ARMADURA: outcomeHechizosRayoRelampagosIgneosSinArmadura,
    },
    HECHIZOS_DE_BOLA: {
      CORAZA: outcomeHechizosDeBolaCoraza,
      COTA_DE_MALLA: outcomeHechizosDeBolaCotaDeMalla,
      CUERO_ENDURECIDO: outcomeHechizosDeBolaCueroEndurecido,
      CUERO: outcomeHechizosDeBolaCuero,
      SIN_ARMADURA: outcomeHechizosDeBolaSinArmadura,
    },
  };

  // Helper por si más adelante quieres lógica extra al resolver la tabla
  function getOutcomeFn(arma, armadura) {
    const armaMap = outcomesByWeapon[arma];
    if (!armaMap) return null;
    return armaMap[armadura] || null;
  }

  function calcular() {
    if (!armaSelect.value) { alert("no se seleccionó arma"); calcResultado.textContent = ""; return; }
    const bo = toIntOrNaN(boInput.value);
    const bd = toIntOrNaN(bdInput.value);
    const tirada = toIntOrNaN(tiradaInput.value);
    if (Number.isNaN(bo) || Number.isNaN(bd) || Number.isNaN(tirada)) {
      alert("Revisa los datos introducidos, algo no cuadra."); calcResultado.textContent = ""; return;
    }
    if (!armaduraSelect.value) { alert("Selecciona armadura."); calcResultado.textContent = ""; return; }

    const total = tirada + bo - bd;

    // Resolución por mapa (arma → armadura → función)
    const arma = armaSelect.value;
    const armadura = armaduraSelect.value;

    const fn = getOutcomeFn(arma, armadura);
    if (typeof fn === "function") {
      const resultado = fn(total);
      calcResultado.textContent = `Resultado (${total}) → ${resultado}`;
    } else {
      if (typeof fn === "function") {
        const resultado = fn(total);
        calcResultado.textContent = `Resultado (${total}) → ${resultado}`;
      } else {
        calcResultado.textContent = ""; // silencio si no hay tabla
      }

    }

  }

  calcBtn.addEventListener("click", calcular);
})();