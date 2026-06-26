const DB = {
  _prefix: 'gpi_',

  async init() {
    const solicitudes = this._load('solicitudes');
    if (solicitudes) {
      S.solicitudes = solicitudes;
      S.idCounters = this._load('idCounters', { general: 249, narco: 1 });
    } else {
      this._save('solicitudes', S.solicitudes);
      this._save('idCounters', S.idCounters);
    }
    const users = this._load('users');
    if (users) {
        S.users = users;
    } else {
        for (const u of S.users) {
            u.password = await hashPassword(u.password);
        }
        this._save('users', S.users);
    }
    S.notifLeidas = this._load('notifLeidas', {});
  },

  _load(key, def = null) {
    try { const r = localStorage.getItem(this._prefix + key); return r ? JSON.parse(r) : def; }
    catch { return def; }
  },
  _save(key, val) { localStorage.setItem(this._prefix + key, JSON.stringify(val)); },

  async saveSolicitudes()   { this._save('solicitudes', S.solicitudes); },
  async saveIdCounters()    { this._save('idCounters', S.idCounters); },
  async saveUsers() { this._save('users', S.users); },
  async saveSession(user) { this._save('session', { username: user.username }); },
  async loadSession() { return this._load('session', null); },
  async clearSession() { localStorage.removeItem(this._prefix + 'session'); },
  async saveNotifLeidas() { this._save('notifLeidas', S.notifLeidas); },  
};