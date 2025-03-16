module.exports = class Choice {

    id;
    category;
    value;

    constructor({ 
        id,
        category,
        value
    }) {
        this.id = id;
        this.category = category;
        this.value = value;
    }
}
