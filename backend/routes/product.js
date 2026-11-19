const express = require('express')
const Product = require('../model/ProductModel')

const router = express.Router()

router.get('/products', async (req,res) => {
    try{
        const product = await Product.find()
        res.json(product)
    } catch(err){
        res.status(400).json({error: err.message})
    }
})

module.exports = router;
