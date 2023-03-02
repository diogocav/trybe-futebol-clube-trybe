import { NextFunction, Response, Request } from 'express';

class ErrorHandler {
  public static handle(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Response {
    // if (err instanceof Error && err.stack) {
    //   return res.status(parseInt(err.stack, 10)).json({ message: err.message });
    // }

    if (err instanceof Error && err.stack) {
      const statusCode = Number.isNaN(parseInt(err.stack, 10)) ? 500 : parseInt(err.stack, 10);
      return res.status(statusCode).json({ message: err.message });
    }

    // return res.status(500).json({ message: err.message, stack: err.stack });
    return res.status(500).json({ message: err.message });
  }
}

export default ErrorHandler;
