import * as jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import EmptyFieldsError from '../errors/EmptyFieldsError';
import TokenError from '../errors/TokenError';

class ValidateFields {
  private static secret: string = process.env.JWT_SECRET || 'jwt_secret';

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

  public static async token(req: Request, _res: Response, _next: NextFunction): Promise<void> {
    const token = req.header('Authorization');
    if (!token) {
      throw new TokenError('Token not found');
    }
    try {
      const jwtPayload = jwt.verify(token, ValidateFields.secret);
      if (typeof jwtPayload === 'string') {
        throw new Error();
      }
      const { data: { email } } = jwtPayload;
      req.body.email = email;
    } catch (error) {
      throw new TokenError('Token must be a valid token');
    }

    _next();
  }
}

export default ValidateFields;
