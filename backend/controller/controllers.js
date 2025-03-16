


const AuthController = require("./auth/auth");
const UserController = require("./user/user");
const AttchmentController = require("./attachment/attachment");
const cartController = require("./cart/cart");
const orderController = require("./order/order");
const OrderItemController = require("./orderitem/orderitem");
const ProductController = require("./product/product");
const ChoiceController = require("./choice/choice");
const notificationController = require("./notification/notification");


module.exports = class Controller{

    dependencies;
    
    constructor(deps){
        this.dependencies = deps;
    };

    

    getControllers(){
        try{
            return {
                User: new UserController(this.dependencies),
                auth: new AuthController(this.dependencies),
                attachment: new AttchmentController(this.dependencies),
                Cart: new cartController(this.dependencies),
                Order: new orderController(this.dependencies),
                OrderItem: new OrderItemController(this.dependencies),
                Product: new ProductController(this.dependencies),
                Choice: new ChoiceController(this.dependencies),
                Notification: new notificationController(this.dependencies),
              

            };

        }catch(error){
            console.log(error);
        }
    }

};
