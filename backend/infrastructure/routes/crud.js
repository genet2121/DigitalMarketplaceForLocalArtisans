const express = require("express");
const nodemailer = require("nodemailer");

const Controller = require("../../controller/controllers");
const AuthService = require("../service/authentication/auth");
const prisma = require("@prisma/client");
const operators = require("../../application/Interface/operators");
const getEntities = require("../../application/entities/getEntity");




module.exports = class Crud {

    dependencies;
    router;

    constructor(deps) {
        this.dependencies = deps;
        this.router = express.Router();
    }

    getRoute() {

        const controllers = new Controller(this.dependencies);

        this.router.post("/create", async (req, res, next) => {
            try {

                if (!req.body.tableName) {
                    throw this.dependencies.exceptionHandling.throwError("requestBody must contain tableName property", 400);
                }
                if (!req.body.data) {
                    throw this.dependencies.exceptionHandling.throwError("requestBody must contain data property", 400);
                }

                let { tableName, data } = req.body;
                let model = await prisma.Prisma.ModelName[tableName];

                if (!model) {
                    throw this.dependencies.exceptionHandling.throwError("table not found", 404);
                }
               

                let record = await controllers.getControllers()[tableName].create(req.User, data);

                if (record) {
                    return res.status(201).json({
                        message: " created successfully",
                        data: record
                    });
                }

            }
            catch (error) {
                console.log(error);
                if(error.statusCode){
                    return res.status(error.statusCode).json({ message: error.message })
                }else{
                    return res.status(500).json({ message: "Internal Server Error" })
                }
            }
        });

        this.router.get("/getform/:table/:id",   async (req, res, next) => {

            const { type } = req.query;

            try {
           
                if (!req.params.table) {
                    throw this.dependencies.exceptionHandling.throwError("requestParms must contain table property", 400);
                }
                if (!req.params.id) {
                    throw this.dependencies.exceptionHandling.throwError("requestParms must contain id property", 400);
                }

                let model = await prisma.Prisma.ModelName[req.params.table];
    
                if (!model) {
                    throw this.dependencies.exceptionHandling.throwError("table not found", 404);
                }

                let include = {};
                let whereQuery = {id: parseInt(req.params.id)};

                if (type) {

                    
                }

                if (model == "personal") {

                    if(req.user?.Roles.includes("company")) {
                        throw new Error("company cannot access personal lists!");
                    }

                    if(req.user?.Roles.includes("personal")) {
                        whereQuery.user_id = parseInt(req.user.Id)
                    }
                    
                }

                if (model == "company") {

                    if(req.user?.Roles.includes("personal")) {
                        throw new Error("personal users cannot access personal lists!");
                    }

                    if(req.user?.Roles.includes("company")) {
                        whereQuery.id = parseInt(req.user.companyId);
                    }

                }

                
           
                
                const record = await this.dependencies.databasePrisma[req.params.table].findUnique({
                    where: whereQuery,
                    include: include
                })

                if(!record){
                    throw this.dependencies.exceptionHandling.throwError("record not found", 404);
                }

                return res.status(200).json(record);
                
            }
            catch (error) {
                console.log(error);
                if(error.statusCode){
                    return res.status(error.statusCode).json({ message: error.message })
                }else{
                    return res.status(500).json({ message: "Internal Server Error" })
                }
            }
        });

        this.router.post("/getlist/:tableName/:PageNumber/:PageSize",   async (req, res, next) => {
            try {

                const { type } = req.query;
                
    
                let model = await prisma.Prisma.ModelName[req.params.tableName];

                if (!model) {
                    console.log("table not found");
                    throw this.dependencies.exceptionHandling.throwError("table not found", 404);
                }

                let modelConfiguration = model.charAt(0).toUpperCase() + model.slice(1) + "ScalarFieldEnum";
                let columns = await Object.keys(prisma.Prisma[modelConfiguration])
    
                let {PageNumber, PageSize} = req.params;

                Object.keys(req.body).forEach(key => {    
                     if (!columns.includes(key)) {
                       
                        console.log("column " + key + " not found in " + req.params.tableName + ". available columns are:- " + columns.join(", "));
                        throw this.dependencies.exceptionHandling.throwError("column '" + key + "' not found in " + req.params.tableName + ". available columns are:- " + columns.join(", "), 404);
                    }
                });
              
                let whereQuery = {};

                for (let key in req.body) {
                    switch (req.body[key].type) {
                        case "date":
                            switch (req.body[key].operator) {
                                case operators.GREATER:
                                    whereQuery[key] = { gt: req.body[key].value };
                                    break;
                                case operators.LESS:
                                    whereQuery[key] = { lt: req.body[key].value };
                                    break;
                                case operators.EQUAL:
                                    whereQuery[key] = req.body[key].value;
                                    break;
                                case operators.NOT:
                                    whereQuery[key] = { not: req.body[key].value };
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "number":
                            switch (req.body[key].operator) {
                                case operators.GREATER:
                                    whereQuery[key] = { gt: parseInt(req.body[key].value) };
                                    break;
                                case operators.LESS:
                                    whereQuery[key] = { lt: parseInt(req.body[key].value) };
                                    break;
                                case operators.EQUAL:
                                    whereQuery[key] = parseInt(req.body[key].value);
                                    break;
                                case operators.NOT:
                                    whereQuery[key] = { not: parseInt(req.body[key].value) };
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            switch (req.body[key].operator) {
                                case operators.EQUAL:
                                    whereQuery[key] = req.body[key].value;
                                    break;
                                case operators.CONTAINS:
                                    whereQuery[key] = { contains: req.body[key].value };
                                    break;
                                case operators.NOT:
                                    whereQuery[key] = { not: req.body[key].value };
                                    break;
                                default:
                                    break;
                            }
                            break;
                    }
                }


                let include = {}

                if (type) {
                    // if (model == "user") {
                    //     include.order = {
                    //         include: {
                    //             device: true
                    //         }
                    //     };
                    // }

                   

                }
                console.log('req.user.Roles++=', req.user);
                if (model == "user") {
                    if(req.user?.Roles.includes("user")) {
                        whereQuery.id = parseInt(req.user.Id);
                        // throw this.dependencies.exceptionHandling.throwError("user cannot access user lists!", 403);

                    }
                }
                if (model === "prayer_request") {
                    if (req.user?.Roles.includes("user")) {
                        throw this.dependencies.exceptionHandling.throwError(
                            "Users cannot access prayer_request lists!",
                            403
                        );
                    }
                }

                if (model == "personal") {

                    if(req.user?.Roles.includes("company")) {
                        throw new Error("company cannot access personal lists!");
                    }

                    if(req.user?.Roles.includes("personal")) {
                        whereQuery.user_id = parseInt(req.user.Id)
                    }
                    
                }
                
                if (model == "company") {

                    if(req.user?.Roles.includes("personal")) {
                        throw new Error("Personal users cannot access personal lists!");
                    }

                    if(req.user?.Roles.includes("company")) {
                        whereQuery.user_id = parseInt(req.user.Id)
                    }
                    
                }
                
              

                const totalCount = await this.dependencies.databasePrisma[req.params.tableName].findMany({
                    where: whereQuery,
                })
    

                const records = await this.dependencies.databasePrisma[req.params.tableName].findMany({
                    where: whereQuery,
                    include: include,
                    take: parseInt(req.params.PageSize),
                    skip: (parseInt(req.params.PageNumber) - 1) * parseInt(req.params.PageSize)
                })

                
                return res.status(200).json({
                    Items: records,
                    PageNumber: req.params.PageNumber,
                    TotalCount: totalCount.length,
                    PageSize: parseInt(req.params.PageSize)
                });
    
            } catch (error) {
            console.log(error);
                if(error.statusCode){
                    return res.status(error.statusCode).json({ message: error.message })
                }else{
                    return res.status(500).json({ message: "Internal Server Error" })
                }
            }
        });
        
       

        this.router.put("/update",  async (req, res, next) => {
            try {

                let { tableName, data } = req.body;
               
                // let required
                if (!tableName || !data) {
                    throw this.dependencies.exceptionHandling.throwError("table and data are required in the request body", 400);
                 }
               
                 let model = await prisma.Prisma.ModelName[tableName];
                
                console.log('model', model);

                if (!model) {
                    console.log("table not found");
                    throw this.dependencies.exceptionHandling.throwError("table not found", 404);
                }

                if(!data.id){
                    throw this.dependencies.exceptionHandling.throwError("request body must atleast have an Id", 400);
                }

                let record = null;

                // if(model == "user" || model == "donation" ){
                   
                    record = await controllers.getControllers()[tableName].update(req, data);
                // }else{
                //     let validated = await this.dependencies.routingValidator.validatOnUpdateRecord(model, data);
                //     if(validated){
                //         let foundRecord = await this.dependencies.databasePrisma[table].findFirst({
                //             where: {
                //                 id: data.id
                //             },
                //         });
                //         console.log('foundRecord', foundRecord);
                //         if(!foundRecord){
                //             console.log("Record to update not found.");
                //             throw this.dependencies.exceptionHandling.throwError("Record to update not found.", 404);
                      
                //         }

                        
                       
                //         let cleanData =  getEntities(tableName, data)
                        
                //         record = await this.dependencies.databasePrisma[model].update({
                //             where: {
                //                 id: parseInt(data.id)
                //             },
                //             data: cleanData,
                //         });
                //     }
                // }

             
                return res.status(200).json({

                    status: 200,
                    message: 'updated successfully',
                    data: record
                });

            }
            catch (error) {
                console.log(error);
                if(error.statusCode){
                    return res.status(error.statusCode).json({ message: error.message })
                }else{
                    return res.status(500).json({ message: "Internal Server Error" })
                }
            }
        });

        this.router.put("/changePassword", AuthService.authenticate, async (req, res, next) => {
            try {

                let { data } = req.body;
               
                if (!data) {
                    throw this.dependencies.exceptionHandling.throwError("requestBody must contain data object", 400);
                }

                if (!data.id) {
                   throw this.dependencies.exceptionHandling.throwError("data object must contain 'id' property", 400);
                }
                if (!data.oldPassword) {
                    throw this.dependencies.exceptionHandling.throwError("data object must contain 'oldPassword' property", 400);
                }
                if (!data.newPassword) {
                    throw this.dependencies.exceptionHandling.throwError("data object must contain 'newPassword' property", 400);
                }

                let record = await controllers.getControllers().user.changePassword(req.user, parseInt(data.id), data.oldPassword, data.newPassword);
                if (record) {
                    return res.status(200).json({
                        data: record
                    });
                }

            }
            catch (error) {
                console.log(error);
                if(error.statusCode){
                    return res.status(error.statusCode).json({ message: error.message })
                }else{
                    return res.status(500).json({ message: "Internal Server Error" })
                }
            }
        });


        this.router.delete("/delete", AuthService.authenticate, async (req, res, next) => {
            try {
                let { table, data } = req.body;
                   
                if(!data || !table){
                    console.log("request body must have a data and table properties");
                    throw this.dependencies.exceptionHandling.throwError("request body must have a data and table properties", 400);
                }

                if(!data.id){
                    console.log("data property on request body must atleast have an Id");
                    throw this.dependencies.exceptionHandling.throwError("request body must atleast have an Id", 400);
                }

                let model = await prisma.Prisma.ModelName[table];

                if (!model) {
                    console.log("table not found");
                    throw this.dependencies.exceptionHandling.throwError("table not found", 404);
                }

                let record = null;

                if(model == "user" ){
                    record = await controllers.getControllers()[table].delete(data.id);
                }else{
                    const recordFound = await this.dependencies.databasePrisma[table].findFirst({
                        where: { id: data.id }
                    });
                    if (!recordFound) {
                        throw this.dependencies.exceptionHandling.throwError(model + " with " + data.id + " id does not exist", 404);
                    }

                    record = await this.dependencies.databasePrisma[table].delete({
                        where: { id: data.id }
                    });

                }

                return res.status(200).json({
                    status: 200,
                    message: "record deleted succesfully",
                    data: record
                });

            }
            catch (error) {
                console.log(error);
                if(error.statusCode){
                    return res.status(error.statusCode).json({ message: error.message })
                }else{
                    return res.status(500).json({ message: "Internal Server Error" })
                }
            }
        });

        return this.router;

    }

    
}

