import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById } from '../services/api'; 

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [searchIngredient, setSearchIngredient] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchIngredient.trim() === '') return;
    navigate(`/recipes?ingredient=${encodeURIComponent(searchIngredient)}`); 
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetchedRecipe = await getRecipeById(id);
        setRecipe(fetchedRecipe);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="text-center mt-5">Loading...</p>;

  const methodsList = recipe.methods
    .split(/[\n.]+/)
    .map(inst => inst.trim())
    .filter(inst => inst.length > 0);

  return (
    <div className="d-flex justify-content-center">
      <div className="bg-white p-5 rounded shadow box-container w-100" style={{ maxWidth: '1200px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold m-0">
            <i className="bi bi-cart4 me-2"></i>
            Smart Recipe Finder
          </h2>

          {/* Search bar */}
          <form className="d-flex" onSubmit={handleSearch} role="search">
            <input
              type="search"
              className="form-control me-2"
              placeholder="Search ingredient"
              aria-label="Search"
              value={searchIngredient}
              onChange={(e) => setSearchIngredient(e.target.value)}
            />
            <button
              className="btn rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px', backgroundColor: ' #00569e' }}
              type="submit"
            >
              <i className="bi bi-search text-white"></i>
            </button>
          </form>
        </div>

        <h3 className="fw-bold mt-2 mb-4" style={{ color: ' #00569e' }}>{recipe.title}</h3>
        <div className="row">
          {/* Image on Left */}
          <div className="col-md-5 mb-3">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="img-fluid rounded border shadow"
              style={{ objectFit: 'cover', width: '100%', maxHeight: '800px', display: 'block', margin: '0 auto' }}
            />
          </div>

          {/* Ingredients + Instructions on Right */}
          <div className="col-md-7">
            <h5 className="fw-bold">Ingredients:</h5>
            <ul className="mb-4">
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p><strong>Time Required:</strong> {recipe.timeRequired} mins</p>

            <h5 className="mt-4 fw-bold">Method:</h5>
            <ol>
              {methodsList.map((step, index) => (
                <li key={index} className="mb-2">{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <button className="btn btn-primary mt-4" style={{ backgroundColor: "#00569e" }} onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left me-2" />Back
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;

