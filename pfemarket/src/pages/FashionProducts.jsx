import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import "../component/Electronics.css";
import "../component/Header.css";
import Header  from "../pages/Header";
import img1 from "../assets/images/Fashion/Sac.jpg";
import img2 from "../assets/images/Fashion/lunette.jpg";
import img3 from "../assets/images/Fashion/jj.jpg";
import img4 from "../assets/images/Fashion/chaussure.jpg";

const products = [
  { id: 1, name: "Sac à main élégant", price: 79, rating: 4, category: "Sacs", image: img1 },
  { id: 2, name: "Lunettes de soleil", price: 29.99, rating: 3, category: "Accessoires", image: img2 },
  { id: 3, name: "Montre en cuir", price: 119, rating: 5, category: "Montres", image: img3 },
  { id: 4, name: "Chaussures en cuir", price: 89, rating: 4, category: "Chaussures", image: img4 },
];

const FashionProducts = () => {
  const navigate = useNavigate();
  const availableLanguages = ["en", "fr", "es", "de", "it", "pt"];
  const [anglais, setAnglais] = useState(localStorage.getItem("anglais") || "fr");
  const [location, setLocation] = useState({ country: "", state: "" });
  const [error, setError] = useState(null);
  const [showLocation, setShowLocation] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [minRating, setMinRating] = useState(0);

  const categories = ["All", "Sacs", "Accessoires", "Montres", "Chaussures"];

  useEffect(() => {
    localStorage.setItem("anglais", anglais);
  }, [anglais]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchAddress(position.coords.latitude, position.coords.longitude);
          setShowLocation(true);
        },
        () => {
          setError("Accès à la localisation refusé.");
          setShowLocation(true);
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par votre navigateur.");
      setShowLocation(true);
    }
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      setLocation({
        country: data.address.country || "Inconnu",
        state: data.address.state || data.address.region || "Inconnu",
      });
    } catch (err) {
      setError("Impossible de récupérer la localisation.");
    }
  };

  const handleAnglaisChange = (event) => {
    setAnglais(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.price >= priceRange[0] && product.price <= priceRange[1] &&
      product.rating >= minRating
    );
  });

  const resetFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, 150]);
    setMinRating(0);
  };

  return (
    <div>
     <Header/>

      {/* 🔹 CONTENU AVEC FILTRES */}
      <div className="electronics-content">
        <aside className="electronics-sidebar">
          <h3>Filtres</h3>

          <div className="filter-section">
            <label>Catégorie</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <label>Prix maximum</label>
            <input
              type="range"
              min="0"
              max="150"
              step="1"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseFloat(e.target.value)])}
            />
            <span>0 DT - {priceRange[1]} DT</span>
          </div>

          <div className="filter-section">
            <label>Note minimum</label>
            <select value={minRating} onChange={(e) => setMinRating(parseInt(e.target.value))}>
              <option value={0}>Toutes</option>
              <option value={1}>1 ★ & plus</option>
              <option value={2}>2 ★ & plus</option>
              <option value={3}>3 ★ & plus</option>
              <option value={4}>4 ★ & plus</option>
              <option value={5}>5 ★</option>
            </select>
          </div>

          <button className="reset-filters-button" onClick={resetFilters}>
            Réinitialiser les filtres
          </button>
        </aside>

        {/* 🔹 PRODUITS */}
        <div className="electronics-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="electronics-product">
              <img src={product.image} alt={product.name} className="electronics-product-image" />
              <h3 className="electronics-product-name">{product.name}</h3>
              <p className="electronics-product-price">{product.price} DT</p>
              <p className="electronics-product-rating">{product.rating} ★</p>
              <button
                className="electronics-buy-button"
                onClick={() => navigate('/product', { state: { product } })}
              >
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FashionProducts;
