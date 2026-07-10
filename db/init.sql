-- Script de inicialización para PostgreSQL (bd_rednorte)
-- Nota: En la imagen de Docker de Postgres, la base de datos es creada automáticamente por la variable POSTGRES_DB=bd_rednorte

\connect bd_rednorte;

-- Creación de extensiones útiles y configuración inicial
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
