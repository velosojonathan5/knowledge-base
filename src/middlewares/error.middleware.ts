import { Request, Response, NextFunction } from "express";
import { NotFoundException } from "../exceptions/NotFoundException";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): any {
  if (err instanceof NotFoundException) {
    return res
      .status(err.status)
      .json({ error: err.name, message: err.message });
  }

  // Tratamento de outros erros
  console.error(err);
  return res
    .status(500)
    .json({ error: "InternalServerError", message: "Algo deu errado!" });
}
