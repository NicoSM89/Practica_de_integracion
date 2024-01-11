// server.js
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const ProductManager = require('./services/ProductManager');
const mongoose = require('mongoose');
const ProductManager = require('./dao/fileSystem/ProductDAO');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Conectar a MongoDB Atlas
const mongoURL = 'tu_url_de_mongodb_atlas';
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

const productManager = new ProductManager('productos.json'); 

app.engine('.handlebars', exphbs({ extname: '.handlebars' }));
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.render('home', { products });
});

app.get('/realtimeproducts', (req, res) => {
  const products = productManager.getProducts();
  res.render('realTimeProducts', { products });
});

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('newProduct', (product) => {
    const productId = productManager.addProduct(product);
    io.emit('updateProducts', productManager.getProducts());
  });

  socket.on('deleteProduct', (productId) => {
    productManager.deleteProduct(productId);
    io.emit('updateProducts', productManager.getProducts());
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
