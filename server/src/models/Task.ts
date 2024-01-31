import mongoose, { connections } from "mongoose"

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1
    },
    body: {
        type: String,
        required: true,
        minlength: 1
    },
    assignedTo: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        required: true
        
    },
    createdBy: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        required: true
    },
    priority: {
        type: String,
        enum: ["High", "Low", "Medium"],
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Completed"],
        required: true,
        default: "Pending"
    },
    deadline: {
        type: Date,
        required: true
    },
    completedAt: {
        type: Date,
    }
})


// do not return password and refresh token

export const Task = mongoose.model("task", userSchema)
export const getTaskById = (id: string) => {Task.findById(id)};
export const getAllTask = () => {Task.find({})};
export const createTask =  (values: Record<string, any>) => new Task(values).save().then((task) => task.toObject());
export const getTaskByUserId = (id: string) => {Task.find({assignedTo: id})};
export const getTaskByCreatorId = (id: string) => {Task.find({createdBy: id})};

