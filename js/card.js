function buildCard(o, opts = {}) {
  const wrap = document.createElement('div');
  wrap.innerHTML = COMPS.card;
  const card = wrap.firstElementChild;

  // ID y expediente
  card.querySelector('[data-cs-id]').textContent = (o.tipo === 'narco' ? 'NAR-' : 'GEN-') + esc(o.id);
  card.querySelector('[data-cs-exp]').textContent = 'Exp. ' + esc(o.exp);

  // Badges
  card.querySelector('[data-cs-badges]').innerHTML = ubdg(o.urgencia) + bdg(o.estado);

  // Título
  card.querySelector('[data-cs-title]').textContent = esc(o.imputado) + ' s/ ' + esc(o.delito);

  // Meta (Jur · Fiscal · Fecha)
  const meta = card.querySelector('[data-cs-meta]');
  meta.innerHTML = ic('pin', 11, 'var(--muted-fg)') + ' ' + esc(o.jur)
    + ' · ' + ic('file', 11, 'var(--muted-fg)') + ' ' + esc(o.fiscal)
    + ' · ' + ic('cal', 11, 'var(--muted-fg)') + ' '
    + (o.fhi ? '<strong>' + fmtDT(o.fhi) + '</strong>' : '<span class="muted">Sin asignar</span>');

  // Peritos
  const peritos = card.querySelector('[data-cs-peritos]');
  if (o.peritos.length > 0) {
    peritos.innerHTML = o.peritos.map(p =>
      '<span class="assigned-chip">' + ic('user', 11, 'var(--primary)') + ' ' + esc(p) + '</span>'
    ).join('');
  } else {
    peritos.innerHTML = '<span class="cs-peritos-empty">Sin asignar</span>';
  }

  // Acciones según modo
  const actions = card.querySelector('[data-cs-actions]');
  if (opts.mode === 'ver') {
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary btn-sm';
    btn.innerHTML = ic('eye', 13, 'white') + ' Ver';
    btn.addEventListener('click', e => { e.stopPropagation(); nav('detalle-causa', o.id+'@'+o.tipo); });
    actions.appendChild(btn);
  } else if (opts.mode === 'asignar') {
    if (opts.confirmed) {
      const b = document.createElement('span');
      b.className = 'badge badge-estado br';
      b.textContent = 'Confirmado';
      actions.appendChild(b);
    } else {
      const btn = document.createElement('button');
      btn.className = 'btn btn-primary btn-sm';
      const hasP = o.peritos.length > 0;
      btn.innerHTML = ic(hasP ? 'edit' : 'users', 13, 'white') + ' ' + (hasP ? 'Editar' : 'Asignar');
      btn.addEventListener('click', () => openAM(o.id, o.tipo));
      actions.appendChild(btn);
      if (hasP) {
        const btn2 = document.createElement('button');
        btn2.className = 'btn btn-success btn-sm';
        btn2.innerHTML = ic('check', 13, 'white') + ' Confirmar';
        btn2.addEventListener('click', () => confirmAsig(o.id, o.tipo));
        actions.appendChild(btn2);
      }
    }
  }

  // Click en toda la card (solo para modo 'ver')
  if (opts.onClick) {
    card.classList.add('clickable');
    card.addEventListener('click', () => nav('detalle-causa', o.id+'@'+o.tipo));
  }

  // Clase confirmed
  if (opts.confirmed) card.classList.add('confirmed');

  return card;
}