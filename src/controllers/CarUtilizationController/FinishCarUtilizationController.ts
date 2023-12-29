import { Request, Response } from "express";
import { FinishCarsUtilizationService } from "../../services/CarUtilizationServices/FinishCarUtilizationService";

export class FinishCarsUtilizationController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new FinishCarsUtilizationService();

    const result = await service.execute(id);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
