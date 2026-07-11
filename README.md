# SP-RedNorte — Sistema de Gestión Clínica

Plataforma de gestión clínica interoperable desarrollada para la **Red Norte de Salud**. Construida sobre una arquitectura de microservicios desacoplada con un frontend SPA en React/TypeScript y un ecosistema backend en Spring Boot, con soporte nativo al estándar **HAPI FHIR R4** para interoperabilidad clínica.

---

## Tabla de Contenidos

1. [Arquitectura del Sistema](#arquitectura-del-sistema)
2. [Ecosistema de Microservicios](#ecosistema-de-microservicios)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Requisitos Previos](#requisitos-previos)
5. [Configuración de Entorno](#configuración-de-entorno)
6. [Ejecución Local](#ejecución-local)
7. [Ejecución con Docker](#ejecución-con-docker)
8. [Base de Datos](#base-de-datos)
9. [Swagger / OpenAPI](#swagger--openapi)
10. [Estrategia de Ramas](#estrategia-de-ramas)
11. [Documentación por Módulo](#documentación-por-módulo)

---

## Arquitectura del Sistema

El proyecto está organizado como un **monorepo** que separa con precisión las capas de presentación, orquestación, lógica de negocio e interoperabilidad de datos:

```text
SP-RedNorte/
├── .github/
│   └── workflows/          # Pipelines de CI/CD (GitHub Actions)
├── backend/                # Ecosistema de microservicios (Java 21 + Spring Boot)
│   ├── ms-gateway          → Puerto 8011  (API Gateway / BFF)
│   ├── ms-ficha-clinica    → Puerto 8001
│   ├── ms-paciente         → Puerto 8002
│   ├── ms-reservas         → Puerto 8003
│   ├── ms-usuarios         → Puerto 8004
│   ├── ms-urgencias        → Puerto 8005  (FHIR R4)
│   ├── ms-centros          → Puerto 8006  (FHIR R4)
│   └── ms-notificaciones   → Puerto 8010
├── frontend/               # Aplicación SPA (React + TypeScript + Vite)
├── db/                     # Scripts SQL iniciales
├── diagrams/               # Diagramas de arquitectura
├── docker-compose.yml      # Orquestación de contenedores
└── .env                    # Variables de entorno (no versionar)
```

### Flujo de Comunicación

```
Usuario → Frontend (:3000)
              ↓
         ms-gateway (:8011)    ← JWT Validation + Routing
              ↓
    ┌─────────┴──────────┐
    ↓                    ↓
ms-paciente         ms-reservas
ms-usuarios         ms-ficha-clinica
ms-notificaciones   ms-urgencias (FHIR)
                    ms-centros   (FHIR)
```

1. **Presentación:** El frontend interactúa exclusivamente a través del puerto `8011`.
2. **Orquestación y Seguridad:** `ms-gateway` centraliza la validación de tokens JWT, la seguridad perimetral y el ruteo dinámico hacia los microservicios.
3. **Interoperabilidad:** `ms-urgencias` y `ms-centros` están integrados con servidores HAPI FHIR R4 para operar bajo el estándar clínico internacional.

---

## Ecosistema de Microservicios

| Servicio | Puerto | Patrón | Responsabilidad |
| :--- | :---: | :--- | :--- |
| **ms-gateway** | 8011 | API Gateway / BFF | Proxy reverso, validación JWT y ruteo centralizado de tráfico |
| **ms-ficha-clinica** | 8001 | Facade Pattern | Historial clínico consolidado: notas, diagnósticos, procedimientos y observaciones |
| **ms-paciente** | 8002 | Domain Service | Registro de afiliados, datos demográficos y coberturas previsionales |
| **ms-reservas** | 8003 | Algoritmo Core | Agendas médicas y citas; reasignación prioritaria automática (Crítico > Urgente > Normal) por FIFO |
| **ms-usuarios** | 8004 | Circuit Breaker | Credenciales de acceso, roles y tolerancia a fallos mediante Resilience4j |
| **ms-urgencias** | 8005 | FHIR R4 | Admisión rápida de pacientes y clasificación de gravedad en urgencias |
| **ms-centros** | 8006 | FHIR R4 | Organizaciones de salud, infraestructura clínica y locaciones físicas |
| **ms-notificaciones** | 8010 | SMTP Relay | Mensajería asíncrona por correo HTML (Gmail); protegido con `X-Notification-Secret` |

---

## Stack Tecnológico

### Backend

| Tecnología | Versión | Rol |
| :--- | :--- | :--- |
| Java | 21 | Lenguaje base |
| Spring Boot | 4.x | Framework principal (Web MVC, Data JPA, Validation) |
| Spring Cloud Gateway | — | Proxy reverso y enrutamiento (`ms-gateway`) |
| Resilience4j | — | Circuit Breaker (`ms-usuarios`) |
| HAPI FHIR R4 | — | Interoperabilidad clínica (`ms-urgencias`, `ms-centros`) |
| PostgreSQL | 16 | Base de datos relacional compartida |
| Lombok | — | Reducción de boilerplate |
| SpringDoc OpenAPI | — | Documentación interactiva (Swagger UI) |

### Frontend

| Tecnología | Versión | Rol |
| :--- | :--- | :--- |
| React | — | Framework de UI |
| TypeScript | — | Tipado estático |
| Vite | — | Bundler y servidor de desarrollo |

### Infraestructura

| Herramienta | Uso |
| :--- | :--- |
| Docker + Docker Compose | Orquestación de contenedores |
| GitHub Actions | Pipelines de CI/CD |
| Neon (PostgreSQL serverless) | Base de datos en entorno de producción |

---

## Requisitos Previos

### Ejecución Local (sin Docker)

- Java 21 o superior
- Maven 3.9 o superior
- Node.js 20 o superior (para el frontend)
- PostgreSQL 16 corriendo en `localhost:5432`

### Ejecución con Docker

- Docker Desktop instalado y en ejecución
- Docker Compose v2 habilitado

---

## Configuración de Entorno

El proyecto utiliza un archivo `.env` en la raíz para centralizar las variables de entorno. Este archivo **no debe versionarse** (está incluido en `.gitignore`).

Copiar el archivo de ejemplo y completar los valores:

```bash
cp .env.example .env
```

Las variables principales incluyen credenciales de base de datos, secrets JWT y la clave del relay SMTP para `ms-notificaciones`.

---

## Ejecución Local

Cada microservicio se levanta de forma independiente desde su directorio. Consultar [`backend/README.md`](./backend/README.md) para la referencia completa de comandos Maven.

**Orden recomendado de inicio:**

```bash
# 1. Usuarios
cd backend/ms-usuarios && ./mvnw spring-boot:run

# 2. Paciente
cd backend/ms-paciente && ./mvnw spring-boot:run

# 3. Centros
cd backend/ms-centros && ./mvnw spring-boot:run

# 4. Ficha Clínica
cd backend/ms-ficha-clinica && ./mvnw spring-boot:run

# 5. Reservas
cd backend/ms-reservas && ./mvnw spring-boot:run

# 6. Urgencias
cd backend/ms-urgencias && ./mvnw spring-boot:run

# 7. Notificaciones
cd backend/ms-notificaciones && ./mvnw spring-boot:run

# 8. Gateway (último)
cd backend/ms-gateway && ./mvnw spring-boot:run

# Frontend
cd frontend && npm install && npm run dev
```

> **Windows / PowerShell:** Usar `mvnw.cmd spring-boot:run` si `./mvnw` no es reconocido.

---

## Ejecución con Docker

Todos los servicios pueden levantarse desde la raíz del proyecto con un solo comando:

```bash
# Primer arranque (construye las imágenes)
docker compose up -d --build

# Arranque normal (imágenes ya construidas)
docker compose up -d

# Ver estado de los contenedores
docker compose ps

# Ver logs en tiempo real (todos los servicios)
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f ms-reservas

# Reconstruir un servicio específico
docker compose up -d --build ms-reservas

# Detener servicios (conserva contenedores y volúmenes)
docker compose stop

# Eliminar contenedores
docker compose down

# Eliminar contenedores y volúmenes (borra datos de la BD)
docker compose down -v
```

---

## Base de Datos

Todos los microservicios comparten una única instancia PostgreSQL:

```text
Host:     localhost:5432
Base:     bd_rednorte
Usuario:  postgres
Password: (definido en .env)
URL JDBC: jdbc:postgresql://localhost:5432/bd_rednorte
```

> La estrategia JPA es `ddl-auto=update`: las tablas se crean o actualizan automáticamente en el primer arranque de cada servicio. Los scripts iniciales se encuentran en `db/`.

---

## Swagger / OpenAPI

Cada microservicio expone su documentación interactiva de API una vez iniciado:

| Servicio | URL Swagger UI |
| :--- | :--- |
| **ms-ficha-clinica** | http://localhost:8001/swagger-ui/index.html |
| **ms-paciente** | http://localhost:8002/swagger-ui/index.html |
| **ms-reservas** | http://localhost:8003/swagger-ui/index.html |
| **ms-usuarios** | http://localhost:8004/swagger-ui/index.html |
| **ms-urgencias** | http://localhost:8005/swagger-ui/index.html |
| **ms-centros** | http://localhost:8006/swagger-ui/index.html |
| **ms-notificaciones** | http://localhost:8010/swagger-ui/index.html |
| **ms-gateway** | http://localhost:8011/swagger-ui/index.html |

---

## Estrategia de Ramas

El proyecto sigue un **Git Flow adaptado**:

| Rama | Propósito |
| :--- | :--- |
| `main` | Producción — rama estable, protegida |
| `production` | Pre-producción / staging |
| `develop` | Integración continua de features |
| `feature-backend` | Desarrollo de funcionalidades backend |
| `feature-frontend` | Desarrollo de funcionalidades frontend |
| `qa` | Pruebas y validación de calidad |

> Toda integración se realiza mediante **Pull Request**. No se permiten merges directos a ninguna rama protegida.

---

## Documentación por Módulo

| Módulo | README |
| :--- | :--- |
| Backend (microservicios) | [`backend/README.md`](./backend/README.md) |
| Frontend (React + Vite) | [`frontend/README.md`](./frontend/README.md) |
| Docker / DevOps | [`instruccionesDevOps.txt`](./instruccionesDevOps.txt) |
