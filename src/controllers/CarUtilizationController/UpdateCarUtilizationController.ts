import { Request, Response } from "express";
import { UpdateCarsUtilizationService } from "../../services/CarUtilizationServices/UpdateCarUtilizationService";

export class UpdateCarsUtilizationController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { carID, driverID, reasonForUse, endDate } = req.body;

    const service = new UpdateCarsUtilizationService();

    const result = await service.execute({
      id,
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
