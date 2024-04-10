const mongoose = require('mongoose');
const schema = mongoose.Schema;


const firmSchema = new schema({

    firmName: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    category: {
        type: [{
            type: String,
            enum: ['veg', 'non-veg']
        }]
    },
    region: {

        type: [{
            type: String,
            enum: ['south-indian', 'north-indian', 'chinese', 'bakery']
        }]
    },
    image: {
        type: String
    },
    offer: {
        type: String
    },
    vendorId: [
        {
            type: schema.Types.ObjectId,
            ref: 'Vendor'
        }
    ],
    productId:[
        {
            type: schema.Types.ObjectId,
            ref:'Products'
        }
    ]

}, { timestamps: true })

const firms = mongoose.model('firms', firmSchema);
module.exports = firms;