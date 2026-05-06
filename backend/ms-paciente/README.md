# ms-paciente

Microservicio responsable del registro y administración de pacientes. Gestiona la información demográfica de cada paciente y sus coberturas de salud (FONASA, ISAPRE u otros).

---

## Información del Servicio

| Propiedad       | Valor              |
|-----------------|--------------------|
| Puerto          | 8002               |
| Grupo Maven     | `cl.rednorte`      |
| Artefacto       | `ms-paciente`      |
| Java            | 21                 |
| Spring Boot     | 4.x                |

---

## Endpoints Principales

| Recurso     | Ruta base         | Descripción                              |
|-------------|-------------------|------------------------------------------|
| Pacientes   | `/api/patients`   | CRUD de pacientes                        |
| Coberturas  | `/api/coverages`  | Coberturas de salud asociadas a paciente |

---

## Estructura del Proyecto

```text
ms-paciente/
├── src/main/java/cl/rednorte/ms_paciente/
│   ├── controller/         # Controladores REST
│   ├── service/            # Interfaces de servicio
│   │   └── impl/           # Implementaciones de negocio
│   ├── repository/         # Repositorios Spring Data JPA
│   ├── model/              # Entidades JPA
│   │   ├── mapper/         # Conversores entidad <-> DTO
│   │   └── status/         # Enum Gender
│   ├── dto/                # Objetos de transferencia de datos
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

El servicio queda disponible en `http://localhost:8002`.

---

## Documentación de API

```text
http://localhost:8002/swagger-ui/index.html
```

---

## Dependencias Clave

- `spring-boot-starter-webmvc`
- `spring-boot-starter-data-jpa`
- `spring-boot-starter-validation`
- `mysql-connector-j`
- `lombok`
