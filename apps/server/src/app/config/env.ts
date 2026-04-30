import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
    PORT: string;
    DATABASE_URL: string;
    FRONTEND_URL: string;
}

const loadEnvironmentVariables = (): EnvConfig => {
    const requiredEnvVars: string[] = [
        "PORT",
        "DATABASE_URL",
        "FRONTEND_URL",
    ]
    requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
  };
};

export const envVars = loadEnvironmentVariables();