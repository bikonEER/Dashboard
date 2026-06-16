const accounts = [
  {
    id: "cl-madre",
    name: "Cuenta madre Chile",
    company: "Andes Foods SpA",
    user: "Tesoreria corporativa",
    type: "Cuenta madre",
    country: "Chile",
    currency: "CLP",
    bank: "Banco Estado",
    rail: "Transferencia local",
    number: "00-918273645",
    balance: 284900000,
    status: "Activa",
    created: "2026-02-11",
    lastMove: "Hace 8 min",
    match: 98,
    parent: null
  },
  {
    id: "mx-solar",
    name: "Solar Parts MX",
    company: "Proveedor final: Solar Parts Mexico",
    user: "Carlos Medina",
    type: "Cuenta virtual",
    country: "Mexico",
    currency: "MXN",
    bank: "STP",
    rail: "SPEI",
    number: "646180103009182736",
    balance: 3248800,
    status: "Activa",
    created: "2026-03-04",
    lastMove: "Hace 22 min",
    match: 94,
    parent: "cl-madre"
  },
  {
    id: "pe-textiles",
    name: "Textiles Lima SAC",
    company: "Cliente final: Textiles Lima",
    user: "Valeria Quispe",
    type: "Cuenta virtual",
    country: "Peru",
    currency: "PEN",
    bank: "BCP",
    rail: "CCI local",
    number: "002-194-009182736-55",
    balance: 516400,
    status: "Activa",
    created: "2026-04-18",
    lastMove: "Hoy 09:44",
    match: 91,
    parent: "cl-madre"
  },
  {
    id: "co-logistica",
    name: "Logistica Bogota",
    company: "Unidad de negocio Colombia",
    user: "Mariana Rojas",
    type: "Cuenta virtual",
    country: "Colombia",
    currency: "COP",
    bank: "Bancolombia",
    rail: "ACH Colombia",
    number: "031-000918273645",
    balance: 781200000,
    status: "Pendiente",
    created: "2026-05-07",
    lastMove: "Ayer 18:12",
    match: 76,
    parent: "cl-madre"
  },
  {
    id: "br-santos",
    name: "Santos Export Ltda",
    company: "Proveedor final Brasil",
    user: "Joao Ribeiro",
    type: "Cuenta virtual",
    country: "Brasil",
    currency: "BRL",
    bank: "Banco Rendimento",
    rail: "Pix",
    number: "PIX-YOL1-918273645",
    balance: 894200,
    status: "Bloqueada",
    created: "2026-05-28",
    lastMove: "12 jun",
    match: 62,
    parent: "cl-madre"
  }
];

const movements = [
  ["16 jun", "Comercial Norte SpA", "Cuenta madre Chile", "+ CLP 42.800.000", "Conciliado", "Factura INV-2026-1842", "99%"],
  ["16 jun", "Solar Parts MX", "Solar Parts MX", "+ MXN 820.400", "Conciliado", "PO-MX-7712", "96%"],
  ["16 jun", "Textiles Lima SAC", "Textiles Lima SAC", "+ PEN 88.120", "Pendiente", "Referencia parcial", "72%"],
  ["15 jun", "Agro Pacific Colombia", "Logistica Bogota", "+ COP 210.000.000", "Revision", "Sin orden asociada", "48%"],
  ["14 jun", "Santos Export Ltda", "Santos Export Ltda", "+ BRL 132.900", "Retenido", "KYC proveedor", "61%"]
];

const entities = [
  ["Andes Foods SpA", "Cliente empresa", "Chile", "5 cuentas", "Riesgo bajo"],
  ["Solar Parts Mexico", "Proveedor", "Mexico", "1 cuenta", "Activo"],
  ["Textiles Lima SAC", "Cliente final", "Peru", "1 cuenta", "Activo"],
  ["Agro Pacific Colombia", "Pagador", "Colombia", "2 referencias", "Revision"],
  ["Santos Export Ltda", "Proveedor", "Brasil", "1 cuenta", "KYC pendiente"]
];

const alerts = [
  ["Pago sin match", "COP 210.000.000 recibido sin orden asociada", "Alta"],
  ["KYC pendiente", "Santos Export requiere documento tributario actualizado", "Media"],
  ["FX pendiente", "MXN 1.500.000 listo para convertir a USD", "Media"],
  ["Payout retenido", "Transferencia internacional espera aprobacion interna", "Alta"],
  ["Cuenta sin movimiento", "Cuenta virtual Peru sin actividad por 18 dias", "Baja"]
];

const nav = [
  ["overview", "Overview"],
  ["accounts", "Cuentas virtuales"],
  ["detail", "Detalle cuenta"],
  ["movements", "Movimientos"],
  ["reconciliation", "Conciliacion"],
  ["fx", "FX"],
  ["payouts", "Payouts"],
  ["entities", "Clientes y proveedores"],
  ["alerts", "Alertas"]
];

const formatMoney = (amount, currency) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);

const statusClass = (status) => `pill ${status.toLowerCase().replace("ó", "o")}`;

function shell(content) {
  const route = currentRoute();
  return `
    <aside class="sidebar">
      <div class="brand">
        <span class="mark"><i></i></span>
        <div><strong>Yol1</strong><small>Business</small></div>
      </div>
      <nav>
        ${nav.map(([id, label]) => `<a class="${route === id ? "active" : ""}" href="#${id}">${label}</a>`).join("")}
      </nav>
      <div class="infra">
        <span>Infraestructura</span>
        <strong>ProntoPaga</strong>
        <small>Rails locales, conciliacion y payout orchestration</small>
      </div>
    </aside>
    <main class="main">
      <header class="topbar">
        <div>
          <p>Empresa cliente</p>
          <h1>Andes Foods SpA</h1>
        </div>
        <div class="top-actions">
          <button>Crear cuenta virtual</button>
          <button class="primary">Simular payout</button>
        </div>
      </header>
      ${content}
    </main>
  `;
}

function metric(label, value, note) {
  return `<article class="metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`;
}

function overview() {
  return `
    <section class="hero">
      <div>
        <p>Cuenta madre + cuentas virtuales por usuario final</p>
        <h2>Un panel ejecutivo para recibir, identificar, conciliar y mover dinero en LATAM.</h2>
      </div>
      <div class="mother-account">
        <span>Cuenta madre</span>
        <strong>${formatMoney(accounts[0].balance, "CLP")}</strong>
        <small>CLP disponible consolidado</small>
      </div>
    </section>
    <section class="metrics">
      ${metric("Recibido hoy", "$ 481,2M CLP", "34 pagos detectados")}
      ${metric("Recibido este mes", "$ 3.842M CLP", "+18% vs mayo")}
      ${metric("Cuentas activas", "42", "5 paises operativos")}
      ${metric("Pendiente conciliacion", "7 pagos", "$ 318M CLP")}
      ${metric("FX pendiente", "USD 212K", "3 conversiones listas")}
      ${metric("Payouts en proceso", "11", "SLA promedio 2h 12m")}
    </section>
    <section class="grid two">
      <div class="panel">
        <div class="panel-head"><h3>Mapa operativo</h3><span>Tiempo real</span></div>
        <div class="flow">
          ${accounts.slice(1).map((account) => `
            <div class="flow-row">
              <span>${account.country}</span>
              <strong>${account.name}</strong>
              <em>${formatMoney(account.balance, account.currency)}</em>
              <i style="width:${account.match}%"></i>
            </div>`).join("")}
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Alertas operativas</h3><span>5 abiertas</span></div>
        ${alerts.slice(0, 4).map((a) => `<div class="alert-row"><b>${a[0]}</b><span>${a[1]}</span><em>${a[2]}</em></div>`).join("")}
      </div>
    </section>
  `;
}

function accountsView() {
  return `
    <section class="section-head">
      <div><p>Arquitectura de cuentas</p><h2>Cuenta madre y cuentas virtuales asignadas</h2></div>
      <button class="primary">Nueva cuenta virtual</button>
    </section>
    <section class="account-grid">
      ${accounts.map((account) => `
        <article class="account-card ${account.type === "Cuenta madre" ? "featured" : ""}">
          <div class="card-top">
            <span>${account.type}</span>
            <b class="${statusClass(account.status)}">${account.status}</b>
          </div>
          <h3>${account.name}</h3>
          <p>${account.company}</p>
          <dl>
            <div><dt>Usuario final</dt><dd>${account.user}</dd></div>
            <div><dt>Pais / moneda</dt><dd>${account.country} · ${account.currency}</dd></div>
            <div><dt>Banco / rail</dt><dd>${account.bank} · ${account.rail}</dd></div>
            <div><dt>Cuenta virtual</dt><dd>${account.number}</dd></div>
          </dl>
          <footer><strong>${formatMoney(account.balance, account.currency)}</strong><a href="#detail">Ver detalle</a></footer>
        </article>
      `).join("")}
    </section>
  `;
}

function detailView() {
  const account = accounts[1];
  return `
    <section class="section-head">
      <div><p>Detalle operativo</p><h2>${account.name}</h2></div>
      <span class="${statusClass(account.status)}">${account.status}</span>
    </section>
    <section class="grid detail-layout">
      <div class="panel bank-panel">
        <div class="panel-head"><h3>Informacion bancaria local</h3><span>${account.country}</span></div>
        <div class="bank-number">${account.number}</div>
        <div class="info-list">
          <div><span>Titular visible</span><strong>Yol1 Business FBO ${account.company}</strong></div>
          <div><span>Identificador Yol1</span><strong>YOL1-MX-VA-009182736</strong></div>
          <div><span>Cliente asociado</span><strong>Andes Foods SpA</strong></div>
          <div><span>Cuenta madre</span><strong>Cuenta madre Chile</strong></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Saldo y acciones</h3><span>${account.currency}</span></div>
        <div class="balance">${formatMoney(account.balance, account.currency)}</div>
        <div class="action-grid">
          <button>Convertir FX</button>
          <button>Enviar payout</button>
          <button>Descargar conciliacion</button>
          <button>Asignar pagador</button>
        </div>
      </div>
    </section>
    <section class="grid three compact">
      ${metric("Pagadores asociados", "8", "3 recurrentes")}
      ${metric("Match promedio", "94%", "Ultimos 30 dias")}
      ${metric("Ultimo movimiento", account.lastMove, "SPEI entrante")}
    </section>
    ${table("Movimientos recientes", ["Fecha", "Pagador", "Cuenta", "Monto", "Estado", "Referencia", "Match"], movements.slice(0, 3))}
  `;
}

function movementsView() {
  return table("Movimientos recibidos", ["Fecha", "Pagador", "Cuenta destino", "Monto", "Estado", "Referencia", "Match"], movements);
}

function reconciliationView() {
  return `
    <section class="section-head">
      <div><p>Motor de conciliacion automatica</p><h2>Referencias detectadas y asignacion manual</h2></div>
      <button>Exportar reporte</button>
    </section>
    <section class="grid two">
      <div class="panel">
        <div class="panel-head"><h3>Cola de conciliacion</h3><span>7 pendientes</span></div>
        ${movements.map((m) => `<div class="match-row"><strong>${m[1]}</strong><span>${m[5]}</span><meter min="0" max="100" value="${m[6].replace("%", "")}"></meter><em>${m[6]}</em></div>`).join("")}
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Asignacion sugerida</h3><span>IA mock</span></div>
        <div class="assignment">
          <span>Pago detectado</span>
          <strong>PEN 88.120 · Textiles Lima SAC</strong>
          <span>Referencia probable</span>
          <strong>Factura EXP-PE-4421 · Orden Andes Foods</strong>
          <button class="primary">Aprobar match sugerido</button>
          <button>Enviar a revision manual</button>
        </div>
      </div>
    </section>
  `;
}

function fxView() {
  return `
    <section class="section-head"><div><p>Conversion FX</p><h2>Convertir saldos LATAM a USD</h2></div></section>
    <section class="grid two">
      <div class="panel fx-card">
        <label>Desde</label><strong>MXN 1.500.000</strong>
        <label>Hacia</label><strong>USD 79.365</strong>
        <div class="quote"><span>Tipo de cambio</span><b>18,90 MXN/USD</b></div>
        <div class="quote"><span>Spread Yol1</span><b>0,62%</b></div>
        <div class="quote total"><span>Monto estimado final</span><b>USD 78.873</b></div>
        <button class="primary">Confirmar conversion mock</button>
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Conversiones pendientes</h3><span>3</span></div>
        ${[["PEN", "USD", "PEN 320.000", "USD 84.188"], ["COP", "USD", "COP 480.000.000", "USD 116.731"], ["BRL", "USD", "BRL 210.000", "USD 38.745"]].map((r) => `<div class="fx-row"><b>${r[0]} -> ${r[1]}</b><span>${r[2]}</span><strong>${r[3]}</strong></div>`).join("")}
      </div>
    </section>
  `;
}

function payoutsView() {
  const rows = [
    ["Banco local", "Banco Estado", "CLP 82.000.000", "Programado"],
    ["Proveedor internacional", "Solar Parts Mexico", "USD 78.873", "En compliance"],
    ["Cuenta externa", "JP Morgan NY", "USD 141.200", "En proceso"],
    ["Otra cuenta virtual", "Textiles Lima SAC", "PEN 44.000", "Completado"]
  ];
  return table("Payouts y transferencias", ["Destino", "Beneficiario", "Monto", "Estado"], rows);
}

function entitiesView() {
  return table("Clientes, proveedores y pagadores", ["Entidad", "Tipo", "Pais", "Cuentas / refs", "Estado"], entities);
}

function alertsView() {
  return `
    <section class="section-head"><div><p>Riesgo y operacion</p><h2>Alertas por cliente, pais y moneda</h2></div></section>
    <section class="alert-grid">
      ${alerts.map((a) => `<article class="risk-card"><span>${a[2]}</span><h3>${a[0]}</h3><p>${a[1]}</p><button>Revisar caso</button></article>`).join("")}
    </section>
  `;
}

function table(title, headers, rows) {
  return `
    <section class="panel table-panel">
      <div class="panel-head"><h3>${title}</h3><span>${rows.length} registros</span></div>
      <div class="table-wrap">
        <table>
          <thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
          <tbody>
            ${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function currentRoute() {
  return (location.hash || "#overview").replace("#", "");
}

function viewFor(route) {
  const views = {
    overview,
    accounts: accountsView,
    detail: detailView,
    movements: movementsView,
    reconciliation: reconciliationView,
    fx: fxView,
    payouts: payoutsView,
    entities: entitiesView,
    alerts: alertsView
  };
  return (views[route] || overview)();
}

function renderApp() {
  document.querySelector("#app").innerHTML = shell(viewFor(currentRoute()));
}

window.addEventListener("hashchange", renderApp);
renderApp();
