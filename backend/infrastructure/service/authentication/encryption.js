

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = class Encryption {
     
    constructor(){

    }

    async hash(password){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    async compare(password, hashedPassword){
        try{
console.log('password ', password);
console.log('hashedPassword ', hashedPassword);
           const userHash = await bcrypt.compare(password, hashedPassword);
           console.log('userHash ', userHash);
           if(userHash){
               return true;
           }     
           if(!userHash){
               return false;
           }
       }catch(error){
        console.log(error);
       }

    }


}