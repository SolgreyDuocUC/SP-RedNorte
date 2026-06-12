# ms-gateway (ms-rednorte-api-gateway)

Este es el API Gateway principal para la arquitectura de microservicios de RedNorte. Su funcion es servir como un unico punto de entrada que recibe las peticiones desde el frontend y las enruta al microservicio correspondiente.

## Tecnologias
* Java 21
* Spring Boot 4.0.6
* Spring Cloud Gateway Server WebMVC (2025.1.x)
* Maven
* Docker

## Enrutamiento Configurado

El Gateway escucha en el puerto publico `8080` y distribuye el trafico hacia la red interna de contenedores de la siguiente manera:

| Ruta Entrante (Path) | Microservicio Destino | Puerto Interno |
| :-- | :-- | :-- |
| `/api/v1/encounters/**` | `ms-ficha-clinica` | `8001` |
| `/api/v1/clinical-notes/**` | `ms-ficha-clinica` | `8001` |
| `/api/v1/procedures/**` | `ms-ficha-clinica` | `8001` |
| `/api/v1/conditions/**` | `ms-ficha-clinica` | `8001` |
| `/api/v1/history/**` | `ms-ficha-clinica` | `8001` |
| `/api/v1/observations/**` | `ms-ficha-clinica` | `8001` |
| `/api/v1/patients/**` | `ms-paciente` | `8002` |
| `/api/v1/coverages/**` | `ms-paciente` | `8002` |
| `/api/v1/appointments/**` | `ms-reservas` | `8003` |
| `/api/v1/slots/**` | `ms-reservas` | `8003` |
| `/api/v1/users/**` | `ms-usuarios` | `8004` |
| `/api/v1/roles/**` | `ms-usuarios` | `8004` |
| `/urgencias/**` | `ms-urgencias` | `8005` |

> **Nota Tecnica:** La configuracion de estas rutas se encuentra programada en codigo Java puro dentro de la clase `GatewayConfig.java`. Las URLs destino son configurables via `application.yaml` (`services.*.url`), que a su vez leen las variables de entorno `MS_FICHA_CLINICA_URI`, `MS_PACIENTE_URI`, `MS_RESERVAS_URI`, `MS_USUARIOS_URI` y `MS_URGENCIAS_URI` inyectadas por `docker-compose.yml`. En ejecucion local (IDE/Maven) caen por defecto a `http://localhost:<puerto>`.

## Despliegue con Docker

El Gateway cuenta con su propio `Dockerfile` (build multi-etapa) y forma parte de la red orquestada de RedNorte. Para levantar todo el stack:

```bash
docker-compose up --build -d ms-gateway
```

## Pruebas de Funcionamiento

Puedes probar el Gateway apuntando a `localhost:8080`. Si el Gateway enruta correctamente, recibiras la respuesta del microservicio destino.

Ejemplo de endpoint:
* `GET http://localhost:8080/api/v1/appointments`
