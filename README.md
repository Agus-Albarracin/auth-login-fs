# Proyecto Frontend

Este proyecto es una aplicación frontend que se conecta a una base de datos PostgreSQL. A continuación, se detallan los pasos para iniciar el cliente y configurar la base de datos.

## Iniciar el Cliente

Para iniciar el cliente, sigue estos pasos:

1. cd client

2. npm install

3. npm run dev o, si deseas construir el proyecto para producción, ejecuta: npm build, npm start

## Configuración de la Base de Datos

1. Crea una nueva base de datos en PgAdmin, como lo harías con cualquier base de datos común.

2. Configura las credenciales de acceso en el archivo " .env.development "
Este archivo contiene los accesos por defecto, pero debes actualizarlos con tus propias credenciales.

* Puedes encontrar el nombre de usuario en PgAdmin en la sección "Properties". Allí encontrarás toda la información necesaria para configurar el acceso a la base de datos.

## Iniciar el server

Para iniciar el cliente, sigue estos pasos:

1. cd server

2. npm install

3. npm run dev o, si deseas construir el proyecto para producción, ejecuta: npm build npm start

## CI/CD y Contenerización

1. Asegurate de crear la carpeta build en el frontend
2. cd client
3. npm run build / vite build (Si ya tienes hecho el build en el client saltea estos pasos.)
4. Crea y levanta los servicios en docker:
5. docker-compose up --build
