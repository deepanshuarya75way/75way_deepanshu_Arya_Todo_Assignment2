import { User, getUserByEmail } from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validateEmail, validatePassword } from "../utils/validation";

const createUser = async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword, firstName, lastName } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return res.status(401).json({
      error: "All fields are required",
    });
  }
  if (!validateEmail(email)) {
    return res.status(401).json({
      error: "Invalid Email",
    });
  }
  if (!validatePassword(password)) {
    return res.status(401).json({
      error:
        "Password must contain atleast 1 uppercase, 1 lowercase, 1 numeric, 1 special symbol and must be atleast 8 characters long",
    });
  }
  if (password !== confirmPassword) {
    return res.status(401).json({
      error: "Passwords do not match",
    });
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(401).json({
        error: "Account already exists",
      });
    }

    const salt: string = bcrypt.genSaltSync(10);
    const newUser = new User({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
      firstName,
      lastName,
    });
    newUser
      .save()
      .then((user) => {
        return res.status(201).json({
          success: "User created successfully",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err.message,
        });
      });
  } catch (err: any) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }
    return res.status(200).json({_id: user._id, email: user.email, username: user.username});
  } catch (err: any) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const userController = {
  createUser,
  getUser,
};

export default userController;
