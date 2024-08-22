CREATE DATABASE "device-service";
CREATE ROLE postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE "device-service" TO postgres;
