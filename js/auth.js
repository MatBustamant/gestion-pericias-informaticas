// js/auth.js
function setLR(r) {
    S.loginRole = r;
    document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
    const idx = ['mesa', 'coordinador', 'perito'].indexOf(r);
    if(document.querySelectorAll('.role-btn')[idx]) {
        document.querySelectorAll('.role-btn')[idx].classList.add('active');
    }
}

function doLogin() {
    const r = ROLES[S.loginRole] || ROLES.mesa;
    S.user = {role: S.loginRole, ...r};
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