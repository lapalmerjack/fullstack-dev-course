import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { z } from "zod";
import { NewPatientEntrySchema, NewEntrySchema, IdSchema } from "./helper";
import { NotFoundError } from "./errors";

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewPatientEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const newEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewEntrySchema.parse(req.body);
    IdSchema.parse(req.params.id)
    console.log(req.body);
    console.log(req.params.id)
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof NotFoundError) {
     res.status(err.status).json({ error: err.message });
  }

  // Default error response for unexpected errors
  res.status(500).json({ error: "Internal Server Error" });
};

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
