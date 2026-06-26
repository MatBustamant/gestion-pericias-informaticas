// js/auth.js
async function doLogin() {
    const username = document.getElementById('username')?.value?.trim();
    const password = document.getElementById('pwd')?.value;

    if (!username || !password) {
        showToast('Completá usuario y contraseña', 'error');
        return;
    }

    const user = S.users.find(u => u.username === username);
    if (!user) {
        showToast('Usuario o contraseña incorrectos', 'error');
        return;
    }

    const hash = await hashPassword(password);
    if (hash !== user.password) {
        showToast('Usuario o contraseña incorrectos', 'error');
        return;
    }

    S.user = user;
    S.loggedIn = true;
    nav('dashboard');
}

function logout() {
    S.loggedIn = false;
    S.user = null;
    nav('login');
}

function togglePwd() {
    const p = document.getElementById('pwd');
    if(p) p.type = p.type === 'password' ? 'text' : 'password';
}