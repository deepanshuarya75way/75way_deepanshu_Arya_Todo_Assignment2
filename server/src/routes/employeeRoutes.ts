import {Router} from "express";
import taskController from "../controllers/taskController";
import {isLoggedIn} from "../utils/isAuthenticated";
const router = Router();

router.get("/tasks", isLoggedIn, taskController.getTasks)
router.get("/my", isLoggedIn ,taskController.getUserTasks)
router.post("/update", isLoggedIn, taskController.updateTask)
router.get("/performance", isLoggedIn, taskController.getPerformance)


export const employeeRoutes = router;