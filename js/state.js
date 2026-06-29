/* ===== STATE & DATA ===== */
const S = {
  loggedIn:false, user:null, screen:'login', sidebarOpen:true, detailId:null, detalleTab:'info',
  mesaSearch:'', mesaEstado:'todos', mesaUrgencia:'todos', mesaJurisdiccion:'todos', mesaShowFilters:false, causasSearch:'', causasEstado:'todos', causasUrgencia:'todos', causasJurisdiccion:'todos', causasShowFilters:false,
  modal:null, modalStep:1,
  form:{tipo:'general', expediente:'',imputado:'',victima:'',delito:'',fiscal:'',jurisdiccion:'',descripcionSecuestros:'',tareassolicitadas:'',urgencia:'media'},
  aForm:{solicitudId:'',fechaHoraInforme:'',peritosSeleccionados:[]}, cal: { year: new Date().getFullYear(), month: new Date().getMonth() },
  notifLeidas: {}, editMode: false, editId: null, editTipo: null, deleteMode: false, deleteId: null, deleteTipo: null,
  searchAction: null
};

Object.defineProperty(S, 'peritos', {
  get() { return S.users.filter(u => u.rol === 'perito'); }
});

const NAV=[
  {id:'dashboard',lbl:'Inicio',ic:'dash',roles:['mesa', 'coordinador', 'perito']},
  {id:'mesa-entrada',lbl:'Mesa de Entrada',ic:'inbox',roles:['mesa']},
  {id:'asignacion',lbl:'Asignaci\u00f3n de Peritos',ic:'users',roles:['mesa']},
  {id:'causas',lbl:'Consulta de Solicitudes',ic:'search',roles:['mesa', 'coordinador', 'perito']},
];