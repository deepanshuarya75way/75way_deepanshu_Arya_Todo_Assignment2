import { User, getUserByEmail, getUserById } from "../models/User";
import { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validateEmail, validatePassword } from "../utils/validation";
import { Task, getAllTask } from "../models/Task";
import {sendMail} from "../utils/sendMail"
import { startCronJob, stopCronJob } from '../utils/cron';

dotenv.config({ path: __dirname + "/../.env" });
// send mail on updatetas to user and admin


function deadLineCrone(userId: any  ,seconds: number, emails: string[], task: any){
    startCronJob(userId, seconds, emails, task);
}



const createTask = async (req: Request, res: Response) => {
    const { title, body, assignedTo, prio, deadline } = req.body;
    const priority = prio
    console.log({ title, body, assignedTo, priority, deadline })
    if (!title || !body || !assignedTo  || !priority || !deadline) {
        return res.status(401).json({
            error: "All fields are required",
        });
    }
    //deadline validation
    const deadlineDate = new Date(deadline);
    const today = new Date();
    if (deadlineDate < today) {
        return res.status(401).json({
            error: "Deadline cannot be in the past",
        });
    }
    //assignedTo validation
    const assignedToUser = await getUserByEmail(assignedTo);
    if (!assignedToUser) {
        return res.status(401).json({
            error: "User does not exist",
        });
    }
    //priority validation
    if (priority !== "High" && priority !== "Medium" && priority !== "Low") {
        return res.status(401).json({
            error: "Priority can only be High, Medium or Low",
        });
    }

    const toUser = await getUserByEmail(assignedTo);
    const byUser = await User.findById(req.userId);
    if (!toUser || !byUser) {
        return res.status(401).json({
            error: "User does not exist",
        });
    }
    const task = {
        title,
        body,
        assignedTo: toUser._id,
        createdBy: byUser._id,
        priority,
        deadline
    }
    try {
        const newTask = await Task.create(task);
        deadLineCrone(toUser._id,(new Date(deadline).getTime() - new Date().getTime())/1000, [toUser.email, byUser.email], newTask)
        return res.status(200).json({
            success: "Task Created",
            task: newTask
        });
    }
    catch (err: any) {
        res.status(400).json({
            error: err.message
        });
    }

}

const getTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find({})
    console.log(tasks)
    return res.status(200).json({
        success: "All tasks",
        tasks
    });
}

const getUserTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find({assignedTo: req.userId})
    return res.status(200).json({
        success: "All tasks",
        tasks
    });
}

const updateTask = async (req: Request, res: Response) => {
    const { taskId, status } = req.body;
    const isCompleted: boolean = status === "Completed";
    if (!taskId || !status) {
        return res.status(401).json({
            error: "All fields are required",
        });
    }
    const task = await Task.findById(taskId)
    if(!task){
        return res.status(401).json({
            error: "Task does not exist",
        });
    }
    const userId = await User.findById(req.userId)
   

    if((!task.assignedTo[0].equals(userId?._id)) && (userId?.role !== "admin")){
        return res.status(401).json({
            error: "You can only update your tasks",
        });
    }
    task.status = status;
    if(isCompleted){
        task.completedAt = new Date();
    }else{
        task.completedAt = undefined;
    }
    try {
        const updatedTask = await task.save();
        const user = await User.findById(task.assignedTo[0])
        const admin = await User.findById(task.createdBy[0])
        const content = {
            subject: "Task Status was updated",
            text: `<b>Task</b> ${task.title} <br> <b>Description:</b> ${task.body} <br>  was updated to <b>${task.status}</b> by <b>${userId?.username}</b>`
        }
        try{
            await sendMail([user?.email as string, admin?.email as string], content)
            if(task.status === "Completed"){
                stopCronJob(user?._id , task.title)
            }
              
        }catch(err){
            console.log(err)
        }
        return res.status(200).json({
            success: "Task Updated",
            task: updatedTask
        });
    }
    catch (err: any) {
        res.status(400).json({
            error: err.message
        });
    }

}

export const getPerformance = async (req: Request, res: Response) => {
    // Calculate employee daily performance based of estimated time and completion time of any task
    const tasks = await Task.find({assignedTo: req.userId})
    const completedTasks = tasks.filter((task) => task.status === "Completed")
    const totalCompletedTasks = completedTasks.length
    const totalTasks = tasks.length
    const performance = totalCompletedTasks/totalTasks
    return res.status(200).json({
        success: "Performance",
        performance,
        totalCompletedTasks: completedTasks.length,
        totalTasks: tasks.length
    });
}

const taskController = {
    createTask,
    getTasks,
    getUserTasks,
    updateTask,
    getPerformance
};



export default taskController;