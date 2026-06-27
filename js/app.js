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
        
        btn.style.display = roles.includes(S.user?.rol) ? 'flex' : 'none';
        btn.classList.toggle('active', isActive);
        
        const iconContainer = btn.querySelector('.nav-ic span');
        if(iconContainer) {
             iconContainer.style.color = isActive ? 'var(--sb-accent)' : 'rgba(255,255,255,.65)';
        }
    });

    // 2. Sidebar: Datos del Usuario
    const u = S.user || {};
    document.getElementById('sb-user-ini').innerText = u.ini || '';
    document.getElementById('sb-user-name').innerText = u.nombre || '';
    document.getElementById('sb-user-role').innerText = u.lbl || '';

    // 3. Topbar: Título y Breadcrumbs
    const screenNameEl = document.getElementById('tb-screen-name');
    screenNameEl.innerText = screenLbl();
    
    const sep = document.getElementById('tb-detail-separator');
    const idEl = document.getElementById('tb-detail-id');
    
    if (S.screen === 'detalle-causa' && S.detailId) {
        const o = S.solicitudes.find(x => x.id === S.detailId);
        const prefijo = o ? (o.tipo === 'narco' ? 'NAR-' : 'GEN-') : '';
        
        sep.style.display = 'flex';
        idEl.style.display = 'block';
        idEl.innerText = prefijo + S.detailId;
        
        screenNameEl.style.cursor = 'pointer';
        screenNameEl.style.color = 'var(--muted-fg)';
        screenNameEl.onclick = () => nav('causas'); 
        
    } else {
        sep.style.display = 'none';
        idEl.style.display = 'none';
        
        screenNameEl.style.cursor = 'default';
        screenNameEl.style.color = '';
        screenNameEl.onclick = null;
    }
    renderNotifBadge();
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

        await DB.init();

        const session = await DB.loadSession();
        if (session?.username) {
            const user = S.users.find(u => u.username === session.username);
            if (user) {
                S.user = user;
                S.loggedIn = true;
                nav('dashboard');
                return;
            }
        }
        nav('login');
    } catch (e) {
        console.error("Error cargando componentes base:", e);
    }
}

document.addEventListener('DOMContentLoaded', initApp);

/* ===== MODALS LOGIC ===== */
window.promptDesestimarSolicitud = function() {
    const input = prompt("Ingrese el N° Interno de la solicitud a desestimar (ej. 20260248 o GEN-20260248):");
    if (!input) return;
    
    const cleanId = input.replace(/^(GEN-|NAR-)/i, '').trim();
    const req = S.solicitudes.find(s => s.id === cleanId);
    
    if (!req) {
        showToast('No se encontró ninguna solicitud con ese número interno.', 'error');
        return;
    }
    
    // Activar modo eliminación y apagar modo edición
    S.deleteMode = true;
    S.deleteId = cleanId;
    S.editMode = false;
    S.editId = null;
    
    // Precargar datos para que el Resumen (Paso 2) los muestre correctamente
    S.form = {
        tipo: req.tipo,
        expediente: req.exp,
        imputado: req.imputado,
        victima: req.victima,
        delito: req.delito,
        fiscal: req.fiscal,
        jurisdiccion: req.jur,
        descripcionSecuestros: req.secuestros,
        tareassolicitadas: req.tareas,
        urgencia: req.urgencia
    };
    
    S.modal = 'nueva-solicitud';
    S.modalStep = 2; // Forzamos ir directo al resumen
    rmModal();
};

window.promptEditSolicitud = function() {
    const input = prompt("Ingrese el N° Interno de la solicitud a modificar (ej. 20260248 o GEN-20260248):");
    if (!input) return;
    
    // Limpiar espacios y posibles prefijos para extraer solo el ID numérico
    const cleanId = input.replace(/^(GEN-|NAR-)/i, '').trim();
    
    const req = S.solicitudes.find(s => s.id === cleanId);
    if (!req) {
        showToast('No se encontró ninguna solicitud con ese número interno.', 'error');
        return;
    }
    
    // Configurar estado en modo edición y precargar datos en S.form
    S.editMode = true;
    S.editId = cleanId;
    S.form = {
        tipo: req.tipo,
        expediente: req.exp,
        imputado: req.imputado,
        victima: req.victima,
        delito: req.delito,
        fiscal: req.fiscal,
        jurisdiccion: req.jur,
        descripcionSecuestros: req.secuestros,
        tareassolicitadas: req.tareas,
        urgencia: req.urgencia
    };
    
    S.modal = 'nueva-solicitud';
    S.modalStep = 1;
    rmModal();
};

function openModal(t){
    S.modal=t; 
    S.modalStep=1; 
    if(t==='nueva-solicitud'){
        S.editMode=false; S.editId=null; S.deleteMode=false; S.deleteId=null; 
        S.form={tipo:'general', expediente:'',imputado:'',victima:'',delito:'',fiscal:'',jurisdiccion:'',descripcionSecuestros:'',tareassolicitadas:'',urgencia:'media'};
    } 
    rmModal(); 
}
function closeM(){S.modal=null;const e=document.getElementById('moverlay');if(e)e.remove();}
function closeMOI(e){if(e.target.id==='moverlay')closeM();}
function mNext(){S.modalStep=2; updateModalData(); } // Fíjate que acá ya no destruye el modal, solo actualiza la vista
function mBack(){S.modalStep=1; updateModalData(); } // Acá tampoco
function toggleP(nombre){if(!S.aForm.peritosSeleccionados)S.aForm.peritosSeleccionados=[];const i=S.aForm.peritosSeleccionados.indexOf(nombre);if(i>=0)S.aForm.peritosSeleccionados.splice(i,1);else S.aForm.peritosSeleccionados.push(nombre); updateModalData(); }
window.removePerito = function(nombre) {
    if (S.aForm.peritosSeleccionados) {
        S.aForm.peritosSeleccionados = S.aForm.peritosSeleccionados.filter(p => p !== nombre);
        updateModalData();
    }
};
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

        document.getElementById('nom-tipo').disabled = (S.editMode || S.deleteMode);
        
        // Título principal
        const titleEl = document.querySelector('.modal-title');
        if (titleEl) {
            if (S.deleteMode) titleEl.innerText = 'Desestimar Solicitud';
            else if (S.editMode) titleEl.innerText = 'Modificar Solicitud';
            else titleEl.innerText = 'Registrar Nueva Solicitud';
        }

        // 2. Controlar visibilidad de pasos
        document.getElementById('nom-step-1').classList.toggle('hidden', S.modalStep !== 1);
        document.getElementById('nom-step-2').classList.toggle('hidden', S.modalStep !== 2);
        
        // 3. Barra de progreso y subtítulos
        const subEl = document.getElementById('nom-modal-sub');
        if (subEl) {
            if (S.deleteMode) subEl.innerText = 'Revisión y confirmación de eliminación';
            else subEl.innerText = S.modalStep === 1 ? 'Paso 1 de 2 — Datos de la solicitud' : 'Paso 2 de 2 — Revisión y confirmación';
        }

        if (S.deleteMode) {
            document.getElementById('nom-bar-1').style.background = 'var(--destructive)';
            document.getElementById('nom-bar-2').style.background = 'var(--destructive)';
        } else {
            document.getElementById('nom-bar-1').style.background = S.modalStep >= 1 ? 'var(--accent)' : 'var(--border)';
            document.getElementById('nom-bar-2').style.background = S.modalStep >= 2 ? 'var(--accent)' : 'var(--border)';
        }

        // 4. Renderizar resumen dinámico (Paso 2)
        if (S.modalStep === 2) {
            const req = S.deleteMode ? S.solicitudes.find(x => x.id === S.deleteId) : (S.editMode ? S.solicitudes.find(x => x.id === S.editId) : null);
            const lblEstado = req ? (req.estado === 'en-proceso' ? 'En proceso' : (req.estado === 'resuelto' ? 'Resuelto' : 'Pendiente')) : 'Pendiente';
            
            const rows = [
                ['N° de Legajo de Causa', f.expediente || '—'],
                ['Imputado/a', f.imputado || '—'],
                ['Víctima', f.victima || '—'],
                ['Delito', f.delito || '—'],
                ['Fiscal', f.fiscal || '—'],
                ['Circunscripción', f.jurisdiccion || '—'],
                ['Urgencia', f.urgencia],
                ['Estado actual', lblEstado]
            ];
            document.getElementById('nom-summary-rows').innerHTML = rows.map(([k, v]) => 
                `<div class="summary-row"><span class="skey">${k}</span><span class="sval">${esc(v)}</span></div>`
            ).join('');

            // Modificar estéticas del resumen y alerta
            const summaryTitle = document.querySelector('#nom-step-2 .summary-box h3');
            if (summaryTitle) {
                if (S.deleteMode) {
                    summaryTitle.innerText = 'Resumen de la solicitud a desestimar';
                    summaryTitle.style.color = 'var(--destructive)';
                } else if (S.editMode) {
                    summaryTitle.innerText = 'Resumen de la solicitud a modificar';
                    summaryTitle.style.color = 'var(--primary)';
                } else {
                    summaryTitle.innerText = 'Resumen de la solicitud a registrar';
                    summaryTitle.style.color = 'var(--primary)';
                }
            }

            const alertBox = document.querySelector('#nom-step-2 .alert');
            if (alertBox) {
                if (S.deleteMode) {
                    alertBox.className = 'alert alert-error';
                    alertBox.innerHTML = `${ic('alertC', 16, '#991B1B')} <span><strong>Atención:</strong> Esta acción eliminará el registro físicamente del sistema y no se puede deshacer.</span>`;
                } else if (S.editMode) {
                    alertBox.className = 'alert alert-info';
                    alertBox.innerHTML = `${ic('alertC', 16, '#1D4ED8')} <span>Verifique los datos antes de confirmar la modificación.</span>`;
                } else {
                    alertBox.className = 'alert alert-info';
                    alertBox.innerHTML = `${ic('alertC', 16, '#1D4ED8')} <span>Se asignará automáticamente un N° interno. El estado inicial será <strong>Pendiente</strong>.</span>`;
                }
            }
        }

        // 5. Botones dinámicos del footer
        const foot = document.getElementById('nom-modal-foot');
        if (S.deleteMode) {
            foot.innerHTML = `<button class="btn btn-ghost" onclick="closeM()">Cancelar</button><button class="btn btn-primary" style="background:var(--destructive); border-color:var(--destructive);" onclick="confirmarEliminacion()">Confirmar eliminación</button>`;
        } else {
            foot.innerHTML = S.modalStep === 1 
                ? `<button class="btn btn-ghost" onclick="closeM()">Cancelar</button><button class="btn btn-primary" onclick="mNext()">Continuar ${ic('chevR', 13, 'white')}</button>`
                : `<button class="btn btn-ghost" onclick="mBack()">← Atrás</button><button class="btn btn-primary" onclick="saveOficio()">${S.editMode ? 'Confirmar modificación' : 'Confirmar registro'}</button>`;
        }
    }
    
    else if (S.modal === 'asignar-perito') {
        const f = S.aForm;
        const o = S.solicitudes.find(x => x.id === f.solicitudId);
        const p = S.peritos;

        document.getElementById('am-modal-sub').innerText = o ? `${(o.tipo==='narco'?'NAR-':'GEN-')}${esc(o.id)} — ${esc(o.imputado)}` : '';
        document.getElementById('am-fhi').value = f.fechaHoraInforme || '';

        // 1. Poblar el <datalist> dinámicamente con los peritos registrados
        const datalist = document.getElementById('dl-peritos');
        if (datalist) {
            datalist.innerHTML = p.map(peri => `<option value="${peri.nombre}">${peri.nombre}</option>`).join('');
        }

        // 2. Renderizar los peritos que ya están seleccionados como Etiquetas (Tags)
        const tagsContainer = document.getElementById('am-selected-tags');
        if (tagsContainer) {
            tagsContainer.innerHTML = (f.peritosSeleccionados || []).map(pName => {
                return `<div style="background:var(--primary); color:white; padding:4px 10px; border-radius:12px; font-size:12px; display:flex; align-items:center; gap:8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    ${esc(pName)}
                    <span style="cursor:pointer; font-weight:bold; font-size:14px; opacity:0.8;" onclick="removePerito('${pName}')" title="Quitar">×</span>
                </div>`;
            }).join('');
        }

        // 3. Escuchar cuando el usuario selecciona un nombre del datalist
        const searchInput = document.getElementById('am-perito-search');
        if (searchInput && !searchInput.dataset.listener) {
            searchInput.dataset.listener = "true"; // Evita crear el listener múltiples veces
            
            searchInput.addEventListener('change', function(e) {
                const val = e.target.value.trim();
                const exists = p.some(peri => peri.nombre === val);
                
                if (exists) {
                    if (!f.peritosSeleccionados) f.peritosSeleccionados = [];
                    // Si el perito no estaba en la lista, lo agregamos
                    if (!f.peritosSeleccionados.includes(val)) {
                        f.peritosSeleccionados.push(val);
                        e.target.value = ''; // Limpiamos el input
                        updateModalData(); // RE-RENDERIZA TODO (Etiquetas y Calendario)
                    } else {
                        e.target.value = ''; // Ya estaba seleccionado, solo limpiamos el input
                    }
                }
            });
        }

        // --- CÁLCULO DE CONFLICTOS Y ACTUALIZACIÓN REACTIVA DE AGENDA ---
        let overlappingIds = [];
        const conflictDiv = document.getElementById('am-conflict-warning');
        
        if (f.fechaHoraInforme && f.peritosSeleccionados && f.peritosSeleccionados.length > 0) {
            const targetDate = f.fechaHoraInforme.split('T')[0];
            const overlapping = S.solicitudes.filter(x =>
                x.id !== f.solicitudId && x.estado !== 'resuelto' &&
                x.fhi && x.fhi.startsWith(targetDate) &&
                x.peritos.some(p => f.peritosSeleccionados.includes(p))
            );

            if (overlapping.length > 0) {
                overlappingIds = overlapping.map(x => x.id);
                conflictDiv.innerHTML = `<div class="alert alert-warning" style="margin-bottom:16px; border-color:#EF4444; background:#FEF2F2; color:#991B1B;">
                    ${ic('alertC', 16, '#EF4444')}
                    <div><strong>¡Conflicto de Agenda Detectado!</strong><br>
                    Peritos ocupados en esta fecha:
                    <ul style="margin-top:4px; margin-bottom:0; padding-left:20px;">
                        ${overlapping.map(ov => `<li style="font-size:12px;"><strong>${ov.fhi.split('T')[1]} hs</strong> - Exp. ${ov.exp}</li>`).join('')}
                    </ul>
                    </div>
                </div>`;
            } else {
                conflictDiv.innerHTML = '';
            }
        } else if (conflictDiv) {
            conflictDiv.innerHTML = '';
        }

        let tentativeEvent = null;
        if (f.fechaHoraInforme && f.peritosSeleccionados && f.peritosSeleccionados.length > 0) {
            const [datePart, timePart] = f.fechaHoraInforme.split('T');
            tentativeEvent = {
                date: datePart, // YYYY-MM-DD
                time: timePart, // HH:MM
                peritos: f.peritosSeleccionados
            };
        }

        // MODIFICADO: Inyectar el calendario lateral pasándole las IDs conflictivas Y el evento tentativo
        const calContainer = document.getElementById('am-calendar-container');
        if (calContainer) {
            calContainer.innerHTML = buildCalendarHTML(overlappingIds, tentativeEvent);
        }
    }
}

async function saveOficio(){
  const f=S.form;
  if(!f.expediente||!f.imputado||!f.victima||!f.delito||!f.fiscal||!f.jurisdiccion||!f.descripcionSecuestros||!f.tareassolicitadas){
      showToast('Por favor completá todos los campos obligatorios (*).', 'error');
      return;
  }
  
  if (S.editMode) {
      // Flujo de Modificación
      const req = S.solicitudes.find(s => s.id === S.editId);
      if (req) {
          req.exp = f.expediente;
          req.imputado = f.imputado;
          req.victima = f.victima;
          req.delito = f.delito;
          req.fiscal = f.fiscal;
          req.jur = f.jurisdiccion;
          req.secuestros = f.descripcionSecuestros;
          req.tareas = f.tareassolicitadas;
          req.urgencia = f.urgencia;
          // Nota: id, tipo, estado, peritos, y fhi quedan INTACTOS.
      }
      closeM();
      showToast(`Solicitud ${(req.tipo==='narco'?'NAR-':'GEN-')}${req.id} modificada exitosamente.`);
  } else {
      // Flujo de Nuevo Registro (Original)
      const id=genId(f.tipo);
      S.solicitudes.unshift({id,tipo:f.tipo,exp:f.expediente,imputado:f.imputado,victima:f.victima,delito:f.delito,fiscal:f.fiscal,jur:f.jurisdiccion,secuestros:f.descripcionSecuestros,tareas:f.tareassolicitadas,urgencia:f.urgencia,estado:'pendiente',fhi:null,peritos:[]});
      closeM();
      showToast(`Solicitud registrada exitosamente: ${(f.tipo==='narco'?'NAR-':'GEN-')}${id}`);
  }
  
  await DB.saveSolicitudes();
  if(!S.editMode) await DB.saveIdCounters(); // Solo incrementar counter si es registro nuevo
  
  nav(S.screen);
}

window.confirmarEliminacion = async function() {
    if (!S.deleteMode || !S.deleteId) return;
    
    const index = S.solicitudes.findIndex(s => s.id === S.deleteId);
    if (index === -1) return;
    
    const req = S.solicitudes[index];
    const prefijo = req.tipo === 'narco' ? 'NAR-' : 'GEN-';
    
    // Eliminación física
    S.solicitudes.splice(index, 1);
    await DB.saveSolicitudes();
    
    closeM();
    showToast(`Solicitud ${prefijo}${req.id} desestimada correctamente.`);
    nav(S.screen);
};

async function saveAsig(){
  const f=S.aForm;
  if(!f.fechaHoraInforme){alert('Por favor indicá la fecha y hora para la apertura del informe.');return;}
  if(!f.peritosSeleccionados||f.peritosSeleccionados.length===0){alert('Por favor seleccioná al menos un perito.');return;}
  const o=S.solicitudes.find(x=>x.id===f.solicitudId);
  const prefijo = o ? (o.tipo === 'narco' ? 'NAR-' : 'GEN-') : '';
  if(o){
    o.peritos=[...f.peritosSeleccionados];
    o.fhi=f.fechaHoraInforme;
  }
  closeM();
  showToast(`Asignación guardada para ${prefijo}${f.solicitudId}`);
  await DB.saveSolicitudes();
  nav(S.screen);
}

function renderNotifBadge() {
    const dot = document.getElementById('notif-dot');
    if (!dot) return;
    const readIds = S.notifLeidas[S.user?.username] || [];
    const unread = S.solicitudes.filter(s =>
        s.peritos.includes(S.user?.nombre) && s.estado === 'en-proceso' && !readIds.includes(s.id)
    );
    dot.style.display = unread.length > 0 ? '' : 'none';
}

function toggleNotifPanel() {
    const dd = document.getElementById('notif-dropdown');
    if (!dd) return;
    const isOpen = dd.style.display === 'block';
    dd.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) {
        renderNotifDropdown();
        markNotifAsRead();
    }
}

function renderNotifDropdown() {
    const dd = document.getElementById('notif-dropdown');
    if (!dd) return;
    const readIds = S.notifLeidas[S.user?.username] || [];
    const pendientes = S.solicitudes.filter(s =>
        s.peritos.includes(S.user?.nombre) && s.estado === 'en-proceso' && !readIds.includes(s.id)
    );
    if (pendientes.length === 0) {
        dd.innerHTML = '<div style="padding:24px;text-align:center;color:var(--muted-fg);font-size:13px;">Sin notificaciones</div>';
        return;
    }
    dd.innerHTML = pendientes.map(s => `
        <div class="notif-item unread" onclick="nav('detalle-causa','${s.id}'); document.getElementById('notif-dropdown').style.display='none';">
            <div style="font-size:13px;font-weight:500;">Se le ha asignado una nueva solicitud</div>
            <div style="font-size:11px;color:var(--muted-fg);margin-top:4px;">N.º de Legajo de Causa ${esc(s.exp)}</div>
        </div>
    `).join('');
}

async function markNotifAsRead() {
    const username = S.user?.username;
    if (!username) return;
    const readIds = S.notifLeidas[username] || [];
    const unread = S.solicitudes.filter(s =>
        s.peritos.includes(S.user?.nombre) && s.estado === 'en-proceso' && !readIds.includes(s.id)
    );
    if (unread.length === 0) return;
    S.notifLeidas[username] = [...readIds, ...unread.map(s => s.id)];
    await DB.saveNotifLeidas();
    renderNotifBadge();
}