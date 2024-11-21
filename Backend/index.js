import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import Product from './models/product.js';
import { userSignUp, userSignIn, fetchUser, addToCart, removeFromCart, getAllCartData, clearCart } from './controller/user.js';
import bodyParser from 'body-parser'
import razorpayRoutes from './paymentIntregation/razorpay.js'
const PORT = 9090;
const app = express();

// MongoDB connection
mongoose.connect("mongodb+srv://mstomar038:mstomar123@cluster0.5maph.mongodb.net/E-Commerce")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// payment intregation
app.use(bodyParser.json());
app.use('/api/razorpay', razorpayRoutes);

// getUser loggedIn user Details

// Implement api for user signup
app.post("/signup", userSignUp)

// Implement api for user signin 
app.post("/signin", userSignIn)


// cart removel
app.post('/payment-success', fetchUser, clearCart);


// Define storage for image uploads
const imageStorage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Initialize the upload middleware with the specified storage
const upload = multer({ storage: imageStorage });

// Serving uploaded images statically
app.use("/images", express.static('upload/images'));

// Combined route to handle both image upload and product creation
app.post("/addproduct", upload.single('productImage'), async (req, res) => {
  try {
    // Image upload
    const imageUrl = `http://localhost:${PORT}/images/${req.file.filename}`;
    // Product creation with the image URL included
    const newProduct = await Product.create({
      name: req.body.name,
      old_price: parseFloat(req.body.old_price),
      new_price: parseFloat(req.body.new_price),
      category: req.body.category,
      image: imageUrl,  // Store the image URL in the product data
    });

    res.json({
      success: true,
      createdProduct: newProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Endpoint to delete a product
app.delete('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findOneAndDelete({ id: productId });

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting product', error });
  }
});

// Endpoint to get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, message: "All products fetched successfully", products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products', error });
  }
});

// Endpoint to get a product by ID
app.get("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: "Product fetched successfully", product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching product', error });
  }
});

// Endpoint to update a product
app.patch("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedProduct = await Product.findOneAndUpdate({ id: productId }, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating product', error });
  }
});

// get newCollections
app.get("/newCollections", async (req, res) => {
  const allProducts = await Product.find({})
  let newCollections = allProducts.slice(1).slice(-8)
  res.send(newCollections)
})

// get poupler in women products
app.get("/populerinwomen", async (req, res) => {
  const populer_InWomen = await Product.find({ category: "women" })
  const populerInWomen = populer_InWomen.splice(0, 4)
  res.send(populerInWomen)
})

// user
// addToCart Data
app.post("/addToCart", fetchUser, addToCart)

// addToCart Data
app.post("/removeFromCart", fetchUser, removeFromCart)

app.post("/getCartData", fetchUser, getAllCartData)

// Start the server
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is running at : ${PORT}`);
  } else {
    console.log(err);
  }
});

// app.use("/images", express.static('upload/images'))

// // endpoint for uploading the images
// app.post("/upload", upload.single('product'), (req, res) => {
//     res.json({
//         success: 1,
//         image_url: `http://localhost:${PORT}/images/${req.file.filename}`
//     })
// })