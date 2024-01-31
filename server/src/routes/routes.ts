import { Router } from 'express';
import {userRoutes} from "./userRoutes"
import {authRoutes} from "./authRoutes"
import {adminRoutes} from "./adminRoutes"
import {employeeRoutes} from "./employeeRoutes"
import { isLoggedIn } from '../utils/isAuthenticated';

export const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/user', userRoutes)
routes.use('/admin', adminRoutes)
routes.use('/employee', employeeRoutes)
