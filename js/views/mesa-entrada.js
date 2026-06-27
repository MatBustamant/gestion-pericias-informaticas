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
  
  document.getElementById('mesa-header').innerHTML = '<div><div class="page-title">Mesa de Entrada</div><div class="page-sub">'+S.solicitudes.length+' solicitudes registradas</div></div><div style="display:flex; gap:12px;"><button class="btn btn-primary" onclick="promptDesestimarSolicitud()">'+ic('x',15,'white')+' Desestimar solicitud</button><button class="btn btn-primary" onclick="promptEditSolicitud()">'+ic('edit',15,'white')+' Modificar solicitud</button><button class="btn btn-primary" onclick="openModal(\'nueva-solicitud\')">'+ic('plus',15,'white')+' Registrar solicitud</button></div>';
  document.getElementById('mesa-search').value = S.mesaSearch;
  
  document.getElementById('mesa-btn-filter').innerHTML = '<button class="filter-btn'+(S.mesaShowFilters?' active':'')+'" onclick="toggleMF()" style="display:flex;align-items:center;gap:6px;">'+ic('sliders',14)+' Filtros'+((S.mesaEstado!=='todos'||S.mesaUrgencia!=='todos'||S.mesaJurisdiccion!=='todos')?'<span style="width:16px;height:16px;border-radius:50%;background:var(--primary);color:white;font-size:9px;display:flex;align-items:center;justify-content:center;">'+[S.mesaEstado,S.mesaUrgencia,S.mesaJurisdiccion].filter(f=>f!=='todos').length+'</span>':'')+'</button>';
  const juris=[...new Set(S.solicitudes.map(o=>o.jur))];
  document.getElementById('mesa-panel-filters').innerHTML = S.mesaShowFilters?'<div class="filters-panel"><div><div class="fg-lbl">ESTADO</div><div class="filter-pills">'+
  ['todos','pendiente','en-proceso','resuelto'].map(f=>'<button class="filter-btn'+(S.mesaEstado===f?' active':'')+'" onclick="setME(\''+f+'\')">'+{todos:'Todas',pendiente:'Pendiente',['en-proceso']:'En proceso',resuelto:'Resuelta'}[f]+'</button>').join('')+'</div></div><div class="filter-divider"></div>'+
  '<div><div class="fg-lbl">URGENCIA</div><div class="filter-pills">'+['todos','alta','media','baja'].map(f=>'<button class="filter-btn'+(S.mesaUrgencia===f?' active':'')+'" onclick="setMU(\''+f+'\')">'+{todos:'Todas',alta:'Alta',media:'Media',baja:'Baja'}[f]+'</button>').join('')+'</div></div><div class="filter-divider"></div>'+
  '<div><div class="fg-lbl">CIRCUNSCRIPCIÓN</div><div class="filter-pills"><button class="filter-btn'+(S.mesaJurisdiccion==='todos'?' active':'')+'" onclick="setMJ(\'todos\')">Todas</button>'+juris.map(j=>'<button class="filter-btn'+(S.mesaJurisdiccion===j?' active':'')+'" onclick="setMJ(\''+j+'\')">'+j+'</button>').join('')+'</div></div></div>':'';

  document.getElementById('mesa-tbody').innerHTML = list.length===0?'<tr><td colspan="11" style="text-align:center;padding:40px;color:var(--muted-fg);">Sin resultados</td></tr>':
  list.map(o=>'<tr onclick="nav(\'detalle-causa\',\''+o.id+'\')"><td class="td-mono">'+(o.tipo==='narco'?'NAR-':'GEN-')+esc(o.id)+'</td><td style="font-size:12px;color:var(--muted-fg);">'+esc(o.exp)+'</td>'+
  '<td><div class="td-trunc" style="max-width:140px;">'+esc(o.imputado)+'</div></td><td><div class="td-trunc" style="max-width:160px;font-size:12px;color:var(--muted-fg);">'+esc(o.delito)+'</div></td>'+
  '<td style="font-size:12px;">'+esc(o.fiscal)+'</td><td style="font-size:12px;">'+esc(o.jur)+'</td>'+
  '<td>'+ubdg(o.urgencia)+'</td><td>'+bdg(o.estado)+'</td>'+
  '<td><button class="btn-icon" onclick="event.stopPropagation();nav(\'detalle-causa\',\''+o.id+'\')">'+ic('eye',15)+'</button></td></tr>').join('');
  
  document.getElementById('mesa-pagination').innerHTML = '<span>Mostrando '+list.length+' de '+S.solicitudes.length+' solicitudes</span><div class="page-btns"><button class="page-btn active">1</button><button class="page-btn">2</button><button class="page-btn">3</button></div>';
};