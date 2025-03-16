module.exports = class Order {

    id;
    customerId;
    totalAmount;
    status;
    createdAt;
    updatedAt;
  

    constructor({ 
        id,
        customerId,
        totalAmount,
        status,
        createdAt,
        updatedAt,
       
    }) {
        this.id = id;
        this.customerId = customerId;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
     
    }
}
