function buildCalendar(opts = {}) {
  const { conflictIds = [], tentativeEvent = null, onMonthChange } = opts;
  const y = S.cal.year, m = S.cal.month;

  const wrap = document.createElement('div');
  wrap.innerHTML = COMPS.calendar;
  const cal = wrap.firstElementChild;

  // Título
  const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  cal.querySelector('[data-cal-title]').textContent = monthNames[m] + ' ' + y;

  // Navegación
  cal.querySelectorAll('[data-cal-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      S.cal.month += parseInt(btn.dataset.calNav);
      if (S.cal.month > 11) { S.cal.month = 0; S.cal.year++; }
      if (S.cal.month < 0) { S.cal.month = 11; S.cal.year--; }
      if (onMonthChange) onMonthChange();
    });
  });

  // Construir grilla
  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  let events = {};
  S.solicitudes.forEach(o => {
    if (o.fhi && o.estado === 'en-proceso') {
      const d = new Date(o.fhi);
      if (d.getFullYear() === y && d.getMonth() === m) {
        const day = d.getDate();
        if (!events[day]) events[day] = [];
        events[day].push(o);
      }
    }
  });

  let gridHTML = '';
  for (let i = 0; i < firstDay; i++) gridHTML += '<div class="cal-day empty"></div>';

  for (let i = 1; i <= daysInMonth; i++) {
    let evHTML = '', bgClass = 'cal-bg-gray';
    const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const hasTent = tentativeEvent && tentativeEvent.date === dateStr;
    const dayEvents = events[i] ? [...events[i]] : [];

    if (dayEvents.length > 0 || hasTent) {
      const count = dayEvents.length + (hasTent ? 1 : 0);
      if (count === 1) bgClass = 'cal-bg-green';
      else if (count === 2) bgClass = 'cal-bg-yellow';
      else bgClass = 'cal-bg-red';

      evHTML = dayEvents.map(e => {
        const colorCls = e.urgencia === 'alta' ? 'c-ev-alta' : (e.urgencia === 'media' ? 'c-ev-media' : 'c-ev-baja');
        const name = e.peritos.length > 0 ? e.peritos[0].split(' ')[0] : 'S/A';
        const isConflict = conflictIds.includes(e.id) ? ' conflict' : '';
        return `<div class="cal-event ${colorCls}${isConflict}" title="${e.peritos.join(', ')} - Exp. ${e.exp}">
          <strong>${e.fhi.split('T')[1]}</strong> ${name}
        </div>`;
      }).join('');

      if (hasTent) {
        const name = tentativeEvent.peritos[0].split(' ')[0];
        const extra = tentativeEvent.peritos.length > 1 ? ` (+${tentativeEvent.peritos.length - 1})` : '';
        evHTML += `<div class="cal-event" style="background:#EFF6FF;border:1px dashed #3B82F6;border-left:3px solid #3B82F6;color:#1D4ED8;" title="Borrador: ${tentativeEvent.peritos.join(', ')}">
          <strong>${tentativeEvent.time}</strong> ${name}${extra} (Nuevo)
        </div>`;
      }
    }

    gridHTML += `<div class="cal-day ${bgClass}">
      <div class="cal-date">${i}</div>
      <div class="cal-ev-wrap">${evHTML}</div>
    </div>`;
  }

  cal.querySelector('[data-cal-grid]').innerHTML = gridHTML;
  renderIcons(cal);
  return cal;
}