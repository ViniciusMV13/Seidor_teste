import { Request, Response } from "express";
import { DeleteCarsUtilizationService } from "../../services/CarUtilizationServices/DeleteCarUtilizationService";

export class DeleteCarsUtilizationController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new DeleteCarsUtilizationService();
    const result = await service.execute(id);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.status(204).end();
  }
}
