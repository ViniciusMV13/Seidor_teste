import { AppDataSource } from "../../data-source";
import { CarsUtilization } from "../../entities/CarUtilization";

export class GetAllCarsUtilizationService {
  async execute() {
    const repo = AppDataSource.getRepository(CarsUtilization);

    const carsUtilization = await repo.find({ relations: ["car", "driver"] });

    return carsUtilization;
  }
}
