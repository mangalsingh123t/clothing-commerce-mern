import User from "../models/user.js";
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const userSignUp = async (req, res) => {
    try {
        let alreadyExistUser = await User.findOne({ email: req.body.email })
        if (alreadyExistUser) {
            res.status(400).json({
                success: false,
                message: "Email already exists. Please use a different email."
            })
        }
        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the number of salt rounds
        let cart = {}
        for (let i = 0; i < 300; i++) {
            cart[i] = 0
        }

        const role = req.body.role || "user";
        // Create the new user with the hashed password
        const createdUser = await User.create({
            ...req.body,
            password: hashedPassword,
            cartdata: cart,
            role: role,
        });

        const token = jsonwebtoken.sign({
            id: createdUser._id, email: createdUser.email, role: createdUser.role
        },
            'secret_ecom',
            { expiresIn: '1h' }
        );

        res.json({
            success: true,
            createdUser: createdUser,
            token: token
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const userSignIn = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }

        // check if password matches
        console.log(req.body.password)
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }

        // Generate JWT token
        const token = jsonwebtoken.sign({
            id: user._id, email: user.email, role: user.role
        },
            'secret_ecom',
            { expiresIn: '1h' }
        );

        // Respond with success and token
        res.json({
            success: true,
            token: token,
            role: user.role
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// middleware addToCart for getting the user from auth-token
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(404).json({ errors: "Please authenticate with a valid token" })
    }
    else {
        try {
            const data = jsonwebtoken.verify(token, "secret_ecom")
            console.log(data)
            req.user = data
            next()
        } catch (error) {
            res.status(401).json({ errors: "Please authenticate with a valid token" })
        }
    }
}
// middleware/isAdmin.js
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied' });
    }
    next();
};

// addToCart Data
const addToCart = async (req, res) => {
    let userdata = await User.findOne({ _id: req.user.id })
    console.log("Added product in card", req.body.itemId)
    userdata.cartdata[req.body.itemId] += 1
    await User.findOneAndUpdate({ _id: req.user.id }, { cartdata: userdata.cartdata })
    res.json("Added")
}

// remove product from cartdata
const removeFromCart = async (req, res) => {
    let userdata = await User.findOne({ _id: req.user.id })
    console.log("Removed Product Id : ", req.body.itemId)
    if (userdata.cartdata[req.body.itemId] > 0)
        userdata.cartdata[req.body.itemId] -= 1
    await User.findOneAndUpdate({ _id: req.user.id }, { cartdata: userdata.cartdata })
    res.json("Removed")
}

// get cart products
const getAllCartData = async (req, res) => {
    const userdata = await User.findOne({ _id: req.user.id })
    res.json(userdata.cartdata)
}

const clearCart = async (req, res) => {
    try {
        // Get the logged-in user
        const user = await User.findOne({ _id: req.user.id });

        // Reset the cart
        let clearedCart = {};
        for (let i = 0; i < 300; i++) {
            clearedCart[i] = 0;
        }

        // Update the user's cart data
        await User.findOneAndUpdate({ _id: req.user.id }, { cartdata: clearedCart });

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully after payment."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to clear cart after payment",
            error
        });
    }
};

export { userSignUp, userSignIn, fetchUser, addToCart, removeFromCart, getAllCartData, clearCart, isAdmin}
