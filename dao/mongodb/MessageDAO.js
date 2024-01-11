// MessageDAO.js
const Message = require('../models/message.js');

class MessageDAO {
  static async createMessage(user, message) {
    const newMessage = new Message({
      user,
      message,
    });
    await newMessage.save();
    return newMessage;
  }

  static async getAllMessages() {
    return Message.find().sort({ timestamp: 1 });
  }
}

module.exports = MessageDAO;
