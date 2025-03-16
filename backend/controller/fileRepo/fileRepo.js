
const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require('uuid');

module.exports = class attachmentController {

    dependencies;

    constructor(deps) {
        this.dependencies = deps;
    }

    async handleFileUpload(dependencies, table, file) {
        try {
      console.log('file', file);
            if (!file.originalFilename) {
                throw this.dependencies.exceptionHandling.throwError("File Name not found", 400);
            }

            const fileNameArray = file.originalFilename?.split(".");

            if (fileNameArray?.length < 2) {
                throw this.dependencies.exceptionHandling.throwError("Could not extract file extension!", 400);
            }

            let directory = dependencies.attachmentDirectory;

            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory);
            }

            const extension = file.originalFilename.split(".").pop();

            let current_date_time = new Date().getTime();
            let customFileName = `${table}_${current_date_time}.${extension}`;
            let validated = await this.dependencies.routingValidator.validateRecord("attachment", {  table, file_name: customFileName, extension  });
            
            if (validated) {
                const attachment = await dependencies.databasePrisma.attachment.create({
                    data: {
                        // name: name,
                        table: table,
                        // page_name: page_name,
                        // category: record,
                        file_name: customFileName,
                        extension: extension
                    }
                });

                const filePath = path.join(directory, customFileName);
                // fs.renameSync(file.filepath, "/var/www/nuwa_uploads/"+customFileName);
                fs.renameSync(file.filepath, filePath);

                // fs.copyFileSync(file.filepath, filePath, fs.constants.COPYFILE_FICLONE_FORCE);

                return attachment;
            }

        } catch (error) {
            console.log(error);
            throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }

    }
   
    
    




}