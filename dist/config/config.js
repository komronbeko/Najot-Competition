"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const { env } = process;
const config = {
    PORT: env.PORT,
    SECRET_KEY: env.SECRET_KEY,
    ConnectionString: env.ConnectionString,
};
exports.default = config;
