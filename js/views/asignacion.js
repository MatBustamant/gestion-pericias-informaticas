function init_asignacion() {
  const pend = S.solicitudes.filter(o => o.estado !== 'resuelto');
  const pendCount = S.solicitudes.filter(o => o.peritos.length === 0 && o.estado === 'pendiente').length;

  // Header
  document.getElementById('asig-subtitle').textContent = pendCount + ' solicitudes pendientes de asignación';

  // Peritos — template clone
  const pContainer = document.getElementById('asig-peritos');
  pContainer.innerHTML = '';
  const tpl = document.getElementById('perito-item-tpl');
  S.peritos.forEach(p => {
    const item = tpl.content.cloneNode(true);
    item.querySelector('[data-pa-ini]').textContent = p.ini;
    item.querySelector('[data-pa-name]').textContent = p.nombre;
    pContainer.appendChild(item);
  });

  // Solicitudes
  const container = document.getElementById('asig-solicitudes');
  const empty = document.getElementById('asig-empty');
  container.innerHTML = '';
  if (pend.length === 0) {
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    pend.forEach(o => container.appendChild(buildCard(o, { mode: 'asignar', confirmed: o.estado === 'en-proceso' })));
  }

}