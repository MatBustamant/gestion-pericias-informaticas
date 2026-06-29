const DB = {
  _prefix: 'gpi_',

  async init() {
    try {
      const resUsers = await leerUsuarios();
      if (resUsers.ok) {
        const usuarios = await resUsers.json();
        S.users = usuarios.map(u => this._apiUsuarioToFlat(u));
      }
      await this._refrescarSolicitudes();
    } catch (e) {
      console.error("Error en DB.init()", e);
    }
    S.notifLeidas = this._load('notifLeidas', {});
  },

  // === TRANSFORMS ===

  _apiUsuarioToFlat(u) {
    const nombres = (u.nombreApellido || '').split(' ');
    const ini = nombres.map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase();
    const rolMap = { 'PERITO': 'perito', 'MESA_ENTRADA': 'mesa', 'COORDINADOR': 'coordinador', 'ADMIN': 'coordinador' };
    const lblMap = { 'PERITO': 'Perito Informático', 'MESA_ENTRADA': 'Mesa de Entrada', 'COORDINADOR': 'Coordinador', 'ADMIN': 'Coordinador' };
    return {
      id: u.id,
      nombre: u.nombreApellido,
      ini: ini,
      rol: rolMap[u.rol] || u.rol.toLowerCase(),
      username: u.username,
      password: u.password,
      lbl: lblMap[u.rol] || u.rol
    };
  },

  _apiSolicitudToFlat(req) {
    const c = req.causa || {};
    const s = req.solicitud || {};
    const peritosIds = req.peritosIds || [];
    const peritos = peritosIds
      .map(id => { const u = S.users.find(u => u.id === id); return u ? u.nombre : null; })
      .filter(Boolean);
    const anio = s.año || new Date().getFullYear();
    const numStr = String(s.numInterno || 0).padStart(4, '0');
    return {
      id: `${anio}${numStr}`,
      dbId: s.id,
      tipo: (s.tipo || '').toLowerCase(),
      exp: c.numExpediente || '',
      imputado: c.imputados || '',
      victima: c.victimas || '',
      delito: c.delito || '',
      fiscal: s.fiscalSolicitante || '',
      jur: s.circunscripcion || '',
      secuestros: s.descripcionSecuestros || '',
      tareas: req.tareasSolicitadas || '',
      urgencia: (s.urgencia || '').toLowerCase(),
      estado: (s.estado || 'pendiente').toLowerCase().replace(/_/g, '-'),
      fhi: s.fechaApertura ? s.fechaApertura.substring(0, 16) : null,
      peritosIds: peritosIds,
      peritos: peritos
    };
  },

  _flatToApiSolicitud(flat) {
    return {
      causa: {
        id: 0,
        numExpediente: flat.exp,
        delito: flat.delito,
        tipo: flat.tipo ? flat.tipo.toUpperCase() : 'GENERAL',
        imputados: flat.imputado,
        victimas: flat.victima
      },
      solicitud: {
        id: flat.dbId,
        causa: null,
        numInterno: 0,
        tipo: flat.tipo ? flat.tipo.toUpperCase() : 'GENERAL',
        año: new Date().getFullYear(),
        circunscripcion: flat.jur,
        descripcionSecuestros: flat.secuestros,
        urgencia: flat.urgencia ? flat.urgencia.toUpperCase() : 'MEDIA',
        estado: flat.estado ? flat.estado.replace(/-/g, '_').toUpperCase() : 'PENDIENTE',
        fechaApertura: flat.fhi ? flat.fhi + ':00Z' : null,
        fiscalSolicitante: flat.fiscal
      },
      peritosIds: (flat.peritos || []).map(n => { const u = S.users.find(u => u.nombre === n); return u ? u.id : null; }).filter(Boolean),
      tareasSolicitadas: flat.tareas || ''
    };
  },

  // === API REFRESH ===

  async _refrescarSolicitudes() {
    const res = await leerSolicitudes();
    if (!res.ok) return;
    const lista = await res.json();
    S.solicitudes = lista.map(req => this._apiSolicitudToFlat(req));
  },

  // === MUTATIONS ===

  async crearSolicitud(flatData) {
    const apiBody = this._flatToApiSolicitud(flatData);
    const res = await crearSolicitud(apiBody);
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }
    const created = await res.json();
    const flat = this._apiSolicitudToFlat(created);
    S.solicitudes.unshift(flat);
    return flat;
  },

  async modificarSolicitud(id, flatData) {
    const apiBody = this._flatToApiSolicitud(flatData);
    const res = await modificarSolicitud(id, apiBody);
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }
    await this._refrescarSolicitudes();
  },

  async eliminarSolicitud(id) {
    const res = await eliminarSolicitud(id);
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }
    await this._refrescarSolicitudes();
  },

  // === LOCAL STORAGE ===

  _load(key, def = null) {
    try { const r = localStorage.getItem(this._prefix + key); return r ? JSON.parse(r) : def; }
    catch { return def; }
  },
  _save(key, val) { localStorage.setItem(this._prefix + key, JSON.stringify(val)); },

  async saveSession(user) { this._save('session', { username: user.username }); },
  async loadSession() { return this._load('session', null); },
  async clearSession() { localStorage.removeItem(this._prefix + 'session'); },
  async saveNotifLeidas() { this._save('notifLeidas', S.notifLeidas); },
};