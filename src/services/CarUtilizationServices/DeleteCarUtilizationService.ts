import { AppDataSource } from "../../data-source";
import { CarsUtilization } from "../../entities/CarUtilization";

export class DeleteCarsUtilizationService {
  async execute(id: string) {
    const repo = AppDataSource.getRepository(CarsUtilization);

    if (!(await repo.findOne({ where: { id } }))) {
      return new Error("Car Utilization does not exists!");
    }

    await repo.delete(id);
  }
}
