const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoute'); 
 
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', recipeRoutes);
app.use('/api/recipe', recipeRoutes);

mongoose.connect('mongodb+srv://Lakshana:3zBo2G9NksRavbO1@smartrecipefinder.sjz7j7r.mongodb.net/').then(() => console.log('MongoDB connected'));

app.listen(3000, () => {
  console.log("Server Running on port 3000");
});
