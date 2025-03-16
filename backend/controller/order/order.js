const orderEntity = require("../../application/entities/order");

module.exports = class OrderController {

    dependencies;

    constructor(deps) {
        this.dependencies = deps;
    }

    // Create a new order
    async create(reqUser, data) {
        try {
            let validated = await this.dependencies.routingValidator.validateRecord("Order", data);
            if (validated) {
                const order = await this.dependencies.databasePrisma.Order.create({
                    data: data
                });

                return order;
            }
        }
        catch (error) {
            throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }
    }

    // Update an existing order
    async update(reqUser, input) {
        try {
            let validated = await this.dependencies.routingValidator.validatOnUpdateRecord("Order", input);

            if (validated) {
                const foundOrder = await this.dependencies.databasePrisma.Order.findFirst({
                    where: {
                        id: input.id
                    }
                });

                if (!input.id) {
                    throw this.dependencies.exceptionHandling.throwError("Request body must at least have an Id", 400);
                }

                if (foundOrder) {
                    const orderData = new orderEntity(input);

                    return await this.dependencies.databasePrisma.Order.update({
                        where: {
                            id: input.id
                        },
                        data: orderData,
                    });
                } else {
                    throw this.dependencies.exceptionHandling.throwError("Order record not found.", 404);
                }
            }
        } catch (error) {
            console.log(error);
            throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }
    }

    // Delete an order
    async delete(id) {
        try {
            const orderData = await this.dependencies.databasePrisma.Order.findFirst({
                where: { id: id }
            });

            if (!orderData) {
                throw this.dependencies.exceptionHandling.throwError("Order with ID " + id + " does not exist", 404);
            }

            const order = await this.dependencies.databasePrisma.Order.delete({
                where: { id: id }
            });

            return order;
        }
        catch (error) {
            throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }
    }
}