import { Request, Response } from "express";
import { DeleteCarService } from "../../services/CarServices/DeleteCarService";

export class DeleteCarController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new DeleteCarService();
    const result = await service.execute(id);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.status(204).end();
  }
}
