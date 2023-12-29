import { Request, Response } from "express";
import { UpdateDriverService } from "../../services/DriverServices/UpdateDriverService";

export class UpdateDriverController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, itsDriving } = req.body;

    const service = new UpdateDriverService();

    const result = await service.execute({ id, name, itsDriving });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
