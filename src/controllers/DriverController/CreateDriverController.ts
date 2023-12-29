import { Request, Response } from "express";
import { CreateDriverService } from "../../services/DriverServices/CreateDriverService";

export class CreateDriverController {
  async handle(req: Request, res: Response) {
    const { name, itsDriving } = req.body;

    const service = new CreateDriverService();

    const result = await service.execute({ name, itsDriving });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
