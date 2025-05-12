import React, { useState } from 'react';
import {
  FaHome, FaShoppingCart, FaPowerOff,
  FaSync, FaUser, FaListAlt, FaAngleDown, FaAngleUp,
  FaCouch, FaTv, FaHeart, FaTshirt, FaDog, FaFootballBall, FaChild
} from 'react-icons/fa';
import "../component/AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import LoginAdmin from "../admin/LoginAdmin";
import Accueil from '../pages/Accueil';

const AdminDashboard = () => {
  const [showStockMenu, setShowStockMenu] = useState(false);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const navigate = useNavigate();

  const toggleStockMenu = () => {
    setShowStockMenu(!showStockMenu);
  };

  const [activePage, setActivePage] = useState("dashboard");


  const handleSubcategoryClick = (mainCategory, subCategory) => {
    const route = `/stock/${mainCategory}/${subCategory}`.replace(/\s+/g, '-').toLowerCase();
    navigate(route);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin");
                // Redirige vers la page de login
  };

  const subcategories = {
    "Maison & Décoration": ["Meubles", "Luminaires", "Décorations murales"],
    "Électronique": ["Télévisions", "Ordinateurs", "Smartphones"],
    "Santé & Beauté": ["Cosmétiques", "Soins", "Parfums"],
    "Mode": ["Homme", "Femme", "Accessoires"],
    "Animaux & Accessoires": ["Chiens", "Chats", "Oiseaux"],
    "Sports": ["Fitness", "Football", "Cyclisme"],
    "Enfants & Jouets": ["Jouets", "Jeux éducatifs", "Vêtements enfants"]
  };

  const getIcon = (category) => {
    switch (category) {
      case "Maison & Décoration": return <FaCouch />;
      case "Électronique": return <FaTv />;
      case "Santé & Beauté": return <FaHeart />;
      case "Mode": return <FaTshirt />;
      case "Animaux & Accessoires": return <FaDog />;
      case "Sports": return <FaFootballBall />;
      case "Enfants & Jouets": return <FaChild />;
      default: return null;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
        <li style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
  <FaHome /> Accueil
</li>



          <li onClick={toggleStockMenu} style={{ cursor: "pointer" }}>
            <span><FaShoppingCart /> Stock {showStockMenu ? <FaAngleUp /> : <FaAngleDown />}</span>
          </li>
          {showStockMenu && (
  <ul className="submenu">
    {Object.keys(subcategories).map((category) => (
      <li
        key={category}
        className="submenu-item"
        onMouseEnter={() => setActiveSubcategory(category)}
      >
        {getIcon(category)} {category}
      </li>
    ))}
  </ul>
)}

{activeSubcategory && (
  <div
    className="sub-submenu"
    onMouseEnter={() => setActiveSubcategory(activeSubcategory)}
    onMouseLeave={() => setActiveSubcategory(null)}
  >
    <ul>
      {subcategories[activeSubcategory].map((sub, index) => (
        <li key={index} onClick={() => handleSubcategoryClick(activeSubcategory, sub)}>
          {sub}
        </li>
      ))}
    </ul>
  </div>
)}

<li><FaUser /> les utilisateurs</li>

          <hr />
          <li><FaListAlt /> Commandes</li>
          <li><FaSync /> MAJ Produits</li>
          <li><FaUser /> Mes informations</li>
<li onClick={handleLogout} style={{ cursor: "pointer" }}>
  <FaPowerOff /> Se déconnecter
</li>
        </ul>
      </aside>

      <main className="main-content">
  {activePage === "dashboard" && (
    <>
      <input type="text" placeholder="Rechercher..." />
      <h1>Bienvenue dans l’espace d’administration.</h1>
      <img src="/boutique.jpg" alt="boutique" />
     
    
    </>
  )}

  {activePage === "accueil" && <Accueil />}
</main>

    </div>
  );
};

export default AdminDashboard;
