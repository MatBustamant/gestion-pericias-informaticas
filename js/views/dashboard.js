window.init_dashboard = function() {
  const r=S.user?.rol||'mesa';const u=S.user||{};
  let ofs = S.solicitudes;
  if(r === 'perito') ofs = ofs.filter(o => o.peritos.includes(u.nombre) && o.estado !== 'pendiente');

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
  
  document.getElementById('dash-header').innerHTML = '<div><div class="page-title">Bienvenido/a, '+esc(u.nombre)+'</div><div class="page-sub">Lunes 15 de junio de 2026 — Sistema de gesti\u00f3n de peritos inform\u00e1ticos</div></div>'+ (r==='mesa'?'<button class="btn btn-primary" onclick="openModal(\'nueva-solicitud\')">'+ic('plus',15,'white')+' Nueva solicitud</button>':'');
  
  document.getElementById('dash-stats').innerHTML = stats.map(s=>'<div class="stat-card"><div class="stat-iw" style="background:'+s.bg+';">'+ic(s.ic,17,s.col)+'</div><div class="stat-val">'+s.val+'</div><div class="stat-lbl">'+s.lbl+'</div><div class="stat-sub">'+s.sub+'</div></div>').join('');
  
  if (r === 'perito') {
      document.getElementById('dash-charts').innerHTML = `
      <div class="card" style="grid-column: 1 / -1; overflow:hidden; display:flex; flex-direction:column; min-height:400px;">
          <div class="card-head"><div class="card-title">Agenda Global de Pericias</div></div>
          <div class="card-body" style="padding:0; flex:1;">
              ${buildCalendarHTML()} 
          </div>
      </div>`;
  } else {
      document.getElementById('dash-charts').innerHTML = `
      <div class="card" style="overflow:hidden; display:flex; flex-direction:column; min-height:400px;">
          <div class="card-head"><div><div class="card-title">Agenda General</div><div class="card-sub">Vista de aperturas programadas globales</div></div></div>
          <div class="card-body" style="padding:0; flex:1;">
              ${buildCalendarHTML()}
          </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:16px;">
          <div class="card" style="margin-bottom:0;">
              <div class="card-head"><div><div class="card-title">Solicitudes por semana</div></div></div>
              <div class="card-body"><div class="bar-chart-wrap">`+ wd.map(d=>`<div class="bar-group"><div class="bar-pair" style="height:140px;"><div class="bar-el" style="height:`+Math.round((d.i/mx)*100)+`%;background:#1B3A6B;"></div><div class="bar-el" style="height:`+Math.round((d.r/mx)*100)+`%;background:#0EA5E9;"></div></div><div class="bar-lbl">`+d.d+`</div></div>`).join('')+
              `</div><div class="chart-legend"><div class="legend-item"><div class="legend-dot" style="background:#1B3A6B;"></div>Ingresadas</div><div class="legend-item"><div class="legend-dot" style="background:#0EA5E9;"></div>Resueltas</div></div></div>
          </div>
      </div>`;
  }
  
  document.getElementById('dash-recent-tbody').innerHTML = recent.length===0?'<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--muted-fg);">Sin resultados</td></tr>':
  recent.map(o=>'<tr onclick="nav(\'detalle-causa\',\''+o.id+'\')"><td class="td-mono">'+(o.tipo==='narco'?'NAR-':'GEN-')+esc(o.id)+'</td><td style="font-size:12px;color:var(--muted-fg);">'+esc(o.exp)+'</td>'+
  '<td><div class="td-trunc" style="max-width:140px;">'+esc(o.imputado)+'</div></td><td><div class="td-trunc" style="max-width:160px;font-size:12px;color:var(--muted-fg);">'+esc(o.delito)+'</div></td>'+
  '<td style="font-size:12px;">'+esc(o.fiscal)+'</td><td style="font-size:12px;">'+esc(o.jur)+'</td>'+
  '<td>'+ubdg(o.urgencia)+'</td><td>'+bdg(o.estado)+'</td>'+
  '<td><button class="btn-icon" onclick="event.stopPropagation();nav(\'detalle-causa\',\''+o.id+'\')">'+ic('eye',15)+'</button></td></tr>').join('');
};