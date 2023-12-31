const mongoose = require('mongoose'); 
const {Schema} = mongoose;

//here i have defined the database schema properties
const UserSchema =  new Schema({
    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    }
})

//exporting the model as user
const User = mongoose.model('user', UserSchema);
User.createIndexes()
module.exports = User