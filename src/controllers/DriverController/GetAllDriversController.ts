import { Request, Response } from "express";
import { GetAllDriversService } from "../../services/DriverServices/GetAllDriversService";

export class GetAllDriversController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.query;
    const service = new GetAllDriversService();

    const drivers = await service.execute(id, name);
    return res.json(drivers);
  }
}
