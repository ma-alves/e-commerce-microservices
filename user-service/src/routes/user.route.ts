import { getUser } from "../controllers/user.controller";
import express, { Router } from "express";
const router: Router = express.Router();

router.get("/", getUser);

export default router;