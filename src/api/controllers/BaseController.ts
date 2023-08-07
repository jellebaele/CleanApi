import { Response } from 'express';

export abstract class BaseController {
  public ok(res: Response) {
    return res.status(200).send();
  }

  public created<T>(res: Response, dto?: T) {
    if (!dto) return res.sendStatus(201);
    else return res.status(201).json(dto);
  }
}
