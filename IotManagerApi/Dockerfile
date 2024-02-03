FROM eclipse-temurin:17-jdk-jammy as builder
WORKDIR /opt/app
COPY .mvn/ .mvn
COPY mvnw.sh pom.xml ./
RUN apt-get update && apt-get install dos2unix && apt-get clean
RUN dos2unix mvnw.sh
RUN ./mvnw.sh dependency:go-offline
COPY ./src ./src
RUN ./mvnw.sh clean install
 
FROM eclipse-temurin:17-jre-jammy
WORKDIR /opt/app
EXPOSE 8080
COPY --from=builder /opt/app/target/*.jar /opt/app/*.jar
CMD ["java", "-jar", "/opt/app/*.jar"]