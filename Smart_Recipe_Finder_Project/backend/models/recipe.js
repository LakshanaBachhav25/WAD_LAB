const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  ingredients: [String],
  methods: String,
  timeRequired: Number 
});

module.exports = mongoose.model('Recipe', recipeSchema);
