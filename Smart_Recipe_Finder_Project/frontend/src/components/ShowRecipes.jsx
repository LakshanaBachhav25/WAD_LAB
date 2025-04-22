import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '../components/style.css';
import { searchRecipesByIngredient } from '../services/api'; 

const ShowRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchIngredient, setSearchIngredient] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchIngredient.trim() === '') return;
    navigate(`/recipes?ingredient=${encodeURIComponent(searchIngredient)}`);
  };

  const queryParams = new URLSearchParams(location.search);
  const ingredient = queryParams.get('ingredient');

  useEffect(() => {
    const fetchRecipesData = async () => {
      if (!ingredient) return;
      try {
        const data = await searchRecipesByIngredient(ingredient);
        setRecipes(data);
      } catch (err) {
        console.error('Error fetching recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipesData();
  }, [ingredient]);

  return (
    <div className="d-flex justify-content-center">
      <div className="bg-white p-5 rounded shadow box-container w-100" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold m-0">
            <i className="bi bi-cart4 me-2"></i>
            Smart Recipe Finder
          </h2>

          <form className="d-flex" onSubmit={handleSearch}>
            <input
              type="search"
              className="form-control me-2"
              placeholder="Search ingredient"
              value={searchIngredient}
              onChange={(e) => setSearchIngredient(e.target.value)}
            />
            <button
              className="btn rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px', backgroundColor: '#00569e' }}
              type="submit"
            >
              <i className="bi bi-search text-white"></i>
            </button>
          </form>
        </div>

        <div className="mb-4">
          <button className="btn text-white" style={{ backgroundColor: "#00569e"}} onClick={() => navigate('/')}>
            <i className="bi me-2"></i>Home
          </button>
        </div>

        <div className="mb-5">
          <h2 className="fw-bold mb-4" style={{ color: '#00569e' }}>
            Search Results for: {ingredient}
          </h2>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status" />
            </div>
          ) : recipes.length > 0 ? (
            <div className="row">
              {recipes.map((recipe) => (
                <div key={recipe._id} className="col-md-4 mb-4" style={{ cursor: 'pointer' }} onClick={() => navigate(`/recipe/${recipe._id}`)}>
                  <div className="card h-100 shadow-sm">
                    <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                    <div className="card-body text-center">
                      <h5 className="card-title">{recipe.title}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-center">No recipes found for "{ingredient}"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowRecipes;
