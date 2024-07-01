import { roles } from "../../config.js";

export const type = "object";
export const properties = {
	role: {
		type: "string",
		enum: Object.values(roles),
	},
};
export const additionalProperties = false;

export default {
	type,
	properties,
	additionalProperties,
};
