/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserServices } from "./user.service";

const registerUser = async (req: Request, res: Response) => {
  try {
    // 1. Call the service to create the user
    const result = await UserServices.createUserService(req.body);

    // 2. Send successful response
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: result,
    });
  } catch (error: any) {
    console.error("Registration Error:", error);
    
    res.status(error.code === 'P2002' ? 400 : 500).json({
      success: false,
      message: error.code === 'P2002' 
        ? "Email already exists" 
        : error.message || "Something went wrong during registration",
    });
  }
};

export const UserController = {
  registerUser,
};
