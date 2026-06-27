window.confirmAsig = async function(id) { 
    const o = S.solicitudes.find(x => x.id === id);
    
    if (o && o.estado === 'pendiente') {
        o.estado = 'en-proceso';
    }

    await DB.saveSolicitudes();
    showToast('Asignación confirmada para ' + `${(o.tipo==='narco'?'NAR-':'GEN-')}${id}`, 'success');
    
    init_asignacion(); 
};

// Función para dibujar la vista de asignación
window.init_asignacion = function() {
  const pend=S.solicitudes.filter(o=>o.estado!=='resuelto');
  document.getElementById('asig-header').innerHTML = '<div><div class="page-title">Asignaci\u00f3n de Peritos</div><div class="page-sub">'+S.solicitudes.filter(o=>o.peritos.length===0&&o.estado==='pendiente').length+' solicitudes pendientes de asignación</div></div>';
  
  document.getElementById('asig-peritos').innerHTML = S.peritos.map(p => {
        
        return `<div class="perito-item" style="display:flex; align-items:center; gap:12px;">
            <div style="width:40px; height:40px; border-radius:50%; background:var(--secondary); display:flex; align-items:center; justify-content:center; font-weight:600; color:var(--primary); font-size:14px;">
                ${esc(p.ini)}
            </div>
            <div style="flex:1;">
                <div style="font-weight:600; font-size:14px; color:var(--fg);">${esc(p.nombre)}</div>
            </div>
        </div>`;
    }).join('');
  const container = document.getElementById('asig-solicitudes');
  container.innerHTML = '';
  if (pend.length === 0) {
    container.innerHTML = '<div class="card"><div class="empty-state"><p>No hay solicitudes pendientes.</p></div></div>';
  } else {
    pend.forEach(o => {
      const g = o.estado === 'en-proceso';
      container.appendChild(buildCard(o, { mode: 'asignar', confirmed: g }));
    });
  }
  const calPanel = document.getElementById('asig-calendar-panel');
    if (calPanel) calPanel.innerHTML = buildCalendarHTML();
};