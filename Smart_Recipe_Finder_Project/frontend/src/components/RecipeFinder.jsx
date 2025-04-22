import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import { fetchRecipes } from '../services/api';

const RecipeFinder = () => {
  const [ingredients, setIngredients] = useState(() =>
    JSON.parse(localStorage.getItem('savedIngredients')) || []
  );
  const [mustHave, setMustHave] = useState(() =>
    localStorage.getItem('savedMustHave') || ''
  );
  const [input, setInput] = useState('');
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  // Save to localStorage whenever ingredients or mustHave changes
  useEffect(() => {
    localStorage.setItem('savedIngredients', JSON.stringify(ingredients));
    localStorage.setItem('savedMustHave', mustHave);
  }, [ingredients, mustHave]);

  const addIngredient = (value) => {
    const trimmed = value.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      const updated = [...ingredients, trimmed];
      setIngredients(updated);
      setInput('');
    }
  };

  const removeIngredient = (item) => {
    const updated = ingredients.filter((i) => i !== item);
    setIngredients(updated);
    if (mustHave === item) setMustHave('');
  };

  const clearAll = () => {
    setIngredients([]);
    setMustHave('');
    setRecipes([]);
    localStorage.removeItem('savedIngredients');
    localStorage.removeItem('savedMustHave');
  };

  useEffect(() => {
    const fetchRecipesData = async () => {
      try {
        if (ingredients.length >= 3) {
          const recipesData = await fetchRecipes(ingredients, mustHave);
          setRecipes(recipesData);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        console.error('Error fetching recipes:', err);
      }
    };

    fetchRecipesData();
  }, [ingredients, mustHave]);


    return (
    <div className="bg-white p-5 rounded shadow box-container mx-auto" style={{ maxWidth: '80%', width: '100%', border: '3px solid grey' }}>
      <div className="row text-start">
        {/* Input column */}
        <div className="col-md-6 mb-4">
          <div className="card p-4 shadow-sm">
            <h6 className='fw-bold'>Tell us what ingredients you need to use up...</h6>
            <p>Type the first ingredient you want to use up in the search box and pick the best match from the drop down. We need a minimum of 3 ingredients to find you some recipes.</p>
            <div className="input-group my-3">
              <input
                className="form-control"
                placeholder="Enter ingredient"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addIngredient(input)}
              />
              <button
                className="btn"
                style={{ backgroundColor: '#00569e', color: 'white' }}
                onClick={() => addIngredient(input)}
              >
                <i className="bi bi-plus me-1"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Display column */}
        <div className="col-md-6 mb-4">
          <div className="card p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className='fw-bold'>Your Ingredients</h6>
              {ingredients.length > 0 && (
                <button className="btn btn-sm btn-link text-danger" onClick={clearAll}>Clear all</button>
              )}
            </div>

            <div className="d-flex flex-wrap mt-2">
              {ingredients.length === 0 ? (
                <p className="text-muted">No ingredients added.</p>
              ) : (
                ingredients.map((ing) => (
                  <span key={ing} className="badge text-white m-1" style={{ backgroundColor: '#00569e' }}>
                    {ing}
                    <button
                      className="btn-close btn-close-white btn-sm ms-2"
                      onClick={() => removeIngredient(ing)}
                    ></button>
                  </span>
                ))
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="mustHave" className="form-label fw-bold">What is your must have?</label>
              <select
                id="mustHave"
                className="form-select"
                value={mustHave}
                onChange={(e) => setMustHave(e.target.value)}
              >
                <option value="">Select one</option>
                {ingredients.map((ing) => (
                  <option key={ing} value={ing}>{ing}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Recipes Display */}
      <div className="mt-4 text-start">
        <h5>Recipes based on your ingredients</h5>
        {ingredients.length < 3 ? (
          <div className="alert alert-info">Add at least 3 ingredients to see recipes.</div>
        ) : recipes.length === 0 ? (
          <div className="alert alert-warning">No matching recipes found.</div>
        ) : (
          <div className="row mt-3">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                  <img
                    src={recipe.image}
                    className="card-img-top"
                    alt={recipe.title}
                    style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => navigate(`/recipe/${recipe._id}`)}
                  />
                  <div className="card-body">
                    <h5
                      className="card-title mt-2"
                      style={{ cursor: 'pointer', color: '#00569e' }}
                      onClick={() => navigate(`/recipe/${recipe._id}`)}
                    >
                      {recipe.title}
                    </h5>
                    <p className="card-text">
                      Time: {recipe.timeRequired} mins
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeFinder;
