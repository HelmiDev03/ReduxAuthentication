const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OtpPasswordSchema = new Schema({
    otp: { type: String, required: true , unique: true},
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now  , expires: 3600},
    
    });

const OtpPaassword = mongoose.model('OtpPaassword', OTPSchema);
module.exports = OtpPaassword;
    