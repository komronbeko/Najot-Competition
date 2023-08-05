import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import config from "../../../config/config";

interface CustomRequest extends Request {
  verified?: Object;
}

export const isAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  jwt.verify(
    token,
    config.SECRET_KEY as jwt.Secret,
    (err: Error | null, data) => {
      if (err) {
        if (err instanceof JsonWebTokenError) {
          return res.status(401).json({ message: "Invalid token!" });
        } else if (err instanceof TokenExpiredError) {
          return res.status(401).json({ message: "Token" });
        } else {
          return res.status(500).json({ message: "Internal server error" });
        }
      }
      req.verified = data;
      next();
    }
  );
};
