window.upMS = function(v) { S.mesaSearch=v; init_mesa_entrada(); };
window.setME = function(f) { S.mesaEstado=f; init_mesa_entrada(); };
window.setMU = function(f) { S.mesaUrgencia=f; init_mesa_entrada(); };
window.setMJ = function(f) { S.mesaJurisdiccion=f; init_mesa_entrada(); };
window.toggleMF = function() { S.mesaShowFilters=!S.mesaShowFilters; init_mesa_entrada(); };

window.init_mesa_entrada = function() {
  let list=S.solicitudes;
  if(S.mesaSearch){const q=S.mesaSearch.toLowerCase();list=list.filter(o=>o.id.toLowerCase().includes(q)||o.exp.toLowerCase().includes(q)||o.imputado.toLowerCase().includes(q)||o.victima.toLowerCase().includes(q)||o.delito.toLowerCase().includes(q)||o.fiscal.toLowerCase().includes(q)||o.peritos.join(' ').toLowerCase().includes(q));}
  if(S.mesaEstado!=='todos') list=list.filter(o=>o.estado===S.mesaEstado);
  if(S.mesaUrgencia!=='todos') list=list.filter(o=>o.urgencia===S.mesaUrgencia);
  if(S.mesaJurisdiccion!=='todos') list=list.filter(o=>o.jur===S.mesaJurisdiccion);

  // Header
  document.getElementById('mesa-subtitle').textContent = S.solicitudes.length + ' solicitudes registradas';

  // Búsqueda
  document.getElementById('mesa-search').value = S.mesaSearch;

  // Botón de filtros
  const filterBtn = document.getElementById('mesa-btn-filter');
  filterBtn.classList.toggle('active', S.mesaShowFilters);
  const filterCount = [S.mesaEstado, S.mesaUrgencia, S.mesaJurisdiccion].filter(f => f !== 'todos').length;
  const countBadge = document.getElementById('mesa-filter-count');
  countBadge.classList.toggle('hidden', filterCount === 0);
  if (filterCount > 0) countBadge.textContent = filterCount;

  // Filtros
  const panel = document.getElementById('mesa-panel-filters');
  panel.classList.toggle('hidden', !S.mesaShowFilters);
  if (S.mesaShowFilters) {
    document.querySelectorAll('#mesa-panel-filters [data-me]').forEach(b => b.classList.toggle('active', b.dataset.me === S.mesaEstado));
    document.querySelectorAll('#mesa-panel-filters [data-mu]').forEach(b => b.classList.toggle('active', b.dataset.mu === S.mesaUrgencia));
    document.querySelectorAll('#mesa-panel-filters [data-mj]').forEach(b => b.classList.toggle('active', b.dataset.mj === S.mesaJurisdiccion));
  }

  // Tabla
  const tbody = document.getElementById('mesa-tbody');
  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--muted-fg);">Sin resultados</td></tr>';
  } else {
    tbody.innerHTML = '';
    const tpl = document.getElementById('mesa-row-tpl');
    list.forEach(o => {
      const el = tpl.content.cloneNode(true);
      const tr = el.querySelector('[data-mr-idx]');
      tr.addEventListener('click', () => nav('detalle-causa', o.id+'@'+o.tipo));
      el.querySelector('[data-mr-id]').textContent = (o.tipo === 'narco' ? 'NAR-' : 'GEN-') + o.id;
      el.querySelector('[data-mr-exp]').textContent = o.exp;
      el.querySelector('[data-mr-imp]').textContent = o.imputado;
      el.querySelector('[data-mr-del]').textContent = o.delito;
      el.querySelector('[data-mr-fis]').textContent = o.fiscal;
      el.querySelector('[data-mr-jur]').textContent = o.jur;
      el.querySelector('[data-mr-urg]').innerHTML = ubdg(o.urgencia);
      el.querySelector('[data-mr-est]').innerHTML = bdg(o.estado);
      el.querySelector('[data-mr-eye]').innerHTML = ic('eye', 15);
      el.querySelector('[data-mr-eye]').addEventListener('click', e => { e.stopPropagation(); nav('detalle-causa', o.id+'@'+o.tipo); });
      tbody.appendChild(el);
    });
  }

  // Paginación
  document.getElementById('mesa-pg-info').textContent = 'Mostrando ' + list.length + ' de ' + S.solicitudes.length + ' solicitudes';

}