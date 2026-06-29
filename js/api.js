// constantes y funciones helpers para las llamadas a la API
const API_BASE = "http://localhost:8080/api";

function POST(data) {
    return { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
}
function PUT(data) {
    return { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
}
const DELETE = { method: "DELETE" };

// funciones para los endpoints de causas
async function leerCausas() {
    return fetch(`${API_BASE}/causa/leer`);
}

async function buscarCausaPorExpediente(expediente) {
    return fetch(`${API_BASE}/causa/buscar?expediente=${expediente}`);
}

// funciones para los endpoints de solicitudes
async function leerSolicitudes() {
    return fetch(`${API_BASE}/solicitud/leer`);
}

async function buscarSolicitudPorNumInterno(num, año, tipo) {
    return fetch(`${API_BASE}/solicitud/buscar?num=${num}&anio=${año}&tipo=${tipo}`);
}

async function crearSolicitud(req) {
    return fetch(`${API_BASE}/solicitud/crear`, POST(req));
}

async function modificarSolicitud(req) {
    return fetch(`${API_BASE}/solicitud/modificar`, PUT(req));
}

async function eliminarSolicitud(id) {
    return fetch(`${API_BASE}/solicitud/eliminar/${id}`, DELETE);
}

// funciones para los endpoints de usuarios
async function leerUsuarios() {
    return fetch(`${API_BASE}/usuario/leer`);
}

async function leerUsuario(id) {
    return fetch(`${API_BASE}/usuario/leer/${id}`);
}

async function loginUsuario(credentials) {
    return fetch(`${API_BASE}/usuario/login`, POST(credentials));
}