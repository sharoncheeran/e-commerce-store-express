import { DataTypes, Sequelize } from "sequelize";
import { roles } from "../../config.js";

const UserModel = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	age: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: roles.USER,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
};

export class initialise {
	constructor(sequelize) {
		this.model = sequelize.define("user", UserModel);
	}
}
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./storage/data.db", // Path to the file that will store the SQLite DB.
});
const userInstance = new initialise(sequelize);

export function createUser(user) {
	return userInstance.model.create(user); // Use the instance to call create
}

export function findUser(query) {
	return userInstance.model.findOne({
		where: query,
	});
}

export function updateUser(query, updatedValue) {
	return userInstance.model.update(updatedValue, {
		where: query,
	});
}

export function findAllUsers(query) {
	return userInstance.model.findAll({
		where: query,
	});
}

export function deleteUser(query) {
	return userInstance.model.destroy({
		where: query,
	});
}

export default {
	initialise,
	createUser,
	findUser,
	updateUser,
	findAllUsers,
	deleteUser,
};
