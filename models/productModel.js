const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({


    productName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    bestSeller: {
        type: String
    },
    category: {
        type: [{
            type: String,
            enum: ['veg', 'non-veg']

        }]
    },
    description:{
        type: String,
        required: true
    },
    firmId:[{
        type:mongoose.Types.ObjectId,
        ref:'firms'
    }],
    active: {
        type:Boolean,
        default: true
    }

})
const Products = mongoose.model('Products', productSchema);
module.exports = Products;