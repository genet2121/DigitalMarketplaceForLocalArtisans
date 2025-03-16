



module.exports = class AuthController {

    dependencies;

    constructor(deps){
        this.dependencies = deps;
    }


    async login({ phoneOrEmail, password, isEmail, isPhone }){
        try {
             
            // let user = await this.dependencies.databasePrisma.user.findFirst({
            //     where: {
            //         phone: phone
            //     }
            // })
        let user;

         if (isEmail) {
            user = await this.dependencies.databasePrisma.User.findFirst({
                where: { email: phoneOrEmail }
            });
            console.log('user ', user);
            console.log('password ', password);
        } else if (isPhone) {
            user = await this.dependencies.databasePrisma.User.findFirst({
                where: { phone: phoneOrEmail }
            });
        } else {
            throw this.dependencies.exceptionHandling.throwError("phoneOrEmail must be a valid phone number or email", 400);
        }
            if (!user) {
                throw this.dependencies.exceptionHandling.throwError("User not found", 404);
            }
            
            const verifyPassword = await this.dependencies.encryption.compare(password, user.password);
            console.log('verifyPassword ', verifyPassword);

            if (!verifyPassword) {
                throw this.dependencies.exceptionHandling.throwError("Incorrect password", 401);
            } else {

                let role = [user.role]
                const payload = { FullName: user.fullName, Email: user.email, Id: user.id, Roles: role, Phone: user.phone, Address: user.address };
    
                const token = this.dependencies.tokenGenerator.generate(payload, this.dependencies.appSecretKey);
                return {
                    Token: token,
                    ...payload
                }

            }

        }
        catch (error) {
            console.log(error);
            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError(error.message, 500);
            }  }

    }

    async logOut() {

    }
    
   
    async authenticate(req, res, next){
             try {

                const token = req.headers.authorization.split(" ")[1];
                const user = await getDep().tokenGenerator.verify(token, this.dependencies.appSecretKey);/* as JwtPayload*/;
                req.user = user;
            }
            catch (error) {  
                console.log(error);
                if(error.statusCode){
                    throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
                }else{
                    throw this.dependencies.exceptionHandling.throwError(error.message, 500);
                }   }
    
            next();
    }




}
