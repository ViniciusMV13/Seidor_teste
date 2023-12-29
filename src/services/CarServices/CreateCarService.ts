import { AppDataSource } from "../../data-source";
import { Cars } from "../../entities/Cars";

type TCarsRequest = {
  plate: string;
  color: string;
  brand: string;
  inUse: boolean;
};

export class CreateCarService {
  async execute({
    plate,
    color,
    brand,
    inUse,
  }: TCarsRequest): Promise<Cars | Error> {
    const repo = AppDataSource.getRepository(Cars);

    if (await repo.findOne({ where: { plate: plate } })) {
      return new Error("Car already exists");
    }

    const car = repo.create({
      plate,
      color,
      brand,
      inUse,
    });

    await repo.save(car);

    return car;
  }
}
