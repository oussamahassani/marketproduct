import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import ProductServices from "../services/ProductServices";
import "../component/ProductPage.css";
import {logout} from '../services/loginService'

export default function ProductsList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
const [userConnected , setUserConnected] = useState(localStorage.getItem("token"))

  useEffect(() => {
    ProductServices.getAllProducts()
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des produits:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const newItem = { ...product, quantity: 1 };
      setCart([...cart, newItem]);
    }
  };

  if (loading) {
    return <div className="loading-text">Chargement des produits...</div>;
  }
 const deconnection = () => {
logout()
navigate("/")
 }
  return (
    <div>
      {/* HEADER */}
      <header className="marketplace-header">
        <h1 className="marketplace-logo" onClick={() => navigate("/")}>
          LinkBay
        </h1>

        <div className="marketplace-search-container">
          <input type="text" placeholder="Rechercher un produit" className="marketplace-search-input" />
          <button className="marketplace-search-button">
            <Search size={20} />
          </button>
        </div>

 {(userConnected == null || userConnected == undefined ) &&  <button className="marketplace-action-button">Connexion</button>}
              {(userConnected !== null && userConnected !== undefined ) &&  <button className="marketplace-action-button" onClick={deconnection}>Deconnection</button>}
        {/* Panier */}
        <div className="cart-container">
          <button className="marketplace-action-button" onClick={() => setShowCart(!showCart)}>
            🛒 Panier ({cart.reduce((acc, item) => acc + item.quantity, 0)})
          </button>

          {showCart && (
            <div className="cart-mini-card">
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img src={item.image || "https://via.placeholder.com/50"} alt={item.nom} className="cart-item-image" />
                    <div>
                      <p>{item.nom}</p>
                      <p>{item.prix} €</p>
                      <p>Qté: {item.quantity}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>Votre panier est vide</p>
              )}
            </div>
          )}
        </div>
      </header>

      {/* NAVIGATION */}
      <nav className="marketplace-nav">
        <span onClick={() => navigate("/")}>Accueil</span>
        <span onClick={() => navigate("/electronics")}>Électronique</span>
        <span onClick={() => navigate("/fashion")}>Mode</span>
        <span onClick={() => navigate("/sports")}>Sports</span>
        <span onClick={() => navigate("/beauty")}>Beauté</span>
      </nav>

      {/* AFFICHAGE PRODUITS */}
      <div className="products-container">
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img 
                src={product.image || "https://via.placeholder.com/180"} 
                alt={product.nom} 
                className="product-image" 
              />
              <h2 className="product-title">{product.nom}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">{product.prix} €</p>
              <button className="btn-add-cart" onClick={() => addToCart(product)}>
                Ajouter au panier
              </button>
              <button className="btn-view-details" onClick={() => navigate(`/product/${product.id}`)}>
                Voir Détails
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
