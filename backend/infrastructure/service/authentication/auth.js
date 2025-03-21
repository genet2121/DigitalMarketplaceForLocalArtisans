
const ProjectDependencies = require("../../../configuration/dependencies");

const dependencies = new ProjectDependencies();
const {port} = dependencies.getDependencies()


const deps = dependencies.getDependencies();
   
module.exports = {

    invalidatedTokens : new Set(),
    
    async authenticate(req, res, next){
        try {
            if (req.params?.tableName === "event" || req.params?.tableName === "email_subscription") {
                return next(); 
            }
                
            if(!req.headers.authorization){
                throw deps.exceptionHandling.throwError("Unauthorized! token not found man", 401);
            }else{
                const token = req.headers.authorization.split(" ")[1];
                console.log('Received token:', token);

                const user = await deps.tokenGenerator.verify(token, deps.appSecretKey);/* as JwtPayload*/;
                req.user = user; 
                console.log('usertoken', user);
                next();
            }
        } catch (error) {
            if(error.statusCode) {
                return res.status(error.statusCode).json({ message: error.message })
            }else{
                return res.status(500).json({ message: "Internal Server Error" })
            }
        }
    },
    
    



}

