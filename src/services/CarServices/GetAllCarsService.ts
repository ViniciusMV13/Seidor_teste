import { AppDataSource } from "../../data-source";
import { Cars } from "../../entities/Cars";

export class GetAllCarsService {
  async execute(id: string, color: string, brand: string) {
    const repo = AppDataSource.getRepository(Cars);

    const cars = await repo.find({ where: { id, color, brand } });

    return cars;
  }
}
