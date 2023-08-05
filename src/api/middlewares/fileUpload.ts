import { v4 as uuid } from "uuid";
import path from "path";
import { NextFunction, Request, Response } from "express";

interface fileRequest extends Request {
  files?: any;
  imageName?: string;
}

export const fileUpload = (
  req: fileRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.files) {
    const image = req.files?.image;
    if (!image) return res.status(401).json({ message: "Image not found!" });
    
    const extraname = path.extname(image.name);
    const imageName = `${uuid()}${extraname}`;

    image.mv(`${process.cwd()}/uploads/${imageName}`);
    req.imageName = imageName;
    next();
  } else {
    const image = req.body?.image;

    if (!image) return res.status(401).json({ message: "Image not found!" });

    req.imageName = image;
    next();
  }
};
