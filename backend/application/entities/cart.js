module.exports = class Cart {

    id;
    customerId;
    productId;
    quantity;
   

    constructor({ 
        id,
        customerId,
        productId,
        quantity,
       
    }) {
        this.id = id;
        this.customerId = customerId;
        this.productId = productId;
        this.quantity = quantity;
      
    }
}
