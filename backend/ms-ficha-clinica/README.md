# ms-ficha-clinica

Microservicio responsable de la gestión del historial clínico de los pacientes. Administra encuentros médicos, diagnósticos, observaciones clínicas, procedimientos y notas, siguiendo el estándar de interoperabilidad **HAPI FHIR R4**.

---

## Información del Servicio

| Propiedad       | Valor                        |
|-----------------|------------------------------|
| Puerto          | 8001                         |
| Grupo Maven     | `cl.rednorte`                |
| Artefacto       | `ms-ficha-clinica`           |
| Java            | 21                           |
| Spring Boot     | 4.x                          |

---

## Endpoints Principales

| Recurso             | Ruta base                   | Descripción                         |
|---------------------|-----------------------------|-------------------------------------|
| Historial clínico   | `/api/clinical-history`     | Consulta del historial por paciente |
| Encuentros          | `/api/encounters`           | Registro de consultas médicas       |
| Notas clínicas      | `/api/clinical-notes`       | Notas asociadas a un encuentro      |
| Diagnósticos        | `/api/conditions`           | Condiciones y diagnósticos FHIR     |
| Observaciones       | `/api/observations`         | Signos vitales y resultados         |
| Procedimientos      | `/api/procedures`           | Procedimientos realizados           |

---

## Estructura del Proyecto

```text
ms-ficha-clinica/
├── src/main/java/cl/rednorte/ms_ficha_clinica/
│   ├── controller/         # Controladores REST (un controller por recurso)
│   ├── service/            # Interfaces de servicio
│   │   └── impl/           # Implementaciones de negocio
│   ├── repository/         # Repositorios Spring Data JPA
│   ├── model/              # Entidades JPA y modelos FHIR
│   │   ├── mapper/         # Conversores entidad <-> DTO <-> FHIR
│   │   └── status/         # Enums de estado clínico y de encuentro
│   ├── dto/                # Objetos de transferencia de datos
│   └── exception/          # Manejo global de errores
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

El servicio queda disponible en `http://localhost:8001`.

---

## Documentación de API

```text
http://localhost:8001/swagger-ui/index.html
```

---

## Dependencias Clave

- `spring-boot-starter-webmvc`
- `spring-boot-starter-data-jpa`
- `spring-boot-starter-validation`
- `hapi-fhir-structures-r4` — modelado de recursos clínicos FHIR
- `hapi-fhir-client` — cliente para servidores FHIR externos
- `mysql-connector-j`
- `lombok`
