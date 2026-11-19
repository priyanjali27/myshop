const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    prod_name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        maxlength: [150, "Product name cannot exceed 150 characters"]
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    sku: {
        type: String,
        required: [true, 'SKU is required'],
        unique: true,
        uppercase: true
    },
    short_description: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true
    }, 
    mark_price: {
      type: Number,
      required: [true, 'MRP is required for product'],
      min: [0, 'Price cannot be negative']
    }, 
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative']
    },
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Category', // Reference to a structural Category collection
    //   required: [true, 'Product must belong to a category']
    // },
    images: [
      {
        url: { type: String, required: true },
        altText: { type: String, trim: true },
        isMain: { type: Boolean, default: false }
      }
    ],
    status: {
      type: String,
      required: true,
      enum: ['draft', 'published', 'out_of_stock', 'archived'],
      default: 'draft'
    }
}, 
{ timestamps: true })

// Generate slug from title
productSchema.pre("validate", function () {
  if (this.isModified("prod_name") || !this.slug) {
    this.slug =
      this.prod_name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "") +
      "-" +
      Date.now();
  }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product;

