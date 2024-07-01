import { DataTypes, Sequelize } from "sequelize";
import { productPriceUnits } from "../../config.js";

const ProductModelDefinition = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	priceUnit: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: productPriceUnits.DOLLAR,
	},
};

export class initialise {
	constructor(sequelize) {
		this.model = sequelize.define("product", ProductModelDefinition);
	}
}
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./storage/data.db", // Path to the file that will store the SQLite DB.
});
const userInstance = new initialise(sequelize);
export function createProduct(user) {
	return userInstance.model.create(user);
}
export function findProduct(query) {
	return userInstance.model.findOne({
		where: query,
	});
}
export function updateProduct(query, updatedValue) {
	return userInstance.model.update(updatedValue, {
		where: query,
	});
}
export function findAllProducts(query) {
	return userInstance.model.findAll({
		where: query,
	});
}
export function deleteProduct(query) {
	return userInstance.model.destroy({
		where: query,
	});
}
export default {
	initialise,
	createProduct,
	findProduct,
	updateProduct,
	findAllProducts,
	deleteProduct,
};
