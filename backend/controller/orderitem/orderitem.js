const orderItemEntity = require("../../application/entities/orderitem");

module.exports = class OrderItemController {

    dependencies;

    constructor(deps) {
        this.dependencies = deps;
    }

    // Create a new order item
    async create(reqUser, data) {
        try {
            let validated = await this.dependencies.routingValidator.validateRecord("OrderItem", data);
            if (validated) {
                const orderItem = await this.dependencies.databasePrisma.OrderItem.create({
                    data: data
                });

                return orderItem;
            }
        }
        catch (error) {
            throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }
    }

    // Update an existing order item
    async update(reqUser, input) {
        try {
            let validated = await this.dependencies.routingValidator.validatOnUpdateRecord("OrderItem", input);

            if (validated) {
                const foundOrderItem = await this.dependencies.databasePrisma.OrderItem.findFirst({
                    where: {
                        id: input.id
                    }
                });

                if (!input.id) {
                    throw this.dependencies.exceptionHandling.throwError("Request body must at least have an Id", 400);
                }

                if (foundOrderItem) {
                    const orderItemData = new orderItemEntity(input);

                    return await this.dependencies.databasePrisma.OrderItem.update({
                        where: {
                            id: input.id
                        },
                        data: orderItemData,
                    });
                } else {
                    throw this.dependencies.exceptionHandling.throwError("OrderItem record not found.", 404);
                }
            }
        } catch (error) {
            console.log(error);
            throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }
    }

    // Delete an order item
    async delete(id) {
        try {
            const orderItemData = await this.dependencies.databasePrisma.OrderItem.findFirst({
                where: { id: id }
            });

            if (!orderItemData) {
                throw this.dependencies.exceptionHandling.throwError("OrderItem with ID " + id + " does not exist", 404);
            }

            const orderItem = await this.dependencies.databasePrisma.OrderItem.delete({
                where: { id: id }
            });

            return orderItem;
        }
        catch (error) {
            throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }
    }
}
