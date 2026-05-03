import "dotenv/config";
import { envVars } from './../src/app/config/env';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import pg from "pg";

const connectionString = `${envVars.DATABASE_URL}`;

const pool = new pg.Pool({ connectionString });

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export { prisma };