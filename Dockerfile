# syntax=docker/dockerfile:1

# 1. Сборка Vue-приложения
FROM node:22-alpine AS frontend
WORKDIR /workspace/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY frontend/ ./
RUN npm run build

# 2. Сборка Spring Boot (frontend/dist копируется в classpath:/static плагином maven-resources-plugin)
FROM maven:3.9.11-eclipse-temurin-21-alpine AS backend
WORKDIR /workspace
COPY pom.xml ./
RUN mvn -q -B dependency:go-offline
COPY src ./src
COPY --from=frontend /workspace/frontend/dist ./frontend/dist
RUN mvn -q -B clean package -DskipTests

# 3. Минимальный runtime-образ
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
COPY --from=backend /workspace/target/atlantic-*.jar app.jar
USER app
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
