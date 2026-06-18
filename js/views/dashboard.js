window.init_dashboard = function() {
  const r=S.user?.role||'mesa';const u=ROLES[r];
  let ofs = S.solicitudes;
  if(r === 'perito') ofs = ofs.filter(o => o.peritos.includes(u.name));

  const pend=ofs.filter(o=>o.estado==='pendiente').length;
  const proc=ofs.filter(o=>o.estado==='en-proceso').length;
  const done=ofs.filter(o=>o.estado==='resuelto').length;
  let stats;
  
  if(r==='mesa' || r==='coordinador') {
    stats=[
      {lbl:'Solicitudes registradas',val:String(ofs.length),sub:'total en el sistema',col:'#1B3A6B',bg:'#EFF3F8',ic:'inbox'},
      {lbl:'Pendientes',val:String(pend),sub:'sin perito asignado',col:'#D97706',bg:'#FFFBEB',ic:'clock'},
      {lbl:'En proceso',val:String(proc),sub:'con perito asignado',col:'#1D4ED8',bg:'#EFF6FF',ic:'trend'},
      {lbl:'Resueltas',val:String(done),sub:'completadas',col:'#16A34A',bg:'#F0FDF4',ic:'checkC'},
    ];
  } else {
    stats=[
      {lbl:'Solicitudes activas',val:String(pend + proc),sub:'asignadas a mí en curso',col:'#1B3A6B',bg:'#EFF3F8',ic:'inbox'},
      {lbl:'Solicitudes finalizadas',val:String(done),sub:'informes entregados',col:'#16A34A',bg:'#F0FDF4',ic:'checkC'},
    ];
  }
  
  const wd=[{d:'Lun',i:8,r:5},{d:'Mar',i:12,r:9},{d:'Mi\u00e9',i:6,r:11},{d:'Jue',i:14,r:8},{d:'Vie',i:9,r:12}];
  const mx=Math.max(...wd.map(x=>Math.max(x.i,x.r)));
  const md=[42,58,51,67,73,61];const ml=['Ene','Feb','Mar','Abr','May','Jun'];
  const W=380,H=100,mn=30,mxV=80;
  const pts=md.map((v,i)=>(i*(W/(md.length-1)))+','+(H-Math.round(((v-mn)/(mxV-mn))*H))).join(' ');
  const dots=md.map((v,i)=>'<circle cx="'+Math.round(i*(W/(md.length-1)))+'" cy="'+(H-Math.round(((v-mn)/(mxV-mn))*H))+'" r="4" fill="#0EA5E9"/>').join('');
  const recent = ofs.slice(0,4); 
  
  if(S.successMsg) document.getElementById('dash-alert-container').innerHTML = '<div class="alert alert-success mb-4">'+ic('checkC',16,'#065F46')+' '+esc(S.successMsg)+'</div>';
  
  document.getElementById('dash-header').innerHTML = '<div><div class="page-title">Bienvenido/a, '+esc(u.name)+'</div><div class="page-sub">Lunes 15 de junio de 2026 — Sistema de gesti\u00f3n de peritos inform\u00e1ticos</div></div>'+ (r==='mesa'?'<button class="btn btn-primary" onclick="openModal(\'nueva-solicitud\')">'+ic('plus',15,'white')+' Nueva solicitud</button>':'');
  
  document.getElementById('dash-stats').innerHTML = stats.map(s=>'<div class="stat-card"><div class="stat-iw" style="background:'+s.bg+';">'+ic(s.ic,17,s.col)+'</div><div class="stat-val">'+s.val+'</div><div class="stat-lbl">'+s.lbl+'</div><div class="stat-sub">'+s.sub+'</div></div>').join('');
  
  if (r === 'perito') {
      document.getElementById('dash-charts').innerHTML = '<div class="card" style="grid-column: 1 / -1;"><div class="card-head"><div class="card-title">Mi Calendario de Asignaciones</div></div><div class="card-body" style="height: 250px; display: flex; align-items: center; justify-content: center; border: 2px dashed var(--border); border-radius: var(--radius);"><p style="color: var(--muted-fg);">[Espacio reservado para integrar el módulo de calendario]</p></div></div>';
  } else {
      document.getElementById('dash-charts').innerHTML = '<div class="card"><div class="card-head"><div><div class="card-title">Solicitudes por semana</div><div class="card-sub">Ingresadas vs. resueltas</div></div></div>'+
      '<div class="card-body"><div class="bar-chart-wrap">'+ wd.map(d=>'<div class="bar-group"><div class="bar-pair" style="height:140px;"><div class="bar-el" style="height:'+Math.round((d.i/mx)*100)+'%;background:#1B3A6B;"></div><div class="bar-el" style="height:'+Math.round((d.r/mx)*100)+'%;background:#0EA5E9;"></div></div><div class="bar-lbl">'+d.d+'</div></div>').join('')+
      '</div><div class="chart-legend"><div class="legend-item"><div class="legend-dot" style="background:#1B3A6B;"></div>Ingresadas</div><div class="legend-item"><div class="legend-dot" style="background:#0EA5E9;"></div>Resueltas</div></div></div></div>'+
      '<div class="card"><div class="card-head"><div><div class="card-title">Tendencia mensual</div><div class="card-sub">Solicitudes ingresadas 2026</div></div></div>'+
      '<div class="card-body"><svg viewBox="0 0 '+W+' '+(H+20)+'" style="width:100%;height:130px;" preserveAspectRatio="none">'+
      '<line x1="0" y1="'+Math.round(H*.33)+'" x2="'+W+'" y2="'+Math.round(H*.33)+'" stroke="#E8EDF4" stroke-width="1"/>'+
      '<line x1="0" y1="'+Math.round(H*.66)+'" x2="'+W+'" y2="'+Math.round(H*.66)+'" stroke="#E8EDF4" stroke-width="1"/>'+
      '<polyline points="'+pts+'" fill="none" stroke="#0EA5E9" stroke-width="2.5" stroke-linejoin="round"/>'+dots+
      ml.map((l,i)=>'<text x="'+Math.round(i*(W/(md.length-1)))+'" y="'+(H+16)+'" text-anchor="middle" font-size="11" fill="#5A6B82">'+l+'</text>').join('')+
      '</svg></div></div>';
  }
  
  document.getElementById('dash-recent-tbody').innerHTML = recent.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--muted-fg);">Sin solicitudes</td></tr>':
  recent.map(o=>'<tr onclick="nav(\'detalle-causa\',\''+o.id+'\')"><td class="td-mono">'+esc(o.id)+'</td><td style="font-size:12px;">'+esc(o.fiscal)+'</td>'+
  '<td><div class="td-trunc">'+esc(o.imputado)+' s/ '+esc(o.delito)+'</div></td><td style="font-size:12px;color:var(--muted-fg);">'+esc(o.jur)+'</td>'+
  '<td>'+ubdg(o.urgencia)+'</td><td>'+bdg(o.estado)+'</td></tr>').join('');
};