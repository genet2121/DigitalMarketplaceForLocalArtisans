module.exports = class User {

    id;
    fullName;
    email;
    password;
    role;
    phone;
    address;
    createdAt;
  

    constructor({ 
        id,
        fullName,
        email,
        password,
        role,
        phone,
        address,
        createdAt,
       
    }) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.phone = phone;
        this.address = address;
        this.createdAt = createdAt;
     
    }
}
