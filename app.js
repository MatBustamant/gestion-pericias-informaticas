/* ===== ICONS ===== */
const IC={
  scale:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="3" x2="12" y2="20"/><line x1="8" y1="6" x2="16" y2="6"/><path d="M4 10l4-4 4 4M12 10l4-4 4 4"/><line x1="4" y1="10" x2="8" y2="20"/><line x1="20" y1="10" x2="16" y2="20"/><line x1="8" y1="20" x2="16" y2="20"/></svg>',
  dash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  inbox:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22,12 16,12 14,15 10,15 8,12 2,12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  file:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  logout:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20,6 9,17 4,12"/></svg>',
  checkC:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>',
  alertC:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  arrowL:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>',
  chevR:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,18 15,12 9,6"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  hash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>',
  tag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  msg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  clip:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>',
  dl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  ul:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  trend:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>',
  sliders:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>',
  lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
};

function ic(n,s=16,c='currentColor'){return '<span style="display:inline-flex;align-items:center;justify-content:center;width:'+s+'px;height:'+s+'px;flex-shrink:0;color:'+c+';">'+( IC[n]||'')+'</span>';}
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

/* ===== STATE ===== */
const S={
  loggedIn:false,user:null,screen:'login',sidebarOpen:true,
  loginRole:'mesa',detailId:null,detalleTab:'info',
  mesaSearch:'',mesaFiltro:'todos',
  causasSearch:'',causasEstado:'todos',causasUrgencia:'todos',causasJurisdiccion:'todos',causasShowFilters:false,
  asigGuardados:new Set(),
  modal:null,modalStep:1,successMsg:'',idCounter:249,
  form:{expediente:'',imputado:'',victima:'',delito:'',fiscal:'',jurisdiccion:'',descripcionSecuestros:'',tareassolicitadas:'',urgencia:'media'},
  aForm:{solicitudId:'',fechaHoraInforme:'',peritosSeleccionados:[],nroInformeTecnico:''},
  notas:{},solicitudes:[],peritos:[],
};

/* ===== DATA ===== */
S.peritos=[
  {id:1,nombre:'Laura Su\u00e1rez',esp:'An\u00e1lisis forense digital',ini:'LS',carga:3,max:6,disp:true},
  {id:2,nombre:'Mat\u00edas Herrera',esp:'Extracci\u00f3n de datos m\u00f3viles',ini:'MH',carga:5,max:6,disp:true},
  {id:3,nombre:'Ver\u00f3nica Castro',esp:'Redes y comunicaciones',ini:'VC',carga:6,max:6,disp:false},
  {id:4,nombre:'Diego Romero',esp:'An\u00e1lisis forense digital',ini:'DR',carga:2,max:6,disp:true},
  {id:5,nombre:'Claudia R\u00edos',esp:'Fraude electr\u00f3nico',ini:'CR',carga:4,max:6,disp:true},
  {id:6,nombre:'Ignacio Palma',esp:'Extracci\u00f3n de datos m\u00f3viles',ini:'IP',carga:1,max:6,disp:true},
];

S.solicitudes=[
  {id:'SOL-2026-0248',exp:'12458/2026',imputado:'Rodr\u00edguez, Marcelo Ariel',victima:'Empresa FinTech SA',delito:'Estafa inform\u00e1tica (art. 172 CP)',fiscal:'Dr. Agust\u00edn Lara',jur:'Capital',secuestros:'1 notebook HP Pavilion, 1 tel\u00e9fono Motorola G84, 1 pendrive Kingston 64GB',tareas:'Extracci\u00f3n forense de dispositivos, an\u00e1lisis de transferencias bancarias y correo electr\u00f3nico',urgencia:'alta',estado:'pendiente',ingreso:'15/06/2026',venc:'29/06/2026',fhi:null,peritos:[],nroIT:null,hist:[{f:'15/06/2026 09:14',e:'Solicitud recibida en mesa de entrada',u:'Ana Gonz\u00e1lez',c:'#1D4ED8'},{f:'15/06/2026 09:30',e:'Registrado en el sistema como SOL-2026-0248',u:'Ana Gonz\u00e1lez',c:'#1D4ED8'}]},
  {id:'SOL-2026-0247',exp:'11920/2026',imputado:'Fern\u00e1ndez, Luis Alberto',victima:'Banco Naci\u00f3n Sucursal Centro',delito:'Acceso ileg\u00edtimo a sistema inform\u00e1tico (art. 153 bis CP)',fiscal:'Dra. Valeria Soto',jur:'Capital',secuestros:'1 iPhone 13 Pro (IMEI: 356789012345678), tarjetas SIM x2',tareas:'Extracci\u00f3n forense de telefon\u00eda, an\u00e1lisis de apps bancarias, registros de llamadas',urgencia:'media',estado:'en-proceso',ingreso:'14/06/2026',venc:'28/06/2026',fhi:'2026-06-20T09:00',peritos:['Mat\u00edas Herrera'],nroIT:'IT-2026-0112',hist:[{f:'14/06/2026 10:22',e:'Solicitud recibida en mesa de entrada',u:'Ana Gonz\u00e1lez',c:'#1D4ED8'},{f:'14/06/2026 14:00',e:'Asignado al Perito Mat\u00edas Herrera',u:'Ana Gonz\u00e1lez',c:'#D97706'},{f:'14/06/2026 16:30',e:'Perito inici\u00f3 el an\u00e1lisis forense',u:'Mat\u00edas Herrera',c:'#16A34A'}]},
  {id:'SOL-2026-0246',exp:'11432/2026',imputado:'Varela, Roberto Carlos',victima:'Comercio Digital ABC SRL',delito:'Fraude electr\u00f3nico agravado (art. 173 inc. 16 CP)',fiscal:'Dr. Hern\u00e1n Quiroga',jur:'La Banda',secuestros:'1 PC Dell, 2 discos r\u00edgidos externos WD, documentaci\u00f3n contable digital',tareas:'An\u00e1lisis forense de equipos, recuperaci\u00f3n de archivos eliminados, peritaje de software',urgencia:'baja',estado:'resuelto',ingreso:'13/06/2026',venc:'27/06/2026',fhi:'2026-06-15T10:00',peritos:['Diego Romero'],nroIT:'IT-2026-0110',hist:[{f:'13/06/2026 09:00',e:'Solicitud recibida en mesa de entrada',u:'Ana Gonz\u00e1lez',c:'#1D4ED8'},{f:'13/06/2026 14:00',e:'Asignado al Perito Diego Romero',u:'Ana Gonz\u00e1lez',c:'#D97706'},{f:'15/06/2026 16:00',e:'Marcado como resuelto',u:'Ana Gonz\u00e1lez',c:'#16A34A'}]},
  {id:'SOL-2026-0245',exp:'11100/2026',imputado:'G\u00f3mez, Pedro Ignacio',victima:'Municipalidad de Fr\u00edas',delito:'Sabotaje inform\u00e1tico (art. 183 CP)',fiscal:'Dr. Marcelo Vega',jur:'Fr\u00edas',secuestros:'Servidor HP ProLiant, 3 equipos de escritorio, switch de red',tareas:'An\u00e1lisis forense de servidor, determinaci\u00f3n de accesos no autorizados, logs del sistema',urgencia:'alta',estado:'pendiente',ingreso:'12/06/2026',venc:'26/06/2026',fhi:null,peritos:[],nroIT:null,hist:[{f:'12/06/2026 08:30',e:'Solicitud recibida en mesa de entrada',u:'Ana Gonz\u00e1lez',c:'#1D4ED8'},{f:'12/06/2026 10:00',e:'En espera de asignaci\u00f3n',u:'Ana Gonz\u00e1lez',c:'#D97706'}]},
  {id:'SOL-2026-0244',exp:'10875/2026',imputado:'L\u00f3pez, Marina Soledad',victima:'Estudiante menor de edad',delito:'Grooming — art. 131 CP',fiscal:'Dra. Carolina Medina',jur:'Capital',secuestros:'1 Samsung Galaxy A54, tablet Samsung',tareas:'Extracci\u00f3n forense de dispositivos, an\u00e1lisis de conversaciones y multimedia',urgencia:'media',estado:'en-proceso',ingreso:'11/06/2026',venc:'25/06/2026',fhi:'2026-06-18T14:00',peritos:['Laura Su\u00e1rez'],nroIT:'IT-2026-0108',hist:[{f:'11/06/2026 09:00',e:'Solicitud recibida en mesa de entrada',u:'Ana Gonz\u00e1lez',c:'#1D4ED8'},{f:'11/06/2026 15:00',e:'Asignado a la Perito Laura Su\u00e1rez',u:'Ana Gonz\u00e1lez',c:'#D97706'}]},
  {id:'SOL-2026-0243',exp:'10654/2026',imputado:'Tech Solutions SRL',victima:'Empresa Competidora SA',delito:'Espionaje corporativo — acceso ileg\u00edtimo',fiscal:'Dr. Rafael Torrez',jur:'A\u00f1atuya',secuestros:'2 notebooks Lenovo ThinkPad, 1 servidor NAS Synology, 4 unidades USB',tareas:'An\u00e1lisis forense completo, clonado de discos, an\u00e1lisis de tr\u00e1fico de red',urgencia:'baja',estado:'resuelto',ingreso:'10/06/2026',venc:'24/06/2026',fhi:'2026-06-12T09:00',peritos:['Claudia R\u00edos'],nroIT:'IT-2026-0105',hist:[{f:'10/06/2026 08:00',e:'Solicitud recibida en mesa de entrada',u:'Ana Gonz\u00e1lez',c:'#1D4ED8'},{f:'12/06/2026 17:00',e:'Informe t\u00e9cnico IT-2026-0105 presentado',u:'Claudia R\u00edos',c:'#16A34A'}]},
  {id:'SOL-2026-0242',exp:'10201/2026',imputado:'Morales, Santiago Ezequiel',victima:'Menores de edad (3 v\u00edctimas)',delito:'Pornograf\u00eda infantil — art. 128 CP',fiscal:'Dra. Patricia Su\u00e1rez',jur:'Monte Quemado',secuestros:'1 PC desktop, 2 discos r\u00edgidos externos, material digital en CD/DVD',tareas:'Extracci\u00f3n y an\u00e1lisis forense, identificaci\u00f3n de material il\u00edcito, rastreo de origen',urgencia:'alta',estado:'en-proceso',ingreso:'09/06/2026',venc:'16/06/2026',fhi:'2026-06-11T08:00',peritos:['Laura Su\u00e1rez'],nroIT:'IT-2026-0103',hist:[{f:'09/06/2026 08:00',e:'Solicitud recibida en mesa de entrada',u:'Ana Gonz\u00e1lez',c:'#1D4ED8'},{f:'09/06/2026 12:00',e:'Asignado con URGENCIA MÁXIMA a Laura Su\u00e1rez',u:'Ana Gonz\u00e1lez',c:'#DC2626'}]},
  {id:'SOL-2026-0241',exp:'9980/2026',imputado:'Desconocido (IP identificada)',victima:'Banco Provincial SA',delito:'Phishing y fraude bancario electr\u00f3nico',fiscal:'Dr. Luis Castillo',jur:'Termas',secuestros:'Evidencia digital en la nube, registros de servidor',tareas:'An\u00e1lisis de logs, rastreo de IP, pericia sobre sitio web fraudulento',urgencia:'media',estado:'resuelto',ingreso:'08/06/2026',venc:'22/06/2026',fhi:'2026-06-10T10:00',peritos:['Ignacio Palma'],nroIT:'IT-2026-0101',hist:[{f:'08/06/2026 09:30',e:'Solicitud recibida en mesa de entrada',u:'Ana Gonz\u00e1lez',c:'#1D4ED8'},{f:'10/06/2026 15:30',e:'Informe t\u00e9cnico IT-2026-0101 presentado',u:'Ignacio Palma',c:'#16A34A'}]},
];

/* ===== UTILS ===== */
function genId(){return 'SOL-2026-0'+String(S.idCounter++);}
function todayStr(){const d=new Date();return String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0')+'/'+d.getFullYear();}
function timeStr(){return new Date().toTimeString().slice(0,5);}
function fmtDT(s){if(!s)return '—';const d=new Date(s);if(isNaN(d))return s;return String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0')+'/'+d.getFullYear()+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
function bdg(e){const m={pendiente:'bp',['en-proceso']:'bi',resuelto:'br'};const l={pendiente:'Pendiente',['en-proceso']:'En proceso',resuelto:'Resuelto'};return '<span class="badge '+(m[e]||'bp')+'">'+l[e]+'</span>';}
function ubdg(u){const m={alta:'bu-a',media:'bu-m',baja:'bu-b'};return '<span class="badge '+(m[u]||'bu-m')+'">'+u.charAt(0).toUpperCase()+u.slice(1)+'</span>';}
function pbcol(c,m){const p=c/m;return p>=1?'#DC2626':p>=.75?'#D97706':'#16A34A';}

const ROLES={
  mesa:{name:'Ana Gonz\u00e1lez',ini:'AG',lbl:'Mesa de Entrada'},
  coordinador:{name:'Carlos M\u00e9ndez',ini:'CM',lbl:'Coordinador'},
  perito:{name:'Laura Su\u00e1rez',ini:'LS',lbl:'Perito Inform\u00e1tico'}
};

const NAV=[
  {id:'dashboard',lbl:'Inicio',ic:'dash',roles:['mesa', 'coordinador', 'perito']},
  {id:'mesa-entrada',lbl:'Mesa de Entrada',ic:'inbox',roles:['mesa']},
  {id:'asignacion',lbl:'Asignaci\u00f3n de Peritos',ic:'users',roles:['mesa']},
  {id:'causas',lbl:'Consulta de Causas',ic:'search',roles:['mesa', 'coordinador', 'perito']},
];

function screenLbl(){const s=S.screen==='detalle-causa'?'causas':S.screen;return (NAV.find(n=>n.id===s)||{lbl:'Detalle'}).lbl;}

/* ===== SIDEBAR ===== */
function renderSB(){
  const r=S.user?.role||'mesa';const u=ROLES[r]||ROLES.mesa;
  const items=NAV.filter(n=>n.roles.includes(r));
  const cls=S.sidebarOpen?'open':'closed';
  return '<aside class="sidebar '+cls+'" id="sidebar"><div class="sb-logo">'+
    '<div class="sb-logo-icon">'+ic('scale',18,'white')+'</div>'+
    '<div class="sb-logo-text"><div class="sb-logo-name">Peritos</div><div class="sb-logo-sub">SISTEMA JUDICIAL</div></div></div>'+
    '<nav class="sb-nav">'+items.map(item=>{
      const a=(S.screen==='detalle-causa'?'causas':S.screen)===item.id;
      return '<button class="nav-item'+(a?' active':'')+'" onclick="nav(\''+item.id+'\')">'+
        '<span class="nav-ic" style="display:flex;color:'+(a?'var(--sb-accent)':'rgba(255,255,255,.65)')+'">'+ic(item.ic,18)+'</span>'+
        '<span class="nav-label">'+item.lbl+'</span></button>';
    }).join('')+'</nav>'+
    '<div class="sb-footer"><div class="user-row">'+
    '<div class="user-av">'+esc(u.ini)+'</div>'+
    '<div class="user-info"><div class="user-nm">'+esc(u.name)+'</div><div class="user-rl">'+esc(u.lbl)+'</div></div>'+
    '<button class="btn-icon" onclick="logout()" style="color:rgba(255,255,255,.5);">'+ic('logout',15)+'</button>'+
    '</div></div></aside>';
}

/* ===== TOPBAR ===== */
function renderTB(){
  return '<header class="topbar">'+
    '<button class="btn-icon" onclick="toggleSB()">'+ic('menu',18)+'</button>'+
    '<div class="breadcrumb"><span>Sistema de Gesti\u00f3n</span><span style="display:flex;">'+ic('chevR',13)+'</span>'+
    '<span class="breadcrumb-cur">'+screenLbl()+'</span>'+
    (S.screen==='detalle-causa'&&S.detailId?'<span style="display:flex;">'+ic('chevR',13)+'</span><span class="breadcrumb-cur mono" style="font-size:12px;">'+esc(S.detailId)+'</span>':'')+
    '</div><div class="notif-wrap"><button class="btn-icon">'+ic('bell',18)+'</button><span class="notif-dot"></span></div></header>';
}

/* ===== DASHBOARD ===== */
function renderDash(){
  const r=S.user?.role||'mesa';const u=ROLES[r];
  
  let ofs = S.solicitudes;
  if(r === 'perito') {
    ofs = ofs.filter(o => o.peritos.includes(u.name));
  }

  const pend=ofs.filter(o=>o.estado==='pendiente').length;
  const proc=ofs.filter(o=>o.estado==='en-proceso').length;
  const done=ofs.filter(o=>o.estado==='resuelto').length;
  let stats;
  
  if(r==='mesa' || r==='coordinador') stats=[
    {lbl:'Solicitudes registradas',val:String(ofs.length),sub:'total en el sistema',col:'#1B3A6B',bg:'#EFF3F8',ic:'inbox'},
    {lbl:'Pendientes',val:String(pend),sub:'sin perito asignado',col:'#D97706',bg:'#FFFBEB',ic:'clock'},
    {lbl:'En proceso',val:String(proc),sub:'con perito asignado',col:'#1D4ED8',bg:'#EFF6FF',ic:'trend'},
    {lbl:'Resueltas',val:String(done),sub:'completadas',col:'#16A34A',bg:'#F0FDF4',ic:'checkC'},
  ]; else {
    stats=[
      {lbl:'Mis causas activas',val:String(pend + proc),sub:'asignadas a mí',col:'#1B3A6B',bg:'#EFF3F8',ic:'inbox'},
      {lbl:'Con vencimiento próximo',val:'2',sub:'próximos 7 días',col:'#DC2626',bg:'#FEF2F2',ic:'alertC'},
      {lbl:'Informes entregados',val:String(done),sub:'completados',col:'#16A34A',bg:'#F0FDF4',ic:'checkC'},
      {lbl:'En análisis',val:String(proc),sub:'en curso',col:'#1D4ED8',bg:'#EFF6FF',ic:'trend'},
    ];
  }
  const wd=[{d:'Lun',i:8,r:5},{d:'Mar',i:12,r:9},{d:'Mi\u00e9',i:6,r:11},{d:'Jue',i:14,r:8},{d:'Vie',i:9,r:12}];
  const mx=Math.max(...wd.map(x=>Math.max(x.i,x.r)));
  const md=[42,58,51,67,73,61];const ml=['Ene','Feb','Mar','Abr','May','Jun'];
  const W=380,H=100,mn=30,mxV=80;
  const pts=md.map((v,i)=>(i*(W/(md.length-1)))+','+(H-Math.round(((v-mn)/(mxV-mn))*H))).join(' ');
  const dots=md.map((v,i)=>'<circle cx="'+Math.round(i*(W/(md.length-1)))+'" cy="'+(H-Math.round(((v-mn)/(mxV-mn))*H))+'" r="4" fill="#0EA5E9"/>').join('');
  
  const recent = ofs.slice(0,4); 
  
  return (S.successMsg?'<div class="alert alert-success mb-4">'+ic('checkC',16,'#065F46')+' '+esc(S.successMsg)+'</div>':'')+
  '<div class="page-header"><div><div class="page-title">Bienvenido/a, '+esc(u.name)+'</div>'+
  '<div class="page-sub">Lunes 15 de junio de 2026 — Sistema de gesti\u00f3n de peritos inform\u00e1ticos</div></div>'+
  (r==='mesa'?'<button class="btn btn-primary" onclick="openModal(\'nueva-solicitud\')">'+ic('plus',15,'white')+' Nueva solicitud</button>':'')+
  '</div><div class="stats-grid">'+
  stats.map(s=>'<div class="stat-card"><div class="stat-iw" style="background:'+s.bg+';">'+ic(s.ic,17,s.col)+'</div><div class="stat-val">'+s.val+'</div><div class="stat-lbl">'+s.lbl+'</div><div class="stat-sub">'+s.sub+'</div></div>').join('')+
  '</div><div class="charts-grid">'+
  '<div class="card"><div class="card-head"><div><div class="card-title">Solicitudes por semana</div><div class="card-sub">Ingresadas vs. resueltas</div></div></div>'+
  '<div class="card-body"><div class="bar-chart-wrap">'+
  wd.map(d=>'<div class="bar-group"><div class="bar-pair" style="height:140px;"><div class="bar-el" style="height:'+Math.round((d.i/mx)*100)+'%;background:#1B3A6B;"></div><div class="bar-el" style="height:'+Math.round((d.r/mx)*100)+'%;background:#0EA5E9;"></div></div><div class="bar-lbl">'+d.d+'</div></div>').join('')+
  '</div><div class="chart-legend"><div class="legend-item"><div class="legend-dot" style="background:#1B3A6B;"></div>Ingresadas</div><div class="legend-item"><div class="legend-dot" style="background:#0EA5E9;"></div>Resueltas</div></div></div></div>'+
  '<div class="card"><div class="card-head"><div><div class="card-title">Tendencia mensual</div><div class="card-sub">Solicitudes ingresadas 2026</div></div></div>'+
  '<div class="card-body"><svg viewBox="0 0 '+W+' '+(H+20)+'" style="width:100%;height:130px;" preserveAspectRatio="none">'+
  '<line x1="0" y1="'+Math.round(H*.33)+'" x2="'+W+'" y2="'+Math.round(H*.33)+'" stroke="#E8EDF4" stroke-width="1"/>'+
  '<line x1="0" y1="'+Math.round(H*.66)+'" x2="'+W+'" y2="'+Math.round(H*.66)+'" stroke="#E8EDF4" stroke-width="1"/>'+
  '<polyline points="'+pts+'" fill="none" stroke="#0EA5E9" stroke-width="2.5" stroke-linejoin="round"/>'+dots+
  ml.map((l,i)=>'<text x="'+Math.round(i*(W/(md.length-1)))+'" y="'+(H+16)+'" text-anchor="middle" font-size="11" fill="#5A6B82">'+l+'</text>').join('')+
  '</svg></div></div></div>'+
  '<div class="card"><div class="card-head"><div class="card-title">Solicitudes recientes</div>'+
  '<button class="btn btn-ghost btn-sm" onclick="nav(\'causas\')">Ver todas '+ic('chevR',13)+'</button></div>'+
  '<div class="table-wrap"><table><thead><tr><th>N\u00b0 Solicitud</th><th>Fiscal</th><th>Im putado / Delito</th><th>Jurisdicci\u00f3n</th><th>Urgencia</th><th>Estado</th></tr></thead><tbody>'+
  (recent.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--muted-fg);">Sin solicitudes</td></tr>':'')+
  recent.map(o=>'<tr onclick="nav(\'detalle-causa\',\''+o.id+'\')">'+
    '<td class="td-mono">'+esc(o.id)+'</td><td style="font-size:12px;">'+esc(o.fiscal)+'</td>'+
    '<td><div class="td-trunc">'+esc(o.imputado)+' s/ '+esc(o.delito)+'</div></td>'+
    '<td style="font-size:12px;color:var(--muted-fg);">'+esc(o.jur)+'</td>'+
    '<td>'+ubdg(o.urgencia)+'</td><td>'+bdg(o.estado)+'</td></tr>').join('')+
  '</tbody></table></div></div>';
}

/* ===== MESA DE ENTRADA ===== */
function renderMesa(){
  let list=S.solicitudes;
  if(S.mesaSearch){const q=S.mesaSearch.toLowerCase();list=list.filter(o=>o.id.toLowerCase().includes(q)||o.exp.toLowerCase().includes(q)||o.imputado.toLowerCase().includes(q)||o.delito.toLowerCase().includes(q)||o.fiscal.toLowerCase().includes(q)||o.jur.toLowerCase().includes(q));}
  if(S.mesaFiltro!=='todos') list=list.filter(o=>o.estado===S.mesaFiltro);
  const fl=['todos','pendiente','en-proceso','resuelto'];
  const flbl={todos:'Todas',pendiente:'Pendiente',['en-proceso']:'En proceso',resuelto:'Resuelta'};
  return (S.successMsg?'<div class="alert alert-success">'+ic('checkC',16,'#065F46')+' '+esc(S.successMsg)+'</div>':'')+
  '<div class="page-header"><div><div class="page-title">Mesa de Entrada</div><div class="page-sub">'+S.solicitudes.length+' solicitudes registradas</div></div>'+
  '<button class="btn btn-primary" onclick="openModal(\'nueva-solicitud\')">'+ic('plus',15,'white')+' Registrar solicitud</button></div>'+
  '<div class="filter-row"><div class="search-wrap"><span class="si">'+ic('search',15)+'</span>'+
  '<input type="text" placeholder="Buscar por N\u00b0 solicitud, expediente, imputado, fiscal, jurisdicci\u00f3n..." value="'+esc(S.mesaSearch)+'" oninput="upMS(this.value)"></div>'+
  fl.map(f=>'<button class="filter-btn'+(S.mesaFiltro===f?' active':'')+'" onclick="setMF(\''+f+'\')">'+flbl[f]+'</button>').join('')+
  '</div><div class="card" style="margin-bottom:0;"><div class="table-wrap"><table><thead><tr>'+
  '<th>N\u00b0 Solicitud</th><th>Expediente</th><th>Imputado/a</th><th>Delito</th><th>Fiscal</th><th>Jurisdicci\u00f3n</th><th>Ingreso</th><th>Vencimiento</th><th>Urgencia</th><th>Estado</th><th></th></tr></thead><tbody>'+
  (list.length===0?'<tr><td colspan="11" style="text-align:center;padding:40px;color:var(--muted-fg);">Sin resultados</td></tr>':'')+
  list.map(o=>'<tr onclick="nav(\'detalle-causa\',\''+o.id+'\')">'+
    '<td class="td-mono">'+esc(o.id)+'</td>'+
    '<td style="font-size:12px;color:var(--muted-fg);">'+esc(o.exp)+'</td>'+
    '<td><div class="td-trunc" style="max-width:140px;">'+esc(o.imputado)+'</div></td>'+
    '<td><div class="td-trunc" style="max-width:160px;font-size:12px;color:var(--muted-fg);">'+esc(o.delito)+'</div></td>'+
    '<td style="font-size:12px;">'+esc(o.fiscal)+'</td>'+
    '<td style="font-size:12px;">'+esc(o.jur)+'</td>'+
    '<td style="font-size:12px;color:var(--muted-fg);white-space:nowrap;">'+esc(o.ingreso)+'</td>'+
    '<td style="font-size:12px;white-space:nowrap;color:'+(o.urgencia==='alta'?'var(--p-high)':'var(--muted-fg)')+';">'+esc(o.venc)+'</td>'+
    '<td>'+ubdg(o.urgencia)+'</td><td>'+bdg(o.estado)+'</td>'+
    '<td><button class="btn-icon" onclick="event.stopPropagation();nav(\'detalle-causa\',\''+o.id+'\')">'+ic('eye',15)+'</button></td></tr>').join('')+
  '</tbody></table></div>'+
  '<div class="pagination"><span>Mostrando '+list.length+' de '+S.solicitudes.length+' solicitudes</span>'+
  '<div class="page-btns"><button class="page-btn active">1</button><button class="page-btn">2</button><button class="page-btn">3</button></div></div></div>';
}

/* ===== ASIGNACION ===== */
function renderAsig(){
  const pend=S.solicitudes.filter(o=>o.estado!=='resuelto');
  const cols=['#1B3A6B','#0EA5E9','#DC2626','#10B981','#D97706','#7C3AED'];
  return '<div class="page-header"><div><div class="page-title">Asignaci\u00f3n de Peritos</div>'+
  '<div class="page-sub">'+S.solicitudes.filter(o=>o.peritos.length===0&&o.estado==='pendiente').length+' solicitudes pendientes de asignaci\u00f3n</div></div></div>'+
  '<div class="asig-grid"><div><div class="card" style="margin-bottom:0;">'+
  '<div class="card-head"><div class="card-title">Peritos disponibles</div></div><div>'+
  S.peritos.map((p,i)=>{
    const pct=Math.round((p.carga/p.max)*100);const col=cols[i%cols.length];
    return '<div class="perito-item"><div style="display:flex;align-items:flex-start;gap:10px;">'+
      '<div class="perito-av" style="background:'+col+';color:white;">'+esc(p.ini)+'</div>'+
      '<div style="flex:1;min-width:0;">'+
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">'+
      '<span style="font-size:13px;font-weight:600;">'+esc(p.nombre)+'</span>'+
      '<span class="av-badge" style="color:'+(p.disp?'#065F46':'#991B1B')+';background:'+(p.disp?'#D1FAE5':'#FEE2E2')+';">'+(p.disp?'Disponible':'Completo')+'</span>'+
      '</div><div style="font-size:11px;color:var(--muted-fg);margin-top:2px;">'+esc(p.esp)+'</div>'+
      '<div class="pb-wrap"><div class="pb-track"><div class="pb-fill" style="width:'+pct+'%;background:'+pbcol(p.carga,p.max)+';"></div></div>'+
      '<span style="font-size:10px;color:var(--muted-fg);">'+p.carga+'/'+p.max+'</span></div></div></div></div>';
  }).join('')+'</div></div></div><div>'+
  (pend.length===0?'<div class="card"><div class="empty-state"><p>No hay solicitudes pendientes.</p></div></div>':'')+
  pend.map(o=>{
    const g=S.asigGuardados.has(o.id);
    return '<div class="solicitud-card'+(g?' confirmed':'')+'">'+
      '<div class="solicitud-meta"><span class="td-mono">'+esc(o.id)+'</span>'+ubdg(o.urgencia)+bdg(o.estado)+
      (g?'<span class="badge br">'+ic('checkC',10,'#065F46')+' Confirmado</span>':'')+
      '</div><div class="solicitud-title">'+esc(o.imputado)+' s/ '+esc(o.delito)+'</div>'+
      '<div class="solicitud-details">'+ic('file',11,'var(--muted-fg)')+' '+esc(o.fiscal)+'&nbsp;&nbsp;·&nbsp;&nbsp;'+ic('pin',11,'var(--muted-fg)')+' '+esc(o.jur)+'&nbsp;&nbsp;·&nbsp;&nbsp;'+ic('clock',11,'var(--muted-fg)')+' Vence: '+esc(o.venc)+
      (o.nroIT?'&nbsp;&nbsp;·&nbsp;&nbsp;'+ic('hash',11,'var(--muted-fg)')+' '+esc(o.nroIT):'')+
      (o.fhi?'&nbsp;&nbsp;·&nbsp;&nbsp;'+ic('cal',11,'var(--muted-fg)')+' Apertura: <strong>'+fmtDT(o.fhi)+'</strong>':'')+
      '</div><div class="solicitud-foot">'+
      '<span style="font-size:12px;font-weight:500;color:var(--muted-fg);">Perito/s:</span>'+
      (o.peritos.length>0?o.peritos.map(p=>'<span class="assigned-chip">'+ic('user',11,'var(--primary)')+' '+esc(p)+'</span>').join(''):'<span style="font-size:13px;color:var(--muted-fg);">Sin asignar</span>')+
      '<div style="margin-left:auto;display:flex;gap:8px;">'+
      (!g?'<button class="btn btn-primary btn-sm" onclick="openAM(\''+o.id+'\')">'+ic(o.peritos.length>0?'edit':'users',13,'white')+' '+(o.peritos.length>0?'Editar':'Asignar')+'</button>':'')+
      (!g&&o.peritos.length>0?'<button class="btn btn-success btn-sm" onclick="confirmAsig(\''+o.id+'\')">'+ic('check',13,'white')+' Confirmar</button>':'')+
      '</div></div></div>';
  }).join('')+'</div></div>';
}

/* ===== CAUSAS ===== */
function renderCausas(){
  let list=S.solicitudes;
  
  if(S.user?.role === 'perito') {
     list = list.filter(o => o.peritos.includes(S.user.name));
  }

  if(S.causasSearch){const q=S.causasSearch.toLowerCase();list=list.filter(o=>o.id.toLowerCase().includes(q)||o.exp.toLowerCase().includes(q)||o.imputado.toLowerCase().includes(q)||o.victima.toLowerCase().includes(q)||o.delito.toLowerCase().includes(q)||o.fiscal.toLowerCase().includes(q)||o.jur.toLowerCase().includes(q)||o.peritos.join(' ').toLowerCase().includes(q));}
  if(S.causasEstado!=='todos') list=list.filter(o=>o.estado===S.causasEstado);
  if(S.causasUrgencia!=='todos') list=list.filter(o=>o.urgencia===S.causasUrgencia);
  if(S.causasJurisdiccion!=='todos') list=list.filter(o=>o.jur===S.causasJurisdiccion);
  const juris=[...new Set(S.solicitudes.map(o=>o.jur))];
  const ac={alta:'var(--p-high)',media:'var(--p-med)',baja:'var(--p-low)'};
  return '<div class="page-header"><div><div class="page-title">Consulta de Causas</div><div class="page-sub">'+list.length+' causas disponibles</div></div></div>'+
  '<div style="display:flex;gap:10px;margin-bottom:12px;">'+
  '<div class="search-wrap" style="flex:1;"><span class="si">'+ic('search',15)+'</span>'+
  '<input type="text" placeholder="Buscar por car\u00e1tula, expediente, N\u00b0 solicitud, fiscal, imputado/a, v\u00edctima, perito..." value="'+esc(S.causasSearch)+'" oninput="upCS(this.value)"></div>'+
  '<button class="filter-btn'+(S.causasShowFilters?' active':'')+'" onclick="toggleCF()" style="display:flex;align-items:center;gap:6px;">'+ic('sliders',14)+' Filtros'+
  ((S.causasEstado!=='todos'||S.causasUrgencia!=='todos'||S.causasJurisdiccion!=='todos')?'<span style="width:16px;height:16px;border-radius:50%;background:var(--primary);color:white;font-size:9px;display:flex;align-items:center;justify-content:center;">'+[S.causasEstado,S.causasUrgencia,S.causasJurisdiccion].filter(f=>f!=='todos').length+'</span>':'')+
  '</button></div>'+
  (S.causasShowFilters?'<div class="filters-panel">'+
    '<div><div class="fg-lbl">ESTADO</div><div class="filter-pills">'+
    ['todos','pendiente','en-proceso','resuelto'].map(f=>'<button class="filter-btn'+(S.causasEstado===f?' active':'')+'" onclick="setCE(\''+f+'\')">'+{todos:'Todos',pendiente:'Pendiente',['en-proceso']:'En proceso',resuelto:'Resuelto'}[f]+'</button>').join('')+
    '</div></div><div class="filter-divider"></div>'+
    '<div><div class="fg-lbl">URGENCIA</div><div class="filter-pills">'+
    ['todos','alta','media','baja'].map(f=>'<button class="filter-btn'+(S.causasUrgencia===f?' active':'')+'" onclick="setCU(\''+f+'\')">'+{todos:'Todas',alta:'Alta',media:'Media',baja:'Baja'}[f]+'</button>').join('')+
    '</div></div><div class="filter-divider"></div>'+
    '<div><div class="fg-lbl">JURISDICCI\u00d3N</div><div class="filter-pills">'+
    '<button class="filter-btn'+(S.causasJurisdiccion==='todos'?' active':'')+'" onclick="setCJ(\'todos\')">Todas</button>'+
    juris.map(j=>'<button class="filter-btn'+(S.causasJurisdiccion===j?' active':'')+'" onclick="setCJ(\''+j+'\')">'+j+'</button>').join('')+
    '</div></div></div>':'')+
  '<div style="font-size:13px;color:var(--muted-fg);margin-bottom:12px;">'+list.length+' resultado'+(list.length!==1?'s':'')+(S.causasSearch?' para "<strong>'+esc(S.causasSearch)+'</strong>"':'')+'</div>'+
  (list.length===0?'<div class="card"><div class="empty-state">'+ic('search',36,'var(--muted-fg)')+'<p style="font-size:15px;font-weight:500;margin-top:12px;">Sin resultados</p><p style="font-size:13px;margin-top:4px;">Prob\u00e1 con otros t\u00e9rminos o cambi\u00e1 los filtros</p></div></div>':'')+
  list.map(o=>'<div class="causa-card" onclick="nav(\'detalle-causa\',\''+o.id+'\')">'+
    '<div class="causa-accent" style="background:'+ac[o.urgencia]+';min-height:60px;"></div>'+
    '<div style="flex:1;min-width:0;">'+
    '<div class="causa-meta" style="margin-bottom:4px;">'+
    '<span class="td-mono" style="font-size:12px;">'+esc(o.id)+'</span>'+
    '<span style="color:var(--muted-fg);">·</span><span style="font-size:12px;color:var(--muted-fg);">Exp. '+esc(o.exp)+'</span>'+
    '<span style="margin-left:auto;">'+bdg(o.estado)+'</span></div>'+
    '<div class="causa-title">'+esc(o.imputado)+' s/ '+esc(o.delito)+'</div>'+
    '<div class="causa-meta">'+
    ic('pin',11,'var(--muted-fg)')+' '+esc(o.jur)+' · '+
    ic('file',11,'var(--muted-fg)')+' '+esc(o.fiscal)+' · '+
    ic('clock',11,'var(--muted-fg)')+' Vence '+esc(o.venc)+
    (o.peritos.length>0?' · '+ic('user',11,'var(--primary)')+' <span style="color:var(--primary);">'+esc(o.peritos.join(', '))+'</span>':'')+
    '</div></div>'+
    '<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();nav(\'detalle-causa\',\''+o.id+'\')">'+ic('eye',13)+' Ver</button>'+
    '</div>').join('');
}

/* ===== DETALLE ===== */
function renderDetalle(id){
  const o=S.solicitudes.find(x=>x.id===id);
  if(!o)return '<div class="alert alert-warning">'+ic('alertC',16)+' Solicitud no encontrada.</div>';
  
  if(S.user?.role === 'perito' && !o.peritos.includes(S.user.name)) {
     return '<div class="alert alert-warning" style="margin-top: 1rem;">'+ic('lock',16)+' <strong>Acceso denegado:</strong> Esta solicitud pertenece a otro perito y usted no tiene permisos para verla.</div>';
  }

  const notas=S.notas[id]||[];
  const ac={alta:'#DC2626',media:'#D97706',baja:'#16A34A'};
  const tabs={
    info:renderDetalleInfo(o,notas),
    historial:renderDetalleHist(o),
    archivos:renderDetalleArchivos(o),
  };
  return '<div style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--muted-fg);margin-bottom:16px;">'+
  '<button class="btn-icon" onclick="nav(\'causas\')">'+ic('arrowL',15)+'</button>'+
  '<span style="cursor:pointer;" onclick="nav(\'causas\')">Consulta de Causas</span>'+
  '<span style="display:flex;">'+ic('chevR',13)+'</span>'+
  '<span class="mono" style="color:var(--fg);font-weight:500;font-size:12px;">'+esc(o.id)+'</span></div>'+
  '<div class="detalle-hero"><div class="dhm">'+
  '<span style="background:rgba(255,255,255,.15);color:white;padding:3px 12px;border-radius:999px;font-size:12px;font-weight:700;font-family:monospace;">'+esc(o.id)+'</span>'+
  bdg(o.estado)+ubdg(o.urgencia)+
  '</div><h2 style="font-size:18px;font-weight:700;color:white;margin-bottom:4px;">'+esc(o.imputado)+' s/ '+esc(o.delito)+'</h2>'+
  '<p style="font-size:14px;color:rgba(255,255,255,.65);">'+esc(o.fiscal)+' — '+esc(o.jur)+'</p></div>'+
  (o.peritos.length===0?
    '<div class="alert alert-warning">'+ic('alertC',16,'#A16207')+' <span><strong>Sin perito asignado.</strong> Esta solicitud requiere asignaci\u00f3n.</span></div>':
    '<div class="alert alert-info">'+ic('user',16,'#1D4ED8')+' <span><strong>Perito/s:</strong> '+esc(o.peritos.join(', '))+' — Pericia en curso</span></div>')+
  '<div class="tabs">'+
  '<button class="tab-btn'+(S.detalleTab==='info'?' active':'')+'" onclick="setDT(\'info\')">Informaci\u00f3n</button>'+
  '<button class="tab-btn'+(S.detalleTab==='historial'?' active':'')+'" onclick="setDT(\'historial\')">Historial ('+o.hist.length+')</button>'+
  '<button class="tab-btn'+(S.detalleTab==='archivos'?' active':'')+'" onclick="setDT(\'archivos\')">Archivos</button>'+
  '</div>'+(tabs[S.detalleTab]||'');
}

function renderDetalleInfo(o,notas){
  return '<div class="detail-grid">'+
  '<div>'+
  '<div class="card"><div class="card-head"><div class="card-title">Datos de la solicitud</div></div>'+
  [
    {ic:'hash',l:'N\u00b0 Solicitud',v:o.id},{ic:'file',l:'N\u00b0 Expediente',v:o.exp},
    {ic:'pin',l:'Jurisdicci\u00f3n',v:o.jur},{ic:'cal',l:'Fecha ingreso',v:o.ingreso},
    {ic:'clock',l:'Vencimiento',v:o.venc},{ic:'tag',l:'Urgencia',v:o.urgencia.charAt(0).toUpperCase()+o.urgencia.slice(1)},
  ].map(r=>'<div class="detail-row"><div>'+ic(r.ic,14,'var(--muted-fg)')+'</div><div><div class="detail-lbl">'+r.l+'</div><div class="detail-val">'+esc(r.v)+'</div></div></div>').join('')+
  '</div>'+
  '<div class="card mt-4"><div class="card-head"><div class="card-title">Partes procesales</div></div>'+
  [{l:'Imputado/a',v:o.imputado},{l:'V\u00edctima',v:o.victima},{l:'Delito investigado',v:o.delito},{l:'Fiscal requirente',v:o.fiscal}].map(r=>'<div class="detail-row"><div><div class="detail-lbl">'+r.l+'</div><div class="detail-val">'+esc(r.v)+'</div></div></div>').join('')+
  '</div></div>'+
  '<div>'+
  '<div class="card"><div class="card-head"><div class="card-title">Asignaci\u00f3n pericial</div>'+
  (S.user?.role==='mesa'?'<button class="btn btn-primary btn-sm" onclick="openAM(\''+o.id+'\')">'+ic('edit',13,'white')+' '+(o.peritos.length>0?'Editar':'Asignar')+'</button>':'')+
  '</div>'+
  [{l:'Peritos responsables',v:o.peritos.length>0?o.peritos.join(', '):'Sin asignar'},{l:'Fecha/hora apertura de informe',v:o.fhi?fmtDT(o.fhi):'No programada'},{l:'N\u00b0 Informe T\u00e9cnico',v:o.nroIT||'No asignado'}].map(r=>'<div class="detail-row"><div><div class="detail-lbl">'+r.l+'</div><div class="detail-val" style="color:'+(r.v.includes('Sin')||r.v.includes('No')?'var(--muted-fg)':'var(--fg)')+';">'+esc(r.v)+'</div></div></div>').join('')+
  '</div>'+
  '<div class="card mt-4"><div class="card-head"><div class="card-title">Secuestros recibidos</div></div><div class="card-body"><p style="font-size:13px;line-height:1.7;">'+esc(o.secuestros)+'</p></div></div>'+
  '<div class="card mt-4"><div class="card-head"><div class="card-title">Tareas solicitadas</div></div><div class="card-body"><p style="font-size:13px;line-height:1.7;">'+esc(o.tareas)+'</p></div></div>'+
  '<div class="card mt-4"><div class="card-head"><div class="card-title">Notas internas</div></div><div class="card-body">'+
  (notas.length===0?'<p style="font-size:13px;color:var(--muted-fg);margin-bottom:12px;">Sin notas.</p>':'')+
  notas.map(n=>'<div style="background:#EFF3F8;border-radius:8px;padding:10px 14px;margin-bottom:8px;"><strong style="font-size:11px;color:var(--muted-fg);">'+esc(n.u)+' — '+esc(n.f)+'</strong><p style="font-size:13px;margin-top:4px;">'+esc(n.t)+'</p></div>').join('')+
  (S.user?.role!=='coordinador'?'<textarea id="nota-ta" rows="3" placeholder="Escribi una nota interna..." style="margin-bottom:8px;"></textarea><button class="btn btn-primary btn-sm" onclick="saveNota(\''+o.id+'\')">'+ic('msg',13,'white')+' Guardar nota</button>':'')+
  '</div></div></div></div>';
}

function renderDetalleHist(o){
  return '<div class="card"><div class="card-head"><div class="card-title">Historial de movimientos</div></div><div class="card-body">'+
  (o.hist.length===0?'<p style="color:var(--muted-fg);">Sin historial.</p>':
  '<div class="timeline">'+o.hist.map(h=>'<div class="t-item"><div class="t-dot" style="background:'+h.c+';box-shadow:0 0 0 2px '+h.c+'30;"></div><div class="t-event">'+esc(h.e)+'</div><div class="t-meta">'+ic('cal',10)+' '+esc(h.f)+'&nbsp;·&nbsp;'+ic('user',10)+' '+esc(h.u)+'</div></div>').join('')+'</div>')+
  '</div></div>';
}

function renderDetalleArchivos(o){
  const files=[{n:'Solicitud_'+o.id+'.pdf',t:'PDF',f:o.ingreso,s:'2.4 MB'},{n:'Acta_secuestro_'+o.exp+'.pdf',t:'PDF',f:o.ingreso,s:'1.1 MB'}];
  return '<div class="card"><div class="card-head"><div class="card-title">Archivos adjuntos</div>'+
  (S.user?.role!=='coordinador'?'<button class="btn btn-ghost btn-sm">'+ic('clip',13)+' Adjuntar</button>':'')+
  '</div><div class="card-body">'+
  files.map(a=>'<div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--border);">'+
    '<div style="width:36px;height:36px;background:#FEF2F2;border-radius:var(--radius);display:flex;align-items:center;justify-content:center;flex-shrink:0;">'+ic('file',16,'#DC2626')+'</div>'+
    '<div style="flex:1;"><div style="font-size:13px;font-weight:500;">'+esc(a.n)+'</div><div style="font-size:11px;color:var(--muted-fg);">'+a.t+' · '+a.s+' · '+a.f+'</div></div>'+
    '<button class="btn-icon">'+ic('dl',15)+'</button></div>').join('')+
  '</div></div>';
}

/* ===== MODALS ===== */
function renderNOM(){
  const f=S.form;
  const step1='<div class="g2 form-row"><div><label>N\u00b0 de Expediente *</label><input type="text" value="'+esc(f.expediente)+'" oninput="S.form.expediente=this.value" placeholder="ej. 12345/2026"></div>'+
  '<div><label>Urgencia *</label><select oninput="S.form.urgencia=this.value"><option value="alta"'+(f.urgencia==='alta'?' selected':'')+'>Alta</option><option value="media"'+(f.urgencia==='media'?' selected':'')+'>Media</option><option value="baja"'+(f.urgencia==='baja'?' selected':'')+'>Baja</option></select></div></div>'+
  '<div class="g2 form-row"><div><label>Imputado/a *</label><input type="text" value="'+esc(f.imputado)+'" oninput="S.form.imputado=this.value" placeholder="Apellido, Nombre — DNI"></div>'+
  '<div><label>V\u00edctima *</label><input type="text" value="'+esc(f.victima)+'" oninput="S.form.victima=this.value" placeholder="Persona f\u00edsica o jur\u00eddica"></div></div>'+
  '<div class="form-row"><label>Delito investigado *</label><input type="text" value="'+esc(f.delito)+'" oninput="S.form.delito=this.value" placeholder="ej. Estafa inform\u00e1tica (art. 172 CP)"></div>'+
  '<div class="g2 form-row"><div><label>Fiscal requirente *</label><input type="text" value="'+esc(f.fiscal)+'" oninput="S.form.fiscal=this.value" placeholder="Dr/Dra. Apellido Nombre"></div>'+
  '<div><label>Jurisdicci\u00f3n *</label><select oninput="S.form.jurisdiccion=this.value"><option value="">Seleccionar...</option>'+
  ['Capital','La Banda','A\u00f1atuya','Fr\u00edas','Monte Quemado','Termas'].map(j=>'<option value="'+j+'"'+(f.jurisdiccion===j?' selected':'')+'>'+j+'</option>').join('')+
  '</select></div></div>'+
  '<div class="form-row"><label>Descripci\u00f3n general de los secuestros recibidos *</label><textarea oninput="S.form.descripcionSecuestros=this.value" placeholder="Detallar elementos secuestrados: marca, modelo, n\u00famero de serie...">'+esc(f.descripcionSecuestros)+'</textarea></div>'+
  '<div class="form-row"><label>Tareas solicitadas *</label><textarea oninput="S.form.tareassolicitadas=this.value" placeholder="Describir las pericias y an\u00e1lisis requeridos...">'+esc(f.tareassolicitadas)+'</textarea></div>'+
  '<div class="form-row"><div class="upload-area">'+ic('ul',22,'var(--muted-fg)')+'<p style="font-size:13px;color:var(--muted-fg);margin-top:8px;">Adjuntar solicitud digitalizada (PDF, JPG)</p><p style="font-size:11px;color:var(--muted-fg);margin-top:2px;">Arrastr\u00e1 el archivo o hac\u00e9 clic</p></div></div>';
  const step2='<div class="summary-box"><h3 style="font-size:14px;font-weight:600;color:var(--primary);margin-bottom:14px;">Resumen de la solicitud a registrar</h3>'+
  [['N\u00b0 Expediente',f.expediente||'—'],['Imputado/a',f.imputado||'—'],['V\u00edctima',f.victima||'—'],['Delito',f.delito||'—'],['Fiscal',f.fiscal||'—'],['Jurisdicci\u00f3n',f.jurisdiccion||'—'],['Urgencia',f.urgencia],['Estado (auto)','Pendiente']].map(([k,v])=>'<div class="summary-row"><span class="skey">'+k+'</span><span class="sval">'+esc(v)+'</span></div>').join('')+
  '</div><div class="alert alert-info">'+ic('alertC',16,'#1D4ED8')+' <span>Se asignar\u00e1 autom\u00e1ticamente un N\u00b0 correlativo. El estado inicial ser\u00e1 <strong>Pendiente</strong>.</span></div>';
  return '<div class="modal-overlay" id="moverlay" onclick="closeMOI(event)"><div class="modal" onclick="event.stopPropagation()">'+
  '<div class="modal-head"><div><div class="modal-title">Registrar Nueva Solicitud</div><div class="modal-sub-txt">Paso '+S.modalStep+' de 2 — '+(S.modalStep===1?'Datos de la solicitud':'Revisi\u00f3n y confirmaci\u00f3n')+'</div></div>'+
  '<button class="btn-icon" onclick="closeM()" style="color:rgba(255,255,255,.7);">'+ic('x',18)+'</button></div>'+
  '<div style="display:flex;height:4px;"><div style="flex:1;background:'+(S.modalStep>=1?'var(--accent)':'var(--border)')+'"></div><div style="flex:1;background:'+(S.modalStep>=2?'var(--accent)':'var(--border)')+'"></div></div>'+
  '<div class="modal-body">'+(S.modalStep===1?step1:step2)+'</div>'+
  '<div class="modal-foot">'+(S.modalStep===1?'<button class="btn btn-ghost" onclick="closeM()">Cancelar</button><button class="btn btn-primary" onclick="mNext()">Continuar '+ic('chevR',13,'white')+'</button>':'<button class="btn btn-ghost" onclick="mBack()">\u2190 Atr\u00e1s</button><button class="btn btn-primary" onclick="saveOficio()">Confirmar registro</button>')+
  '</div></div></div>';
}

function renderAM(){
  const f=S.aForm;const o=S.solicitudes.find(x=>x.id===f.solicitudId);
  const dp=S.peritos.filter(p=>p.disp);
  return '<div class="modal-overlay" id="moverlay" onclick="closeMOI(event)"><div class="modal modal-sm" onclick="event.stopPropagation()">'+
  '<div class="modal-head"><div><div class="modal-title">Asignar Peritos</div><div class="modal-sub-txt">'+(o?esc(o.id)+' — '+esc(o.imputado):'')+'</div></div>'+
  '<button class="btn-icon" onclick="closeM()" style="color:rgba(255,255,255,.7);">'+ic('x',18)+'</button></div>'+
  '<div class="modal-body">'+
  '<div class="form-row"><label>Fecha y hora programada para apertura del informe *</label>'+
  '<input type="datetime-local" value="'+esc(f.fechaHoraInforme||'')+'" oninput="S.aForm.fechaHoraInforme=this.value"></div>'+
  '<div class="form-row"><label>Peritos responsables *</label><div class="check-group">'+
  dp.map(p=>{
    const sel=(f.peritosSeleccionados||[]).includes(p.nombre);
    return '<div class="check-item'+(sel?' checked':'')+'" onclick="toggleP(\''+p.nombre+'\')">'+
      '<div class="check-box">'+(sel?ic('check',10,'white'):'')+' </div>'+
      '<div style="flex:1;"><div style="font-weight:500;">'+esc(p.nombre)+'</div>'+
      '<div style="font-size:11px;color:var(--muted-fg);">'+esc(p.esp)+' · Carga actual: '+p.carga+'/'+p.max+'</div></div></div>';
  }).join('')+
  '</div>'+((f.peritosSeleccionados||[]).length>0?'<div style="margin-top:8px;font-size:12px;color:var(--primary);font-weight:500;">Seleccionados: '+esc((f.peritosSeleccionados||[]).join(', '))+'</div>':'')+
  '</div><div class="form-row"><label>N\u00b0 de Informe T\u00e9cnico</label>'+
  '<input type="text" value="'+esc(f.nroInformeTecnico||'')+'" oninput="S.aForm.nroInformeTecnico=this.value" placeholder="ej. IT-2026-0115">'+
  '<p style="font-size:11px;color:var(--muted-fg);margin-top:4px;">Este campo puede modificarse posteriormente desde el detalle.</p></div>'+
  '</div><div class="modal-foot"><button class="btn btn-ghost" onclick="closeM()">Cancelar</button><button class="btn btn-primary" onclick="saveAsig()">Guardar asignaci\u00f3n</button></div></div></div>';
}

/* ===== RENDER ===== */
function render(){
  const app=document.getElementById('app');
  if(!S.loggedIn){app.innerHTML=renderLogin();return;}
  let sc;
  if(S.screen==='dashboard')sc=renderDash();
  else if(S.screen==='mesa-entrada')sc=renderMesa();
  else if(S.screen==='asignacion')sc=renderAsig();
  else if(S.screen==='causas')sc=renderCausas();
  else if(S.screen==='detalle-causa')sc=renderDetalle(S.detailId||'');
  else sc=renderDash();
  let modal='';
  if(S.modal==='nueva-solicitud')modal=renderNOM();
  else if(S.modal==='asignar-perito')modal=renderAM();
  app.innerHTML='<div class="app-shell">'+renderSB()+'<div class="main-area">'+renderTB()+'<main class="content" id="mc">'+sc+'</main></div></div>'+modal;
  if(S.successMsg)setTimeout(()=>{S.successMsg='';rc();},3000);
}

function rc(){const mc=document.getElementById('mc');if(!mc)return;let h;if(S.screen==='dashboard')h=renderDash();else if(S.screen==='mesa-entrada')h=renderMesa();else if(S.screen==='asignacion')h=renderAsig();else if(S.screen==='causas')h=renderCausas();else if(S.screen==='detalle-causa')h=renderDetalle(S.detailId||'');else h=renderDash();mc.innerHTML=h;}

function rmModal(){const e=document.getElementById('moverlay');if(e)e.remove();if(!S.modal)return;let h='';if(S.modal==='nueva-solicitud')h=renderNOM();else if(S.modal==='asignar-perito')h=renderAM();if(h)document.body.insertAdjacentHTML('beforeend',h);}

/* ===== ACTIONS ===== */
function nav(screen,id=''){if(screen==='detalle-causa'&&id){S.detailId=id;S.detalleTab='info';}S.screen=screen;render();}
function toggleSB(){S.sidebarOpen=!S.sidebarOpen;const sb=document.getElementById('sidebar');if(sb){sb.classList.toggle('open',S.sidebarOpen);sb.classList.toggle('closed',!S.sidebarOpen);}}
function logout(){S.loggedIn=false;S.user=null;S.screen='login';render();}
function setLR(r){S.loginRole=r;document.querySelectorAll('.role-btn').forEach(b=>b.classList.remove('active'));const idx=['mesa','coordinador','perito'].indexOf(r);document.querySelectorAll('.role-btn')[idx]?.classList.add('active');}
function doLogin(){const r=ROLES[S.loginRole]||ROLES.mesa;S.user={role:S.loginRole,...r};S.loggedIn=true;S.screen='dashboard';render();}
function togglePwd(){const p=document.getElementById('pwd');if(p)p.type=p.type==='password'?'text':'password';}
function openModal(t){S.modal=t;S.modalStep=1;if(t==='nueva-solicitud')S.form={expediente:'',imputado:'',victima:'',delito:'',fiscal:'',jurisdiccion:'',descripcionSecuestros:'',tareassolicitadas:'',urgencia:'media'};rmModal();}
function openAM(id){const o=S.solicitudes.find(x=>x.id===id);S.modal='asignar-perito';S.aForm={solicitudId:id,fechaHoraInforme:o?.fhi||'',peritosSeleccionados:[...(o?.peritos||[])],nroInformeTecnico:o?.nroIT||''};rmModal();}
function closeM(){S.modal=null;const e=document.getElementById('moverlay');if(e)e.remove();}
function closeMOI(e){if(e.target.id==='moverlay')closeM();}
function mNext(){S.modalStep=2;rmModal();}
function mBack(){S.modalStep=1;rmModal();}

function saveOficio(){
  const f=S.form;
  if(!f.expediente||!f.imputado||!f.victima||!f.delito||!f.fiscal||!f.jurisdiccion||!f.descripcionSecuestros||!f.tareassolicitadas){alert('Por favor complet\u00e1 todos los campos obligatorios (*).');return;}
  const id=genId();const td=todayStr();const d=new Date();d.setDate(d.getDate()+14);
  const venc=String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0')+'/'+d.getFullYear();
  S.solicitudes.unshift({id,exp:f.expediente,imputado:f.imputado,victima:f.victima,delito:f.delito,fiscal:f.fiscal,jur:f.jurisdiccion,secuestros:f.descripcionSecuestros,tareas:f.tareassolicitadas,urgencia:f.urgencia,estado:'pendiente',ingreso:td,venc,fhi:null,peritos:[],nroIT:null,hist:[{f:td+' '+timeStr(),e:'Solicitud recibida en mesa de entrada',u:S.user?.name||'Sistema',c:'#1D4ED8'},{f:td+' '+timeStr(),e:'Registrado en el sistema como '+id,u:S.user?.name||'Sistema',c:'#1D4ED8'}]});
  closeM();S.successMsg='Solicitud registrada exitosamente. N\u00b0 asignado: '+id;render();
}

function saveAsig(){
  const f=S.aForm;
  if(!f.fechaHoraInforme){alert('Por favor indic\u00e1 la fecha y hora para la apertura del informe.');return;}
  if(!f.peritosSeleccionados||f.peritosSeleccionados.length===0){alert('Por favor seleccion\u00e1 al menos un perito.');return;}
  const o=S.solicitudes.find(x=>x.id===f.solicitudId);
  
  if(o){
    o.peritos.forEach(oldPName => {
       const p = S.peritos.find(x => x.nombre === oldPName);
       if(p && p.carga > 0) { p.carga--; p.disp = p.carga < p.max; }
    });

    o.peritos=[...f.peritosSeleccionados];
    o.fhi=f.fechaHoraInforme;
    o.nroIT=f.nroInformeTecnico||null;
    if(o.estado==='pendiente')o.estado='en-proceso';
    
    o.peritos.forEach(newPName => {
       const p = S.peritos.find(x => x.nombre === newPName);
       if(p) { p.carga++; p.disp = p.carga < p.max; }
    });

    const td=todayStr();
    o.hist.push({f:td+' '+timeStr(),e:'Asignado a: '+f.peritosSeleccionados.join(', ')+'. Apertura: '+fmtDT(f.fechaHoraInforme),u:S.user?.name||'Sistema',c:'#D97706'});
    if(f.nroInformeTecnico)o.hist.push({f:td+' '+timeStr(),e:'N\u00b0 informe t\u00e9cnico asignado: '+f.nroInformeTecnico,u:S.user?.name||'Sistema',c:'#16A34A'});
  }
  closeM();S.successMsg='Asignaci\u00f3n guardada para '+f.solicitudId;render();
}

function confirmAsig(id){S.asigGuardados.add(id);rc();}
function toggleP(nombre){if(!S.aForm.peritosSeleccionados)S.aForm.peritosSeleccionados=[];const i=S.aForm.peritosSeleccionados.indexOf(nombre);if(i>=0)S.aForm.peritosSeleccionados.splice(i,1);else S.aForm.peritosSeleccionados.push(nombre);rmModal();}
function saveNota(id){const ta=document.getElementById('nota-ta');if(!ta||!ta.value.trim())return;if(!S.notas[id])S.notas[id]=[];S.notas[id].push({t:ta.value.trim(),u:S.user?.name||'Sistema',f:todayStr()+' '+timeStr()});const o=S.solicitudes.find(x=>x.id===id);if(o)o.hist.push({f:todayStr()+' '+timeStr(),e:'Nota interna agregada',u:S.user?.name||'Sistema',c:'#7C3AED'});rc();}
function setDT(t){S.detalleTab=t;rc();}
function upMS(v){S.mesaSearch=v;rc();}
function setMF(f){S.mesaFiltro=f;rc();}
function upCS(v){S.causasSearch=v;rc();}
function setCE(f){S.causasEstado=f;rc();}
function setCU(f){S.causasUrgencia=f;rc();}
function setCJ(f){S.causasJurisdiccion=f;rc();}
function toggleCF(){S.causasShowFilters=!S.causasShowFilters;rc();}

/* ===== START ===== */
function renderLogin(){
  const roles=[{id:'mesa',t:'Mesa de Entrada',s:'Recepci\u00f3n y asignaci\u00f3n'},{id:'coordinador',t:'Coordinador',s:'Auditor\u00eda y solo lectura'},{id:'perito',t:'Perito Inform\u00e1tico',s:'Consulta de causas'}];
  return '<div class="login-wrap">'+
  '<div class="login-left">'+
  '<div class="logo-row"><div class="logo-icon">'+ic('scale',22,'#0EA5E9')+'</div><div><div class="logo-name">Sistema de Peritos</div><div class="logo-sub">PODER JUDICIAL</div></div></div>'+
  '<div><div class="login-hero">Gesti\u00f3n integral de solicitudes judiciales</div><p class="login-desc">Plataforma centralizada para mesa de entrada y peritos inform\u00e1ticos. Recepci\u00f3n, asignaci\u00f3n y seguimiento de causas en un solo lugar.</p></div>'+
  '<div class="login-stats"><div class="login-stat"><div class="login-stat-val">248</div><div class="login-stat-lbl">Solicitudes activas</div></div><div class="login-stat"><div class="login-stat-val">34</div><div class="login-stat-lbl">Peritos</div></div><div class="login-stat"><div class="login-stat-val">1.2K</div><div class="login-stat-lbl">Causas 2026</div></div></div>'+
  '</div>'+
  '<div class="login-right"><div class="login-form-wrap">'+
  '<h2 style="font-size:22px;font-weight:700;margin-bottom:6px;">Iniciar sesi\u00f3n</h2>'+
  '<p style="font-size:14px;color:var(--muted-fg);margin-bottom:24px;">Seleccion\u00e1 tu perfil e ingres\u00e1 tus credenciales</p>'+
  '<div style="margin-bottom:16px;"><label>Perfil de acceso</label><div class="role-grid">'+
  roles.map(r=>'<button class="role-btn'+(S.loginRole===r.id?' active':'')+'" onclick="setLR(\''+r.id+'\')"><span class="role-btn-title">'+r.t+'</span><span class="role-btn-sub">'+r.s+'</span></button>').join('')+
  '</div></div>'+
  '<div class="form-row"><label>Usuario</label><div class="input-wrap has-icon-l"><span class="input-icon">'+ic('user',15)+'</span><input type="text" placeholder="usuario@judicial.gob"></div></div>'+
  '<div class="form-row"><label>Contrase\u00f1a</label><div class="input-wrap has-icon-l"><span class="input-icon">'+ic('lock',15)+'</span><input type="password" id="pwd" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"></div></div>'+
  '<div style="text-align:right;margin-bottom:20px;"><a href="#" style="font-size:12px;color:var(--accent);font-weight:500;">\u00bfOlvidaste tu contrase\u00f1a?</a></div>'+
  '<button class="btn btn-primary w-full" onclick="doLogin()" style="justify-content:center;padding:12px;">Ingresar al sistema</button>'+
  '<p style="font-size:12px;color:var(--muted-fg);text-align:center;margin-top:24px;">Para fines demostrativos, seleccion\u00e1 un perfil y presion\u00e1 "Ingresar"</p>'+
  '</div></div></div>';
}

// Inicializar la app
render();