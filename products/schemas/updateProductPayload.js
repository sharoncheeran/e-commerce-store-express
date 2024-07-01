import { productPriceUnits } from "../../config.js";

export const type = "object";
export const properties = {
	name: {
		type: "string",
	},
	description: {
		type: "string",
	},
	image: {
		type: "string",
	},
	price: {
		type: "number",
	},
	priceUnit: {
		type: "string",
		enum: Object.values(productPriceUnits),
	},
};
export const additionalProperties = false;

export default {
	type,
	properties,
	additionalProperties,
};
