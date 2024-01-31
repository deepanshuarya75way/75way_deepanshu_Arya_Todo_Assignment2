import {Router} from "express";
import taskController from "../controllers/taskController";
import {isLoggedIn, authRole } from "../utils/isAuthenticated";
import ROLE from "../utils/ROLES";
const router = Router();

router.post("/create", isLoggedIn, authRole(ROLE.ADMIN)  ,taskController.createTask)


export const adminRoutes = router;