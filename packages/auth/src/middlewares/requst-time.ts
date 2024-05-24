import { Request, Response, NextFunction } from "express";
export const requestTime = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  res.on("finish", () => {
    const timeString = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    console.log("Response sent at:", timeString);
  });
  //passs the request
  next();
};
