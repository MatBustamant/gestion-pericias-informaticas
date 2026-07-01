/* ===== CACHÉ DE COMPONENTES ===== */
const COMPS = { sidebar: '', topbar: '' };

/* ===== ROUTER Y COMPONENTES ===== */
async function nav(screen, id = '') {
    if (screen === 'detalle-causa' && id) { const p=id.split('@'); S.detailId=p[0]; S.detailTipo=p[1]; S.detalleTab='info'; }
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
        
        COMPS.modal_nueva_solicitud = await fetch('components/modal-nueva-solicitud.html').then(r => r.text());
        COMPS.modal_asignar_perito = await fetch('components/modal-asignar-perito.html').then(r => r.text());
        COMPS.card = await fetch('components/card-solicitud.html').then(r => r.text());
        COMPS.calendar = await fetch('components/calendar.html').then(r => r.text());

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
function openAM(id,tipo){const o=S.solicitudes.find(x=>x.id===id && x.tipo===tipo);S.modal='asignar-perito';S.aForm={solicitudId:id,solicitudTipo:tipo,fechaHoraInforme:o?.fhi||'',peritosSeleccionados:[...(o?.peritos||[])],nroInformeTecnico:o.id};if (o?.fhi) {const d = new Date(o.fhi);if (!isNaN(d)) { S.cal.year = d.getFullYear(); S.cal.month = d.getMonth(); }} rmModal(); }

window.abrirModalBuscar = function(accion) {
    S.searchAction = accion;
    S.editMode = false; S.editTipo = null;
    S.deleteMode = false; S.deleteTipo = null;
    S.editId = null;
    S.deleteId = null;
    
    // Invocamos el modal que YA sabemos que funciona
    S.modal = 'nueva-solicitud';
    S.modalStep = 0; // Usamos un "Paso 0" personalizado para la búsqueda
    
    rmModal();
};

window.ejecutarBusquedaModal = function() {
    const inputEl = document.getElementById('search-id-input');
    if (!inputEl) return;
    
    const input = inputEl.value.trim();
    if (!input) {
        showToast('Por favor, ingrese un número interno.', 'error');
        return;
    }
    
    const match = input.match(/^(GEN-|NAR-)?\s*(\d+)/i);
    if (!match) {
        showToast('Formato inválido. Usá GEN-XXXXX o NAR-XXXXX.', 'error');
        return;
    }
    
    const prefix = match[1] ? match[1].toUpperCase() : null;
    const cleanId = match[2];
    const tipoFiltro = prefix === 'NAR-' ? 'narco' : (prefix === 'GEN-' ? 'general' : null);
    
    let candidates = S.solicitudes;
    if (tipoFiltro) candidates = candidates.filter(s => s.tipo === tipoFiltro);
    candidates = candidates.filter(s => s.id === cleanId);
    
    if (candidates.length === 0) {
        showToast('No se encontró ninguna solicitud con ese número interno.', 'error');
        return;
    }
    if (candidates.length > 1) {
        showToast('El ID existe en múltiples tipos. Usá el prefijo GEN- o NAR-.', 'error');
        return;
    }
    
    const req = candidates[0];
    
    S.form = {
        tipo: req.tipo, expediente: req.exp, imputado: req.imputado, victima: req.victima,
        delito: req.delito, fiscal: req.fiscal, jurisdiccion: req.jur,
        descripcionSecuestros: req.secuestros, tareassolicitadas: req.tareas, urgencia: req.urgencia
    };
    
    if (S.searchAction === 'edit') {
        S.editMode = true; S.editId = cleanId; S.editTipo = req.tipo; S.editExpOriginal = req.exp;
        S.deleteMode = false; S.deleteId = null; S.deleteTipo = null;
        S.modalStep = 1;
    } else if (S.searchAction === 'delete') {
        S.deleteMode = true; S.deleteId = cleanId; S.deleteTipo = req.tipo;
        S.editMode = false; S.editId = null; S.editTipo = null;
        S.modalStep = 2;
    }
    
    rmModal();
};

function openModal(t){
    S.modal=t; 
    S.modalStep=1; 
    if(t==='nueva-solicitud'){
        S.editMode=false; S.editId=null; S.editTipo=null; S.deleteMode=false; S.deleteId=null; S.deleteTipo=null; S.editExpOriginal = '';
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

function updateModalData() {
    if (S.modal === 'nueva-solicitud') {
        const f = S.form;
        
        // 1. Setear valores
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

        const tipoEl = document.getElementById('nom-tipo');
        tipoEl.disabled = (S.editMode || S.deleteMode);
        const expInput = document.getElementById('nom-expediente');
        if (expInput && !expInput.dataset.lookup) {
            expInput.dataset.lookup = '1';
            expInput.addEventListener('input', function() {
                clearTimeout(_lookupTimer);
                _lookupTimer = setTimeout(() => {
                    const disableIfFound = !S.editMode || this.value !== S.editExpOriginal;
                    lookupExpediente(this.value, disableIfFound);
                }, 400);
            });
        }
        // 2. Controlar textos dinámicos
        const titleEl = document.querySelector('.modal-title');
        const subEl = document.getElementById('nom-modal-sub');
        
        if (S.modalStep === 0) {
            if (titleEl) titleEl.innerText = 'Buscar Solicitud';
            if (subEl) subEl.innerText = 'Ingrese el identificador del registro';
        } else {
            if (titleEl) {
                if (S.deleteMode) titleEl.innerText = 'Desestimar Solicitud';
                else if (S.editMode) titleEl.innerText = 'Modificar Solicitud';
                else titleEl.innerText = 'Registrar Nueva Solicitud';
            }
            if (subEl) {
                if (S.deleteMode) subEl.innerText = 'Revisión y confirmación de desestimación';
                else subEl.innerText = S.modalStep === 1 ? 'Paso 1 de 2 — Datos de la solicitud' : 'Paso 2 de 2 — Revisión y confirmación';
            }
        }

        // 3. Crear contenedor de Búsqueda (Paso 0) dinámicamente si no existe
        let searchBox = document.getElementById('nom-step-0');
        if (!searchBox) {
            const step1 = document.getElementById('nom-step-1');
            if (step1) {
                searchBox = document.createElement('div');
                searchBox.id = 'nom-step-0';
                searchBox.innerHTML = `
                    <div class="alert alert-info" style="margin-bottom: 16px;">
                        <span><strong>ⓘ</strong> Indique el número correlativo o el código con su prefijo (GEN- o NAR-).</span>
                    </div>
                    <div class="form-group">
                        <label class="form-label" style="font-weight: 600; margin-bottom: 6px; display: block;">Número Interno *</label>
                        <input type="text" id="search-id-input" class="form-control" placeholder="Ej. 20260248 o GEN-20260248" style="width: 100%;" autocomplete="off">
                    </div>
                `;
                step1.parentNode.insertBefore(searchBox, step1);
            }
        }

        // 4. Mostrar/Ocultar los pasos correspondientes
        if (searchBox) searchBox.classList.toggle('hidden', S.modalStep !== 0);
        document.getElementById('nom-step-1').classList.toggle('hidden', S.modalStep !== 1);
        document.getElementById('nom-step-2').classList.toggle('hidden', S.modalStep !== 2);
        
        // 5. Barra de progreso
        if (S.modalStep === 0) {
            document.getElementById('nom-bar-1').style.background = 'var(--border)';
            document.getElementById('nom-bar-2').style.background = 'var(--border)';
        } else if (S.deleteMode) {
            document.getElementById('nom-bar-1').style.background = 'var(--destructive)';
            document.getElementById('nom-bar-2').style.background = 'var(--destructive)';
        } else {
            document.getElementById('nom-bar-1').style.background = S.modalStep >= 1 ? 'var(--accent)' : 'var(--border)';
            document.getElementById('nom-bar-2').style.background = S.modalStep >= 2 ? 'var(--accent)' : 'var(--border)';
        }

        // 6. Resumen (Paso 2)
        if (S.modalStep === 2) {
            const req = S.deleteMode ? S.solicitudes.find(x => x.id === S.deleteId && x.tipo === S.deleteTipo) : (S.editMode ? S.solicitudes.find(x => x.id === S.editId && x.tipo === S.editTipo) : null);
            const lblEstado = req ? (req.estado === 'en-proceso' ? 'En proceso' : (req.estado === 'resuelto' ? 'Resuelto' : 'Pendiente')) : 'Pendiente';
            
            const rows = [
                ['N° de Legajo de Causa', f.expediente || '—'],
                ['Tipo de Solicitud', f.tipo === 'narco' ? 'Narco Menudeo' : 'General'],
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

            const summaryTitle = document.querySelector('#nom-step-2 .summary-box h3');
            if (summaryTitle) {
                if (S.deleteMode) { summaryTitle.innerText = 'Resumen de la solicitud a desestimar'; summaryTitle.style.color = 'var(--destructive)'; }
                else if (S.editMode) { summaryTitle.innerText = 'Resumen de la solicitud a modificar'; summaryTitle.style.color = 'var(--primary)'; }
                else { summaryTitle.innerText = 'Resumen de la solicitud a registrar'; summaryTitle.style.color = 'var(--primary)'; }
            }

            const alertBox = document.querySelector('#nom-step-2 .alert');
            if (alertBox) {
                if (S.deleteMode) {
                    alertBox.className = 'alert alert-error';
                    alertBox.innerHTML = `<span><strong>Atención:</strong> Esta acción no se puede deshacer.</span>`;
                } else if (S.editMode) {
                    alertBox.className = 'alert alert-info';
                    alertBox.innerHTML = `<span>Verifique los datos antes de confirmar la modificación.</span>`;
                } else {
                    alertBox.className = 'alert alert-info';
                    alertBox.innerHTML = `<span>Se asignará automáticamente un N° interno. El estado inicial será <strong>Pendiente</strong>.</span>`;
                }
            }
        }

        // 7. Botones del footer
        const foot = document.getElementById('nom-modal-foot');
        if (S.modalStep === 0) {
            foot.innerHTML = `<button class="btn btn-ghost" onclick="closeM()">Cancelar</button><button class="btn btn-primary" onclick="ejecutarBusquedaModal()">Continuar</button>`;
        } else if (S.deleteMode) {
            foot.innerHTML = `<button class="btn btn-ghost" onclick="closeM()">Cancelar</button><button class="btn btn-primary" style="background:var(--destructive); border-color:var(--destructive);" onclick="confirmarEliminacion()">Confirmar desestimación</button>`;
        } else {
            foot.innerHTML = S.modalStep === 1 
                ? `<button class="btn btn-ghost" onclick="closeM()">Cancelar</button><button class="btn btn-primary" onclick="mNext()">Continuar</button>`
                : `<button class="btn btn-ghost" onclick="mBack()">← Atrás</button><button class="btn btn-primary" onclick="saveOficio()">${S.editMode ? 'Confirmar modificación' : 'Confirmar registro'}</button>`;
        }

        // 8. Foco de accesibilidad
        if (S.modalStep === 0) {
            setTimeout(() => {
                const input = document.getElementById('search-id-input');
                if (input) input.focus();
            }, 50);
        }
    }
    
    else if (S.modal === 'asignar-perito') {
        const f = S.aForm;
        const o = S.solicitudes.find(x => x.id === f.solicitudId && x.tipo === f.solicitudTipo);
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

        const calContainer = document.getElementById('am-calendar-container');
        if (calContainer) {
            calContainer.innerHTML = '';
            calContainer.appendChild(buildCalendar({
                conflictIds: overlappingIds,
                tentativeEvent: tentativeEvent,
                onMonthChange: () => updateModalData()
            }));
        }
    }
}

async function saveOficio() {
    const f = S.form;
    
    if (!f.expediente || !f.imputado || !f.victima || !f.delito || !f.fiscal || !f.jurisdiccion || !f.descripcionSecuestros || !f.tareassolicitadas) {
        showToast('Por favor completá todos los campos obligatorios (*).', 'error');
        return;
    }

    const legajoRegex = /^\d{4}-\d+$/;
    if (!legajoRegex.test(f.expediente.trim())) {
        showToast('El dato ingresado en el N° de Legajo no es válido. Debe tener el formato AÑO-NUMERO (ej. 2026-12345).', 'error');
        return;
    }

    if (f.imputado.length > 255 || f.victima.length > 255 || f.delito.length > 255 || f.fiscal.length > 255) {
        showToast('Los campos nominales (Imputado, Víctima, Delito, Fiscal) no pueden superar los 255 caracteres.', 'error');
        return;
    }
    if (f.descripcionSecuestros.length > 2000 || f.tareassolicitadas.length > 2000) {
        showToast('Las descripciones de Secuestros y Tareas no pueden superar los 2000 caracteres.', 'error');
        return;
    }

    if (S.editMode) {
        const req = S.solicitudes.find(s => s.id === S.editId && s.tipo === S.editTipo);
        if (req) {
            const flatData = {
                tipo: req.tipo,
                causaId: req.causaId,
                exp: f.expediente,
                imputado: f.imputado,
                victima: f.victima,
                delito: f.delito,
                fiscal: f.fiscal,
                jur: f.jurisdiccion,
                secuestros: f.descripcionSecuestros,
                tareas: f.tareassolicitadas,
                urgencia: f.urgencia,
                peritos: req.peritos,
                fhi: req.fhi,
                estado: req.estado
            };
            await DB.modificarSolicitud(req.dbId, flatData);
        }
        closeM();
        showToast(`Solicitud ${(req.tipo === 'narco' ? 'NAR-' : 'GEN-')}${req.id} modificada exitosamente.`);
    } else {
        const flatData = {
            tipo: f.tipo,
            exp: f.expediente,
            imputado: f.imputado,
            victima: f.victima,
            delito: f.delito,
            fiscal: f.fiscal,
            jur: f.jurisdiccion,
            secuestros: f.descripcionSecuestros,
            tareas: f.tareassolicitadas,
            urgencia: f.urgencia
        };
        const creada = await DB.crearSolicitud(flatData);
        closeM();
        showToast(`Solicitud registrada exitosamente: ${(f.tipo === 'narco' ? 'NAR-' : 'GEN-')}${creada.id}`);
    }

    nav(S.screen);
}

window.confirmarEliminacion = async function() {
    if (!S.deleteMode || !S.deleteId) return;
    const req = S.solicitudes.find(s => s.id === S.deleteId && s.tipo === S.deleteTipo);
    if (!req) return;
    const prefijo = req.tipo === 'narco' ? 'NAR-' : 'GEN-';
    await DB.eliminarSolicitud(req.dbId);
    closeM();
    showToast(`Solicitud ${prefijo}${req.id} desestimada correctamente.`);
    nav(S.screen);
};

async function saveAsig(){
  const f=S.aForm;
  if(!f.fechaHoraInforme){alert('Por favor indicá la fecha y hora para la apertura del informe.');return;}

  const selectedDate = new Date(f.fechaHoraInforme);
  const currentDate = new Date();
  if (selectedDate < currentDate) {
      showToast('La fecha y hora asignada no es válida porque ya pasó. Por favor ingresá una fecha futura.', 'error');
      return;
  }

  if(!f.peritosSeleccionados||f.peritosSeleccionados.length===0){alert('Por favor seleccioná al menos un perito.');return;}
  const o=S.solicitudes.find(x=>x.id===f.solicitudId && x.tipo===f.solicitudTipo);
  const prefijo = o ? (o.tipo === 'narco' ? 'NAR-' : 'GEN-') : '';
  if(o){
    o.peritos=[...f.peritosSeleccionados];
    o.fhi=f.fechaHoraInforme;
    await DB.modificarSolicitud(o.dbId, o);
  }
  closeM();
  showToast(`Asignación guardada para ${prefijo}${f.solicitudId}`);
  init_asignacion();
}

async function confirmAsig(id, tipo) {
    const o = S.solicitudes.find(x => x.id === id && x.tipo === tipo);
    if (o && o.estado === 'pendiente') {
        o.estado = 'en-proceso';
        await DB.modificarSolicitud(o.dbId, o);
    }
    if (!o) return;
    const prefijo = tipo === 'narco' ? 'NAR-' : 'GEN-';
    showToast('Asignación confirmada para ' + prefijo + id, 'success');
    init_asignacion();
};

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
        <div class="notif-item unread" onclick="nav('detalle-causa','${s.id+'@'+s.tipo}'); document.getElementById('notif-dropdown').style.display='none';">
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

let _lookupTimer = null;

async function lookupExpediente(exp, disableIfFound = true) {
    if (!exp || exp.trim() === '') {
        disableCausaFields(false);
        return;
    }
    try {
        const res = await buscarCausaPorExpediente(exp.trim());
        if (res.ok) {
            const c = await res.json();
            S.form.imputado = c.imputados || '';
            S.form.victima = c.victimas || '';
            S.form.delito = c.delito || '';
            if (!S.editMode) S.form.tipo = (c.tipo || '').toLowerCase();
            disableCausaFields(disableIfFound);
            const tipoEl = document.getElementById('nom-tipo');
            tipoEl.disabled = true;
        } else if (res.status === 404) {
            if (!S.editMode || exp !== S.editExpOriginal) {
                S.form.imputado = '';
                S.form.victima = '';
                S.form.delito = '';
            }
            disableCausaFields(false);
            if (!S.editMode) {
                const tipoEl = document.getElementById('nom-tipo');
                tipoEl.disabled = false;
            }
        }
    } catch (e) {
        disableCausaFields(false);
    }
    syncCausaFields();
}

function disableCausaFields(disabled) {
    ['nom-imputado', 'nom-victima', 'nom-delito'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.disabled = disabled; }
    });
}

function syncCausaFields() {
    const f = S.form;
    const el = (id) => document.getElementById(id);
    const i = el('nom-imputado'); const v = el('nom-victima'); const d = el('nom-delito');
    if (i) i.value = f.imputado || '';
    if (v) v.value = f.victima || '';
    if (d) d.value = f.delito || '';
    const t = el('nom-tipo');
    if (t) t.value = f.tipo || 'general';
}