module.exports = class Notification {

    id;
    userId;
    message;
    isRead;
    createdAt;
   

    constructor({ 
        id,
        userId,
        message,
        isRead = false,
        createdAt,
        
    }) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.isRead = isRead;
        this.createdAt = createdAt;
       
    }
}
