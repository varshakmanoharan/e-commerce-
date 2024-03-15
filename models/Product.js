const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
    {
        Productname: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        category: { type:Array,required:true,trim: true},
        size:{type:String},
        color:{type:String},
        price:{type:Number,required: true },
    },
    {
        timestamps: true
    }
);
// mongoose.exports = mongoose.model("Product",ProductSchema)
const Product = mongoose.model('Product',ProductSchema);
module.exports = Product;