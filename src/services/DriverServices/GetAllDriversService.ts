import { AppDataSource } from "../../data-source";
import { Drivers } from "../../entities/Drivers";

export class GetAllDriversService {
  async execute(id: string, name: string) {
    const repo = AppDataSource.getRepository(Drivers);

    const drivers = await repo.find({ where: { id, name } });

    return drivers;
  }
}
