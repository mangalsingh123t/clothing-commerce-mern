import mongoose from 'mongoose';
import User from './models/user.js';
// Connect to your database
mongoose.connect("mongodb+srv://mstomar038:mstomar123@cluster0.5maph.mongodb.net/E-Commerce")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

async function createAdmin() {
    try {
        // Check if the admin already exists
        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) {
            console.log('Admin already exists.');
            return;
        }

        // Create the first admin user
        const admin = new User({
            email: 'mangalbanna@gmail.com', // You can change this email
            //   password: await bcrypt.hash('7410', 10), // Hash the default password
            password: 7410,
            role: 'admin'
        });

        await admin.save();
        console.log('Admin created successfully');
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
}

createAdmin();
