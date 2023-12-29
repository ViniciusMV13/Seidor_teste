import { AppDataSource } from "../../data-source";
import { Drivers } from "../../entities/Drivers";

type TDriverUpdateRequest = {
  id: string;
  name: string;
  itsDriving: boolean;
};

export class UpdateDriverService {
  async execute(props: TDriverUpdateRequest) {
    const repo = AppDataSource.getRepository(Drivers);

    const driverToUpdate = await repo.findOne({ where: { id: props.id } });

    if (!driverToUpdate) {
      return new Error("Driver does not exists!");
    }
    const updatedDriver = {
      ...driverToUpdate,
      ...props,
    };

    await repo.save(updatedDriver);
    return updatedDriver;
  }
}
