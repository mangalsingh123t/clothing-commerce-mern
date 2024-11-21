import mongoose from "mongoose";
import bcrypt from "bcryptjs";  // Import bcrypt for password hashing

// Define User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    cartdata: {
        type: Object
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Encrypt password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10); // Hash the password before saving
    }
    next();
});

// Create User model
const User = mongoose.model("User", userSchema);

export default User;
