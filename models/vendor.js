const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const vendorSchema = new schema({


    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    firmId:[{
        type: schema.Types.ObjectId,
        ref:'firms'
    }]

}, { timestamps: true })


vendorSchema.methods.isPasswordMatched =  async function (enterPassword){
     return await bcrypt.compare(enterPassword, this.password)
}

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;