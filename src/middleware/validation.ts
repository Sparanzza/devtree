import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json({ errors: err.array() });
      return;
    }

    next();
};
