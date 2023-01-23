import { DataSource, DataSourceOptions } from "typeorm"

/**
 * In this file can be found the datasource needed for TypeORM to launch properly.
 * The entities that are targeted vary from one environment to another depending on
 * which command is used to run the application.
 * 
 * Both "dev" and "start" environments set the host as "localhost", whereas "docker"
 * sets the host as "pg_container" to properly build the docker-compose.
 */
let entities: string[] = []

switch (process.env.NODE_ENV) {
  case "dev":
    entities = ["src/api/domain/entities/*.ts"]
    break;
  case "start":
    entities = ["dist/src/api/domain/entities/*.js"]
    break;
  case "docker":
    entities = ["dist/src/api/domain/entities/*.js"]
    break;
}

export const options: DataSourceOptions = {
  "type": "postgres",
  "host": process.env.HOST,
  "port": 5432,
  "username": "postgres",
  "password": "root",
  "database": "efimobDB",
  "entities": entities,
  "synchronize": true
}

export const dataSource = new DataSource(options)