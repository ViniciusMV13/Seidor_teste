import { AppDataSource } from "../../data-source";
import { Drivers } from "../../entities/Drivers";

type TDriversRequest = {
  name: string;
  itsDriving: boolean;
};

export class CreateDriverService {
  async execute({ name, itsDriving }: TDriversRequest): Promise<Drivers> {
    const repo = AppDataSource.getRepository(Drivers);

    const driver = repo.create({
      name,
      itsDriving,
    });

    await repo.save(driver);

    return driver;
  }
}
