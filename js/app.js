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
        const o = S.solicitudes.find(x => x.id === S.detailId);
        const prefijo = o ? (o.tipo === 'narco' ? 'NAR-' : 'GEN-') : '';
        
        sep.style.display = 'flex';
        idEl.style.display = 'block';
        idEl.innerText = prefijo + S.detailId;
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
function openAM(id){const o=S.solicitudes.find(x=>x.id===id);S.modal='asignar-perito';S.aForm={solicitudId:id,fechaHoraInforme:o?.fhi||'',peritosSeleccionados:[...(o?.peritos||[])],nroInformeTecnico:o.id}; rmModal(); }
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
        document.getElementById('nom-tipo').value = f.tipo || 'general';
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
                ['N° de Legajo de Causa', f.expediente || '—'],
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

        document.getElementById('am-modal-sub').innerText = o ? `${(o.tipo==='narco'?'NAR-':'GEN-')}${esc(o.id)} — ${esc(o.imputado)}` : '';
        document.getElementById('am-fhi').value = f.fechaHoraInforme || '';

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
  const id=genId(f.tipo);
  const td=todayStr();
  S.solicitudes.unshift({id,tipo:f.tipo,exp:f.expediente,imputado:f.imputado,victima:f.victima,delito:f.delito,fiscal:f.fiscal,jur:f.jurisdiccion,secuestros:f.descripcionSecuestros,tareas:f.tareassolicitadas,urgencia:f.urgencia,estado:'pendiente',ingreso:td,fhi:null,peritos:[]});
  closeM();
  S.successMsg = `Solicitud registrada exitosamente: ${(f.tipo==='narco'?'NAR-':'GEN-')}${id}`;
  nav(S.screen);
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
    o.peritos=[...f.peritosSeleccionados]; o.fhi=f.fechaHoraInforme;
    if(o.estado==='pendiente')o.estado='en-proceso';
    o.peritos.forEach(newPName => {
       const p = S.peritos.find(x => x.nombre === newPName);
       if(p) { p.carga++; p.disp = p.carga < p.max; }
    });
  }
  closeM();
  S.successMsg=`Asignaci\u00f3n guardada para ${(o.tipo==='narco'?'NAR-':'GEN-')}${f.solicitudId}`;
  nav(S.screen);
}