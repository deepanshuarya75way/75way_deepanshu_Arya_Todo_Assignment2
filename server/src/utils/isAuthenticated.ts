import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/User';
dotenv.config({ path: __dirname+'/../.env' });;

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token;
        if(!token){
            return res.status(401).json({
                error: "Not logged In"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "")
        if(!decoded){
            return res.status(401).json({
                error: "Invalid Token"
            }) 
        }
        req.userId = decoded;
        next();
    }
    catch (err: any) {
        res.status(400).json({
            error: err.message
        });
    }
};

const authRole =  (role: string)=>{
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.access_token;
        const userId = jwt.verify(token, process.env.JWT_SECRET || "")
        if(!userId){
            return res.status(401).json({
                error: "you Need to login again"
            })
        }
        const user = await User.findOne({ _id: userId }).select('role') || {role: ''}
        console.log(user.role , role)
        if(user.role !== role){
            return res.status(401).json({
                error: "Missing Privilages"
            })
        }
        next()
    }
}
// authRole(ROLE.ADMIN)
export { isLoggedIn, authRole };