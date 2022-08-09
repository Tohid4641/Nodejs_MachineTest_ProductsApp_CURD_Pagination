const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    p_id:{type:String, required: true},
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    category: {type: String, required: true, max: 100},
    cat_id:{type:String, required: true},
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);
