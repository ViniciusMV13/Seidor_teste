import { AppDataSource } from "../../data-source";
import { Cars } from "../../entities/Cars";

export class DeleteCarService {
  async execute(id: string) {
    const repo = AppDataSource.getRepository(Cars);

    if (!(await repo.findOne({ where: { id } }))) {
      return new Error("Car does not exists!");
    }

    await repo.delete(id);
  }
}
