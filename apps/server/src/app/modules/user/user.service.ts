/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcryptjs from "bcryptjs";
import { prisma } from "../../../../lib/prisma";
import { envVars } from "../../config/env";
import { IUser } from "./user.interface";

const createUserService = async (userData: Partial<IUser>) => {
  const hashedPassword = await bcryptjs.hash(
    userData.password as string,
    Number(envVars.BCRYPT_SALT_ROUND) || 10,
  );

  const result = await prisma.user.create({
    data: {
      email: userData.email as string,
      name: userData.name as string,
      password: hashedPassword,
      avatarUrl: userData.avatarUrl || null,
      role: (userData.role as any) || "user",
      isDeleted: userData.isDeleted || false,
    },
  });

  const { password, ...userWithoutPassword } = result;
  
  return userWithoutPassword;
};

const getAllUsersService = async () => {
  return await prisma.user.findMany({
    where: { isDeleted: false },
    select: { 
      id: true, 
      name: true, 
      email: true, 
      role: true, 
      avatarUrl: true,
      createdAt: true 
    },
    orderBy: { name: 'asc' }
  });
};

export const UserServices = {
  createUserService,
  getAllUsersService
};
