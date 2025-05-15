import React, { useState } from "react";
import { useCart } from "../pages/CartContext";
import { Trash2 } from "lucide-react";
import "../component/CartPage.css";
import Header from "../pages/Header";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();
const navigate = useNavigate();

  const handleCheckout = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.nom,
          price: item.prix,
          quantity: item.quantity,
        })),
        totalPrice: totalPrice,
        status: "PENDING", // ou un autre statut par défaut
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la commande.");
    }

    const data = await response.json();
    alert("Commande passée avec succès !");
    console.log("Commande créée :", data);
  } catch (error) {
    alert("Une erreur est survenue lors de la commande.");
    console.error(error);
  }
};

  const text = {
    en: {
      anglais: "English",
      cart: "Cart",
      home: "Home",
      categories: "Categories",
      login: "Login",
      country: "Country",
      state: "State",
    },
    fr: {
      anglais: "Français",
      cart: "Panier",
      home: "Accueil",
      categories: "Catégories",
      login: "Connexion",
      country: "Pays",
      state: "Région",
    },
  };

  const [anglais, setAnglais] = useState("fr");
  const [location, setLocation] = useState({});
  const [showLocation, setShowLocation] = useState(false);
  const [error, setError] = useState("");

  const handleGetLocation = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      setLocation({ country: data.country_name, state: data.region });
      setShowLocation(true);
    } catch (err) {
      setError("Erreur de localisation");
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    updateCartItemQuantity(itemId, parseInt(newQuantity));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.prix * item.quantity,
    0
  );

  const handleRemove = (itemId) => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce produit ?"
    );
    if (confirmed) {
      removeFromCart(itemId);
    }
  };

  return (
    <div className="cart-page">
      <Header/>

      <h2>🛒 Mon Panier</h2>

      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image || "https://via.placeholder.com/100"}
                  alt={item.nom}
                />
                <div className="cart-item-info">
                  <h3>{item.nom}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="cart-price">
                  {item.prix.toLocaleString()} DT
                </div>
                <div className="cart-quantity">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    className="quantity-select"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="cart-total">
                  {(item.prix * item.quantity).toLocaleString()} DT
                </div>
                <button
                  className="btn-remove"
                  onClick={() => handleRemove(item.id)}
                  title="Supprimer du panier"
                >
                  <Trash2 size={20} color="black" />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total-overall">
            Total TTC : {totalPrice.toLocaleString()} DT
          </div>
          <div className="cart-actions">
  <button className="btn-continue">← Continuer mes achats</button>
<button
  className="btn-checkout"
  onClick={() => navigate("/commande", { state: { cartItems, totalPrice } })}
>
  Commander
</button>

</div>

        </>
      )}
    </div>
  );
};

export default CartPage;
