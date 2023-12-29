import { AppDataSource } from "../../data-source";
import { CarsUtilization } from "../../entities/CarUtilization";

type TCarsUtilizationUpdateRequest = {
  id: string;
  carID: string;
  driverID: string;
  reasonForUse: string;
  endDate: Date;
};

export class UpdateCarsUtilizationService {
  async execute(props: TCarsUtilizationUpdateRequest) {
    const repo = AppDataSource.getRepository(CarsUtilization);

    const carUtilizationToUpdate = await repo.findOne({
      where: { id: props.id },
    });

    if (!carUtilizationToUpdate) {
      return new Error("Car utilization does not exists!");
    }
    const updatedCarUtilization = {
      ...carUtilizationToUpdate,
      ...props,
    };

    await repo.save(updatedCarUtilization);
    return updatedCarUtilization;
  }
}
