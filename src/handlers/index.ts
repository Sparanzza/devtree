import { Request, Response } from "express";
import User from "../models/User";
import colors from "colors";
import slug from "slugify";
import { ValidationError, validationResult } from "express-validator";
import { comparePassword, hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;
    console.log(colors.bgYellow.bold(`Registering user...${email}`));

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const handle = slug(req.body.handle, "");
    if (!handle) {
      const handleExist = await User.findOne({ handle });
      if (handleExist) {
        res.status(400).json({ error: "Handle already exists" });
        return;
      }
    }

    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;

    const result = await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result._id,
        name: result.name,
        email: result.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "User not created", details: error });
  }
};

export const login = async (req: Request, res: Response) => {

  const { email, password } = req.body;
  console.log(colors.bgYellow.bold(`Logging in user...${email}`));

  const existingUser = await User.findOne({ email: req.body.email });

  if (!existingUser) {
    res.status(400).json({ error: "User not found" });
    return;
  }

  const isPasswordValid = await comparePassword(password, existingUser.password);
  if (!isPasswordValid) {
    res.status(400).json({ error: "Invalid password" });
    return;
  }
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    },
  });
};

export const logout = async (req: Request, res: Response) => {};
