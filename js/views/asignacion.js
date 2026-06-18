window.confirmAsig = function(id){ S.asigGuardados.add(id); init_asignacion(); };
window.init_asignacion = function() {
  const pend=S.solicitudes.filter(o=>o.estado!=='resuelto');
  document.getElementById('asig-header').innerHTML = '<div><div class="page-title">Asignaci\u00f3n de Peritos</div><div class="page-sub">'+S.solicitudes.filter(o=>o.peritos.length===0&&o.estado==='pendiente').length+' solicitudes pendientes de asignación</div></div>';
  
  const cols=['#1B3A6B','#0EA5E9','#DC2626','#10B981','#D97706','#7C3AED'];
  document.getElementById('asig-peritos').innerHTML = S.peritos.map((p,i)=>{
    const pct=Math.round((p.carga/p.max)*100);
    return '<div class="perito-item"><div style="display:flex;align-items:flex-start;gap:10px;"><div class="perito-av" style="background:'+cols[i%cols.length]+';color:white;">'+esc(p.ini)+'</div>'+
    '<div style="flex:1;min-width:0;"><div style="display:flex;align-items:center;justify-content:space-between;gap:8px;"><span style="font-size:13px;font-weight:600;">'+esc(p.nombre)+'</span>'+
    '<span class="av-badge" style="color:'+(p.disp?'#065F46':'#991B1B')+';background:'+(p.disp?'#D1FAE5':'#FEE2E2')+';">'+(p.disp?'Disponible':'Completo')+'</span></div><div style="font-size:11px;color:var(--muted-fg);margin-top:2px;">'+esc(p.esp)+'</div>'+
    '<div class="pb-wrap"><div class="pb-track"><div class="pb-fill" style="width:'+pct+'%;background:'+pbcol(p.carga,p.max)+';"></div></div><span style="font-size:10px;color:var(--muted-fg);">'+p.carga+'/'+p.max+'</span></div></div></div></div>';
  }).join('');

  document.getElementById('asig-solicitudes').innerHTML = pend.length===0?'<div class="card"><div class="empty-state"><p>No hay solicitudes pendientes.</p></div></div>':
  pend.map(o=>{
    const g=S.asigGuardados.has(o.id);
    return '<div class="solicitud-card'+(g?' confirmed':'')+'"><div class="solicitud-meta"><span class="td-mono">'+esc(o.id)+'</span>'+ubdg(o.urgencia)+bdg(o.estado)+(g?'<span class="badge br">'+ic('checkC',10,'#065F46')+' Confirmado</span>':'')+'</div>'+
    '<div class="solicitud-title">'+esc(o.imputado)+' s/ '+esc(o.delito)+'</div><div class="solicitud-details">'+ic('file',11,'var(--muted-fg)')+' '+esc(o.fiscal)+'&nbsp;&nbsp;·&nbsp;&nbsp;'+ic('pin',11,'var(--muted-fg)')+' '+esc(o.jur)+'&nbsp;&nbsp;·&nbsp;&nbsp;'+ic('clock',11,'var(--muted-fg)')+' Vence: '+esc(o.venc)+(o.fhi?'&nbsp;&nbsp;·&nbsp;&nbsp;'+ic('cal',11,'var(--muted-fg)')+' Apertura: <strong>'+fmtDT(o.fhi)+'</strong>':'')+'</div>'+
    '<div class="solicitud-foot"><span style="font-size:12px;font-weight:500;color:var(--muted-fg);">Perito/s:</span>'+(o.peritos.length>0?o.peritos.map(p=>'<span class="assigned-chip">'+ic('user',11,'var(--primary)')+' '+esc(p)+'</span>').join(''):'<span style="font-size:13px;color:var(--muted-fg);">Sin asignar</span>')+
    '<div style="margin-left:auto;display:flex;gap:8px;">'+(!g?'<button class="btn btn-primary btn-sm" onclick="openAM(\''+o.id+'\')">'+ic(o.peritos.length>0?'edit':'users',13,'white')+' '+(o.peritos.length>0?'Editar':'Asignar')+'</button>':'')+(!g&&o.peritos.length>0?'<button class="btn btn-success btn-sm" onclick="confirmAsig(\''+o.id+'\')">'+ic('check',13,'white')+' Confirmar</button>':'')+'</div></div></div>';
  }).join('');
};