import { Request, Response } from "express";
import { GetAllCarsUtilizationService } from "../../services/CarUtilizationServices/GetAllCarsUtilizationsService";

export class GetAllCarsUtilizationController {
  async handle(req: Request, res: Response) {
    const service = new GetAllCarsUtilizationService();

    const drivers = await service.execute();
    return res.json(drivers);
  }
}
