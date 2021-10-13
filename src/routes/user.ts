import { Router } from "express";
import {
  getAllUsers,
  getOneUser,
  registerOrLogin,
  updateScore,
} from "@controller/userController";

const router = Router();

/**
 * @METHOD GET /user
 * @DESC Return all users
 */

router.get("/", getAllUsers);

/**
 * @METHOD GET /user
 * @DESC Return one user
 */

router.get("/:username", getOneUser);

/**
 * @METHOD PUT /user/:username
 * @DESC Update user
 */

router.put("/:username", updateScore);

/**
 * @METHOD POST /register
 * @DESC Register new user
 */

router.post("/register", registerOrLogin);

export default router;
