import { Request, Response } from "express";
import { CreateCarService } from "../../services/CarServices/CreateCarService";

export class CreateCarController {
  async handle(req: Request, res: Response) {
    const { plate, color, brand, inUse } = req.body;

    const service = new CreateCarService();

    const result = await service.execute({ plate, color, brand, inUse });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }
    return res.json(result).status(200);
  }
}
