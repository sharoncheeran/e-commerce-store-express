import express from "express";
const router = express.Router();

// Controller Imports
import { register, login } from "./controllers/AuthorizationController.js";

// Middleware Imports
import { verify } from "../common/middlewares/SchemaValidationMiddleware.js";

// JSON Schema Imports for payload verification
import registerPayload from "./schemas/registerPayload.js";
import loginPayload from "./schemas/loginPayload.js";

router.post("/signup", [verify(registerPayload)], register);

router.post("/login", [verify(loginPayload)], login);

export default router;
