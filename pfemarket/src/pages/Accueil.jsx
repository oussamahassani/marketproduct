import '../component/Accueil.css';
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img1 from '../assets/images/electronics/electro3.jpg';
import img2  from '../assets/images/Fashion/Mode.jpg';
import img3  from '../assets/images/sports/Sports.jpg';
import img4  from '../assets/images/Beauté/Beauté.jpg';
import img5  from '../assets/images/maison/maison.jpg';
import img6  from '../assets/images/enfants/enfant.jpg';
import img7  from '../assets/images/animaux/animaux.jpg'
import img1234 from '../assets/images/1234.png';
import axios from 'axios';  
import { UserCircle } from "lucide-react";
import { MapPin } from "lucide-react";

export default function Accueil() {
  const navigate = useNavigate();

  const availableLanguages = ["en", "fr", "es", "de", "it", "pt"];
  const [anglais, setAnglais] = useState(localStorage.getItem("anglais") || "en");
  const [location, setLocation] = useState({ country: "", state: "" });
  const [error, setError] = useState(null);
  const [showLocation, setShowLocation] = useState(false);
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    localStorage.setItem("anglais", anglais);
    axios.get('https://api.example.com/products')
    .then((response) => {
      setProducts(response.data); 
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
    });
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
    <div className="marketplace-container">
<header className="marketplace-header">
  <div className="marketplace-header-left">
                    <img src={img1234}   className="marketplace-product-image" />
                
    <span className="marketplace-logo">LinkBay</span>
   
   
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
    <button className="marketplace-action-button" onClick={() => navigate('/panier')} >  🛒 {text[anglais].cart}</button>
    <UserCircle 
    size={28} 
    className="marketplace-profile-icon" 
    onClick={() => navigate('/login')} 
    style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '10px' }}
  />
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
  </div>
</header>

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
      <ul>
        <li>Oiseaux </li>
        <li>Rongeurs </li>
        <li>Poissons </li>
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
      
    </div>
    <div className="mega-column">
      <h4>Sports Individuels</h4>
     
    </div>
  
   
  </div>
</div>


<div className="dropdown-mega">
  <span className="dropdown-title">{text[anglais].deals}</span>
  <div className="mega-menu">
    <div className="mega-column">
      <h4>Jouets par Âge</h4>
     
    </div>
   
  
   
  </div>
</div>

        </nav>
        <section className="marketplace-hero full-width">
            <h2 className="marketplace-hero-title">{text[anglais].heroTitle}</h2>
            <p className="marketplace-hero-subtitle">{text[anglais].heroSubtitle}</p>
            <button className="marketplace-hero-button">{text[anglais].shopPokemon}</button>
        </section>
        <section className="marketplace-trending full-width">
            <h3 className="marketplace-trending-title">{text[anglais].trending}</h3>
            <div className="marketplace-trending-grid">
                <div className="marketplace-product" onClick={() => navigate('/electronics')}>
                    <img src={img1} alt="Electronics" className="marketplace-product-image" />
                    <p>{text[anglais].electronics}</p>
                </div>
                <div className="marketplace-product" onClick={() => navigate('/fashion')}>
                    <img src={img2} alt="Mode & Accessoires" className="marketplace-product-image" />
                    <p>{text[anglais].fashion}</p>
                </div>
                <div className="marketplace-product">
                    <img src={img3} alt="Sports & Outdoors" className="marketplace-product-image" />
                    <p>{text[anglais].sports}</p>
                </div>
                <div className="marketplace-product">
                    <img src={img4} alt="Health & Beauty" className="marketplace-product-image" />
                    <p>{text[anglais].healthBeauty}</p>
                </div>
                <div className="marketplace-product">
                    <img src={img5} alt="Maison & Décoration" className="marketplace-product-image" />
                    <p>{text[anglais].maisonDécoration}</p>
                </div>
                <div className="marketplace-product">
                    <img src={img6}  alt="Enfants & Jouets" className="marketplace-product-image" />
                    <p>{text[anglais].enfants}</p>
                </div>
                <div className="marketplace-product">
                    <img src={img7} alt="Animaux" className="marketplace-product-image" />
                    <p>{text[anglais].animaux}</p>
                </div>
                <div className="marketplace-product">
                    <img src="./assets/images/your-image-url-4.jpg" alt="Enfants & Jouets" className="marketplace-product-image" />
                    <p>{text[anglais].healthBeauty}</p>
                </div>
            </div>
        </section>
    </div>
  );
}