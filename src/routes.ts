import { Router } from "express"

import { CreateCarController } from "./controllers/CarController/CreateCarController"
import { GetAllCarsController } from "./controllers/CarController/GetAllCarsController"
import { DeleteCarController } from "./controllers/CarController/DeleteCarService"
import { UpdateCarController } from "./controllers/CarController/UpdateCarController"

import { CreateDriverController } from "./controllers/DriverController/CreateDriverController"
import { GetAllDriversController } from "./controllers/DriverController/GetAllDriversController"
import { DeleteDriverController } from "./controllers/DriverController/DeleteDriverController"
import { UpdateDriverController } from "./controllers/DriverController/UpdateDriverController"

import { CreateCarsUtilizationController } from "./controllers/CarUtilizationController/CreateCarUtilizationController"
import { GetAllCarsUtilizationController } from "./controllers/CarUtilizationController/GetAllCarUtilizationController"
import { DeleteCarsUtilizationController } from "./controllers/CarUtilizationController/DeleteCarUtilizationController"
import { UpdateCarsUtilizationController } from "./controllers/CarUtilizationController/UpdateCarUtilizationController"
import { FinishCarsUtilizationController } from "./controllers/CarUtilizationController/FinishCarUtilizationController"

const routes = Router()

routes.post("/cars", new CreateCarController().handle)
routes.get("/cars", new GetAllCarsController().handle)
routes.delete("/cars/:id", new DeleteCarController().handle)
routes.put("/cars/:id", new UpdateCarController().handle)

routes.post("/drivers", new CreateDriverController().handle)
routes.get("/drivers", new GetAllDriversController().handle)
routes.delete("/drivers/:id", new DeleteDriverController().handle)
routes.put("/drivers/:id", new UpdateDriverController().handle)

routes.post("/car-utilization", new CreateCarsUtilizationController().handle)
routes.get("/car-utilization", new GetAllCarsUtilizationController().handle)
routes.delete("/car-utilization/:id", new DeleteCarsUtilizationController().handle)
routes.put("/car-utilization/:id", new UpdateCarsUtilizationController().handle)
routes.put("/car-utilization/finish/:id", new FinishCarsUtilizationController().handle)

export { routes }

/* 
Para fazer as consultas basta utilizar o http://localhost:3000/rotadesejada
Rotas do tipo Delete deve se passar o id do que se deseja deletar ex http://localhost:3000/6887sda98syh7ss978
Rotas do tipo Post as informações do que vai ser criada devem ser passadas atraves de um json
Rotas do tipo Put deve se passar o id como params assim como no Delete porem juntamente com um json do que se deseja atualizar
Rotas do tipo Get você pode passar query params como filtro ou sem (puxando todas as informações)
*/