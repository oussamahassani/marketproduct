

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
 import { useCart } from "../pages/CartContext"; // <-- Active si tu utilises un contexte panier
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../pages/OrderContext';
import { login} from '../services/loginService'

function ModalConnexion({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
     
    const loginResult = await login(email,password)
    console.log('loginResult:', loginResult);
    
      localStorage.setItem('role' , loginResult.role);
      localStorage.setItem('token' ,loginResult.token)
      if(loginResult.role =="ADMIN"){
    
    navigate('/admin/dashboard'); 
      }
      else {
    navigate('/commande'); 
      }
          
        }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Identifiez-Vous</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">

        <div className="input-icon">
          <span className="icon">📧</span>
          <input type="email" required placeholder="E-mail"    value={email}
                onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-icon">
          <span className="icon">🔒</span>
          <input required type="password" placeholder="Mot de passe"    onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button className="btn-modal">Se connecter</button>
        </form>
      </div>
      <p className="forgot-password">Mot de passe oublié ?</p>
        <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
}

function Commande() {
  const location = useLocation();
  const { cartItems = [], totalPrice = 0 } = location.state || {};
  const [items, setItems] = useState(cartItems);
  const [showModal, setShowModal] = useState(false);
const navigate = useNavigate();
  const { setHasPlacedOrder } = useOrder();	
const { clearCart } = useCart();

  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    pays: "",
    ville: "",
    codePostal: "",
    rue: "",
    instructions: "",
    livraison: "retrait1",
    creerCompte: false,
    paiement: "",
    numeroCarte: "",
    expiration: "",
    cvv: "",
    confirmation: "",
    telephone: "",
    commentaire: ""
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleRemoveItem = (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce produit de votre commande ?");
    if (confirmDelete) {
      removeItem(id); // supprime localement
      // removeFromCart(id); // décommente si panier global via contexte
    }
  };

  const fraisLivraison = form.paiement === "livraison" ? 8 : 0;
  const totalPanier = items.reduce((sum, item) => sum + item.prix * item.quantity, 0);
  const totalAvecLivraison = totalPanier + fraisLivraison;

  const handleSubmit = async (e) => {
  e.preventDefault();

  const order = {
    userId: "1234",
    telephone: form.telephone,
    adresse: {
      pays: form.pays,
      ville: form.ville,
      codePostal: form.codePostal,
      rue: form.rue
    },
    commentaire: form.commentaire,
    produits: items.map(item => ({
      nom: item.nom,
      prix: item.prix,
      quantite: item.quantity
    })),
    paiement: form.paiement,
    total: totalAvecLivraison,
    
  };

  try {
    const response = await fetch("http://localhost:8082/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });

    const data = await response.json();

    if (response.ok) {
      alert("Commande envoyée avec succès !");
      console.log("Réponse backend :", data);
          clearCart(); // <-- Vide le panier local
  setHasPlacedOrder(true); // <-- Active le bouton "Suivre ma commande"

      navigate('/order-confirmation', { state: { order: data } });
    } else {
      alert("Une erreur est survenue. Détails : " + (data.message || JSON.stringify(data)));
      console.error("Erreur backend :", data);
    }
  } catch (err) {
    console.error("Erreur réseau :", err);
    alert("Erreur réseau : " + err.message);
  }
};


  return (
    <>
      <form className="commande-container" onSubmit={handleSubmit}>
        <h1>Finalisez votre commande</h1>
        <p className="sous-titre">Remplissez les champs suivants pour confirmer votre commande</p>

        <div className="section">
          <h3>
            <span className="icon">👤</span> Vos données{" "}
            <button type="button" className="btn-compte" onClick={() => setShowModal(true)}>
              Déjà un compte ?
            </button>
          </h3>

          <div className="input-row">
            <div className="field">
              <label>Prénom : <span className="required">*</span></label>
              <input type="text" name="prenom" value={form.prenom} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Nom de famille : <span className="required">*</span></label>
              <input type="text" name="nom" value={form.nom} onChange={handleChange} required />
            </div>
          </div>

          <div className="input-row">
            <div className="field">
              <label>E-mail :</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Numéro de téléphone :</label>
              <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} required placeholder="ex: +216 12 345 678" />
            </div>
          </div>

          {form.creerCompte && (
            <div className="input-row">
              <div className="field">
                <label>Mot de passe :</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} required />
              </div>
              <div className="field">
                <label>Confirmer le mot de passe :</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
              </div>
            </div>
          )}

          <div className="checkbox">
            <input type="checkbox" id="create-account" name="creerCompte" checked={form.creerCompte} onChange={handleChange} />
            <label htmlFor="create-account">Créez un compte et profitez des avantages d'un client enregistré.</label>
          </div>

          <p className="note">Les champs avec des astérisques rouges (*) sont obligatoires.</p>

          <div className="adresse-section">
            <h4><span className="icon">🚚</span> Adresse de livraison</h4>

            <div className="field">
              <label>Pays :</label>
              <input type="text" name="pays" value={form.pays} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Ville :</label>
              <input type="text" name="ville" value={form.ville} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Code postal :</label>
              <input type="text" name="codePostal" value={form.codePostal} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Rue / Adresse complète :</label>
              <input type="text" name="rue" value={form.rue} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Instructions supplémentaires (optionnel) :</label>
              <textarea name="instructions" value={form.instructions} onChange={handleChange} rows="3" />
            </div>
          </div>
        </div>

        <div className="section">
          <h3><span className="icon">💳</span> Mode de paiement</h3>
          <div className="livraison-options">
            <label>
              <input type="radio" name="paiement" value="livraison" checked={form.paiement === "livraison"} onChange={handleChange} />
              <span>Paiement à la livraison</span>
            </label>
            <label>
              <input type="radio" name="paiement" value="carte" checked={form.paiement === "carte"} onChange={handleChange} />
              <span>Carte bancaire</span>
            </label>
            <label>
              <input type="radio" name="paiement" value="Retrait en magasin" checked={form.paiement === "Retrait en magasin"} onChange={handleChange} />
              <span>Retrait en magasin (Mourouj 5)</span>
            </label>
          </div>

          {form.paiement === "carte" && (
            <>
              <div className="field">
                <label>Numéro de carte :</label>
                <input type="text" name="numeroCarte" value={form.numeroCarte} onChange={handleChange} required />
              </div>
              <div className="input-row">
                <div className="field">
                  <label>Date d’expiration :</label>
                  <input type="text" name="expiration" placeholder="MM/AA" value={form.expiration} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label>Code CVV :</label>
                  <input type="text" name="cvv" value={form.cvv} onChange={handleChange} required />
                </div>
              </div>
              <div className="field">
                <label>Confirmation de paiement / Reçu :</label>
                <input type="text" name="confirmation" placeholder="Référence ou capture" value={form.confirmation} onChange={handleChange} />
              </div>
            </>
          )}

          {form.paiement && form.paiement !== "carte" && (
            <div className="alert">
              {form.paiement === "livraison" && "💸 Des frais de livraison de 8 DT seront ajoutés à votre commande."}
              {form.paiement === "paypal" && "📍 Le retrait se fait à notre magasin de Sfax, Rue de l'Aéroport Km 4."}
            </div>
          )}
        </div>

        <button type="submit" className="btn-commande">Valider la commande</button>
      </form>

      <div className="recap-commande">
        <h3>🧾 Récapitulatif de la commande</h3>
        {items.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <div className="recap-items">
            {items.map((item) => (
              <div key={item.id} className="recap-item">
                <img src={item.image || "https://via.placeholder.com/60"} alt={item.nom} />
                <div>
                  <strong>{item.nom}</strong>
                  <p>
                    Quantité :
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const value = Math.max(1, parseInt(e.target.value) || 1);
                        setItems(items.map(i =>
                          i.id === item.id ? { ...i, quantity: value } : i
                        ));
                      }}
                      className="input-qte"
                      style={{ width: "60px", marginLeft: "10px" }}
                    />
                  </p>
                  <p>Prix : {item.prix.toLocaleString()} DT</p>
                  <p>Total : {(item.prix * item.quantity).toLocaleString()} DT</p>
                  <span
                    className="delete-icon"
                    onClick={() => handleRemoveItem(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    🗑️
                  </span>
                </div>
              </div>
            ))}
            <hr />
            {form.paiement === "livraison" && (
              <p className="recap-frais">Frais de livraison : 8 DT</p>
            )}
            <p className="recap-total">
              Total TTC : {totalAvecLivraison.toLocaleString()} DT
            </p>
          </div>
        )}
      </div>

      <div className="commentaire-section">
        <h4>📝 Laissez-nous un commentaire</h4>
        <textarea
          name="commentaire"
          placeholder="Votre commentaire..."
          rows="4"
          value={form.commentaire}
          onChange={handleChange}
          className="commentaire-input"
        />
      </div>

      {showModal && <ModalConnexion onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Commande;
