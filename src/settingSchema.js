const mongoose = require("mongoose");
const settingSchema = new mongoose.Schema({
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

    }
})

module.exports = mongoose.model("setting", settingSchema)