/* ===== ICONS ===== */
const IC = {
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

function ic(n, s=16, c='currentColor') { return `<span style="display:inline-flex;align-items:center;justify-content:center;width:${s}px;height:${s}px;flex-shrink:0;color:${c};">${(IC[n]||'')}</span>`; }
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// Inyector automático de iconos para HTML estático
function renderIcons(container = document) {
    container.querySelectorAll('[data-ic]').forEach(el => {
        const name = el.getAttribute('data-ic');
        const size = el.getAttribute('data-size') || 16;
        const color = el.getAttribute('data-color') || undefined; 
        
        // outerHTML destruye el span fantasma y lo reemplaza por el output limpio de ic()
        el.outerHTML = ic(name, size, color);
    });
}

/* ===== STATE & DATA ===== */
const S = {
  loggedIn:false, user:null, screen:'login', sidebarOpen:true, loginRole:'mesa', detailId:null, detalleTab:'info',
  mesaSearch:'', mesaFiltro:'todos', causasSearch:'', causasEstado:'todos', causasUrgencia:'todos', causasJurisdiccion:'todos', causasShowFilters:false,
  asigGuardados:new Set(), modal:null, modalStep:1, successMsg:'', idCounter:249,
  form:{expediente:'',imputado:'',victima:'',delito:'',fiscal:'',jurisdiccion:'',descripcionSecuestros:'',tareassolicitadas:'',urgencia:'media'},
  aForm:{solicitudId:'',fechaHoraInforme:'',peritosSeleccionados:[],nroInformeTecnico:''},
  notas:{}, solicitudes:[], peritos:[]
};

S.peritos = [
  {id:1,nombre:'Laura Su\u00e1rez',esp:'An\u00e1lisis forense digital',ini:'LS',carga:3,max:6,disp:true},
  {id:2,nombre:'Mat\u00edas Herrera',esp:'Extracci\u00f3n de datos m\u00f3viles',ini:'MH',carga:5,max:6,disp:true},
  {id:3,nombre:'Ver\u00f3nica Castro',esp:'Redes y comunicaciones',ini:'VC',carga:6,max:6,disp:false},
  {id:4,nombre:'Diego Romero',esp:'An\u00e1lisis forense digital',ini:'DR',carga:2,max:6,disp:true},
  {id:5,nombre:'Claudia R\u00edos',esp:'Fraude electr\u00f3nico',ini:'CR',carga:4,max:6,disp:true},
  {id:6,nombre:'Ignacio Palma',esp:'Extracci\u00f3n de datos m\u00f3viles',ini:'IP',carga:1,max:6,disp:true},
];

S.solicitudes = [
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

/* ===== CACHÉ DE COMPONENTES ===== */
const COMPS = { sidebar: '', topbar: '' };

/* ===== ROUTER Y COMPONENTES ===== */
async function nav(screen, id = '') {
    if (screen === 'detalle-causa' && id) { S.detailId = id; S.detalleTab = 'info'; }
    S.screen = screen;
    const app = document.getElementById('app');

    if (!S.loggedIn) {
        const html = await fetch('views/login.html').then(r => r.text());
        app.innerHTML = html;
        renderIcons(app);
        if (window.init_login) window.init_login(); 
        return;
    }

    try {
        const html = await fetch(`views/${screen}.html`).then(r => r.text());
        
        // Inyectamos el Shell usando los componentes cacheados
        app.innerHTML = `
            <div class="app-shell" id="shell">
                ${COMPS.sidebar}
                <div class="main-area">
                    ${COMPS.topbar}
                    <main class="content" id="mc">${html}</main>
                </div>
            </div>`;
            
        renderIcons(app);
        updateShell(); // Actualizamos datos del usuario y botones activos
        
        const initFn = window['init_' + screen.replace('-', '_')];
        if (initFn) initFn();

        if (S.successMsg) {
            setTimeout(() => { S.successMsg = ''; nav(S.screen); }, 3000);
        }
    } catch (e) {
        console.error("Error en router:", e);
        app.innerHTML = "<h2>Error cargando la vista</h2>";
    }
}

// Función que manipula el DOM del Shell sin recargarlo desde cero
function updateShell() {
    // 1. Sidebar: Mostrar/Ocultar según rol y marcar botón activo
    document.querySelectorAll('.nav-item').forEach(btn => {
        const route = btn.getAttribute('data-route');
        const roles = btn.getAttribute('data-roles').split(',');
        const isActive = (S.screen === 'detalle-causa' ? 'causas' : S.screen) === route;
        
        btn.style.display = roles.includes(S.user?.role) ? 'flex' : 'none';
        btn.classList.toggle('active', isActive);
        
        const iconContainer = btn.querySelector('.nav-ic span');
        if(iconContainer) {
             iconContainer.style.color = isActive ? 'var(--sb-accent)' : 'rgba(255,255,255,.65)';
        }
    });

    // 2. Sidebar: Datos del Usuario
    const u = ROLES[S.user?.role] || ROLES.mesa;
    document.getElementById('sb-user-ini').innerText = u.ini;
    document.getElementById('sb-user-name').innerText = u.name;
    document.getElementById('sb-user-role').innerText = u.lbl;

    // 3. Topbar: Título y Breadcrumbs
    document.getElementById('tb-screen-name').innerText = screenLbl();
    const sep = document.getElementById('tb-detail-separator');
    const idEl = document.getElementById('tb-detail-id');
    
    if (S.screen === 'detalle-causa' && S.detailId) {
        sep.style.display = 'flex';
        idEl.style.display = 'block';
        idEl.innerText = S.detailId;
    } else {
        sep.style.display = 'none';
        idEl.style.display = 'none';
    }
}

function toggleSB(){S.sidebarOpen=!S.sidebarOpen;const sb=document.getElementById('sidebar');if(sb){sb.classList.toggle('open',S.sidebarOpen);sb.classList.toggle('closed',!S.sidebarOpen);}}

/* ===== START (BOOTSTRAPPER) ===== */
// Ahora arrancamos la app descargando primero los componentes globales
async function initApp() {
    try {
        COMPS.sidebar = await fetch('components/sidebar.html').then(r => r.text());
        COMPS.topbar = await fetch('components/topbar.html').then(r => r.text());
        
        // ¡AGREGAMOS LAS DOS LÍNEAS PARA LOS MODALES!
        COMPS.modal_nueva_solicitud = await fetch('components/modal-nueva-solicitud.html').then(r => r.text());
        COMPS.modal_asignar_perito = await fetch('components/modal-asignar-perito.html').then(r => r.text());
        
        nav('login');
    } catch (e) {
        console.error("Error cargando componentes base:", e);
    }
}

document.addEventListener('DOMContentLoaded', initApp);

/* ===== MODALS LOGIC ===== */
function openModal(t){S.modal=t;S.modalStep=1;if(t==='nueva-solicitud')S.form={expediente:'',imputado:'',victima:'',delito:'',fiscal:'',jurisdiccion:'',descripcionSecuestros:'',tareassolicitadas:'',urgencia:'media'}; rmModal(); }
function openAM(id){const o=S.solicitudes.find(x=>x.id===id);S.modal='asignar-perito';S.aForm={solicitudId:id,fechaHoraInforme:o?.fhi||'',peritosSeleccionados:[...(o?.peritos||[])],nroInformeTecnico:o?.nroIT||''}; rmModal(); }
function closeM(){S.modal=null;const e=document.getElementById('moverlay');if(e)e.remove();}
function closeMOI(e){if(e.target.id==='moverlay')closeM();}
function mNext(){S.modalStep=2; updateModalData(); } // Fíjate que acá ya no destruye el modal, solo actualiza la vista
function mBack(){S.modalStep=1; updateModalData(); } // Acá tampoco
function toggleP(nombre){if(!S.aForm.peritosSeleccionados)S.aForm.peritosSeleccionados=[];const i=S.aForm.peritosSeleccionados.indexOf(nombre);if(i>=0)S.aForm.peritosSeleccionados.splice(i,1);else S.aForm.peritosSeleccionados.push(nombre); updateModalData(); }

// Esta función carga el esqueleto estático del modal desde la caché
function rmModal() {
    const e = document.getElementById('moverlay');
    if (e) e.remove();
    if (!S.modal) return;

    let html = '';
    if (S.modal === 'nueva-solicitud') html = COMPS.modal_nueva_solicitud;
    else if (S.modal === 'asignar-perito') html = COMPS.modal_asignar_perito;

    if (html) {
        document.body.insertAdjacentHTML('beforeend', html);
        const modalEl = document.getElementById('moverlay');
        renderIcons(modalEl); // Renderizamos los iconos del modal inyectado
        updateModalData(); // Inyectamos los datos vivos en el esqueleto
    }
}

// Esta es la estrella del show: actualiza los valores del DOM sin recargar el HTML
function updateModalData() {
    if (S.modal === 'nueva-solicitud') {
        const f = S.form;
        
        // 1. Setear valores de los inputs (Paso 1)
        document.getElementById('nom-expediente').value = f.expediente || '';
        document.getElementById('nom-urgencia').value = f.urgencia || 'media';
        document.getElementById('nom-imputado').value = f.imputado || '';
        document.getElementById('nom-victima').value = f.victima || '';
        document.getElementById('nom-delito').value = f.delito || '';
        document.getElementById('nom-fiscal').value = f.fiscal || '';
        document.getElementById('nom-jurisdiccion').value = f.jurisdiccion || '';
        document.getElementById('nom-secuestros').value = f.descripcionSecuestros || '';
        document.getElementById('nom-tareas').value = f.tareassolicitadas || '';

        // 2. Controlar visibilidad de pasos (alternando la clase .hidden de tu CSS)
        document.getElementById('nom-step-1').classList.toggle('hidden', S.modalStep !== 1);
        document.getElementById('nom-step-2').classList.toggle('hidden', S.modalStep !== 2);
        
        // 3. Barra de progreso y títulos
        document.getElementById('nom-modal-sub').innerText = S.modalStep === 1 ? 'Paso 1 de 2 — Datos de la solicitud' : 'Paso 2 de 2 — Revisión y confirmación';
        document.getElementById('nom-bar-1').style.background = S.modalStep >= 1 ? 'var(--accent)' : 'var(--border)';
        document.getElementById('nom-bar-2').style.background = S.modalStep >= 2 ? 'var(--accent)' : 'var(--border)';

        // 4. Renderizar resumen dinámico (Paso 2)
        if (S.modalStep === 2) {
            const rows = [
                ['N° Expediente', f.expediente || '—'],
                ['Imputado/a', f.imputado || '—'],
                ['Víctima', f.victima || '—'],
                ['Delito', f.delito || '—'],
                ['Fiscal', f.fiscal || '—'],
                ['Jurisdicción', f.jurisdiccion || '—'],
                ['Urgencia', f.urgencia],
                ['Estado (auto)', 'Pendiente']
            ];
            document.getElementById('nom-summary-rows').innerHTML = rows.map(([k, v]) => 
                `<div class="summary-row"><span class="skey">${k}</span><span class="sval">${esc(v)}</span></div>`
            ).join('');
        }

        // 5. Botones dinámicos del footer
        document.getElementById('nom-modal-foot').innerHTML = S.modalStep === 1 
            ? `<button class="btn btn-ghost" onclick="closeM()">Cancelar</button><button class="btn btn-primary" onclick="mNext()">Continuar ${ic('chevR', 13, 'white')}</button>`
            : `<button class="btn btn-ghost" onclick="mBack()">← Atrás</button><button class="btn btn-primary" onclick="saveOficio()">Confirmar registro</button>`;
    } 
    
    else if (S.modal === 'asignar-perito') {
        const f = S.aForm;
        const o = S.solicitudes.find(x => x.id === f.solicitudId);
        const dp = S.peritos.filter(p => p.disp);

        document.getElementById('am-modal-sub').innerText = o ? `${esc(o.id)} — ${esc(o.imputado)}` : '';
        document.getElementById('am-fhi').value = f.fechaHoraInforme || '';
        document.getElementById('am-nro-it').value = f.nroInformeTecnico || '';

        // Renderizar lista de selección de peritos
        document.getElementById('am-peritos-group').innerHTML = dp.map(p => {
            const sel = (f.peritosSeleccionados || []).includes(p.nombre);
            return `
                <div class="check-item ${sel ? 'checked' : ''}" onclick="toggleP('${p.nombre}')">
                    <div class="check-box">${sel ? ic('check', 10, 'white') : ''}</div>
                    <div style="flex:1;">
                        <div style="font-weight:500;">${esc(p.nombre)}</div>
                        <div style="font-size:11px; color:var(--muted-fg);">${esc(p.esp)} · Carga actual: ${p.carga}/${p.max}</div>
                    </div>
                </div>`;
        }).join('');

        const selCount = (f.peritosSeleccionados || []).length;
        document.getElementById('am-selected-lbl').innerText = selCount > 0 ? `Seleccionados: ${(f.peritosSeleccionados).join(', ')}` : '';
    }
}

function saveOficio(){
  const f=S.form;
  if(!f.expediente||!f.imputado||!f.victima||!f.delito||!f.fiscal||!f.jurisdiccion||!f.descripcionSecuestros||!f.tareassolicitadas){alert('Por favor complet\u00e1 todos los campos obligatorios (*).');return;}
  const id=genId();const td=todayStr();const d=new Date();d.setDate(d.getDate()+14);
  const venc=String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0')+'/'+d.getFullYear();
  S.solicitudes.unshift({id,exp:f.expediente,imputado:f.imputado,victima:f.victima,delito:f.delito,fiscal:f.fiscal,jur:f.jurisdiccion,secuestros:f.descripcionSecuestros,tareas:f.tareassolicitadas,urgencia:f.urgencia,estado:'pendiente',ingreso:td,venc,fhi:null,peritos:[],nroIT:null,hist:[{f:td+' '+timeStr(),e:'Solicitud recibida en mesa de entrada',u:S.user?.name||'Sistema',c:'#1D4ED8'},{f:td+' '+timeStr(),e:'Registrado en el sistema como '+id,u:S.user?.name||'Sistema',c:'#1D4ED8'}]});
  closeM();S.successMsg='Solicitud registrada exitosamente. N\u00b0 asignado: '+id;nav(S.screen);
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
    o.peritos=[...f.peritosSeleccionados]; o.fhi=f.fechaHoraInforme; o.nroIT=f.nroInformeTecnico||null;
    if(o.estado==='pendiente')o.estado='en-proceso';
    o.peritos.forEach(newPName => {
       const p = S.peritos.find(x => x.nombre === newPName);
       if(p) { p.carga++; p.disp = p.carga < p.max; }
    });
    const td=todayStr();
    o.hist.push({f:td+' '+timeStr(),e:'Asignado a: '+f.peritosSeleccionados.join(', ')+'. Apertura: '+fmtDT(f.fechaHoraInforme),u:S.user?.name||'Sistema',c:'#D97706'});
    if(f.nroInformeTecnico)o.hist.push({f:td+' '+timeStr(),e:'N\u00b0 informe t\u00e9cnico asignado: '+f.nroInformeTecnico,u:S.user?.name||'Sistema',c:'#16A34A'});
  }
  closeM();S.successMsg='Asignaci\u00f3n guardada para '+f.solicitudId;nav(S.screen);
}