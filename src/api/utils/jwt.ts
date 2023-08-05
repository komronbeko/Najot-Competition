import jwt from "jsonwebtoken";
import config from "../../../config/config";

if (!config.SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in the config");
}

const sign = (payload: any) => {
  if (!config.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in the config");
  }
  jwt.sign(payload, config.SECRET_KEY, { expiresIn: "24h" });
};

const verify = (payload: any, err: Error, data: any) => {
  if (!config.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in the config");
  }
  jwt.verify(payload, config.SECRET_KEY);
};

export default { sign, verify };
