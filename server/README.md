# BackEnd To-Do

Typescript Node.JS application using fastify, pg and mercurius for implementing GRAPHQL API. Mocha is used for testing and coverage.
The server have to be running in order to start the application.

pgadmin is used for database management as an example. The database is created automatically when the server starts using the [init.sql](https://github.com/DimitarNikolaevVasilev/TodoExampleDimatica/blob/main/db/init.sql) file.


## Configuration
You need to add .env file in the root folder with the following variables:
```
PORT=80
DEBUG_NODE_PORT=9229

DB_USER='dimatica'
DB_PASS='dimatica'
DB_NAME='dimatica'
DB_PORT=5432

PGADMIN_EMAIL='admin@dimatica.com'
PGADMIN_PASSWORD='dimatica2022'
```

## Running with docker-compose

```bash
docker-compose up
```