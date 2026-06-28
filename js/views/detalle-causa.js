window.setDT = function(t) {
  S.detalleTab = t;
  document.querySelectorAll('[data-dc-tab]').forEach(b =>
    b.classList.toggle('active', b.dataset.dcTab === t)
  );
  document.getElementById('dc-tab-info').classList.toggle('hidden', t !== 'info');
  document.getElementById('dc-tab-archivos').classList.toggle('hidden', t !== 'archivos');
};

window.init_detalle_causa = function() {
  const o = S.solicitudes.find(x => x.id === S.detailId);
  const container = document.getElementById('detalle-container');
  if (!o) {
    container.innerHTML = '<div class="alert alert-warning">' + ic('alertC', 16) + ' Solicitud no encontrada.</div>';
    return;
  }
  if (S.user?.rol === 'perito' && !o.peritos.includes(S.user.nombre)) {
    container.innerHTML = '<div class="alert alert-warning" style="margin-top: 1rem;">' + ic('lock', 16) + ' <strong>Acceso denegado:</strong> Esta solicitud pertenece a otro perito y usted no tiene permisos para verla.</div>';
    return;
  }

  // Hero
  container.querySelector('[data-dc-id]').textContent = (o.tipo === 'narco' ? 'NAR-' : 'GEN-') + o.id;
  container.querySelector('[data-dc-estado]').innerHTML = bdg(o.estado);
  container.querySelector('[data-dc-urgencia]').innerHTML = ubdg(o.urgencia);
  container.querySelector('[data-dc-title]').textContent = o.imputado + ' s/ ' + o.delito;
  container.querySelector('[data-dc-subtitle]').textContent = o.fiscal + ' — ' + o.jur;

  // Perito alert
  const alert = document.getElementById('dc-alert');
  if (o.peritos.length === 0) {
    alert.className = 'alert alert-warning';
    alert.innerHTML = ic('alertC', 16, '#A16207') + ' <span><strong>Sin perito asignado.</strong> Esta solicitud requiere asignación.</span>';
  } else {
    alert.className = 'alert alert-info';
    alert.innerHTML = ic('user', 16, '#1D4ED8') + ' <span><strong>Perito/s:</strong> ' + esc(o.peritos.join(', ')) + ' — Pericia en curso</span>';
  }

  // Rellenar rows con template
  const tpl = document.getElementById('detail-row-tpl');

  function fillRows(section, rows) {
    const el = container.querySelector('[data-dc-' + section + ']');
    el.innerHTML = '';
    rows.forEach(r => {
      const item = tpl.content.cloneNode(true);
      if (r.ic) {
        item.querySelector('[data-dr-icon]').innerHTML = ic(r.ic, 14, 'var(--muted-fg)');
      } else {
        item.querySelector('[data-dr-icon]').style.display = 'none';
      }
      item.querySelector('[data-dr-lbl]').textContent = r.l;
      const valEl = item.querySelector('[data-dr-val]');
      valEl.textContent = r.v;
      if (r.muted) valEl.style.color = 'var(--muted-fg)';
      el.appendChild(item);
    });
  }

  fillRows('solicitud', [
    { ic: 'hash', l: 'Nº Interno', v: (o.tipo === 'narco' ? 'NAR-' : 'GEN-') + o.id },
    { ic: 'file', l: 'Nº de Legajo de Causa', v: o.exp },
    { ic: 'pin', l: 'Circunscripción', v: o.jur },
    { ic: 'tag', l: 'Urgencia', v: o.urgencia.charAt(0).toUpperCase() + o.urgencia.slice(1) }
  ]);

  fillRows('partes', [
    { l: 'Imputado/a', v: o.imputado },
    { l: 'Víctima', v: o.victima },
    { l: 'Delito investigado', v: o.delito },
    { l: 'Fiscal requirente', v: o.fiscal }
  ]);

  fillRows('asignacion', [
    { l: 'Peritos responsables', v: o.peritos.length > 0 ? o.peritos.join(', ') : 'Sin asignar', muted: o.peritos.length === 0 },
    { l: 'Fecha/hora apertura de informe', v: o.fhi ? fmtDT(o.fhi) : 'No programada', muted: !o.fhi }
  ]);

  // Secuestros y tareas
  container.querySelector('[data-dc-secuestros]').innerHTML = esc(o.secuestros);
  container.querySelector('[data-dc-tareas]').innerHTML = esc(o.tareas);

  // Archivos
  const adjuntarEl = container.querySelector('[data-dc-adjuntar]');
  adjuntarEl.innerHTML = S.user?.rol !== 'coordinador'
    ? '<button class="btn btn-ghost btn-sm">' + ic('clip', 13) + ' Adjuntar</button>'
    : '';

  const files = [
    { n: 'Solicitud_' + o.id + '.pdf', t: 'PDF', s: '2.4 MB' },
    { n: 'Acta_secuestro_' + o.exp + '.pdf', t: 'PDF', s: '1.1 MB' }
  ];
  const fileListEl = container.querySelector('[data-dc-archivos-list]');
  fileListEl.innerHTML = '';
  const fileTpl = document.getElementById('file-row-tpl');
  files.forEach(f => {
    const item = fileTpl.content.cloneNode(true);
    item.querySelector('[data-fi-icon]').innerHTML = ic('file', 16, '#DC2626');
    item.querySelector('[data-fi-name]').textContent = f.n;
    item.querySelector('[data-fi-meta]').textContent = f.t + ' · ' + f.s;
    item.querySelector('[data-fi-dl]').innerHTML = ic('dl', 15);
    fileListEl.appendChild(item);
  });

  // Restaurar tab activo
  setDT(S.detalleTab || 'info');
};