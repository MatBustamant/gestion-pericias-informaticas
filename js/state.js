/* ===== STATE & DATA ===== */
const S = {
  loggedIn:false, user:null, screen:'login', sidebarOpen:true, loginRole:'mesa', detailId:null, detalleTab:'info',
  mesaSearch:'', mesaFiltro:'todos', causasSearch:'', causasEstado:'todos', causasUrgencia:'todos', causasJurisdiccion:'todos', causasShowFilters:false,
  asigGuardados:new Set(), modal:null, modalStep:1, successMsg:'', idCounter:249,
  form:{expediente:'',imputado:'',victima:'',delito:'',fiscal:'',jurisdiccion:'',descripcionSecuestros:'',tareassolicitadas:'',urgencia:'media'},
  aForm:{solicitudId:'',fechaHoraInforme:'',peritosSeleccionados:[],nroInformeTecnico:''},
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
  {id:'20260248',exp:'12458/2026',imputado:'Rodr\u00edguez, Marcelo Ariel',victima:'Empresa FinTech SA',delito:'Estafa inform\u00e1tica (art. 172 CP)',fiscal:'Dr. Agust\u00edn Lara',jur:'Capital',secuestros:'1 notebook HP Pavilion, 1 tel\u00e9fono Motorola G84, 1 pendrive Kingston 64GB',tareas:'Extracci\u00f3n forense de dispositivos, an\u00e1lisis de transferencias bancarias y correo electr\u00f3nico',urgencia:'alta',estado:'pendiente',ingreso:'15/06/2026',fhi:null,peritos:[]},
  {id:'20260247',exp:'11920/2026',imputado:'Fern\u00e1ndez, Luis Alberto',victima:'Banco Naci\u00f3n Sucursal Centro',delito:'Acceso ileg\u00edtimo a sistema inform\u00e1tico (art. 153 bis CP)',fiscal:'Dra. Valeria Soto',jur:'Capital',secuestros:'1 iPhone 13 Pro (IMEI: 356789012345678), tarjetas SIM x2',tareas:'Extracci\u00f3n forense de telefon\u00eda, an\u00e1lisis de apps bancarias, registros de llamadas',urgencia:'media',estado:'en-proceso',ingreso:'14/06/2026',fhi:'2026-06-20T09:00',peritos:['Mat\u00edas Herrera']},
  {id:'20260246',exp:'11432/2026',imputado:'Varela, Roberto Carlos',victima:'Comercio Digital ABC SRL',delito:'Fraude electr\u00f3nico agravado (art. 173 inc. 16 CP)',fiscal:'Dr. Hern\u00e1n Quiroga',jur:'La Banda',secuestros:'1 PC Dell, 2 discos r\u00edgidos externos WD, documentaci\u00f3n contable digital',tareas:'An\u00e1lisis forense de equipos, recuperaci\u00f3n de archivos eliminados, peritaje de software',urgencia:'baja',estado:'resuelto',ingreso:'13/06/2026',fhi:'2026-06-15T10:00',peritos:['Diego Romero']},
  {id:'20260245',exp:'11100/2026',imputado:'G\u00f3mez, Pedro Ignacio',victima:'Municipalidad de Fr\u00edas',delito:'Sabotaje inform\u00e1tico (art. 183 CP)',fiscal:'Dr. Marcelo Vega',jur:'Fr\u00edas',secuestros:'Servidor HP ProLiant, 3 equipos de escritorio, switch de red',tareas:'An\u00e1lisis forense de servidor, determinaci\u00f3n de accesos no autorizados, logs del sistema',urgencia:'alta',estado:'pendiente',ingreso:'12/06/2026',fhi:null,peritos:[]},
  {id:'20260244',exp:'10875/2026',imputado:'L\u00f3pez, Marina Soledad',victima:'Estudiante menor de edad',delito:'Grooming — art. 131 CP',fiscal:'Dra. Carolina Medina',jur:'Capital',secuestros:'1 Samsung Galaxy A54, tablet Samsung',tareas:'Extracci\u00f3n forense de dispositivos, an\u00e1lisis de conversaciones y multimedia',urgencia:'media',estado:'en-proceso',ingreso:'11/06/2026',fhi:'2026-06-18T14:00',peritos:['Laura Su\u00e1rez']},
  {id:'20260243',exp:'10654/2026',imputado:'Tech Solutions SRL',victima:'Empresa Competidora SA',delito:'Espionaje corporativo — acceso ileg\u00edtimo',fiscal:'Dr. Rafael Torrez',jur:'A\u00f1atuya',secuestros:'2 notebooks Lenovo ThinkPad, 1 servidor NAS Synology, 4 unidades USB',tareas:'An\u00e1lisis forense completo, clonado de discos, an\u00e1lisis de tr\u00e1fico de red',urgencia:'baja',estado:'resuelto',ingreso:'10/06/2026',fhi:'2026-06-12T09:00',peritos:['Claudia R\u00edos']},
  {id:'20260242',exp:'10201/2026',imputado:'Morales, Santiago Ezequiel',victima:'Menores de edad (3 v\u00edctimas)',delito:'Pornograf\u00eda infantil — art. 128 CP',fiscal:'Dra. Patricia Su\u00e1rez',jur:'Monte Quemado',secuestros:'1 PC desktop, 2 discos r\u00edgidos externos, material digital en CD/DVD',tareas:'Extracci\u00f3n y an\u00e1lisis forense, identificaci\u00f3n de material il\u00edcito, rastreo de origen',urgencia:'alta',estado:'en-proceso',ingreso:'09/06/2026',fhi:'2026-06-11T08:00',peritos:['Laura Su\u00e1rez']},
  {id:'20260241',exp:'9980/2026',imputado:'Desconocido (IP identificada)',victima:'Banco Provincial SA',delito:'Phishing y fraude bancario electr\u00f3nico',fiscal:'Dr. Luis Castillo',jur:'Termas',secuestros:'Evidencia digital en la nube, registros de servidor',tareas:'An\u00e1lisis de logs, rastreo de IP, pericia sobre sitio web fraudulento',urgencia:'media',estado:'resuelto',ingreso:'08/06/2026',fhi:'2026-06-10T10:00',peritos:['Ignacio Palma']},
];

const ROLES={
  mesa:{name:'Ana Gonz\u00e1lez',ini:'AG',lbl:'Mesa de Entrada'},
  coordinador:{name:'Carlos M\u00e9ndez',ini:'CM',lbl:'Coordinador'},
  perito:{name:'Laura Su\u00e1rez',ini:'LS',lbl:'Perito Inform\u00e1tico'}
};

const NAV=[
  {id:'dashboard',lbl:'Inicio',ic:'dash',roles:['mesa', 'coordinador', 'perito']},
  {id:'mesa-entrada',lbl:'Mesa de Entrada',ic:'inbox',roles:['mesa']},
  {id:'asignacion',lbl:'Asignaci\u00f3n de Peritos',ic:'users',roles:['mesa']},
  {id:'causas',lbl:'Consulta de Solicitudes',ic:'search',roles:['mesa', 'coordinador', 'perito']},
];