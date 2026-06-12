const caseStudy = {
  soldOut: "Sold out",
  capacity: "20 - 25 personas",
  revenue: "$20k - $22k MXN",
  investment: "~$7k MXN",
  profit: "~$13k MXN",
  note: "Resultado comercial aproximado del seminario, compartido por el equipo.",
};

const campaigns = [
  {
    name: "ULTIMATE CAMPAÑA SEMINARIO",
    objective: "Conversaciones",
    resultValue: 178,
    resultLabel: "conversaciones generadas",
    reach: 26418,
    impressions: 82010,
    linkClicks: 710,
    allClicks: 1854,
    ctr: 0.87,
    cpc: 2.98,
    cpm: 25.82,
    costPerResult: 11.9,
    spend: 2117.46,
    frequency: 3.1,
    insight:
      "Fue la campaña de mayor volumen y la que empujó el grueso de la demanda para el seminario.",
  },
  {
    name: "Seminario New",
    objective: "Conversaciones",
    resultValue: 80,
    resultLabel: "conversaciones generadas",
    reach: 6725,
    impressions: 17849,
    linkClicks: 196,
    allClicks: 560,
    ctr: 1.1,
    cpc: 3.08,
    cpm: 33.86,
    costPerResult: 7.55,
    spend: 604.33,
    frequency: 2.65,
    insight:
      "Mostró una mejor eficiencia por conversación y ayudó a reforzar el cierre del interés ya existente.",
  },
  {
    name: "Campaña MARZO seminar",
    objective: "Conversaciones",
    resultValue: 37,
    resultLabel: "conversaciones generadas",
    reach: 8246,
    impressions: 17206,
    linkClicks: 179,
    allClicks: 360,
    ctr: 1.04,
    cpc: 2.79,
    cpm: 29.05,
    costPerResult: 13.51,
    spend: 499.89,
    frequency: 2.09,
    insight:
      "Sirvió como empuje adicional para sostener visibilidad y seguir captando conversaciones con la audiencia.",
  },
  {
    name: "Ig seguidores camp",
    objective: "Visitas al perfil",
    resultValue: 149,
    resultLabel: "visitas al perfil",
    reach: 3146,
    impressions: 3945,
    linkClicks: 156,
    allClicks: 155,
    ctr: 3.95,
    cpc: 0.37,
    cpm: 14.62,
    costPerResult: 0.39,
    spend: 57.68,
    frequency: 1.25,
    insight:
      "Fue la campaña de mejor respuesta porcentual, ideal para visibilidad rápida y crecimiento de percepción.",
  },
];

const integer = new Intl.NumberFormat("es-MX");
const decimal = new Intl.NumberFormat("es-MX", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function money(value) {
  return `$${decimal.format(value)}`;
}

const totals = campaigns.reduce(
  (acc, campaign) => {
    acc.reach += campaign.reach;
    acc.impressions += campaign.impressions;
    acc.linkClicks += campaign.linkClicks;
    acc.allClicks += campaign.allClicks;
    acc.spend += campaign.spend;

    if (campaign.objective === "Conversaciones") {
      acc.conversations += campaign.resultValue;
    }

    if (campaign.objective === "Visitas al perfil") {
      acc.profileVisits += campaign.resultValue;
    }

    return acc;
  },
  {
    reach: 0,
    impressions: 0,
    linkClicks: 0,
    allClicks: 0,
    spend: 0,
    conversations: 0,
    profileVisits: 0,
  }
);

const businessGrid = document.querySelector("#businessGrid");
const summaryGrid = document.querySelector("#summaryGrid");
const caseHighlights = document.querySelector("#caseHighlights");
const miniChart = document.querySelector("#miniChart");
const campaignCards = document.querySelector("#campaignCards");
const comparisonBody = document.querySelector("#comparisonBody");
const year = document.querySelector("#year");
const calendarTitle = document.querySelector("#calendarTitle");
const calendarGrid = document.querySelector("#calendarGrid");
const calendarSelection = document.querySelector("#calendarSelection");
const scheduleForm = document.querySelector("#scheduleForm");
const scheduleDate = document.querySelector("#scheduleDate");
const scheduleTime = document.querySelector("#scheduleTime");
const scheduleName = document.querySelector("#scheduleName");
const schedulePhone = document.querySelector("#schedulePhone");
const scheduleEmail = document.querySelector("#scheduleEmail");
const scheduleNote = document.querySelector("#scheduleNote");

const businessCards = [
  {
    value: caseStudy.soldOut,
    label: "Resultado del evento",
    detail: "Seminario con aforo completo.",
  },
  {
    value: caseStudy.capacity,
    label: "Capacidad cubierta",
    detail: "Asistencia estimada reportada.",
  },
  {
    value: caseStudy.revenue,
    label: "Ingreso aproximado",
    detail: "Rango comercial compartido.",
  },
  {
    value: caseStudy.profit,
    label: "Utilidad aproximada",
    detail: "Con inversión total cercana a 7 mil pesos.",
  },
];

const summaryCards = [
  {
    value: integer.format(totals.impressions),
    label: "impresiones",
  },
  {
    value: integer.format(totals.reach),
    label: "personas alcanzadas",
  },
  {
    value: integer.format(totals.linkClicks),
    label: "clics al enlace",
  },
  {
    value: integer.format(totals.conversations),
    label: "conversaciones",
  },
];

const highlightCards = [
  {
    value: caseStudy.investment,
    label: "Inversión total del caso",
    detail: caseStudy.note,
  },
  {
    value: integer.format(totals.profileVisits),
    label: "visitas al perfil",
    detail: "Campaña de crecimiento y exposición.",
  },
  {
    value: `${decimal.format((totals.linkClicks / totals.impressions) * 100)}%`,
    label: "CTR promedio al enlace",
    detail: "Promedio ponderado con base en impresiones.",
  },
  {
    value: money(totals.spend),
    label: "gasto medido en campañas",
    detail: "Suma visible en las capturas compartidas.",
  },
];

function renderMetricCards(target, items, className) {
  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = className;
    card.innerHTML = `
      <strong>${item.value}</strong>
      <span>${item.label}</span>
      ${item.detail ? `<small>${item.detail}</small>` : ""}
    `;
    target.appendChild(card);
  });
}

renderMetricCards(businessGrid, businessCards, "metric-card");
renderMetricCards(summaryGrid, summaryCards, "summary-card");
renderMetricCards(caseHighlights, highlightCards, "highlight-card");

const maxResult = Math.max(...campaigns.map((campaign) => campaign.resultValue));

campaigns.forEach((campaign) => {
  const miniRow = document.createElement("div");
  miniRow.className = "mini-row";
  miniRow.innerHTML = `
    <div class="mini-row-head">
      <span>${campaign.name}</span>
      <span>${integer.format(campaign.resultValue)} ${campaign.objective.toLowerCase()}</span>
    </div>
    <div class="mini-track">
      <div class="mini-fill" style="width: ${(campaign.resultValue / maxResult) * 100}%"></div>
    </div>
  `;
  miniChart.appendChild(miniRow);

  const card = document.createElement("article");
  card.className = "campaign-card reveal";
  card.innerHTML = `
    <div class="campaign-top">
      <div>
        <p class="pill">${campaign.objective}</p>
        <h3>${campaign.name}</h3>
        <p>${campaign.insight}</p>
      </div>
      <div class="campaign-result">
        <strong>${integer.format(campaign.resultValue)}</strong>
        <span>${campaign.resultLabel}</span>
      </div>
    </div>

    <div class="campaign-meta">
      <div>
        <strong>${integer.format(campaign.reach)}</strong>
        <span>alcance</span>
      </div>
      <div>
        <strong>${integer.format(campaign.impressions)}</strong>
        <span>impresiones</span>
      </div>
      <div>
        <strong>${integer.format(campaign.linkClicks)}</strong>
        <span>clics al enlace</span>
      </div>
      <div>
        <strong>${campaign.ctr}%</strong>
        <span>CTR</span>
      </div>
      <div>
        <strong>${money(campaign.cpc)}</strong>
        <span>CPC</span>
      </div>
      <div>
        <strong>${money(campaign.costPerResult)}</strong>
        <span>costo por resultado</span>
      </div>
    </div>

    <p class="campaign-note">
      Gasto medido: <strong>${money(campaign.spend)}</strong> · Frecuencia:
      <strong>${decimal.format(campaign.frequency)}</strong> · CPM:
      <strong>${money(campaign.cpm)}</strong>
    </p>
  `;
  campaignCards.appendChild(card);

  const row = document.createElement("tr");
  row.innerHTML = `
    <td><strong>${campaign.name}</strong></td>
    <td>${integer.format(campaign.resultValue)} ${campaign.resultLabel}</td>
    <td>${integer.format(campaign.reach)}</td>
    <td>${integer.format(campaign.impressions)}</td>
    <td>${integer.format(campaign.linkClicks)}</td>
    <td>${campaign.ctr}%</td>
    <td>${money(campaign.cpc)}</td>
    <td>${money(campaign.spend)}</td>
  `;
  comparisonBody.appendChild(row);
});

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const whatsappNumber = "523411209845";
let selectedScheduleDate = null;

function formatLongDate(date) {
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function updateSelectedDateUI() {
  if (!selectedScheduleDate) {
    scheduleDate.value = "";
    calendarSelection.textContent = "Selecciona un día disponible para preparar tu mensaje de agenda.";
    return;
  }

  const readableDate = formatLongDate(selectedScheduleDate);
  scheduleDate.value = readableDate.charAt(0).toUpperCase() + readableDate.slice(1);
  calendarSelection.textContent = `Día seleccionado: ${scheduleDate.value}`;
}

function renderAvailabilityCalendar(date) {
  const yearValue = date.getFullYear();
  const monthValue = date.getMonth();
  const firstDay = new Date(yearValue, monthValue, 1);
  const lastDay = new Date(yearValue, monthValue + 1, 0).getDate();
  const offset = (firstDay.getDay() + 6) % 7;
  const today = new Date();

  calendarTitle.textContent = `${monthNames[monthValue]} ${yearValue}`;
  calendarGrid.innerHTML = "";

  for (let index = 0; index < offset; index += 1) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "calendar-day-empty";
    calendarGrid.appendChild(emptyCell);
  }

  for (let day = 1; day <= lastDay; day += 1) {
    const currentDate = new Date(yearValue, monthValue, day);
    const isToday =
      today.getFullYear() === yearValue &&
      today.getMonth() === monthValue &&
      today.getDate() === day;
    const isSelected =
      selectedScheduleDate &&
      selectedScheduleDate.getFullYear() === yearValue &&
      selectedScheduleDate.getMonth() === monthValue &&
      selectedScheduleDate.getDate() === day;

    const dayCell = document.createElement("button");
    dayCell.type = "button";
    dayCell.className = `calendar-day available${isToday ? " today" : ""}${isSelected ? " selected" : ""}`;
    dayCell.setAttribute("aria-label", `Agendar ${formatLongDate(currentDate)}`);
    dayCell.innerHTML = `
      <div class="calendar-day-top">
        <span class="calendar-day-number">${day}</span>
        ${isToday ? '<span class="calendar-day-tag">Hoy</span>' : ""}
      </div>
      <span class="calendar-day-pill">
        <span class="calendar-day-dot"></span>
        Libre
      </span>
    `;
    dayCell.addEventListener("click", () => {
      selectedScheduleDate = currentDate;
      updateSelectedDateUI();
      renderAvailabilityCalendar(date);
      scheduleNote.textContent =
        "Completa tus datos y enviaremos tu solicitud directamente por WhatsApp.";
      scheduleNote.classList.remove("is-error", "is-success");
    });
    calendarGrid.appendChild(dayCell);
  }
}

renderAvailabilityCalendar(new Date());
updateSelectedDateUI();

scheduleForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!selectedScheduleDate) {
    scheduleNote.textContent = "Selecciona primero un día del calendario para continuar.";
    scheduleNote.classList.add("is-error");
    scheduleNote.classList.remove("is-success");
    return;
  }

  if (!scheduleForm.reportValidity()) {
    scheduleNote.textContent = "Completa los datos requeridos para generar la solicitud.";
    scheduleNote.classList.add("is-error");
    scheduleNote.classList.remove("is-success");
    return;
  }

  const longDate = formatLongDate(selectedScheduleDate);
  const message = [
    "Hola YAWTIK, quiero agendar una cita.",
    "",
    `Dia seleccionado: ${longDate}`,
    `Hora de la cita: ${scheduleTime.value}`,
    `Empresa o persona: ${scheduleName.value.trim()}`,
    `Numero de contacto: ${schedulePhone.value.trim()}`,
    `Correo: ${scheduleEmail.value.trim()}`,
  ].join("\n");

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  scheduleNote.textContent = "Abriendo WhatsApp con tu solicitud prehecha.";
  scheduleNote.classList.remove("is-error");
  scheduleNote.classList.add("is-success");
  window.open(whatsappUrl, "_blank", "noopener");
});

const revealElements = document.querySelectorAll(".reveal");

function showVisibleReveals() {
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
      element.classList.add("is-visible");
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => {
  observer.observe(element);
});

showVisibleReveals();
window.addEventListener("load", showVisibleReveals);
window.addEventListener("resize", showVisibleReveals);
window.addEventListener("scroll", showVisibleReveals, { passive: true });
window.addEventListener("hashchange", () => {
  window.requestAnimationFrame(showVisibleReveals);
});

year.textContent = new Date().getFullYear();
