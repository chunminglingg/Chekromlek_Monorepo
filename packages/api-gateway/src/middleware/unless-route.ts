import { NextFunction, Request, Response } from "express";

// Middleware to conditionally apply another middleware unless the route matches specific paths and methods
interface Condition {
  path: string;
  method?: string;
}

export default function unless(conditions: Condition[], middleware: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    const shouldSkip = conditions.some((condition) => {
      const pathMatches = req.path.startsWith(condition.path);
      const methodMatches =
        !condition.method || req.method === condition.method;
      return pathMatches && methodMatches;
    });

    if (shouldSkip) {
      return next();
    } else {
      middleware(req, res, next);
    }
  };
}
