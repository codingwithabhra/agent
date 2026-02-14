const mongoose = require("mongoose");

const saleAgentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
},
{
    timestamps: true,
});

const saleAgent = mongoose.model("saleAgent", saleAgentSchema);

module.exports = saleAgent;