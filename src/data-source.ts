import "reflect-metadata";
import { DataSource } from "typeorm";

let database = "seidor"

if (process.env.NODE_ENV === "test") {
database = "seidor_teste"
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: database,
  synchronize: true,
  logging: false,
  migrations: ["src/migration/**/*{.ts,.js}"],
  entities: ["src/entities/**/*{.ts,.js}"],
});

export const AppDataSourceTeste = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "seidor",
  synchronize: true,
  logging: false,
  migrations: ["src/migration/**/*{.ts,.js}"],
  entities: ["src/entities/**/*{.ts,.js}"],
});

if (process.env.NODE_ENV !== "test") {
  AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
  }

