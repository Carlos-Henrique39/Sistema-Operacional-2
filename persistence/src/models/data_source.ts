import "reflect-metadata"
import { DataSource } from "typeorm"
import { Venda} from "./venda"
import { Usuario} from "./usuario"


export const MariaDBDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "root",
    database: "persistence",
    synchronize: true,
    logging: false,
    entities: [Usuario, Venda],
    migrations: [],
    subscribers: [],
})




