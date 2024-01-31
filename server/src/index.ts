import express, {Request, Response} from "express";
import {routes}  from "./routes/routes";
import {connectDB} from "./db/connect";
import dotenv from "dotenv";
import { JwtPayload } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({path: __dirname+ '/.env'})
const app = express();
const PORT: number = 3000 || 5000

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser());
declare global {
    namespace Express {
        interface Request {
            userId?: string | JwtPayload
        }
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes)

try{
    connectDB(process.env.MONGO_URI as string);
    app.listen(PORT, ()=>{
        console.log(`Server is running at http://localhost:${PORT}`)
    })
}catch(err){
    console.log(err)
}


