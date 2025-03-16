const UserEntity = require("./user");
const AttachmentEntity = require("./attachment");
const ProductEntity = require("./product");
const ChoiceEntity = require("./choice");
const OrderEntity = require("./order");
const OrderItemEntity = require("./orderitem");
const CartEntity = require("./cart");
const NotificationEntity = require("./notification");

module.exports = (name, data) => {
    try {
        if (name == "User") {
            const userData = new UserEntity(data);
            return userData;
        }
        if (name == "Attachment") {
            const attachmentData = new AttachmentEntity(data);
            return attachmentData;
        }
        if (name == "Product") {
            const productData = new ProductEntity(data);
            return productData;
        }
        if (name == "Choice") {
            const choiceData = new ChoiceEntity(data);
            return choiceData;
        }
        if (name == "Order") {
            const orderData = new OrderEntity(data);
            return orderData;
        }
        if (name == "OrderItem") {
            const orderItemData = new OrderItemEntity(data);
            return orderItemData;
        }
        if (name == "Cart") {
            const cartData = new CartEntity(data);
            return cartData;
        }
        if (name == "Notification") {
            const notificationData = new NotificationEntity(data);
            return notificationData;
        }
    } catch (error) {
        console.log(error);
        throw new Error(error.message, 500);
    }
};
