// CartDAO.js
const Cart = require('../models/cart.js');

class CartDAO {
  static async createCart(userId, products) {
    const cart = new Cart({
      userId,
      products,
    });
    await cart.save();
    return cart;
  }

  static async getCartByUserId(userId) {
    return Cart.findOne({ userId }).populate('products.productId', 'title price');
  }

  static async updateCart(userId, products, totalPrice) {
    return Cart.findOneAndUpdate(
      { userId },
      { products, totalPrice },
      { new: true, useFindAndModify: false }
    ).populate('products.productId', 'title price');
  }

  static async deleteCart(userId) {
    return Cart.findOneAndDelete({ userId }).exec();
  }
}

module.exports = CartDAO;
