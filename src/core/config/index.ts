import * as dotenv from "dotenv";
import * as process from "process";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: ".env.dev"
  });
}

const CONFIG: IConfig = {
  PORT: parseInt(process.env.PORT) || 3000,
  IS_PROD: process.env.NODE_ENV === "production",
  RATE_LIMIT: {
    TTL: parseInt(process.env.RATE_LIMIT_TTL) || 60,
    LIMIT: parseInt(process.env.RATE_LIMIT_LIMIT) || 100
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN
  },
  REDIS: {
    HOST: process.env.REDIS_HOST || "127.0.0.1",
    PORT: parseInt(process.env.REDIS_PORT) || 6379,
  },
  POSTGRES: {
    USER: process.env.POSTGRES_USER,
    HOST: process.env.POSTGRES_HOST,
    DATABASE: process.env.POSTGRES_DATABASE,
    PORT: parseInt(process.env.POSTGRES_PORT) || 5432,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    SYNCHRONIZE: process.env.POSTGRES_SYNCHRONIZE || "true",
    LOGGING: process.env.POSTGRES_LOGGING || "true",
  }
};

export default CONFIG;
