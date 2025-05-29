import { Router } from "express";
import { body } from "express-validator";
import { createAccount, login } from "./handlers";
import { validateRequest } from "./middleware/validation";

const router = Router();

// routing
router.post(
  "/auth/register",
  body("handle").notEmpty().withMessage("Handle is empty"),
  body("name").notEmpty().withMessage("Name is empty"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 6 characters long"),
  validateRequest, // Assuming validateRequest is a middleware to handle validation errors
  createAccount
);

router.post(
  "/auth/login",
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 6 characters long"),
  validateRequest,
  login
);

export default router;
