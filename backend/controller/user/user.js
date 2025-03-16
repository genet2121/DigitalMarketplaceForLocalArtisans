

const UserEntity = require("../../application/entities/user");


module.exports = class UserController {

    dependencies;

    constructor(deps) {
        this.dependencies = deps;
    }


    async getUser(id) {
        try {

            const user = await this.dependencies.databasePrisma.User.findUnique({
                where: {
                    id:  Number(id)
                }
            })

            if (!user) {
                throw new this.dependencies.exceptionHandling.throwError("No user exist with the given id", 404);
            }
            return user;
        }
        catch (error) {
            console.log(error);
            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError("Internal Server Error", 500);
            }  }
    }
    async create(reqUser, data) {
        try {
           
            
          
            let validated = await this.dependencies.routingValidator.validateRecord("User", data);
            if (validated) {
                let password = data.password; 
    
                
                data.password = await this.dependencies.encryption.hash(password);
    
              
                const userData = new UserEntity(data);
    
               
                let user = await this.dependencies.databasePrisma.User.create({
                    data: userData
                });
    
               
                user.password = password;
                return user;
            }
        } catch (error) {
            console.log(error);
            if (error.statusCode) {
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            } else {
                throw this.dependencies.exceptionHandling.throwError("Internal Server Error", 500);
            }
        }
    }
    

    async update(reqUser, input) {

        try {

            console.log({reqUser});

            let validated = await this.dependencies.routingValidator.validatOnUpdateRecord("User", input);

            if (validated) {
                
                const foundUser = await this.dependencies.databasePrisma.User.findFirst({
                    where: {
                        id: input.id
                    }
                });
             

                if(foundUser){
                    const userData = new UserEntity(input);
                       
                    return await this.dependencies.databasePrisma.User.update({
                        where: {
                            id: input.id
                        },
                        data: userData,
                    });
                   
                }else{
                    throw this.dependencies.exceptionHandling.throwError("record not found.", 404);
                }

               
            }


        } catch (error) {
            console.log(error);
            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError("Internal Server Error", 500);
            } }
    }



    async changePassword(reqUser, id, oldPassword, newPassword) {
        try {
            
            let user = await this.getUser(id);
            
            if (!user) {
                throw this.dependencies.exceptionHandling.throwError("User Not Found", 404);
            }  
            if(reqUser.Roles.includes("admin") || reqUser.Roles.includes("user") || user.id == reqUser.Id  ){
               
                if (!await this.dependencies.encryption.compare(oldPassword, user.password)) {
                    throw this.dependencies.exceptionHandling.throwError("Incorrect old password", 401);    
                }else{

                    user.password = await this.dependencies.encryption.hash(newPassword)
        
                    return await this.dependencies.databasePrisma.User.update({
                        where: {
                            id: id
                        },
                        data: {
                            password: user.password
                        },
                    });

                }
    

            }else{
                throw this.dependencies.exceptionHandling.throwError("Unauthorized Access! Only the admin and the user owning the record can change a password.", 401);    
            }

        }
        catch (error) {
            console.log(error);

            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError('Internal Server Error', 500);
            } }

    }
    

    async delete(id) {

        try {

            const userFound = await this.dependencies.databasePrisma.User.findFirst({
                where: { id: id }
            });
            if (!userFound) {
                throw this.dependencies.exceptionHandling.throwError("user with " + id + " id does not exist", 404);
            }
            const user = await this.dependencies.databasePrisma.User.delete({
                where: { id: id }
            });

            return user;
        }
        catch (error) {
            console.log(error);

            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError("Internal Server Error", 500);
            }  }

    }


}