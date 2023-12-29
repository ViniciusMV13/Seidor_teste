import { AppDataSource } from "../../data-source";
import { Cars } from "../../entities/Cars";

type TCarsUpdateRequest = {
  id: string;
  color: string;
  plate: string;
  brand: string;
  inUse: boolean;
};

export class UpdateCarsService {
  async execute(props: TCarsUpdateRequest) {
    const repo = AppDataSource.getRepository(Cars);

    const carToUpdate = await repo.findOne({ where: { id: props.id } });

    if (!carToUpdate) {
      return new Error("Car does not exists!");
    }
    const updatedCar = {
      ...carToUpdate,
      ...props,
    };

    await repo.save(updatedCar);
    return updatedCar;
  }
}
