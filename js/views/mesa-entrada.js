window.upMS = function(v) { S.mesaSearch=v; init_mesa_entrada(); };
window.setMF = function(f) { S.mesaFiltro=f; init_mesa_entrada(); };

window.init_mesa_entrada = function() {
  let list=S.solicitudes;
  if(S.mesaSearch){const q=S.mesaSearch.toLowerCase();list=list.filter(o=>o.id.toLowerCase().includes(q)||o.exp.toLowerCase().includes(q)||o.imputado.toLowerCase().includes(q)||o.delito.toLowerCase().includes(q)||o.fiscal.toLowerCase().includes(q)||o.jur.toLowerCase().includes(q));}
  if(S.mesaFiltro!=='todos') list=list.filter(o=>o.estado===S.mesaFiltro);
  
  document.getElementById('mesa-header').innerHTML = '<div><div class="page-title">Mesa de Entrada</div><div class="page-sub">'+S.solicitudes.length+' solicitudes registradas</div></div><button class="btn btn-primary" onclick="openModal(\'nueva-solicitud\')">'+ic('plus',15,'white')+' Registrar solicitud</button>';
  
  document.getElementById('mesa-search').value = S.mesaSearch;
  
  const fl=['todos','pendiente','en-proceso','resuelto'];
  const flbl={todos:'Todas',pendiente:'Pendiente',['en-proceso']:'En proceso',resuelto:'Resuelta'};
  document.getElementById('mesa-filters').innerHTML = fl.map(f=>'<button class="filter-btn'+(S.mesaFiltro===f?' active':'')+'" onclick="setMF(\''+f+'\')">'+flbl[f]+'</button>').join('');
  
  document.getElementById('mesa-tbody').innerHTML = list.length===0?'<tr><td colspan="11" style="text-align:center;padding:40px;color:var(--muted-fg);">Sin resultados</td></tr>':
  list.map(o=>'<tr onclick="nav(\'detalle-causa\',\''+o.id+'\')"><td class="td-mono">'+(o.tipo==='narco'?'NAR-':'GEN-')+esc(o.id)+'</td><td style="font-size:12px;color:var(--muted-fg);">'+esc(o.exp)+'</td>'+
  '<td><div class="td-trunc" style="max-width:140px;">'+esc(o.imputado)+'</div></td><td><div class="td-trunc" style="max-width:160px;font-size:12px;color:var(--muted-fg);">'+esc(o.delito)+'</div></td>'+
  '<td style="font-size:12px;">'+esc(o.fiscal)+'</td><td style="font-size:12px;">'+esc(o.jur)+'</td><td style="font-size:12px;color:var(--muted-fg);white-space:nowrap;">'+esc(o.ingreso)+'</td>'+
  '<td>'+ubdg(o.urgencia)+'</td><td>'+bdg(o.estado)+'</td>'+
  '<td><button class="btn-icon" onclick="event.stopPropagation();nav(\'detalle-causa\',\''+o.id+'\')">'+ic('eye',15)+'</button></td></tr>').join('');
  
  document.getElementById('mesa-pagination').innerHTML = '<span>Mostrando '+list.length+' de '+S.solicitudes.length+' solicitudes</span><div class="page-btns"><button class="page-btn active">1</button><button class="page-btn">2</button><button class="page-btn">3</button></div>';
};