import { AppDataSource } from "../../data-source";
import { Drivers } from "../../entities/Drivers";

export class DeleteDriverService {
  async execute(id: string) {
    const repo = AppDataSource.getRepository(Drivers);

    if (!(await repo.findOne({ where: { id: id } }))) {
      return new Error("Driver does not exists!");
    }

    await repo.delete(id);
  }
}
