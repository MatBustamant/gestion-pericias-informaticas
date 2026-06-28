CREATE TABLE IF NOT EXISTS "Acta_Apertura" (
	"id_acta"	INTEGER,
	"id_solicitud"	INTEGER NOT NULL,
	"personas_presentes"	TEXT NOT NULL,
	"encargado_apertura"	TEXT NOT NULL,
	"id_perito_a_cargo"	INTEGER NOT NULL,
	"ruta_foto_sobre_precinto"	TEXT NOT NULL,
	"ubicacion_fisica_dispositivo"	TEXT NOT NULL,
	"detalle_embalaje"	TEXT NOT NULL,
	"hash_documento"	TEXT,
	PRIMARY KEY("id_acta"),
	FOREIGN KEY("id_perito_a_cargo") REFERENCES "Usuario"("id_usuario"),
	FOREIGN KEY("id_solicitud") REFERENCES "Solicitud"("id_solicitud")
);
CREATE TABLE IF NOT EXISTS "Causa" (
	"id_causa"	INTEGER,
	"num_Expediente"	TEXT NOT NULL,
	"delito"	TEXT NOT NULL,
	"tipo"	TEXT NOT NULL,
	"imputados"	TEXT NOT NULL,
	"victimas"	TEXT NOT NULL,
	PRIMARY KEY("id_causa")
);
CREATE TABLE IF NOT EXISTS "Contador_Solicitud" (
    "tipo" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "ultimo" INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY("tipo", "anio")
);
CREATE TABLE IF NOT EXISTS "Dispositivos" (
	"id_dispositivo"	INTEGER,
	"id_solicitud"	INTEGER NOT NULL,
	"id_dispositivo_asociado"	INTEGER,
	"tipo"	TEXT NOT NULL,
	"subtipo"	TEXT NOT NULL,
	"estado_fisico"	TEXT NOT NULL,
	"marca"	TEXT,
	"modelo"	TEXT,
	"numero_serie"	TEXT,
	"imei"	TEXT,
	"estado_sesion"	TEXT,
	"estado_extraccion"	TEXT NOT NULL,
	"estado_devolucion"	TEXT NOT NULL,
	"observaciones"	TEXT,
	"fecha_hora_devolucion"	DATETIME,
	PRIMARY KEY("id_dispositivo"),
	FOREIGN KEY("id_dispositivo_asociado") REFERENCES "Dispositivos"("id_dispositivo"),
	FOREIGN KEY("id_solicitud") REFERENCES "Solicitud"("id_solicitud")
);
CREATE TABLE IF NOT EXISTS "Procedimiento" (
	"id_procedimiento"	INTEGER,
	"id_dispositivo"	INTEGER NOT NULL,
	"descripcion_procedimiento"	TEXT NOT NULL,
	"fecha_hora"	DATETIME NOT NULL,
	"ubicacion_datos_extraidos"	TEXT NOT NULL,
	"observacion"	TEXT,
	PRIMARY KEY("id_procedimiento"),
	FOREIGN KEY("id_dispositivo") REFERENCES "Dispositivos"("id_dispositivo")
);
CREATE TABLE IF NOT EXISTS "Solicitud" (
    "id_solicitud" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_causa" INTEGER NOT NULL,
    "num_interno" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL CHECK(tipo IN ('general', 'narco')),
    "anio" INTEGER NOT NULL DEFAULT (CAST(strftime('%Y', 'now') AS INTEGER)), -- Año actual automático
    "circunscripcion" TEXT NOT NULL,
    "descripcion_secuestros" TEXT NOT NULL,
    "urgencia" TEXT NOT NULL CHECK(urgencia IN ('alta', 'media', 'baja')),
    "estado" TEXT NOT NULL DEFAULT 'pendiente' CHECK(estado IN ('pendiente', 'en-proceso', 'resuelto')),
    "fecha_hora_agendada" DATETIME NOT NULL,
    "fiscal_solicitante" INTEGER NOT NULL,
    FOREIGN KEY("id_causa") REFERENCES "Causa"("id_causa"),
    UNIQUE("tipo", "anio", "num_interno") -- Evita duplicados de secuencia por tipo/año
);
CREATE TABLE IF NOT EXISTS "Tarea" (
	"id_tarea"	INTEGER,
	"id_solicitud"	INTEGER NOT NULL,
	"descripcion"	TEXT NOT NULL,
	PRIMARY KEY("id_tarea"),
	FOREIGN KEY("id_solicitud") REFERENCES "Solicitud"("id_solicitud")
);
CREATE TABLE IF NOT EXISTS "Usuario" (
	"id_usuario"	INTEGER,
	"nombre_usuario"	TEXT NOT NULL,
	"contrasena"	TEXT NOT NULL,
	"nombre_completo"	TEXT NOT NULL,
	"rol"	TEXT NOT NULL,
	"estado"	TEXT NOT NULL,
	PRIMARY KEY("id_usuario")
);
CREATE TABLE IF NOT EXISTS "Usuario_Solicitud" (
	"id_solicitud"	INTEGER NOT NULL,
	"id_usuario"	INTEGER NOT NULL,
	PRIMARY KEY("id_solicitud","id_usuario"),
	FOREIGN KEY("id_solicitud") REFERENCES "Solicitud"("id_solicitud"),
	FOREIGN KEY("id_usuario") REFERENCES "Usuario"("id_usuario")
);
