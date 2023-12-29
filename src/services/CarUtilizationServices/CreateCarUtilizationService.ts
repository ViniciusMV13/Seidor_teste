import { AppDataSource } from "../../data-source";
import { CarsUtilization } from "../../entities/CarUtilization";
import { Cars } from "../../entities/Cars";
import { Drivers } from "../../entities/Drivers";

type CarsUtilizationsRequest = {
  carID: string;
  driverID: string;
  reasonForUse: string;
  endDate: Date;
};

export class CreateCarsUtilizationService {
  async execute({
    carID,
    driverID,
    reasonForUse,
    endDate,
  }: CarsUtilizationsRequest): Promise<CarsUtilization | Error> {
    const carRepo = AppDataSource.getRepository(Cars);
    const driverRepo = AppDataSource.getRepository(Drivers);
    const repo = AppDataSource.getRepository(CarsUtilization);

    const car = await carRepo.findOne({ where: { id: carID } });
    const driver = await driverRepo.findOne({ where: { id: driverID } });

    if (!car || !driver) {
      return new Error("Car or driver does not exists");
    }

    if (car.inUse === true || driver.itsDriving === true) {
      return new Error("Car or Driver is already busy");
    }

    car.inUse = true;
    await carRepo.save(car);

    driver.itsDriving = true;
    await driverRepo.save(driver);

    const carUtilization = repo.create({
      carID,
      driverID,
      reasonForUse,
      endDate,
    });

    await repo.save(carUtilization);

    return carUtilization;
  }
}
