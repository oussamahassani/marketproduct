import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import "../component/ProductPage.css";
import {logout} from '../services/loginService'
export default function ProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]); // État du panier
  const [showCart, setShowCart] = useState(false); // Afficher ou masquer la mini-carte
const [userConnected , setUserConnected] = useState(localStorage.getItem("token"))
  // Charger le panier depuis le localStorage au montage du composant
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Mettre à jour le localStorage chaque fois que le panier change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (!product) {
    return <div className="p-6 text-center">Produit non trouvé</div>;
  }

  // Ajouter un produit au panier
  const addToCart = () => {
    const newItem = { ...product, quantity };
    setCart([...cart, newItem]);
  };
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
            🛒 Panier ({cart.length})
          </button>
          
          {/* Mini-carte du panier */}
          {showCart && (
            <div className="cart-mini-card">
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div>
                      <p>{item.name}</p>
                      <p>{item.price}</p>
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

      {/* PAGE PRODUIT */}
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <img src={product.image} alt={product.name} className="w-48 mx-auto mb-4" />
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-700 text-lg">{product.price}</p>

          <div className="mt-4 flex items-center gap-4">
            <label className="font-medium">Quantité :</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-2 rounded"
            >
              {[1, 2, 3, 4, 5].map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>

          <button className="mt-6 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700" onClick={addToCart}>
            Ajouter au panier
          </button>

          {/* Retour à la page Mode */}
          <button 
            className="mt-4 w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700" 
            onClick={() => navigate("/fashion")}
          >
            Retour à la page Mode
          </button>
        </div>
      </div>
    </div>
  );
}
