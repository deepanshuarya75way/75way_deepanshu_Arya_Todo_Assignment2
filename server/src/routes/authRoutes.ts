import { Router } from "express";
import userController from "../controllers/userController";
import authController from "../controllers/authController";
import { isLoggedIn } from "../utils/isAuthenticated";

const router = Router();

router.post("/register", userController.createUser)
router.post("/login", authController.loginUser)
router.get("/logout", isLoggedIn,  authController.logoutUser)
router.get("/refresh_token", authController.refreshToken)
router.get('/getRole', isLoggedIn, authController.getRole)


export const authRoutes =  router;