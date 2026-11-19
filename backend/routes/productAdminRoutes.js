const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Product = require('../model/ProductModel')
const User = require('../model/UserModel')
const upload = require('../config/multer')

const router = express.Router()

router.post('/api/register', async (req, res) => {
    try{
        const {username, email, password} = req.body
        //check if user already exists
        const userExists = await User.findOne({ $or: [{email},{username}]})
        if(userExists){
            return res.status(400).json({message: 'Username or Email already exists'})
        }

        //Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //create and save user
        const newUser = new User({username,email,password: hashedPassword})
        await newUser.save()
        res.status(201).json({ message: 'User registered successfully!', user: newUser })
    } catch(err){
        res.status(400).json({err:err.message})
    }
})

router.post('api/login', async (req,res) => {
    try{
        const {email, password} = req.body

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'Invalid Credentials'})
        }
        //check for password match
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: 'Invalid Credentials'})
        }
        //Generate JWT token
        const token = jwt.sign({username: user.username}, process.env.JWT_SECRET, {expiresIn: '1h'})

        res.status(200).json({
            message: 'Login Successful',
            token,
            user: {id: user._id, username: user.username, email: user.email}
        })
    } catch(err){
        res.status(500).json({message: 'server error', error: err.message})
    }
})

router.get('/products', async (req, res) => {
    try {
        const product = await Product.find()
        res.json(product)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.json(product)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})
router.post('/addProduct', upload.single('images'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image file.' });
        }
        const images = `/uploads/${req.file.filename}`;
        const { prod_name, sku, short_description, description, mark_price, price } = req.body

        const newProduct = {
            prod_name, sku, short_description, description, mark_price, price,
            images: [{
                url: images, // Saved file location string
                altText: prod_name ? `${prod_name} product image` : 'Product Image', // Generates dynamic alt text
                isMain: true // Automatically flags the primary single upload as the main image
            }]
        }
        const product = new Product(newProduct);
        await product.save()
        res.status(201).json(newProduct)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})
router.put('/products/:id',upload.single('images'), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        const updateData = { ...req.body }
        if(req.file){
            updateData.images = [
                {
                    url: `/uploads/${req.file.filename}`,
                    altText: updateData.prod_name ? `${updateData.prod_name} product image` : `${product.prod_name} product image`,
                    isMain: true
                }
            ]
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, {new:true})
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
})
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        await Product.findByIdAndDelete(req.params.id)
        res.json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

module.exports = router;
