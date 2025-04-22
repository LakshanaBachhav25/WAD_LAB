import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

// search recipes by ingredient
export const searchRecipesByIngredient = async (ingredient) => {
  try {
    const response = await axios.get(`${API_URL}/recipes?ingredient=${encodeURIComponent(ingredient)}`);
    return response.data;
  } catch (error) {
    throw new Error('Error searching for recipes');
  }
};

// fetch recipe details by ID
export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/recipe/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching recipe details');
  }
};

export const fetchRecipes = async (ingredients, mustHave) => {
    try {
      const response = await axios.post(`${API_URL}/recipe/search`, {
        ingredients,
        mustHave,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  };

  

