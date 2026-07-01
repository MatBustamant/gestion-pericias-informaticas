// js/auth.js
async function doLogin() {
    const username = document.getElementById('username')?.value?.trim();
    const password = document.getElementById('pwd')?.value;
    if (!username || !password) {
        showToast('Completá usuario y contraseña', 'error');
        return;
    }
    try {
        const res = await loginUsuario({ username, password });
        if (res.ok) {
            const userData = await res.json();
            S.user = DB._apiUsuarioToFlat(userData);
            S.loggedIn = true;
            await DB.saveSession(S.user);
            nav('dashboard');
        } else {
            showToast('Usuario o contraseña incorrectos', 'error');
        }
    } catch (e) {
        showToast('Error de conexión con el servidor', 'error');
    }
}

async function logout() {
    S.loggedIn = false;
    S.user = null;
    await DB.clearSession();
    nav('login');
}

function togglePwd() {
    const p = document.getElementById('pwd');
    if(p) p.type = p.type === 'password' ? 'text' : 'password';
}