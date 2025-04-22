import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '../components/style.css';
import RecipeFinder from './RecipeFinder';

const Home = () => {
  const [searchIngredient, setSearchIngredient] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchIngredient.trim() === '') return;
    navigate(`/recipes?ingredient=${encodeURIComponent(searchIngredient)}`);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="bg-white p-5 rounded shadow box-container w-100" style={{ maxWidth: '1200px' }}>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold m-0">
            <i className="bi bi-cart4 me-2"></i>
            Smart Recipe Finder
          </h2>
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

        {/* Carousel */}
        <div id="carouselExampleIndicators" className="carousel slide custom-carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" />
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" />
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://www.simplyrecipes.com/thmb/g0m2H6cj1OBSqEmXftwY_RLGrxc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Upside-Down-Chili-Pie-LEAD-15-b30c77d2ab324fb1857ce455d30e2c3a.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://www.southernliving.com/thmb/sLBVbaEJf4ZERTAfrwPcvUN-blI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ravioli_Lasagna_010-c251db1faa1d4e0d8e2708396dc41525.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://assets.clevelandclinic.org/transform/96abefb2-d7db-4c9d-9d27-76f1b10413d2/strawberryMangoSmoothie-134419245-770x533-1_jpg" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Introduction */}
        <div className="text-center mt-5 px-3 mb-5">
          <h2 className="fw-bold" style={{ color: ' #00569e' }}>What can I make with…</h2>
          <p className="mt-3 text-secondary fs-5" style={{ maxWidth: "800px", margin: "0 auto" }}>
            Got a few slices of leftover bread, an odd onion in your cupboard and some milk in the fridge?
            Our recipe finder tool will show you all the things you can make, so none of your food goes to waste,
            with only a few added ingredients needed.
          </p>
        </div>

        {/* Recipe Finder */}
        <RecipeFinder />

        {/* Inspiration Cards */}
        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <Link to="/recipe/67fe7e2ae8f20294c54afe3a" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card h-100 shadow-sm">
                <img
                  src="https://pipingpotcurry.com/wp-content/uploads/2020/12/Poha-Recipe-indori-Piping-Pot-Curry.jpg"
                  className="card-img-top"
                  alt="Poha"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Poha</h5>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4 mb-4">
            <Link to="/recipe/67fe8640a34e8cb9d2f7e62c" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card h-100 shadow-sm">
                <img
                  src="https://www.flavourstreat.com/wp-content/uploads/2022/08/homemade-watermelon-juice.jpg"
                  className="card-img-top"
                  alt="Watermelon Juice"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Watermelon Juice</h5>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4 mb-4">
            <Link to="/recipe/67fe8a6e4a8437ae01115d93" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card h-100 shadow-sm">
                <img
                  src="https://talodfoods.com/cdn/shop/files/Gulab-Jamun-Creative_img_4f2bd570-4f11-4dba-8386-fa5a26392cd0.webp?v=1725262395&width=1500"
                  className="card-img-top"
                  alt="Gulabjamun"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Gulabjamun</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
