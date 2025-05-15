import React, { useEffect, useState } from 'react';
import ProductServices from '../services/ProductServices';
//import '../component/styles.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ModeStock = () => {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    nom: '',
    description: '',
    prix: '',
    image: '',
    stock: '',
    categorie: 'Mode',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [productIdToEdit, setProductIdToEdit] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductServices.getAllProducts(0, 20, "Mode");
        if (response.status !== 200) throw new Error("Erreur lors du chargement des produits");
        const data = response.data;
        setFetchedProducts(data.products || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const updated = await ProductServices.updateProduct(productIdToEdit, newProduct);
        setFetchedProducts((prev) =>
          prev.map((p) => (p.id === productIdToEdit ? updated : p))
        );
        alert("Produit modifié avec succès.");
      } else {
        const response = await ProductServices.createProduct(newProduct);
        setFetchedProducts([response.data, ...fetchedProducts]);
        alert("Produit ajouté avec succès.");
      }

      setNewProduct({
        nom: '',
        description: '',
        prix: '',
        image: '',
        stock: '',
        categorie: 'Mode',
      });
      setIsEditing(false);
      setProductIdToEdit(null);
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur lors de l'opération.");
    }
  };

  const handleEdit = (product) => {
    setNewProduct({
      nom: product.nom,
      description: product.description,
      prix: product.prix,
      image: product.image,
      stock: product.stock,
      categorie: product.categorie,
    });
    setIsEditing(true);
    setProductIdToEdit(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setNewProduct({
      nom: '',
      description: '',
      prix: '',
      image: '',
      stock: '',
      categorie: 'Mode',
    });
    setIsEditing(false);
    setProductIdToEdit(null);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      try {
        await ProductServices.deleteProduct(productId);
        setFetchedProducts(prev => prev.filter(p => p.id !== productId));
        alert("Produit supprimé avec succès.");
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Erreur lors de la suppression du produit.");
      }
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h2>{isEditing ? "Modifier le produit" : "Ajouter un nouveau produit"}</h2>
      <form className="product-form" onSubmit={handleAddProduct}>
        <input type="text" name="nom" placeholder="Nom" value={newProduct.nom} onChange={handleInputChange} required />
        <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleInputChange} required />
        <input type="number" name="prix" placeholder="Prix" value={newProduct.prix} onChange={handleInputChange} required />
        <input type="text" name="image" placeholder="URL de l'image" value={newProduct.image} onChange={handleInputChange} />
        <input type="number" name="stock" placeholder="Stock" value={newProduct.stock} onChange={handleInputChange} required />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="action-button edit">
            {isEditing ? "Modifier" : "Ajouter"}
          </button>
          {isEditing && (
            <button type="button" onClick={handleCancelEdit} className="action-button delete">
              Annuler
            </button>
          )}
        </div>
      </form>

      <h2>Produits de la catégorie Mode</h2>
      <table className="table-custom">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix (€)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fetchedProducts.map((product) => (
            <tr key={product.id}>
              <td><img src={product.image || "https://via.placeholder.com/100"} alt={product.nom} className="w-20 h-auto" /></td>
              <td>{product.nom}</td>
              <td>{product.description}</td>
              <td>{product.prix} €</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => handleEdit(product)} className="action-button edit"><FaEdit /> Modifier</button>
                <button onClick={() => handleDelete(product.id)} className="action-button delete"><FaTrash /> Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ModeStock;