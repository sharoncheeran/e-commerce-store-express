import Express from "express";
import cors from "cors";
import morgan from "morgan";
import { Sequelize } from "sequelize";

import { port } from "./config.js";
import AuthorizationRoutes from "./authorization/routes.js";
import UserRoutes from "./users/routes.js";
import ProductRoutes from "./products/routes.js";
import UserModel from "./common/models/User.js";
import ProductModel from "./common/models/Product.js";

const app = Express();
app.use(morgan("tiny"));
app.use(cors());

// Middleware that parses the body payloads as JSON to be consumed next set
// of middlewares and controllers.
app.use(Express.json());

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./storage/data.db", // Path to the file that will store the SQLite DB.
});

// Initialising the Model on sequelize
const test = new UserModel.initialise(sequelize);
const test2 = new ProductModel.initialise(sequelize);

// Syncing the models that are defined on sequelize with the tables that alredy exists
// in the database. It creates models as tables that do not exist in the DB.
sequelize
	.sync()
	.then(() => {
		console.log("Sequelize Initialised!!");

		// Attaching the Authentication and User Routes to the app.
		app.use("/", AuthorizationRoutes);
		app.use("/user", UserRoutes);
		app.use("/product", ProductRoutes);

		app.listen(port, () => {
			console.log("Server Listening on PORT:", port);
		});
	})
	.catch((err) => {
		console.error("Sequelize Initialisation threw an error:", err);
	});
