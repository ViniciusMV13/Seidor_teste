import { Request, Response } from "express";
import { CreateCarsUtilizationService } from "../../services/CarUtilizationServices/CreateCarUtilizationService";

export class CreateCarsUtilizationController {
  async handle(req: Request, res: Response) {
    const { carID, driverID, reasonForUse, endDate } = req.body;

    const service = new CreateCarsUtilizationService();

    const result = await service.execute({
      carID,
      driverID,
      reasonForUse,
      endDate,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
