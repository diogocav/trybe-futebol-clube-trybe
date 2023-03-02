import { NextFunction, Response, Request } from 'express';
import EmptyFieldsError from '../errors/EmptyFieldsError';

class ValidateFields {
  public static login(
    req: Request,
    _res: Response,
    _next: NextFunction,
  ): void {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new EmptyFieldsError('All fields must be filled');
    }
    _next();
  }
}

export default ValidateFields;
