import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminAuth");
    axios.get('http://localhost:8001/auth/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("Utilisateurs reçus :", response.data);
      setUsers(response.data);
    })
    .catch(error => console.error("Erreur de chargement des utilisateurs:", error));
  }, []);

  return (
    <div className="user-list">
      <h2>Liste des utilisateurs</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Rôle</th>
            <th>Date de création</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
        
              <td>{user.prenom}</td>
              <td>{user.nom}</td>
              <td>{user.email}</td>
              <td>{user.numTel}</td>
              <td>{user.adresse}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>{user.enabled ? "Actif" : "Inactif"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
