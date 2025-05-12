import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "axios";
import "../component/Header.css";
import img1234 from '../assets/images/1234.png';
import { UserCircle } from "lucide-react";
import { MapPin } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  const availableLanguages = ["en", "fr", "es", "de", "it", "pt"];
  const [anglais, setAnglais] = useState(localStorage.getItem("anglais") || "en");
  const [location, setLocation] = useState({ country: "", state: "" });
  const [error, setError] = useState(null);
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    localStorage.setItem("anglais", anglais);
  }, [anglais]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchAddress(position.coords.latitude, position.coords.longitude);
          setShowLocation(true);
        },
        () => {
          setError("Location access denied.");
          setShowLocation(true);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setShowLocation(true);
    }
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      setLocation({
        country: data.address.country || "Unknown",
        state: data.address.state || data.address.region || "Unknown",
      });
    } catch (err) {
      setError("Unable to retrieve location.");
    }
  };

  const handleAnglaisChange = (event) => {
    setAnglais(event.target.value);
  };
  const text = {
    en: {
      signIn: "Sign in",
      anglais: "Anglais",
      cart: "Cart",
      explore: "Home & Decoration",
      electronics: "Electronics",
      motors: "Animals & Accessories",
      fashion: "Fashion",
      sports: "Sports",
      healthBeauty: "Health & Beauty",
      maisonDécoration:"Home & Decoration",
      deals: "kids & Toys",
      enfants: "kids & Toys",
      animaux:"Animals & Accessories",
      heroTitle: "I choose you!",
      heroSubtitle: "Take charge of your destiny.",
      shopPokemon: "Shop ",
      trending: "Trending on LinkBay",
      location: "Show Location",
      country: "Country",
      state: "State",
    },
    fr: {
      signIn: "Se connecter",
      anglais: "Français",
      cart: "Panier",
      explore: "Maison & Décoration ",
      electronics: "Électronique",
      motors: "Animaux & Accessoires",
      fashion: "Mode",
      sports: "Sports",
      healthBeauty: "Santé & Beauté",
      maisonDécoration:"Maison & Décoration",
      deals: "Enfants & Jouets",
      enfants: "Enfants & Jouets",
      animaux: "Animaux & Accessoires",
      heroTitle: "je te choisis !",
      heroSubtitle: "Prenez en main votre destin.",
      shopPokemon: "Acheter ",
      trending: "Tendances sur LinkBay",
      location: "Afficher la localisation",
      country: "Pays",
      state: "État",
    }
  };

  return (
    <div className="mar-container">
      <header className="marketplace-header">
          <div className="marketplace-header-left">
                              <img src={img1234}   className="marketplace-product-image" />
          <h1 className="marketplace-logo">LinkBay</h1>
          
        </div>

        <div className="marketplace-search-container">
          <input type="text" placeholder="Search for anything" className="marketplace-search-input" />
          <button className="marketplace-search-button">
            <Search size={20} />
          </button>
        </div>

        <div className="marketplace-actions">
            
          <select className="marketplace-anglais-select" value={anglais} onChange={handleAnglaisChange}>
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang}>{text[lang]?.anglais || lang}</option>
            ))}
          </select>
          <button className="marketplace-action-button" onClick={() => navigate('/panier')}>  🛒 {text[anglais].cart}</button>
     
               </div>
               <div>
               <UserCircle 
    size={28} 
    className="marketplace-profile-icon" 
    onClick={() => navigate('/login')} 
    style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '10px' }}
  />
               </div>
               <div className="marketplace-location">
      {showLocation ? (
        location.country ? (
          <>
            <p>{text[anglais].country}: {location.country}</p>
            <p>{text[anglais].state}: {location.state}</p>
          </>
        ) : (
          <p>{error || "Loading..."}</p>
        )
      ) : (
        <MapPin size={20} className="text-gray-600 cursor-pointer" onClick={handleGetLocation}/>

        
      )}
    </div>
      </header>

      {/* Barre de navigation des catégories */}
      <nav className="marketplace-nav">
        <div className="dropdown-mega">
  <span className="dropdown-title">{text[anglais].explore}</span>
  <div className="mega-menu">
    <div className="mega-column">
      <h4>Mobilier</h4>
      <ul>
        <li>Canapés & Fauteuils</li>
        <li>Tables & Chaises</li>
        <li>Meubles TV</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Décoration</h4>
      <ul>
        <li>Coussins & Tapis</li>
        <li>Cadres & Miroirs</li>
        <li>Objets décoratifs</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Éclairage</h4>
      <ul>
        <li>Lampes de table</li>
        <li>Suspensions</li>
        <li>Appliques murales</li>
      </ul>
    </div>
  </div>
</div>
        
<div className="dropdown-mega">
  <span className="dropdown-title">{text[anglais].electronics}</span>
  <div className="mega-menu">
    <div className="mega-column">
      <h4>Smartphones & Tablettes</h4>
      <ul>
        <li>Téléphones Android</li>
        <li>iPhones</li>
        <li>Tablettes</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>TV & Audio</h4>
      <ul>
        <li>Téléviseurs</li>
        <li>Barres de son</li>
        <li>Casques & Écouteurs</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Ordinateurs</h4>
      <ul>
        <li>PC portables</li>
        <li>Ordinateurs de bureau</li>
        <li>Accessoires PC</li>
      </ul>
    </div>
  </div>
</div>

<div className="dropdown-mega">
  <span className="dropdown-title">{text[anglais].healthBeauty}</span>
  <div className="mega-menu">
    <div className="mega-column">
      <h4>Soins de la peau</h4>
      <ul>
        <li>Crèmes & Sérums</li>
        <li>Nettoyants</li>
        <li>Exfoliants</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Maquillage</h4>
      <ul>
        <li>Fond de teint</li>
        <li>Rouges à lèvres</li>
        <li>Mascaras</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Parfums</h4>
      <ul>
        <li>Parfums pour femmes</li>
        <li>Parfums pour hommes</li>
        <li>Brumes corporelles</li>
      </ul>
    </div>
  </div>
</div>
<div className="dropdown-mega">
  <span className="dropdown-title">{text[anglais].fashion}</span>
  <div className="mega-menu">
    <div className="mega-column">
      <h4>Homme</h4>
      <ul>
        <li>T-shirts</li>
        <li>Vestes</li>
        <li>Pantalons</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Femme</h4>
      <ul>
        <li>Robes</li>
        <li>Tops</li>
        <li>Jupes</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Accessoires</h4>
      <ul>
        <li>Sacs à main</li>
        <li>Bijoux</li>
        <li>Ceintures</li>
      </ul>
    </div>
  </div>
</div>

<div className="dropdown-mega">
  <span className="dropdown-title">{text[anglais].motors}</span>
  <div className="mega-menu">
    <div className="mega-column">
      <h4>Chiens</h4>
      <ul>
        <li>Alimentation</li>
        <li>Colliers & Laisses</li>
        <li>Lits & Coussins</li>
        <li>Jouets</li>
        <li>Hygiène</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Chats</h4>
      <ul>
        <li>Nourriture</li>
        <li>Arbres à chat</li>
        <li>Litières</li>
        <li>Jouets</li>
        <li>Transport</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Autres animaux</h4>
      <ul>
        <li>Oiseaux (cages, nourriture)</li>
        <li>Rongeurs (accessoires, litière)</li>
        <li>Poissons (aquariums, nourriture)</li>
        <li>Reptiles</li>
      </ul>
    </div>
  </div>
</div> 
<div className="dropdown-mega">
  <span className="dropdown-title">{text[anglais].sports}</span>
  <div className="mega-menu">
    <div className="mega-column">
      <h4>Sports Collectifs</h4>
      <ul>
        <li>Football - Ballons, Maillots, Chaussures</li>
        <li>Basketball - Ballons, Chaussures, Tenues</li>
        <li>Rugby - Ballons, Protections, Tenues</li>
        <li>Volley-ball - Ballons, Filets, Chaussures</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Sports Individuels</h4>
      <ul>
        <li>Fitness & Musculation - Haltères, Tapis de sol, Appareils de musculation</li>
        <li>Running - Chaussures, Vêtements, Montres GPS</li>
        <li>Natation - Maillots de bain, Lunettes, Bonnet</li>
        <li>Boxe - Gants de boxe, Protections, Sacs de frappe</li>
        <li>Arts Martiaux - Kimono, Ceinture, Protections</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Sports Outdoor</h4>
      <ul>
        <li>Randonnée - Sacs à dos, Bâtons, Tentes</li>
        <li>Escalade - Corde, Harnais, Chaussures</li>
        <li>Camping - Tentes, Lampes, Réchauds</li>
        <li>Sports d'hiver - Ski, Snowboard, Vêtements thermiques</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Sports Nautiques</h4>
      <ul>
        <li>Surf - Planches, Combinaisons, Accessoires</li>
        <li>Plongée - Masques, Tubas, Palmes</li>
        <li>Paddle - Planches, Pagaies, Accessoires</li>
        <li>Kayak - Pagaies, Gilets de sauvetage, Kayaks</li>
      </ul>
    </div>
  </div>
</div>


<div className="dropdown-mega">
  <span className="dropdown-title">{text[anglais].deals}</span>
  <div className="mega-menu">
    <div className="mega-column">
      <h4>Jouets par Âge</h4>
      <ul>
        <li>0-12 Mois - Jouets d'éveil, Hochets, Peluches</li>
        <li>1-3 Ans - Jouets d'apprentissage, Blocs de construction, Puzzles</li>
        <li>3-6 Ans - Jeux éducatifs, Jouets créatifs, Dînettes</li>
        <li>6-12 Ans - Jeux de société, Figurines, Lego</li>
        <li>12+ Ans - Puzzles complexes, Jeux vidéo, Modèles réduits</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Jouets et Loisirs Créatifs</h4>
      <ul>
        <li>Jeux de construction - Blocs, Lego, K'Nex</li>
        <li>Arts et loisirs créatifs - Peinture, Crayons, Pâte à modeler</li>
        <li>Jeux de rôle - Dînettes, Outils, Costumes</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Jouets Éducatifs</h4>
      <ul>
        <li>Jouets STEM - Kits de science, Mathématiques, Électronique</li>
        <li>Jouets Montessori - Blocs, Jeux de logique</li>
        <li>Jouets interactifs - Tablettes, Robots, Commandes vocales</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Meubles et Décoration</h4>
      <ul>
        <li>Mobilier pour enfants - Chaises, Tables, Lits</li>
        <li>Décoration de chambre - Rideaux, Stickers, Luminaires</li>
        <li>Rangements - Boîtes à jouets, Casiers</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Vêtements et Accessoires</h4>
      <ul>
        <li>Vêtements pour bébé - Bodys, Pyjamas, Chaussures</li>
        <li>Vêtements pour enfants - T-shirts, Robes, Vestes</li>
        <li>Accessoires pour enfants - Sacs à dos, Chapeaux</li>
      </ul>
    </div>
    <div className="mega-column">
      <h4>Accessoires de Puériculture</h4>
      <ul>
        <li>Biberons et Tétines - Biberons, Stérilisateurs</li>
        <li>Chaises hautes et Transats - Chaises évolutives, Transats</li>
        <li>Poussettes et Sièges auto - Poussettes, Sièges auto</li>
      </ul>
    </div>
  </div>
</div>

        </nav>

    </div>
  );
}