const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { find } = require('./nftModel');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email address"],
        unique: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, "Please provide your password"]
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords are not the same"
        }
    }
})

userSchema.pre('save', async function (next) {
    // only run this function if password was actualy modified
    if (!this.isModified("password")) return next()

    // hash the password with const of 12
    this.password = await bcrypt.hash(this.password, 12);

    // delete password confirm field
    this.passwordConfirm = undefined;
    next()
})

userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next()
    this.passwordChangeAt = Date.now() - 1000;
    next()
})

userSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ active: { $ne: false } })
    next()
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}
userSchema.methods.changePasswordAfter = function (jwtTimeStamp) {
    if (this.passwordChangeAt) {
        const changeTimeStamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10);
        return jwtTimeStamp < changeTimeStamp;
    }
    return false;
}

const User = mongoose.model('user', userSchema); 

module.exports = User;