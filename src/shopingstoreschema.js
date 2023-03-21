const mongoose = require("mongoose");
const shopingStoreSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true

    },
    price: {
        type: Number,
        required: true,

    },
    quantity: {
        type: String,
        required: true

    },
    amount: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("shopingItems", shopingStoreSchema)