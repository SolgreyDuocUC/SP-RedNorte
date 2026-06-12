# SP-RedNorte — Sistema de Salud

Plataforma de gestión clínica interoperable desarrollada para la Red Norte de salud. El sistema está diseñado bajo una arquitectura de microservicios desacoplada utilizando un frontend en React y un ecosistema backend robusto en Spring Boot.

---

## Arquitectura General del Sistema

El proyecto está estructurado como un monorepo que divide de forma exacta las capas de presentación, orquestación, lógica de negocio e interoperabilidad de datos:

```text
SP-RedNorte/
├── .github/workflows/  # Pipelines de Integración Continua (GitHub Actions)
├── backend/            # Microservicios Spring Boot (Java 21)
│   ├── ms-ficha-clinica       → Puerto 8001
│   ├── ms-paciente            → Puerto 8002
│   ├── ms-reservas            → Puerto 8003
│   ├── ms-usuarios            → Puerto 8004
│   ├── ms-urgencias           → Puerto 8005
│   ├── ms-centros             → Puerto 8006
│   ├── ms-notificaciones      → Puerto 8010
│   └── ms-gateway             → Puerto 8011 (API Gateway / BFF)
└── frontend/           # Aplicación SPA (React + TypeScript + Vite)
```

---

## Flujo de Comunicación y Capas

1. **Capa de Presentación:** El Frontend interactúa exclusivamente con el puerto `8011`.
2. **Orquestación y Seguridad:** `ms-gateway` implementa Spring Cloud Gateway para centralizar la seguridad perimetral, la validación de tokens JWT y el ruteo dinámico transparente.
3. **Interoperabilidad:** Ciertos módulos clínicos críticos (`ms-centros` y `ms-urgencias`) se encuentran mapeados e integrados nativamente con servidores HAPI FHIR R4.

## Ecosistema de Microservicios

| Servicio | Puerto | Patrón / Responsabilidad Técnica |
| :--- | :--- | :--- |
| **ms-gateway** | 8011 | **API Gateway / BFF:** Orquestador central de tráfico, proxy reverso y cabeceras de seguridad. |
| **ms-ficha-clinica** | 8001 | **Facade Pattern:** Unifica datos complejos (`clinical_notes`, `encounters`, `observations`, `conditions`, `procedures`) en un historial clínico consolidado. |
| **ms-paciente** | 8002 | **Domain Service:** Gestión del core de afiliados, datos demográficos (`patients`) y coberturas previsionales (`coverages`). |
| **ms-reservas** | 8003 | **Algoritmos Core:** Control de agendas médicas (`slots`) y citas (`appointments`). Ejecuta de forma autónoma la lógica de reasignación prioritaria (Crítico > Urgente > Normal) bajo formato FIFO para listas de espera. |
| **ms-usuarios** | 8004 | **Resilience4j (Circuit Breaker):** Control de credenciales de acceso (`users`), asignación de roles (`roles`, `user_roles`) y tolerancia distributiva a fallos en flujos de autenticación. |
| **ms-urgencias** | 8005 | **Interoperabilidad FHIR:** Admisión rápida de pacientes y clasificación de gravedad en flujos de atención de urgencia. |
| **ms-centros** | 8006 | **Interoperabilidad FHIR:** Mapeo de organizaciones de salud, infraestructura y locaciones médicas físicas. |
| **ms-notificaciones** | 8010 | **SMTP Relay (Brevo):** Componente aislado de mensajería asíncrona. Despacha alertas e invitaciones por correo electrónico real en formato HTML ante reasignaciones de cupos. Protegido perimetralmente mediante secreto en cabecera `X-Notification-Secret`. |

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
develop
production
feature-backend
feature-frontend
qa
```

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
