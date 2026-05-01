import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DATABASE_URL: string;
  FRONTEND_URL: string;
  BCRYPT_SALT_ROUND: string;
  JWT_ACCESS_EXPIRES: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES: string;
  CLOUDINARY: {
    CLOUDINARY_CLOUD_NAME: string; 
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  }
}

const loadEnvironmentVariables = (): EnvConfig => {
  const requiredEnvVars: string[] = [
    "PORT",
    "DATABASE_URL",
    "FRONTEND_URL",
    "BCRYPT_SALT_ROUND",
    "JWT_ACCESS_EXPIRES",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRES",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ];
  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
    CLOUDINARY: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string
    },
  };
};


export const envVars = loadEnvironmentVariables();
