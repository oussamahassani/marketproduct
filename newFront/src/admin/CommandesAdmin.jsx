import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommandesAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [statusOptions] = useState(["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"]);

  useEffect(() => {
    axios.get('http://localhost:8082/orders')
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des commandes :", err);
      });
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
axios.patch(`http://localhost:8082/orders/${orderId}/status`, { status: newStatus })
      .then(() => {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        alert("Statut mis à jour avec succès !");
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour du statut :", err.response?.data || err.message);
        alert("Erreur lors de la mise à jour du statut.");
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Liste des Commandes</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Utilisateur</th>
            <th>Statut</th>
            <th>Total</th>
            <th>Ville</th>
            <th>Code Postal</th>
            <th>Téléphone</th>
            <th>Commentaire</th>
            <th>Produits</th>
            <th>Date</th>
            <th>Paiement</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userId}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td>{order.total} €</td>
              <td>{order.adresse?.ville || 'N/A'}</td>
              <td>{order.adresse?.codePostal || 'N/A'}</td>
              <td>{order.telephone || 'N/A'}</td>
              <td>{order.commentaire || '-'}</td>
              <td>
                <ul>
                  {order.produits?.map((p, i) => (
                    <li key={i}>
                      {p.quantite} {p.nom} avec : {p.prix} DT
                    </li>
                  ))}
                </ul>
              </td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>{order.paiement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommandesAdmin;
