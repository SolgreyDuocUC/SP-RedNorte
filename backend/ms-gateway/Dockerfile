# Usamos la misma imagen base de Java 21 que los demás
FROM eclipse-temurin:21-jdk-alpine

VOLUME /tmp

# Copiamos el archivo ya compilado
COPY target/*.jar app.jar

# Exponemos el puerto del Gateway (el que recibirá todas las peticiones)
EXPOSE 8080

# Comando para encenderlo
ENTRYPOINT ["java","-jar","/app.jar"]
