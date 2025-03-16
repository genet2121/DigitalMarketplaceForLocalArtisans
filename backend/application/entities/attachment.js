

module.exports = class Attachment {

  
    table;
    file_name;
    extension;
   

    constructor({ 
       
        table,
        file_name,
        extension,
     
    }) {

       
        this.table = table;
        this.file_name = file_name;
        this.extension = extension;
      
    }


}
