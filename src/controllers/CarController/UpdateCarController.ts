import { Request, Response } from "express";
import { UpdateCarsService } from "../../services/CarServices/UpdateCarService";

export class UpdateCarController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { color, plate, brand, inUse } = req.body;

    const service = new UpdateCarsService();

    const result = await service.execute({ id, color, plate, brand, inUse });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
