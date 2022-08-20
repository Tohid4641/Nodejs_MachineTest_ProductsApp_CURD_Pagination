const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    category: {type: String, required: true, max: 100},
    cat_id:{type:String, required: true},
});


// Export the model
module.exports = mongoose.model('Category', CategorySchema);
