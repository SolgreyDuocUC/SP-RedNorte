# =========================================================
# ETAPA 1 - BUILD
# =========================================================
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copiar dependencias primero (caché de capas)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar el código fuente y compilar
COPY src ./src
RUN mvn clean package -DskipTests -B

# =========================================================
# ETAPA 2 - RUNTIME
# =========================================================
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copiar el JAR generado en la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Puerto del microservicio
EXPOSE 8010

# Variables de entorno por defecto (sobrescribibles con docker-compose)
ENV SPRING_PROFILES_ACTIVE=dev
ENV TZ=America/Santiago

ENTRYPOINT ["java", "-jar", "app.jar"]
