import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres", 
    host: "localhost",
    port: 5432, 
    username: "postgres",
    password: "admin",
    database: "seidor_teste",
    synchronize: true,
    logging: false,
    migrations: ['src/migration/**/*{.ts,.js}'],
    entities: ['src/entities/**/*{.ts,.js}'],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })