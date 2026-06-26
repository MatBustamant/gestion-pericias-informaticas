const DB = {
  _prefix: 'gpi_',

  async init() {
    const solicitudes = this._load('solicitudes');
    if (solicitudes) {
      S.solicitudes = solicitudes;
      S.asigGuardados = new Set(this._load('asigGuardados', []));
      S.idCounters = this._load('idCounters', { general: 249, narco: 1 });
    } else {
      this._save('solicitudes', S.solicitudes);
      this._save('asigGuardados', [...S.asigGuardados]);
      this._save('idCounters', S.idCounters);
    }
    const peritos = this._load('peritos');
    if (peritos) S.peritos = peritos;
    else this._save('peritos', S.peritos);
  },

  _load(key, def = null) {
    try { const r = localStorage.getItem(this._prefix + key); return r ? JSON.parse(r) : def; }
    catch { return def; }
  },
  _save(key, val) { localStorage.setItem(this._prefix + key, JSON.stringify(val)); },

  async saveSolicitudes()   { this._save('solicitudes', S.solicitudes); },
  async saveAsigGuardados() { this._save('asigGuardados', [...S.asigGuardados]); },
  async saveIdCounters()    { this._save('idCounters', S.idCounters); },
  async savePeritos() { this._save('peritos', S.peritos); },
};