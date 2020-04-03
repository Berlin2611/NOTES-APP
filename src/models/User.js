const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcryp = require('bcryptjs');
const UserSchema = new Schema({
    name: {type: 'String', required: true},
    email: {type: 'String', required: true},
    password: {type: 'String', required: true},
    date: {type: Date, default: Date.now}
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcryp.genSalt(10);
    const hash = bcryp.hash(password, salt);
    return hash;
};

UserSchema.methods.matchPassword = async function (password){
    return await bcryp.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);