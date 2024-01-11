// ProductDAO.js
const Product = require('../models/product.js');

class ProductDAO {
  static async createProduct(title, description, price, thumbnail, code, stock) {
    const newProduct = new Product({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    await newProduct.save();
    return newProduct;
  }

  static async getAllProducts() {
    return Product.find();
  }

  static async getProductById(productId) {
    return Product.findById(productId);
  }

  static async updateProduct(productId, updatedFields) {
    return Product.findByIdAndUpdate(
      productId,
      { $set: updatedFields },
      { new: true, useFindAndModify: false }
    );
  }

  static async deleteProduct(productId) {
    return Product.findByIdAndDelete(productId);
  }
}

module.exports = ProductDAO;
