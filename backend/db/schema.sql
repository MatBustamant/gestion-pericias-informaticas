CREATE TABLE IF NOT EXISTS "usuario" (
    "id"              INTEGER NOT NULL,
    "username"        TEXT NOT NULL UNIQUE,
    "password_hash"   TEXT NOT NULL,
    "nombre_apellido" TEXT NOT NULL,
    "rol"             TEXT NOT NULL DEFAULT 'MESA_ENTRADA',
    "eliminado"       INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY("id" AUTOINCREMENT)
);

INSERT INTO "usuario" VALUES (1, 'admin', '$2a$10$Zo0iwbXCuD3/AbUHsDQz5e5nVkaEFDf.2365hlTHqHnW79cVUhTyy', 'Admin', 'ADMIN', 0);
INSERT INTO "usuario" VALUES (2, 'perito', '$2a$10$WA6fmjbQLi.DdB0BTIFKIecPDRMUYs2iEuter/RoiKs2VhXPTpYay', 'Perito Default', 'PERITO', 0);