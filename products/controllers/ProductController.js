import {
	findAllProducts,
	findProduct,
	createProduct as _createProduct,
	updateProduct as _updateProduct,
	deleteProduct as _deleteProduct,
} from "../../common/models/Product.js";

export function getAllProducts(req, res) {
	const { query: filters } = req;

	findAllProducts(filters)
		.then((products) => {
			return res.status(200).json({
				status: true,
				data: products,
			});
		})
		.catch((err) => {
			return res.status(500).json({
				status: false,
				error: err,
			});
		});
}
export function getProductById(req, res) {
	const {
		params: { productId },
	} = req;

	findProduct({ id: productId })
		.then((product) => {
			return res.status(200).json({
				status: true,
				data: product.toJSON(),
			});
		})
		.catch((err) => {
			return res.status(500).json({
				status: false,
				error: err,
			});
		});
}
export function createProduct(req, res) {
	const { body } = req;

	_createProduct(body)
		.then((product) => {
			return res.status(200).json({
				status: true,
				data: product.toJSON(),
			});
		})
		.catch((err) => {
			return res.status(500).json({
				status: false,
				error: err,
			});
		});
}
export function updateProduct(req, res) {
	const {
		params: { productId },
		body: payload,
	} = req;

	// IF the payload does not have any keys,
	// THEN we can return an error, as nothing can be updated
	if (!Object.keys(payload).length) {
		return res.status(400).json({
			status: false,
			error: {
				message: "Body is empty, hence can not update the product.",
			},
		});
	}

	_updateProduct({ id: productId }, payload)
		.then(() => {
			return findProduct({ id: productId });
		})
		.then((product) => {
			return res.status(200).json({
				status: true,
				data: product.toJSON(),
			});
		})
		.catch((err) => {
			return res.status(500).json({
				status: false,
				error: err,
			});
		});
}
export function deleteProduct(req, res) {
	const {
		params: { productId },
	} = req;

	_deleteProduct({ id: productId })
		.then((numberOfEntriesDeleted) => {
			return res.status(200).json({
				status: true,
				data: {
					numberOfProductsDeleted: numberOfEntriesDeleted,
				},
			});
		})
		.catch((err) => {
			return res.status(500).json({
				status: false,
				error: err,
			});
		});
}
