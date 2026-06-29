CREATE TABLE IF NOT EXISTS "Causa" (
    "id_causa" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "num_Expediente" TEXT NOT NULL,
    "delito" TEXT NOT NULL,
    "tipo" TEXT NOT NULL CHECK(tipo IN ('general', 'narco')),
    "imputados" TEXT NOT NULL,
    "victimas" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "Contador_Solicitud" (
    "tipo" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "ultimo" INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY("tipo", "anio")
);

CREATE TABLE IF NOT EXISTS "Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre_usuario" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "rol" TEXT NOT NULL CHECK(rol IN ('Perito', 'Mesa_entrada', 'Coordinador', 'Admin')), 
    "estado" TEXT NOT NULL CHECK(estado IN ('activo','inactivo'))
);

CREATE TABLE IF NOT EXISTS "Solicitud" (
    "id_solicitud" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_causa" INTEGER NOT NULL,
    "num_interno" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL CHECK(tipo IN ('general', 'narco')),
    "anio" INTEGER NOT NULL DEFAULT (CAST(strftime('%Y', 'now') AS INTEGER)),
    "circunscripcion" TEXT NOT NULL,
    "descripcion_secuestros" TEXT NOT NULL,
    "urgencia" TEXT NOT NULL CHECK(urgencia IN ('alta', 'media', 'baja')),
    "estado" TEXT NOT NULL DEFAULT 'pendiente' CHECK(estado IN ('pendiente', 'en-proceso', 'resuelto')),
    "fecha_hora_agendada" DATETIME,
    "fiscal_solicitante" TEXT NOT NULL,
    FOREIGN KEY("id_causa") REFERENCES "Causa"("id_causa"),
    UNIQUE("tipo", "anio", "num_interno")
);

CREATE TABLE IF NOT EXISTS "Acta_Apertura" (
    "id_acta" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
    "id_solicitud" INTEGER NOT NULL,
    "personas_presentes" TEXT NOT NULL,
    "encargado_apertura" TEXT NOT NULL,
    "id_perito_a_cargo" INTEGER NOT NULL,
    "ruta_foto_sobre_precinto" TEXT NOT NULL,
    "ubicacion_fisica_dispositivo" TEXT,
    "detalle_embalaje" TEXT NOT NULL,
    "hash_documento" TEXT,
    FOREIGN KEY("id_perito_a_cargo") REFERENCES "Usuario"("id_usuario"),
    FOREIGN KEY("id_solicitud") REFERENCES "Solicitud"("id_solicitud")
);

CREATE TABLE IF NOT EXISTS "Dispositivos" (
    "id_dispositivo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_solicitud" INTEGER NOT NULL,
    "id_dispositivo_asociado" INTEGER,
    "tipo" TEXT NOT NULL,
    "subtipo" TEXT NOT NULL,
    "estado_fisico" TEXT NOT NULL,
    "marca" TEXT,
    "modelo" TEXT,
    "numero_serie" TEXT,
    "imei" TEXT,
    "estado_sesion" TEXT,
    "estado_extraccion" TEXT NOT NULL,
    "estado_devolucion" TEXT NOT NULL,
    "observaciones" TEXT,
    "fecha_hora_devolucion" DATETIME,
    FOREIGN KEY("id_dispositivo_asociado") REFERENCES "Dispositivos"("id_dispositivo"),
    FOREIGN KEY("id_solicitud") REFERENCES "Solicitud"("id_solicitud")
);

CREATE TABLE IF NOT EXISTS "Tarea" (
    "id_tarea" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_solicitud" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    FOREIGN KEY("id_solicitud") REFERENCES "Solicitud"("id_solicitud")
);

CREATE TABLE IF NOT EXISTS "Usuario_Solicitud" (
    "id_solicitud" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    PRIMARY KEY("id_solicitud","id_usuario"),
    FOREIGN KEY("id_solicitud") REFERENCES "Solicitud"("id_solicitud"),
    FOREIGN KEY("id_usuario") REFERENCES "Usuario"("id_usuario")
);

CREATE TABLE IF NOT EXISTS "Procedimiento" (
    "id_procedimiento" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_dispositivo" INTEGER NOT NULL,
    "descripcion_procedimiento" TEXT NOT NULL,
    "fecha_hora" DATETIME NOT NULL,
    "ubicacion_datos_extraidos" TEXT NOT NULL,
    "observacion" TEXT,
    FOREIGN KEY("id_dispositivo") REFERENCES "Dispositivos"("id_dispositivo")
);

INSERT INTO "Causa" ("num_Expediente", "delito", "tipo", "imputados", "victimas") VALUES 
('EXP-2026-001', 'Robo a mano armada', 'general', 'Juan Perez', 'Maria Gomez'),
('EXP-2026-002', 'Comercialización de estupefacientes', 'narco', 'Carlos Ruiz, Ana Blanco', 'La Sociedad');

-- Insertamos usuarios con los distintos roles
INSERT INTO "Usuario" ("nombre_usuario", "contrasena", "nombre_completo", "rol", "estado") VALUES 
('admin_sist', '$2a$10$Zo0iwbXCuD3/AbUHsDQz5e5nVkaEFDf.2365hlTHqHnW79cVUhTyy', 'Sistema Administrador', 'Admin', 'activo'),
('lmartinez', '$2a$10$Zo0iwbXCuD3/AbUHsDQz5e5nVkaEFDf.2365hlTHqHnW79cVUhTyy', 'Laura Martinez', 'Mesa_entrada', 'activo'),
('jsilva', '$2a$10$Zo0iwbXCuD3/AbUHsDQz5e5nVkaEFDf.2365hlTHqHnW79cVUhTyy', 'Javier Silva', 'Perito', 'activo'),
('gromero', '$2a$10$Zo0iwbXCuD3/AbUHsDQz5e5nVkaEFDf.2365hlTHqHnW79cVUhTyy', 'Gabriela Romero', 'Perito', 'activo');

-- Inicializamos los contadores para el año actual (simulando que ya se crearon algunas)
INSERT INTO "Contador_Solicitud" ("tipo", "anio", "ultimo") VALUES 
('general', 2026, 2),
('narco', 2026, 1);


-- ==========================================
-- 2. TABLAS DE PRIMER NIVEL DE DEPENDENCIA
-- ==========================================

-- Insertamos 3 solicitudes (utilizando los IDs de Causa 1 y 2)
INSERT INTO "Solicitud" ("id_causa", "num_interno", "tipo", "anio", "circunscripcion", "descripcion_secuestros", "urgencia", "estado", "fecha_hora_agendada", "fiscal_solicitante") VALUES 
(1, 1, 'general', 2026, 'Capital', '2 Teléfonos celulares', 'media', 'en-proceso', '2026-07-01 09:00:00', 'Fiscalía N1'),
(1, 2, 'general', 2026, 'Capital', '1 Notebook', 'baja', 'pendiente', '2026-07-02 10:30:00', 'Fiscalía N1'),
(2, 1, 'narco', 2026, 'Banda', '3 Teléfonos celulares, 1 pendrive', 'alta', 'pendiente', '2026-06-29 08:00:00', 'Fiscalía Narcomenudeo');


-- ==========================================
-- 3. TABLAS DE SEGUNDO NIVEL DE DEPENDENCIA
-- ==========================================

-- Asignamos peritos a las solicitudes
INSERT INTO "Usuario_Solicitud" ("id_solicitud", "id_usuario") VALUES 
(1, 3), -- Solicitud 1 asignada a Javier
(2, 4), -- Solicitud 2 asignada a Gabriela
(3, 3), -- Solicitud 3 asignada a Javier
(3, 4); -- Solicitud 3 asignada a Gabriela (trabajo en conjunto)

-- Tareas requeridas para cada solicitud
INSERT INTO "Tarea" ("id_solicitud", "descripcion") VALUES 
(1, 'Extracción lógica de WhatsApp y Galería de fotos'),
(2, 'Clonado forense de disco duro'),
(3, 'Extracción física y análisis de chats eliminados');

-- Actas de apertura (solo para las solicitudes 1 y 3 por ahora)
INSERT INTO "Acta_Apertura" ("id_solicitud", "personas_presentes", "encargado_apertura", "id_perito_a_cargo", "ruta_foto_sobre_precinto", "ubicacion_fisica_dispositivo", "detalle_embalaje", "hash_documento") VALUES 
(1, 'Javier Silva, Oficial Inspector Diaz', 'Javier Silva', 3, '/storage/actas/2026/gen_1_precinto.jpg', 'Armario A, Estante 2', 'Sobre papel madera firmado en solapas', 'a8f5f167f44f4964e6c998dee827110c'),
(3, 'Gabriela Romero, Testigo Civil Juan, Oficial Gomez', 'Gabriela Romero', 4, '/storage/actas/2026/narco_1_precinto.jpg', 'Caja Fuerte Narco', 'Faja de seguridad inviolable roja', 'b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4');

-- Dispositivos secuestrados
INSERT INTO "Dispositivos" ("id_solicitud", "id_dispositivo_asociado", "tipo", "subtipo", "estado_fisico", "marca", "modelo", "numero_serie", "imei", "estado_sesion", "estado_extraccion", "estado_devolucion", "observaciones", "fecha_hora_devolucion") VALUES 
(1, NULL, 'Dispositivo inteligente', 'Celular', 'Bueno con rayones', 'Samsung', 'Galaxy A54', 'S/N-998877', '359876543210987', 'Apagado', 'Pendiente', 'No devuelto', 'Falta tarjeta SIM', NULL),
(1, NULL, 'Dispositivo inteligente', 'Celular', 'Pantalla astillada', 'Motorola', 'Moto G52', 'S/N-112233', '358765432109876', 'Encendido con patrón', 'En proceso', 'No devuelto', NULL, NULL),
(2, NULL, 'Dispositivo inteligente', 'Notebook', 'Excelente', 'Lenovo', 'ThinkPad T14', 'PF-12345', NULL, 'Apagado', 'Pendiente', 'No devuelto', 'Incluye cargador original', NULL);

-- Ejemplo de relación recursiva: Extraemos el disco de la Notebook (ID 3)
INSERT INTO "Dispositivos" ("id_solicitud", "id_dispositivo_asociado", "tipo", "subtipo", "estado_fisico", "marca", "modelo", "numero_serie", "imei", "estado_sesion", "estado_extraccion", "estado_devolucion", "observaciones", "fecha_hora_devolucion") VALUES 
(2, 3, 'Componente', 'Disco Sólido (SSD)', 'Bueno', 'Kingston', 'NV2 500GB', 'K-555444', NULL, NULL, 'Completada', 'No devuelto', 'Extraído del dispositivo 3 para clonado', NULL);


-- ==========================================
-- 4. TABLAS DE TERCER NIVEL DE DEPENDENCIA
-- ==========================================

-- Registramos un par de procedimientos realizados sobre los dispositivos
INSERT INTO "Procedimiento" ("id_dispositivo", "descripcion_procedimiento", "fecha_hora", "ubicacion_datos_extraidos", "observacion") VALUES 
(2, 'Conexión a software forense, intento de bypass de patrón', '2026-06-28 14:00:00', 'Servidor_NAS/Extra/Gen_1_Moto', 'Se requiere ataque de fuerza bruta, patrón complejo'),
(4, 'Clonado bit a bit con bloqueador de escritura', '2026-06-28 16:30:00', 'Servidor_NAS/Extra/Gen_2_Imagen', 'Imagen generada con éxito en formato E01');


-- ==========================================
-- 1. ACTUALIZACIÓN DE CONTADORES Y NUEVAS CAUSAS
-- ==========================================

-- Actualizamos los contadores asumiendo que el script anterior ya se ejecutó
UPDATE "Contador_Solicitud" SET "ultimo" = 4 WHERE "tipo" = 'general' AND "anio" = 2026;
UPDATE "Contador_Solicitud" SET "ultimo" = 3 WHERE "tipo" = 'narco' AND "anio" = 2026;

-- Insertamos nuevas causas (IDs 3, 4 y 5)
INSERT INTO "Causa" ("num_Expediente", "delito", "tipo", "imputados", "victimas") VALUES 
('EXP-2026-112', 'Estafas reiteradas (Cuento del Tio)', 'general', 'Autores a establecer', 'Rosa Gonzalez'),
('EXP-2026-204', 'Homicidio Simple', 'general', 'Miguel Herrera', 'Carlos Diaz'),
('EXP-2026-301', 'Infraccion Ley 23.737', 'narco', 'Familia Juarez', 'Salud Publica');


-- ==========================================
-- 2. NUEVAS SOLICITUDES (IDs 4, 5, 6 y 7)
-- ==========================================

INSERT INTO "Solicitud" ("id_causa", "num_interno", "tipo", "anio", "circunscripcion", "descripcion_secuestros", "urgencia", "estado", "fecha_hora_agendada", "fiscal_solicitante") VALUES 
(3, 3, 'general', 2026, 'Capital', '1 CPU, 2 Pendrives Kingston', 'media', 'pendiente', '2026-07-05 08:30:00', 'Fiscalía Delitos Complejos'),
(4, 4, 'general', 2026, 'La Banda', '1 Celular iPhone, 1 DVR', 'alta', 'en-proceso', '2026-06-30 10:00:00', 'Fiscalía Homicidios'),
(5, 2, 'narco', 2026, 'Termas de Rio Hondo', '3 Celulares, 1 Tablet', 'alta', 'pendiente', '2026-07-02 09:00:00', 'Unidad Fiscal Narcomenudeo'),
(5, 3, 'narco', 2026, 'Frias', '1 Notebook HP', 'media', 'pendiente', '2026-07-03 11:00:00', 'Unidad Fiscal Narcomenudeo');


-- ==========================================
-- 3. ASIGNACIONES, TAREAS Y ACTAS
-- ==========================================

-- Asignamos las nuevas solicitudes a los peritos (IDs de usuario 3 y 4)
INSERT INTO "Usuario_Solicitud" ("id_solicitud", "id_usuario") VALUES 
(4, 4), -- Solicitud de Estafas asignada a Gabriela
(5, 3), -- Solicitud de Homicidio en La Banda asignada a Javier
(6, 3), -- Narcomenudeo Termas a Javier
(7, 4); -- Narcomenudeo Frías a Gabriela

-- Detallamos el trabajo pedido por los fiscales
INSERT INTO "Tarea" ("id_solicitud", "descripcion") VALUES 
(4, 'Adquisición de imagen forense de disco duro y análisis de correos'),
(5, 'Extracción de video del DVR y análisis de ubicaciones del iPhone'),
(6, 'Búsqueda de contactos, chats de Telegram y registro de llamadas'),
(7, 'Análisis de transacciones en criptomonedas y billeteras virtuales');

-- Creamos el acta de apertura para el secuestro del Homicidio
INSERT INTO "Acta_Apertura" ("id_solicitud", "personas_presentes", "encargado_apertura", "id_perito_a_cargo", "ruta_foto_sobre_precinto", "ubicacion_fisica_dispositivo", "detalle_embalaje", "hash_documento") VALUES 
(5, 'Javier Silva, Oficial Ayudante Suarez', 'Javier Silva', 3, '/storage/actas/2026/gen_4_precinto.jpg', 'Gabinete Forense - Mesa 1', 'Bolsa de Faraday sellada', 'd41d8cd98f00b204e9800998ecf8427e');


-- ==========================================
-- 4. DISPOSITIVOS Y RELACIONES RECURSIVAS
-- ==========================================

-- Cargamos los dispositivos (IDs nuevos: 5, 6, 7 y 8)
INSERT INTO "Dispositivos" ("id_solicitud", "id_dispositivo_asociado", "tipo", "subtipo", "estado_fisico", "marca", "modelo", "numero_serie", "imei", "estado_sesion", "estado_extraccion", "estado_devolucion", "observaciones", "fecha_hora_devolucion") VALUES 
-- La PC de la causa por estafas
(4, NULL, 'Dispositivo inteligente', 'Gabinete (PC)', 'Regular, con mucho polvo', 'Generica', 'Sin modelo', 'S/N-0011', NULL, 'Apagado', 'Pendiente', 'No devuelto', 'Falta tapa lateral', NULL),
-- El disco duro extraído de esa misma PC (Asociado al ID 5)
(4, 5, 'Componente', 'Disco Rígido (HDD)', 'Bueno', 'Western Digital', 'Blue 1TB', 'WD-WCC6Y1', NULL, NULL, 'Completada', 'No devuelto', 'Extraído para imagen con bloqueador', NULL),
-- El celular del imputado por homicidio
(5, NULL, 'Dispositivo inteligente', 'Celular', 'Excelente', 'Apple', 'iPhone 13 Pro', 'F17G889', '35999000111222', 'Encendido con PIN', 'En proceso', 'No devuelto', 'Batería al 15%, guardado en jaula Faraday', NULL),
-- La tablet del allanamiento narco en Termas
(6, NULL, 'Dispositivo inteligente', 'Tablet', 'Pantalla rota', 'Samsung', 'Galaxy Tab A7', 'S/N-TAB88', NULL, 'Apagado', 'Pendiente', 'No devuelto', 'No enciende, pin de carga dañado', NULL);


-- ==========================================
-- 5. PROCEDIMIENTOS FORENSES
-- ==========================================

-- Registramos avances técnicos sobre los nuevos dispositivos
INSERT INTO "Procedimiento" ("id_dispositivo", "descripcion_procedimiento", "fecha_hora", "ubicacion_datos_extraidos", "observacion") VALUES 
(6, 'Generación de imagen física bit a bit (.E01) utilizando FTK Imager y bloqueador Tableau', '2026-06-28 18:00:00', 'Servidor_NAS/Extra/Gen_3_HDD', 'Proceso finalizado sin errores de lectura. Hash verificado.'),
(7, 'Conexión a Cellebrite UFED Premium para bypass de código de pantalla', '2026-06-28 19:15:00', 'Servidor_NAS/Extra/Gen_4_iPhone', 'El ataque de fuerza bruta está corriendo, tiempo estimado de finalización: 3 a 5 días');
