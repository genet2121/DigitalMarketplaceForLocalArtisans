

const NotificationEntity = require("../../application/entities/notification");

module.exports = class notificationController {

    dependencies;

    constructor(deps) {
        this.dependencies = deps;
    }



    

    

    async create(reqUser, data) {
        try {

            let validated = await this.dependencies.routingValidator.validateRecord("Notification", data);
            if (validated) {
            
                const notification = await this.dependencies.databasePrisma.Notification.create({
                    // data: data
                    data: data
                
                })
                
          
                return notification;
            }
            

        }
        catch (error) {
           throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }
    }

    async update(reqUser, input) {

        try {

            let validated = await this.dependencies.routingValidator.validatOnUpdateRecord("Notification", input);

            if (validated) {
                
                const foundNotificationDetail = await this.dependencies.databasePrisma.Notification.findFirst({
                    where: {
                        id: input.id
                    }
                });

                if(!input.id){
                    throw this.dependencies.exceptionHandling.throwError("request body must atleast have an Id", 400);
                }
                if(foundNotificationDetail){
                    const notificationData = new NotificationEntity(input);
                    return await this.dependencies.databasePrisma.Notification.update({
                        where: {
                            id: input.id
                        },
                        data: notificationData,
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

            const NotificationDetail = await this.dependencies.databasePrisma.Notification.findFirst({
                where: { id: id }
            });
            if (!NotificationDetail) {
                throw this.dependencies.exceptionHandling.throwError("Notification with " + id + " id does not exist", 404);
            }
            const notification = await this.dependencies.databasePrisma.Notification.delete({
                where: { id: id }
            });

            return notification;
        }
        catch (error) {
            throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }

    }


}