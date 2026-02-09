import { Request, Response } from "express";
import User from "../models/user.model";
import { errorHandler } from "../utils/errorHandler";

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId, "_id username email");  // usar reposiroty
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
};