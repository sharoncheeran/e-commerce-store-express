import express from "express";
const router = express.Router();

// Middleware Imports
import { check } from "./../common/middlewares/IsAuthenticatedMiddleware.js";
import { verify } from "../common/middlewares/SchemaValidationMiddleware.js";
import { has } from "../common/middlewares/CheckPermissionMiddleware.js";

// Controller Imports
import {
	getUser,
	updateUser,
	getAllUsers,
	changeRole,
	deleteUser,
} from "./controllers/UserController.js";

// JSON Schema Imports for payload verification
import updateUserPayload from "./schemas/updateUserPayload.js";
import changeRolePayload from "./schemas/changeRolePayload.js";

import { roles } from "../config.js";

router.get("/", [check], getUser);

router.patch("/", [check, verify(updateUserPayload)], updateUser);

router.get("/all", [check, has(roles.ADMIN)], getAllUsers);

router.patch(
	"/change-role/:userId",
	[check, has(roles.ADMIN), verify(changeRolePayload)],
	changeRole
);

router.delete("/:userId", [check, has(roles.ADMIN)], deleteUser);

export default router;
