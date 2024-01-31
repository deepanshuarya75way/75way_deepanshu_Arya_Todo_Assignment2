import { Router } from "express";
import userController from "../controllers/userController";
import { isLoggedIn } from "../utils/isAuthenticated";
// app.ts or your controller file
import { startCronJob, stopCronJob } from '../utils/cron';


// When you want to stop the job

const router = Router();

router.get("/", isLoggedIn, userController.getUser)



export const userRoutes = router;