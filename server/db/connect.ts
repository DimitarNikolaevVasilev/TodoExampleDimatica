import {Pool} from "pg";

//    connectionString: `postgres://dinamica:dinamica@localhost:5432/dinamica`,

export default new Pool({
  max: 15,
  connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  idleTimeoutMillis: 30000
});