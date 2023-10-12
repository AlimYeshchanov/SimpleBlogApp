const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 4,
    },
    desc: {
        type: String,
        required: true,
        min: 12,
    },
    photo: {
       type: String,
       required: true, 
    },
}, {timestamps: true})

module.exports = mongoose.model("Blog", blogSchema);