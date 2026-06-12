# =========================================================
# ETAPA 1 - BUILD
# =========================================================
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copiar dependencias primero (cache de capas)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar el codigo fuente y compilar
COPY src ./src
RUN mvn clean package -DskipTests -B

# =========================================================
# ETAPA 2 - RUNTIME
# =========================================================
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copiar el JAR generado en la etapa anterior
COPY --from=build /app/target/ms-rednorte-api-gateway-0.0.1-SNAPSHOT.jar app.jar

# Puerto publico del Gateway
EXPOSE 8080

# Variables de entorno por defecto (sobrescribibles con docker-compose)
ENV SPRING_PROFILES_ACTIVE=dev
ENV TZ=America/Santiago

ENTRYPOINT ["java", "-jar", "app.jar"]
