declare global {
  interface IConfig {
    PORT: number;
    IS_PROD: boolean;
    RATE_LIMIT: {
      TTL: number;
      LIMIT: number;
    }
    JWT: {
      SECRET: string;
      EXPIRES_IN: string;
    }
    REDIS: {
      HOST: string;
      PORT: number;
    }
    POSTGRES: {
      USER: string;
      HOST: string;
      DATABASE: string;
      PORT: number;
      PASSWORD: string;
    }
  }

  interface IUser {
    username: string;
    email: string;
  }
}

export {}
