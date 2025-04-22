const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); 

router.get('/api/recipes', async (req, res) => {
    const { ingredient } = req.query;
    try {
      const recipes = await Recipe.find({ ingredients: { $regex: ingredient, $options: 'i' } });
      res.json(recipes);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Route to get a specific recipe by ID
router.get('/api/recipe/:id', async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
      res.json(recipe);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });

router.post('/search', async (req, res) => {
  const { ingredients, mustHave } = req.body;

  if (!Array.isArray(ingredients) || ingredients.length < 3) {
    return res.status(400).json({ message: 'At least 3 ingredients required' });
  }

  try {
    const recipes = await Recipe.find(); 

    const filtered = recipes.filter(recipe => {
      const matchCount = ingredients.filter(i =>
        recipe.ingredients.some(ing => ing.toLowerCase().includes(i.toLowerCase()))
      ).length;

      const mustHaveMatch = mustHave
        ? recipe.ingredients.some(ing => ing.toLowerCase().includes(mustHave.toLowerCase()))
        : true;

      return matchCount >= 3 && mustHaveMatch;
    });

    res.json(filtered);

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
