const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    googleId: { type: String },
    phoneNumber: String,
    tokens: [String],
    names: { type: String, required: true },
    lastsnames: { type: String, required: true },
    telefono: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    DNI_Document: { type: String, required: true, unique: true },
    tipoDNI: { type: String, enum: ["pasaport", "cedula", "licencia_Conduccion"], required: true },
    birthdate: { type: Date, required: false, default: null },
    country: { type: String, required: false },
    city: { type: String, required: false },
    postal_code: { type: String, required: false },
    password: { type: String, required: true },
    sign_contract: { type: Date, required: false, default: null },
    contract_period: { type: Number, required: false },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: false },
    numberContract: { type: Number, required: false },
    associatedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
