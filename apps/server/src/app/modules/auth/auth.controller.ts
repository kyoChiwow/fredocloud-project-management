/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const login = async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.loginUser(req.body);
    const { accessToken, refreshToken, user } = result;

     const isProduction = process.env.NODE_ENV === "production";

    const cookieOptions: any = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful!",
      data: {
        accessToken,
        refreshToken,
        user,
      },
    });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.getMe(req.user.id);

    res.status(200).json({
      success: true,
      message: "User profile retrieved successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({ 
      success: false, 
      message: error.message || "Failed to fetch user" 
    });
  }
};

const logout = async (req: Request, res: Response) => {
  const isProduction = process.env.NODE_ENV === "production";

  const cookieOptions: any = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    expires: new Date(0), // Sets expiration to the past
  };

  res.cookie("accessToken", "", cookieOptions);
  res.cookie("refreshToken", "", cookieOptions);

  res.status(200).json({
    success: true,
    message: "Logged out successfully!",
  });
};

export const AuthController = { login, getMe, logout };
