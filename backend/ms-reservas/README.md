# ms-reservas

Microservicio responsable de la gestión de citas y agenda médica. Permite crear, consultar, modificar y cancelar reservas de atención, integrando recursos de tipo `Appointment` compatibles con el estándar **HAPI FHIR R4**.

---

## Información del Servicio

| Propiedad       | Valor              |
|-----------------|--------------------|
| Puerto          | 8003               |
| Grupo Maven     | `cl.rednorte`      |
| Artefacto       | `ms-reservas`      |
| Java            | 21                 |
| Spring Boot     | 4.x                |

---

## Endpoints Principales

| Recurso   | Ruta base           | Descripción                     |
|-----------|---------------------|---------------------------------|
| Reservas  | `/api/appointments` | CRUD de citas médicas           |

---

## Estructura del Proyecto

```text
ms-reservas/
├── src/main/java/cl/rednorte/ms_reservas/
│   ├── controller/         # Controladores REST
│   ├── service/            # Interfaces de servicio
│   │   └── Impl/           # Implementaciones de negocio
│   ├── repository/         # Repositorios Spring Data JPA
│   ├── model/              # Entidades JPA
│   │   └── mapper/         # Conversores entidad <-> DTO
│   ├── dto/                # Objetos de transferencia de datos
│   ├── config/             # Configuración CORS
│   └── exceptions/         # Manejo global de errores
└── src/main/resources/
    └── application.properties
```

---

## Requisitos Previos

- Java 21
- Maven 3.9+
- MySQL 8 en `localhost:3307`
- Base de datos `bd_rednorte`

---

## Ejecución

```bash
./mvnw spring-boot:run
```

El servicio queda disponible en `http://localhost:8003`.

---

## Documentación de API

```text
http://localhost:8003/swagger-ui/index.html
```

---

## Dependencias Clave

- `spring-boot-starter-webmvc`
- `spring-boot-starter-data-jpa`
- `spring-boot-starter-validation`
- `hapi-fhir-structures-r4` — modelado del recurso Appointment
- `hapi-fhir-client` — cliente para servidores FHIR externos
- `mysql-connector-j`
- `lombok`
