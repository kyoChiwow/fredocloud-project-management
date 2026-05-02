/* eslint-disable @typescript-eslint/no-explicit-any */
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { envVars } from "../../config/env";
import { prisma } from "../../../../lib/prisma";

const loginUser = async (payload: any) => {
  const { email, password } = payload;

  // 1. Check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.isDeleted) {
    throw new Error("User not found!");
  }

  // 2. Verify password
  const isPasswordMatched = await bcryptjs.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("Invalid credentials!");
  }

  // 3. Create tokens
  const jwtPayload = { id: user.id, email: user.email, role: user.role };
  
  const accessToken = jwt.sign(jwtPayload, envVars.JWT_ACCESS_SECRET as string, {
    expiresIn: "7d",
  });

  const refreshToken = jwt.sign(jwtPayload, envVars.JWT_REFRESH_SECRET as string, {
    expiresIn: "7d",
  });

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};

const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { 
      id: true, 
      name: true, 
      email: true, 
      role: true, 
      isDeleted: true 
    },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  return user;
};

export const AuthServices = {
  loginUser,
  getMe,
};
