window.init_login = function() {
    const roles = [
        {id:'mesa',t:'Mesa de Entrada',s:'Recepci\u00f3n y asignaci\u00f3n'},
        {id:'coordinador',t:'Coordinador',s:'Auditor\u00eda y solo lectura'},
        {id:'perito',t:'Perito Inform\u00e1tico',s:'Consulta de causas'}
    ];
    document.getElementById('login-roles-container').innerHTML = roles.map(r => 
        '<button class="role-btn'+(S.loginRole===r.id?' active':'')+'" onclick="setLR(\''+r.id+'\')"><span class="role-btn-title">'+r.t+'</span><span class="role-btn-sub">'+r.s+'</span></button>'
    ).join('');
};