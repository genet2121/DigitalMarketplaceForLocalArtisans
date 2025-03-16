

const productEntity = require("../../application/entities/product");


module.exports = class ProductController {

    dependencies;

    constructor(deps) {
        this.dependencies = deps;
    }



    

    

    async create(reqUser, data) {
        try {

            let validated = await this.dependencies.routingValidator.validateRecord("Product", data);
            if (validated) {
            
                const product = await this.dependencies.databasePrisma.Product.create({
                    data: data
                })
                
          
                return product;
            }
            

        }
        catch (error) {
           throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }
    }

    async update(reqUser, input) {

        try {

            let validated = await this.dependencies.routingValidator.validatOnUpdateRecord("Product", input);

            if (validated) {
                
                const foundProductRequest = await this.dependencies.databasePrisma.Product.findFirst({
                    where: {
                        id: input.id
                    }
                });

                if(!input.id){
                    throw this.dependencies.exceptionHandling.throwError("request body must atleast have an Id", 400);
                }
                if(foundProductRequest){
                    const productData = new productEntity(input);
                       
                    return await this.dependencies.databasePrisma.Product.update({
                        where: {
                            id: input.id
                        },
                        data: productData,
                    });
                  
                }else{
                    throw this.dependencies.exceptionHandling.throwError("record not found.", 404);
                }

               
            }


        } catch (error) {
            console.log(error);
            throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }
    }
    

    async delete(id) {

        try {

            const productData = await this.dependencies.databasePrisma.Product.findFirst({
                where: { id: id }
            });
            if (!productData) {
                throw this.dependencies.exceptionHandling.throwError("Product with " + id + " id does not exist", 404);
            }
            const product = await this.dependencies.databasePrisma.Product.delete({
                where: { id: id }
            });

            return product;
        }
        catch (error) {
            throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }

    }


}