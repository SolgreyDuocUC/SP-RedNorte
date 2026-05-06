# SP-RedNorte — Sistema de Salud

Plataforma de gestión clínica desarrollada para la Red Norte de salud. El sistema está construido bajo una arquitectura de microservicios con un frontend React y un backend Spring Boot.

---

## Arquitectura General

```text
SP-RedNorte/
├── backend/          # Microservicios Spring Boot (Java 21)
│   ├── ms-ficha-clinica   → Puerto 8001
│   ├── ms-paciente        → Puerto 8002
│   ├── ms-reservas        → Puerto 8003
│   └── ms-usuarios        → Puerto 8004
└── frontend/         # Aplicación React + Vite
```

---

## Microservicios

| Servicio          | Puerto | Responsabilidad                                        |
|-------------------|--------|--------------------------------------------------------|
| ms-ficha-clinica  | 8001   | Historial clínico, notas, diagnósticos, procedimientos |
| ms-paciente       | 8002   | Registro de pacientes y coberturas de salud            |
| ms-reservas       | 8003   | Gestión de citas y agenda médica                       |
| ms-usuarios       | 8004   | Usuarios del sistema y roles                           |

---

## Stack Tecnológico

### Backend

- Java 21
- Spring Boot 4.x (Web MVC, Data JPA, Validation)
- MySQL 8 (puerto 3307)
- HAPI FHIR R4 (estándar de interoperabilidad clínica)
- Lombok

### Frontend

- React
- Vite

---

## Base de Datos

Todos los microservicios comparten la misma base de datos MySQL:

```text
Host:     localhost:3307
Base:     bd_rednorte
Usuario:  root
```

---

## Estrategia de Ramas (Git Flow Adaptado)

```text
main        → Producción (rama estable)
preprod     → Pre-producción (validación final)
qa          → Pruebas técnicas
dev-Solgrey → Desarrollo individual
dev-Martin  → Desarrollo individual
```

**Flujo obligatorio:** `dev-* → qa → preprod → main`

Toda integración se realiza mediante Pull Request. No se permiten merges directos a ninguna rama protegida.

---

## Ejecución del Proyecto

Cada microservicio se ejecuta de forma independiente. Consulte el `README.md` dentro de cada módulo para instrucciones específicas.

Para el frontend, consulte el `README.md` en el directorio `frontend/`.

---

## Swagger / OpenAPI

Cada microservicio expone su documentación de API en:

```text
http://localhost:{puerto}/swagger-ui/index.html
```
