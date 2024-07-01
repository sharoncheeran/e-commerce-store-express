import express from "express";
const router = express.Router();

// Controller Imports
import {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} from "./controllers/ProductController.js";

// Middleware Imports
import { check } from "./../common/middlewares/IsAuthenticatedMiddleware.js";
import { verify } from "../common/middlewares/SchemaValidationMiddleware.js";
import { has } from "../common/middlewares/CheckPermissionMiddleware.js";

// JSON Schema Imports for payload verification
import createProductPayload from "./schemas/createProductPayload.js";
import updateProductPayload from "./schemas/updateProductPayload.js";
import { roles } from "../config.js";

router.get("/", [check], getAllProducts);

router.get("/:productId", [check], getProductById);

router.post(
	"/",
	[check, has(roles.ADMIN), verify(createProductPayload)],
	createProduct
);

router.patch(
	"/:productId",
	[check, has(roles.ADMIN), verify(updateProductPayload)],
	updateProduct
);

router.delete("/:productId", [check, has(roles.ADMIN)], deleteProduct);

export default router;
