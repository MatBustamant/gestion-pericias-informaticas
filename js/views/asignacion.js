window.confirmAsig = function(id) { 
    S.asigGuardados.add(id); 
    
    const o = S.solicitudes.find(x => x.id === id);
    
    if (o && o.estado === 'pendiente') {
        o.estado = 'en-proceso';
    }
    
    init_asignacion(); 
};

// Función para dibujar la vista de asignación
window.init_asignacion = function() {
  const pend=S.solicitudes.filter(o=>o.estado!=='resuelto');
  document.getElementById('asig-header').innerHTML = '<div><div class="page-title">Asignaci\u00f3n de Peritos</div><div class="page-sub">'+S.solicitudes.filter(o=>o.peritos.length===0&&o.estado==='pendiente').length+' solicitudes pendientes de asignación</div></div>';
  
  const cols=['#1B3A6B','#0EA5E9','#DC2626','#10B981','#D97706','#7C3AED'];
  document.getElementById('asig-peritos').innerHTML = S.peritos.map(p => {
        // Obtenemos las iniciales para el avatar
        const ini = p.nombre.split(' ').map(n => n[0]).join('');
        
        return `<div class="card" style="display:flex; align-items:center; gap:12px; padding:12px;">
            <div style="width:40px; height:40px; border-radius:50%; background:var(--border); display:flex; align-items:center; justify-content:center; font-weight:600; color:var(--muted-fg); font-size:14px;">
                ${ini}
            </div>
            <div style="flex:1;">
                <div style="font-weight:600; font-size:14px;">${esc(p.nombre)}</div>
                <div style="font-size:12px; color:var(--muted-fg); margin-top:2px;">${esc(p.esp)}</div>
            </div>
        </div>`;
    }).join('');
  document.getElementById('asig-solicitudes').innerHTML = pend.length===0?'<div class="card"><div class="empty-state"><p>No hay solicitudes pendientes.</p></div></div>':
  pend.map(o=>{
    const g=S.asigGuardados.has(o.id);
    return '<div class="solicitud-card'+(g?' confirmed':'')+'"><div class="solicitud-meta"><span class="td-mono">'+(o.tipo==='narco'?'NAR-':'GEN-')+esc(o.id)+'</span>'+ubdg(o.urgencia)+bdg(o.estado)+(g?'<span class="badge br">'+ic('checkC',10,'#065F46')+' Confirmado</span>':'')+'</div>'+
    '<div class="solicitud-title">'+esc(o.imputado)+' s/ '+esc(o.delito)+'</div><div class="solicitud-details">'+ic('file',11,'var(--muted-fg)')+' '+esc(o.fiscal)+'&nbsp;&nbsp;·&nbsp;&nbsp;'+ic('pin',11,'var(--muted-fg)')+' '+esc(o.jur)+(o.fhi?'&nbsp;&nbsp;·&nbsp;&nbsp;'+ic('cal',11,'var(--muted-fg)')+' Apertura: <strong>'+fmtDT(o.fhi)+'</strong>':'')+'</div>'+
    '<div class="solicitud-foot"><span style="font-size:12px;font-weight:500;color:var(--muted-fg);">Perito/s:</span>'+(o.peritos.length>0?o.peritos.map(p=>'<span class="assigned-chip">'+ic('user',11,'var(--primary)')+' '+esc(p)+'</span>').join(''):'<span style="font-size:13px;color:var(--muted-fg);">Sin asignar</span>')+
    '<div style="margin-left:auto;display:flex;gap:8px;">'+(!g?'<button class="btn btn-primary btn-sm" onclick="openAM(\''+o.id+'\')">'+ic(o.peritos.length>0?'edit':'users',13,'white')+' '+(o.peritos.length>0?'Editar':'Asignar')+'</button>':'')+(!g&&o.peritos.length>0?'<button class="btn btn-success btn-sm" onclick="confirmAsig(\''+o.id+'\')">'+ic('check',13,'white')+' Confirmar</button>':'')+'</div></div></div>';
  }).join('');
  const calPanel = document.getElementById('asig-calendar-panel');
    if (calPanel) calPanel.innerHTML = buildCalendarHTML();
};