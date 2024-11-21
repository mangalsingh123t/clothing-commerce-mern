import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence"; //this plugin is used to autoincrement the id 

const AutoIncrement = mongooseSequence(mongoose);

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true // `unique` ensures that the ID is unique but not required initially
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
});

// Apply the AutoIncrement plugin to the schema
productSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Product = mongoose.model("Product", productSchema);
export default Product;
