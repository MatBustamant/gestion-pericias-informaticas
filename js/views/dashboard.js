window.init_dashboard = function() {
  const r = S.user?.rol || 'mesa';
  const u = S.user || {};
  let ofs = S.solicitudes;
  if (r === 'perito') ofs = ofs.filter(o => o.peritos.includes(u.nombre) && o.estado !== 'pendiente');

  const pend = ofs.filter(o => o.estado === 'pendiente').length;
  const proc = ofs.filter(o => o.estado === 'en-proceso').length;
  const done = ofs.filter(o => o.estado === 'resuelto').length;
  const recent = ofs.slice(0, 4);

  // ---- HEADER ----
  document.querySelector('[data-dd-title]').textContent = 'Bienvenido/a, ' + u.nombre;
  const diasemana = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const hoy = new Date();
  const fecha = diasemana[hoy.getDay()] + ' ' + hoy.getDate() + ' de ' + meses[hoy.getMonth()] + ' de ' + hoy.getFullYear();
  document.querySelector('[data-dd-sub]').textContent = fecha + ' — Sistema de gestión de peritos informáticos';

  // ---- ESTADÍSTICAS ----
  const stats = (r === 'mesa' || r === 'coordinador')
    ? [
        { ic: 'inbox',  val: String(ofs.length), lbl: 'Solicitudes registradas', sub: 'total en el sistema',         col: '#1B3A6B', bg: '#EFF3F8' },
        { ic: 'clock',  val: String(pend),        lbl: 'Pendientes',             sub: 'sin perito asignado',         col: '#D97706', bg: '#FFFBEB' },
        { ic: 'trend',  val: String(proc),        lbl: 'En proceso',             sub: 'con perito asignado',         col: '#1D4ED8', bg: '#EFF6FF' },
        { ic: 'checkC', val: String(done),        lbl: 'Resueltas',              sub: 'completadas',                  col: '#16A34A', bg: '#F0FDF4' }
      ]
    : [
        { ic: 'inbox',  val: String(pend + proc), lbl: 'Solicitudes activas',    sub: 'asignadas a mí en curso',      col: '#1B3A6B', bg: '#EFF3F8' },
        { ic: 'checkC', val: String(done),        lbl: 'Solicitudes finalizadas',sub: 'informes entregados',          col: '#16A34A', bg: '#F0FDF4' }
      ];
  const statsGrid = document.getElementById('dash-stats');
  statsGrid.innerHTML = '';
  const stpl = document.getElementById('stat-card-tpl');
  stats.forEach(s => {
    const el = stpl.content.cloneNode(true);
    el.querySelector('[data-si-iw]').innerHTML = ic(s.ic, 17, s.col);
    el.querySelector('[data-si-iw]').style.background = s.bg;
    el.querySelector('[data-si-val]').textContent = s.val;
    el.querySelector('[data-si-lbl]').textContent = s.lbl;
    el.querySelector('[data-si-sub]').textContent = s.sub;
    statsGrid.appendChild(el);
  });

  // ---- CHARTS ----
  const calCard = document.getElementById('dash-cal-card');
  calCard.style.gridColumn = '1 / -1';
  calCard.querySelector('[data-dd-cal-title]').textContent = 'Agenda General';
  calCard.querySelector('[data-dd-cal-sub]').textContent = 'Vista de aperturas programadas globales';

  // ---- CALENDARIO (solo reemplaza el body de la card, no todo) ----
  const reloadDashCal = () => {
    const body = document.querySelector('#dash-cal-card .dash-cal-body');
    body.innerHTML = '';
    body.appendChild(buildCalendar({ onMonthChange: reloadDashCal }));
  };
  const calBody = calCard.querySelector('.dash-cal-body');
  calBody.innerHTML = '';
  calBody.appendChild(buildCalendar({ onMonthChange: reloadDashCal }));

  // ---- TABLA DE RECIENTES ----
  const tbody = document.getElementById('dash-recent-tbody');
  if (recent.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--muted-fg);">Sin resultados</td></tr>';
    return;
  }
  tbody.innerHTML = '';
  const rtpl = document.getElementById('dash-row-tpl');
  recent.forEach(o => {
    const el = rtpl.content.cloneNode(true);
    const tr = el.querySelector('[data-dr-idx]');
    tr.addEventListener('click', () => nav('detalle-causa', o.id));
    el.querySelector('[data-dr-id]').textContent = (o.tipo === 'narco' ? 'NAR-' : 'GEN-') + o.id;
    el.querySelector('[data-dr-exp]').textContent = o.exp;
    el.querySelector('[data-dr-imp]').textContent = o.imputado;
    el.querySelector('[data-dr-del]').textContent = o.delito;
    el.querySelector('[data-dr-fis]').textContent = o.fiscal;
    el.querySelector('[data-dr-jur]').textContent = o.jur;
    el.querySelector('[data-dr-urg]').innerHTML = ubdg(o.urgencia);
    el.querySelector('[data-dr-est]').innerHTML = bdg(o.estado);
    el.querySelector('[data-dr-eye]').innerHTML = ic('eye', 15);
    el.querySelector('[data-dr-eye]').addEventListener('click', e => { e.stopPropagation(); nav('detalle-causa', o.id); });
    tbody.appendChild(el);
  });
};