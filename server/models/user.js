const mongoose = require('mongoose');


const Schema = mongoose.Schema;





const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: false },
  role: { type: String, default: 'user' },
  tel: { type: String, required: false },
  address: { type: String, required: false },
  postalcode: { type: String, required: false },
  nationality: { type: String, default: 'tunisia'}

},
  {
    timestamps: true,
  }

);
/*crete user if not exist*/
module.exports = mongoose.model("User", UserSchema);