import { productPriceUnits } from "../../config.js";

const createProductPayload = {
	type: "object",
	properties: {
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
	},
	required: ["name", "description", "image", "price"],
	additionalProperties: false,
};

export default createProductPayload;
