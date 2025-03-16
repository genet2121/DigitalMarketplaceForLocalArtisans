

const cartItemEntity = require("../../application/entities/cart");

module.exports = class CartController {

    dependencies;

    constructor(deps) {
        this.dependencies = deps;
    }

    // Add an item to the cart
    async create(reqUser, data) {
        try {
            let validated = await this.dependencies.routingValidator.validateRecord("Cart", data);
            if (validated) {
                const cartItem = await this.dependencies.databasePrisma.Cart.create({
                    data: data
                });

                return cartItem;
            }
        }
        catch (error) {
            throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }
    }

    // Update an existing cart item
    async update(reqUser, input) {
        try {
            let validated = await this.dependencies.routingValidator.validatOnUpdateRecord("Cart", input);

            if (validated) {
                const foundCartItem = await this.dependencies.databasePrisma.Cart.findFirst({
                    where: {
                        id: input.id
                    }
                });

                if (!input.id) {
                    throw this.dependencies.exceptionHandling.throwError("Request body must at least have an Id", 400);
                }

                if (foundCartItem) {
                    const cartItemData = new cartItemEntity(input);

                    return await this.dependencies.databasePrisma.Cart.update({
                        where: {
                            id: input.id
                        },
                        data: cartItemData,
                    });
                } else {
                    throw this.dependencies.exceptionHandling.throwError("CartItem record not found.", 404);
                }
            }
        } catch (error) {
            console.log(error);
            throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }
    }

    // Remove an item from the cart
    async delete(id) {
        try {
            const cartItemData = await this.dependencies.databasePrisma.Cart.findFirst({
                where: { id: id }
            });

            if (!cartItemData) {
                throw this.dependencies.exceptionHandling.throwError("CartItem with ID " + id + " does not exist", 404);
            }

            const cartItem = await this.dependencies.databasePrisma.Cart.delete({
                where: { id: id }
            });

            return cartItem;
        }
        catch (error) {
            throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }
    }
}