import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  // Redirection si aucune commande n'est disponible
  if (!order) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Aucune commande trouvée</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Commande Confirmée</h2>
      <p className="mb-4">Votre commande sur LinkBay a bien été enregistrée.</p>
      <p className="mb-4">Votre commande vous sera envoyée très prochainement.

</p>
      <p className="mb-4">Pour toute question ou information complémentaire merci de contacter notre support client.

</p>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-xl font-semibold mb-2">🧾 Détails de la commande</h3>
        <ul className="mb-4">
          {order.produits.map((item, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">{item.nom}</span> — {item.quantite} x {item.prix.toLocaleString()} DT
            </li>
          ))}
        </ul>
        <p><strong>Total payé :</strong> {order.total.toLocaleString()} DT</p>
        <p><strong>Méthode de paiement :</strong> {order.paiement}</p>
        <p><strong>Statut :</strong> {order.status}</p>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-xl font-semibold mb-2">📦 Adresse de livraison</h3>
        <p>{order.adresse?.rue}</p>
        <p>{order.adresse?.codePostal}, {order.adresse?.ville}, {order.adresse?.pays}</p>
      </div>

      {order.commentaire && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="text-xl font-semibold mb-2">📝 Commentaire</h3>
          <p>{order.commentaire}</p>
        </div>
      )}

      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
