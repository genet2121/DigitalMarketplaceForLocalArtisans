module.exports = class Product {

    id;
    artisanId;
    attachmentId;
    name;
    description;
    price;
    stock;
    category;
    createdAt;
  

    constructor({ 
        id,
        artisanId,
        attachmentId,
        name,
        description,
        price,
        stock,
        category,
        createdAt,
       
    }) {
        this.id = id;
        this.artisanId = artisanId;
        this.attachmentId = attachmentId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.createdAt = createdAt;
      
    }
}
