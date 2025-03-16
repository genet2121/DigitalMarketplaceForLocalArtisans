
const ChoiceEntity = require("../../application/entities/choice");


module.exports = class Choice {

    dependencies;

    constructor(deps) {
        this.dependencies = deps;
    }



    

    

    async create(reqUser, data) {
        try {

            let validated = await this.dependencies.routingValidator.validateRecord("Choice", data);
            if (validated) {
            
                const Choice = await this.dependencies.databasePrisma.Choice.create({
                    data: data
                })
                
          
                return Choice;
            }
            

        }
        catch (error) {
           throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }
    }

    async update(reqUser, input) {

        try {

            let validated = await this.dependencies.routingValidator.validatOnUpdateRecord("Choice", input);

            if (validated) {
                
                const foundLookup = await this.dependencies.databasePrisma.Choice.findFirst({
                    where: {
                        id: input.id
                    }
                });

                if(!input.id){
                    throw this.dependencies.exceptionHandling.throwError("request body must atleast have an Id", 400);
                }
                if(foundLookup){

                    const ChoiceData = new ChoiceEntity(input);
                       
                    return await this.dependencies.databasePrisma.Choice.update({
                        where: {
                            id: input.id
                        },
                        data: ChoiceData,
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

            const userAttachment = await this.dependencies.databasePrisma.Choice.findFirst({
                where: { id: id }
            });
            if (!userAttachment) {
                throw this.dependencies.exceptionHandling.throwError("lookup with " + id + " id does not exist", 404);
            }
            const attachment = await this.dependencies.databasePrisma.Choice.delete({
                where: { id: id }
            });

            return attachment;
        }
        catch (error) {
            throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }

    }


}