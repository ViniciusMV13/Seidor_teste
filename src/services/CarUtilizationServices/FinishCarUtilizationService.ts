import { AppDataSource } from "../../data-source";
import { CarsUtilization } from "../../entities/CarUtilization";
import { Cars } from "../../entities/Cars";
import { Drivers } from "../../entities/Drivers";

export class FinishCarsUtilizationService {
  async execute(id: string) {
    const CarRepo = AppDataSource.getRepository(Cars);
    const DriverRepo = AppDataSource.getRepository(Drivers);
    const repo = AppDataSource.getRepository(CarsUtilization);

    const CarUtilizationToFinish = await repo.findOne({
      where: { id },
    });

    if (CarUtilizationToFinish.endDate != null) {
      return new Error("Car utilization finished");
    }
    if (!CarUtilizationToFinish) {
      return new Error("Car utilization does not exists!");
    }

    const car = await CarRepo.findOne({
      where: { id: CarUtilizationToFinish.carID },
    });
    const driver = await DriverRepo.findOne({
      where: { id: CarUtilizationToFinish.driverID },
    });

    car.inUse = false;
    await CarRepo.save(car);

    driver.itsDriving = false;
    await DriverRepo.save(driver);

    var EndDate = new Date(Date.now());
    CarUtilizationToFinish.endDate = EndDate;

    const finishCarUtilization = CarUtilizationToFinish;

    await repo.save(finishCarUtilization);
    return finishCarUtilization;
  }
}
