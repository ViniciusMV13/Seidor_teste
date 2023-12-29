import { Request, Response } from "express";
import { GetAllCarsService } from "../../services/CarServices/GetAllCarsService";

export class GetAllCarsController {
  async handle(req: Request, res: Response) {
    const { id, color, brand } = req.query;
    const service = new GetAllCarsService();

    const cars = await service.execute(id, color, brand);
    return res.json(cars);
  }
}
