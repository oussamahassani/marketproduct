import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const StockSubcategoryPage = () => {
  const { subcategory } = useParams();
  const API_URL = "http://localhost:8080/produits";

  const [produits, setProduits] = useState([
    { id: 1, nom: 'Produit 1', prix: 50, quantite: 5, description: "Une belle description 1" },
    { id: 2, nom: 'Produit 2', prix: 100, quantite: 3, description: "Une autre description 2" }
  ]);

  const [nouveauProduit, setNouveauProduit] = useState({
    nom: '',
    prix: '',
    quantite: '',
    description: ''
  });

  const [editMode, setEditMode] = useState(null);

  // Charger les produits au montage
  useEffect(() => {
    fetch("http://localhost:8080/produits")
      .then(res => res.json())
      .then(data => setProduits(data.content || data)) // selon le format de retour
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setNouveauProduit({ ...nouveauProduit, [e.target.name]: e.target.value });
  };



  const ajouterProduit = () => {
    const { nom, prix, quantite, description } = nouveauProduit;
    if (!nom || !prix || !quantite || !description) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    if (editMode) {
      // PATCH pour modifier
      fetch(`http://localhost:8080/produits/${editMode}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...nouveauProduit })
      })
        .then(res => res.json())
        .then(updated => {
          setProduits(produits.map(p => p.id === editMode ? updated : p));
          setEditMode(null);
          setNouveauProduit({ nom: '', prix: '', quantite: '', description: '' });
        });
    } else {
      // POST pour ajouter
      fetch("http://localhost:8080/produits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...nouveauProduit })
      })
        .then(res => res.json())
        .then(newProduit => {
          setProduits([...produits, newProduit]);
          setNouveauProduit({ nom: '', prix: '', quantite: '', description: '' });
        });
    }
  };

  
  
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      fetch(`http://localhost:8080/produits/${id}`, { method: "DELETE" })
        .then(() => setProduits(produits.filter(p => p.id !== id)));
    }
  };

  
  const handleEdit = (id) => {
    const produit = produits.find(p => p.id === id);
    setNouveauProduit({
      nom: produit.nom,
      prix: produit.prix,
      quantite: produit.quantite,
      description: produit.description
    });
    setEditMode(id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{subcategory} - Produits</h1>

      <div style={{ marginBottom: "20px", backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "5px" }}>
        <h3>{editMode ? "Modifier" : "Ajouter"} un produit</h3>
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={nouveauProduit.nom}
          onChange={handleChange}
          style={{ marginRight: "10px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="number"
          name="prix"
          placeholder="Prix"
          value={nouveauProduit.prix}
          onChange={handleChange}
          style={{ marginRight: "10px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="number"
          name="quantite"
          placeholder="Quantité"
          value={nouveauProduit.quantite}
          onChange={handleChange}
          style={{ marginRight: "10px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <textarea
          name="description"
          placeholder="Description détaillée"
          value={nouveauProduit.description}
          onChange={handleChange}
          rows="4"
          style={{
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            resize: "vertical"
          }}
        ></textarea>
        <button
          onClick={ajouterProduit}
          style={{
            backgroundColor: editMode ? "#007bff" : "#28a745",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {editMode ? "Modifier" : "Ajouter"}
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Nom</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Prix</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Quantité</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Description</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((produit) => (
            <tr key={produit.id}>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{produit.nom}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{produit.prix} €</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{produit.quantite}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{produit.description}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                <button onClick={() => handleEdit(produit.id)} style={{ marginRight: "10px" }}>
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(produit.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockSubcategoryPage; 