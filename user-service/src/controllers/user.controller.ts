// validação de inputs e outputs?

import { NextFunction, Request, Response } from "express"
import userService from "@/services/user.service";

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id as string
    const user =  await userService.findById(userId)
    res.json(user)
  } catch (error) {
    next(error)
  }
}