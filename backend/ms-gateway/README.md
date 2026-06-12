# SPS-rednorte-api-gateway

Este es el API Gateway principal para la arquitectura de microservicios de RedNorte. Su función es servir como un único punto de entrada (recepcionista) que recibe las peticiones desde el frontend y las enruta al microservicio correspondiente.

## Tecnologías
* Java 21
* Spring Boot 3.2.x
* Spring Cloud Gateway Server WebMVC (2023.0.x)
* Maven
* Docker

## Enrutamiento Configurado

Actualmente, el Gateway escucha en el puerto público `8080` y distribuye el tráfico hacia la red interna de contenedores de la siguiente manera:

| Ruta Entrante (Path) | Microservicio Destino | Puerto Interno |
| :--- | :--- | :--- |
| `/agendas/**` | `http://ms-agenda-profesional` | `8080` |
| `/api/v1/**` | `http://ms-ficha-clinica` | `8001` |
| `/centros/**` | `http://rednorte-ms-centros` | `8080` |
| `/urgencias/**` | `http://ms-urgencias-flujo` | `8080` |

> **Nota Técnica:** La configuración de estas rutas se encuentra programada en código Java puro dentro de la clase `GatewayConfig.java` para garantizar mayor estabilidad frente a la versión WebMVC.

## Despliegue con Docker

El Gateway cuenta con su propio `Dockerfile` y forma parte de la red orquestada de RedNorte. Para compilar y levantar este servicio, utiliza los siguientes comandos:

1. **Compilar el JAR:**
```bash
.\mvnw.cmd clean package -DskipTests
```

2. **Levantar el contenedor:**
(Desde la carpeta SPS-RedNorte-Infraestructura)
```bash
docker-compose up --build -d ms-api-gateway
```

## Pruebas de Funcionamiento
Puedes probar el Gateway apuntando al `localhost:8080`. Si el Gateway enruta correctamente, recibirás la respuesta del microservicio destino (incluyendo códigos HTTP 403 o 401 si el destino requiere autenticación).

Ejemplo de endpoint público:
* `GET http://localhost:8080/urgencias/espera/12345678-9`
