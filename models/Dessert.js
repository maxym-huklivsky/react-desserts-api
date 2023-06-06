const mongoose = require('mongoose');

const dessertSchema = mongoose.Schema({
  imageUrl: String,
  title: String,
  price: Number,
  category: Number,
  rating: Number,
  comments: String,
});

const Dessert = mongoose.model('Dessert', dessertSchema);

module.exports = Dessert;
