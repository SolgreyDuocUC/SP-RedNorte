# ms-usuarios

Microservicio responsable de la administración de usuarios del sistema y sus roles. Provee las operaciones necesarias para registrar, consultar, actualizar y eliminar usuarios, así como para gestionar los roles que definen los permisos de acceso.

---

## Informacion del Servicio

| Propiedad       | Valor              |
|-----------------|--------------------|
| Puerto          | 8004               |
| Grupo Maven     | `cl.rednorte`      |
| Artefacto       | `ms-usuarios`      |
| Java            | 21                 |
| Spring Boot     | 4.x                |

---

## Endpoints Principales

| Recurso  | Ruta base      | Descripcion                |
|----------|----------------|----------------------------|
| Usuarios | `/api/users`   | CRUD de usuarios           |
| Roles    | `/api/roles`   | CRUD de roles del sistema  |

---

## Estructura del Proyecto

```text
ms-usuarios/
├── src/main/java/cl/rednorte/ms_usuarios/
│   ├── controller/         # Controladores REST
│   ├── service/            # Interfaces de servicio
│   │   └── Impl/           # Implementaciones de negocio
│   ├── repository/         # Repositorios Spring Data JPA
│   ├── model/              # Entidades JPA
│   │   └── mapper/         # Conversores entidad <-> DTO
│   ├── dto/                # Objetos de transferencia de datos
│   └── exception/          # Manejo global de errores
└── src/main/resources/
    └── application.properties
```

---

## Requisitos Previos

- Java 21
- Maven 3.9+
- PostgreSQL 16 en `localhost:5432` (o acceso a Neon)
- Base de datos `bd_rednorte`

---

## Ejecucion

```bash
./mvnw spring-boot:run
```

El servicio queda disponible en `http://localhost:8004`.

---

## Documentacion de API

```text
http://localhost:8004/swagger-ui/index.html
```

---

## Dependencias Clave

- `spring-boot-starter-webmvc`
- `spring-boot-starter-data-jpa`
- `spring-boot-starter-validation`
- `postgresql`
- `lombok`
