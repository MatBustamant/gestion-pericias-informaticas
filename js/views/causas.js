window.upCS = function(v){S.causasSearch=v; init_causas();}; window.setCE = function(f){S.causasEstado=f; init_causas();}; window.setCU = function(f){S.causasUrgencia=f; init_causas();}; window.setCJ = function(f){S.causasJurisdiccion=f; init_causas();}; window.toggleCF = function(){S.causasShowFilters=!S.causasShowFilters; init_causas();};
window.init_causas = function() {
  let list=S.solicitudes;
  if(S.user?.rol === 'perito') list = list.filter(o => o.peritos.includes(S.user.nombre) && o.estado !== 'pendiente');
  if(S.causasSearch){const q=S.causasSearch.toLowerCase();list=list.filter(o=>o.id.toLowerCase().includes(q)||o.exp.toLowerCase().includes(q)||o.imputado.toLowerCase().includes(q)||o.victima.toLowerCase().includes(q)||o.delito.toLowerCase().includes(q)||o.fiscal.toLowerCase().includes(q)||o.peritos.join(' ').toLowerCase().includes(q));}
  if(S.causasEstado!=='todos') list=list.filter(o=>o.estado===S.causasEstado);
  if(S.causasUrgencia!=='todos') list=list.filter(o=>o.urgencia===S.causasUrgencia);
  if(S.causasJurisdiccion!=='todos') list=list.filter(o=>o.jur===S.causasJurisdiccion);
  
  // Search
  document.getElementById('causas-search').value = S.causasSearch;

  // Filter button
  const filterBtn = document.getElementById('causas-btn-filter');
  filterBtn.classList.toggle('active', S.causasShowFilters);
  const filterCount = [S.causasEstado, S.causasUrgencia, S.causasJurisdiccion].filter(f => f !== 'todos').length;
  const countBadge = document.getElementById('causas-filter-count');
  countBadge.classList.toggle('hidden', filterCount === 0);
  if (filterCount > 0) countBadge.textContent = filterCount;

  // Filter panel
  const panel = document.getElementById('causas-panel-filters');
  panel.classList.toggle('hidden', !S.causasShowFilters);
  if (S.causasShowFilters) {
    // Active pills
    document.querySelectorAll('#causas-panel-filters [data-ce]').forEach(b => b.classList.toggle('active', b.dataset.ce === S.causasEstado));
    document.querySelectorAll('#causas-panel-filters [data-cu]').forEach(b => b.classList.toggle('active', b.dataset.cu === S.causasUrgencia));
    document.querySelectorAll('#causas-panel-filters [data-cj]').forEach(b => b.classList.toggle('active', b.dataset.cj === S.causasJurisdiccion));
  }

  // Resultados
  const sub = document.getElementById('causas-subtitle');
  sub.textContent = list.length + ' causa' + (list.length !== 1 ? 's' : '') + ' disponible' + (list.length !== 1 ? 's' : '') + (S.causasSearch ? ' para "' + esc(S.causasSearch) + '"' : '');  

  const empty = document.getElementById('causas-empty');
  const cards = document.getElementById('causas-cards');
  cards.innerHTML = '';
  if (list.length === 0) {
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    list.forEach(o => cards.appendChild(buildCard(o, { mode: 'ver', onClick: true })));
  }
};