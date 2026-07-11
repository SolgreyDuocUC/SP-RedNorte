# Backend — SP-RedNorte

Directorio raíz del ecosistema de microservicios del sistema SP-RedNorte. Cada servicio es una aplicación **Spring Boot** independiente con su propio ciclo de vida, puerto asignado y responsabilidad de dominio acotada.

---

## Tabla de Contenidos

1. [Microservicios](#microservicios)
2. [Requisitos Previos](#requisitos-previos)
3. [Configuración de Base de Datos](#configuración-de-base-de-datos)
4. [Ejecución](#ejecución)
5. [Comandos Maven](#comandos-maven)
6. [Estructura de Cada Microservicio](#estructura-de-cada-microservicio)
7. [Swagger / OpenAPI](#swagger--openapi)
8. [Stack Tecnológico](#stack-tecnológico)

---

## Microservicios

| Servicio | Puerto | Responsabilidad |
| :--- | :---: | :--- |
| **ms-gateway** | 8011 | API Gateway / BFF — proxy reverso, seguridad JWT y ruteo dinámico |
| **ms-ficha-clinica** | 8001 | Historial clínico consolidado: notas, diagnósticos, procedimientos y observaciones |
| **ms-paciente** | 8002 | Registro de pacientes, datos demográficos y coberturas previsionales |
| **ms-reservas** | 8003 | Gestión de citas y agenda médica; lógica de reasignación prioritaria (FIFO) |
| **ms-usuarios** | 8004 | Credenciales de acceso, roles y Circuit Breaker (Resilience4j) |
| **ms-urgencias** | 8005 | Admisión rápida y clasificación de gravedad — interoperabilidad FHIR R4 |
| **ms-centros** | 8006 | Organizaciones de salud, infraestructura y locaciones — interoperabilidad FHIR R4 |
| **ms-notificaciones** | 8010 | Mensajería asíncrona por correo electrónico (SMTP/Gmail) |

---

## Requisitos Previos

- **Java 21** o superior
- **Maven 3.9** o superior (o usar el Maven Wrapper `mvnw` incluido en cada módulo)
- **PostgreSQL 16** corriendo en `localhost:5432`
- Base de datos `bd_rednorte` creada

---

## Configuración de Base de Datos

Todos los microservicios se conectan a la misma instancia PostgreSQL:

```text
Host:     localhost:5432
Base:     bd_rednorte
Usuario:  postgres
Password: (definido en el archivo .env local del proyecto raíz)
URL JDBC: jdbc:postgresql://localhost:5432/bd_rednorte
```

> La estrategia JPA es `ddl-auto=update`: las tablas se crean o actualizan automáticamente al iniciar cada servicio.

---

## Ejecución

Cada microservicio se levanta de forma independiente desde su directorio raíz. Se recomienda respetar el siguiente orden de inicio para garantizar que las dependencias entre servicios estén disponibles:

```bash
# 1. Usuarios (identidad y autenticación)
cd backend/ms-usuarios
./mvnw spring-boot:run

# 2. Paciente (datos maestros de afiliados)
cd backend/ms-paciente
./mvnw spring-boot:run

# 3. Centros (infraestructura de salud)
cd backend/ms-centros
./mvnw spring-boot:run

# 4. Ficha Clínica (depende de paciente)
cd backend/ms-ficha-clinica
./mvnw spring-boot:run

# 5. Reservas (depende de paciente y centros)
cd backend/ms-reservas
./mvnw spring-boot:run

# 6. Urgencias (interoperabilidad FHIR)
cd backend/ms-urgencias
./mvnw spring-boot:run

# 7. Notificaciones (mensajería asíncrona)
cd backend/ms-notificaciones
./mvnw spring-boot:run

# 8. Gateway (último — orquesta el tráfico hacia todos los anteriores)
cd backend/ms-gateway
./mvnw spring-boot:run
```

> **Windows / PowerShell:** Si `./mvnw` no reconoce el script, utiliza `mvnw.cmd spring-boot:run`.

---

## Comandos Maven

Todos los comandos se ejecutan desde el directorio raíz del microservicio (`cd backend/ms-{nombre}`).

### Ejecución

```bash
# Levantar con Maven Wrapper (recomendado)
./mvnw spring-boot:run

# Levantar con Maven instalado globalmente
mvn spring-boot:run

# Levantar con un perfil de entorno específico
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### Compilación y Empaquetado

```bash
# Compilar el proyecto
./mvnw compile

# Empaquetar como JAR ejecutable (sin ejecutar tests)
./mvnw package -DskipTests

# Empaquetar ejecutando todos los tests
./mvnw package

# Limpiar artefactos compilados
./mvnw clean

# Flujo completo para CI/CD
./mvnw clean package -DskipTests
```

### Pruebas

```bash
# Ejecutar todos los tests
./mvnw test

# Ejecutar un test específico por clase
./mvnw test -Dtest=NombreDeLaClaseTest

# Ejecutar un método de test específico
./mvnw test -Dtest=NombreDeLaClaseTest#nombreDelMetodo

# Ejecutar tests con reporte de cobertura (requiere plugin JaCoCo en pom.xml)
./mvnw test jacoco:report

# Omitir ejecución de tests (compila igual)
./mvnw install -DskipTests

# Omitir compilación y ejecución de tests
./mvnw install -Dmaven.test.skip=true
```

### Dependencias y Utilidades

```bash
# Ver árbol completo de dependencias
./mvnw dependency:tree

# Verificar actualizaciones disponibles de dependencias
./mvnw versions:display-dependency-updates

# Instalar el artefacto en el repositorio local (~/.m2)
./mvnw install -DskipTests

# Ver propiedades efectivas del proyecto
./mvnw help:effective-pom
```

---

## Estructura de Cada Microservicio

```text
ms-{nombre}/
├── src/
│   ├── main/
│   │   ├── java/cl/rednorte/ms_{nombre}/
│   │   │   ├── controller/     # Controladores REST (@RestController)
│   │   │   ├── service/        # Interfaces de servicio
│   │   │   │   └── impl/       # Implementaciones de negocio
│   │   │   ├── repository/     # Repositorios JPA (Spring Data)
│   │   │   ├── model/          # Entidades JPA y mappers
│   │   │   ├── dto/            # Objetos de transferencia de datos
│   │   │   └── exception/      # Manejo global de errores
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/cl/rednorte/ms_{nombre}/
└── pom.xml
```

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

## Stack Tecnológico

| Tecnología | Versión | Uso |
| :--- | :--- | :--- |
| Java | 21 | Lenguaje base |
| Spring Boot | 4.x | Framework principal |
| Spring Web MVC | — | Capa REST |
| Spring Data JPA | — | Persistencia |
| Spring Validation | — | Validación de DTOs |
| Resilience4j | — | Circuit Breaker (`ms-usuarios`) |
| HAPI FHIR R4 | — | Interoperabilidad clínica (`ms-urgencias`, `ms-centros`) |
| PostgreSQL | 16 | Base de datos relacional |
| Lombok | — | Reducción de boilerplate |
| SpringDoc OpenAPI | — | Generación de Swagger UI |
