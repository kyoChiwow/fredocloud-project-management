/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const login = async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.loginUser(req.body);
    const { accessToken, refreshToken, user } = result;

    // Set Access Token in httpOnly cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    // Set Refresh Token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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

export const AuthController = { login };
