import '../component/Header.css';
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import img1 from '../assets/images/electronics/images.jpg';
import img2 from '../assets/images/electronics/laptop.jpg';
import img3 from '../assets/images/electronics/wir.jpg';
import img4 from '../assets/images/electronics/Smartwatch.jpg';
import Header from '../pages/Header'
import AddProduct from "../pages/AddProduct";

export default function Electronics() {
    const navigate = useNavigate();

    const [fetchedProducts, setFetchedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/produits");
                if (!response.ok) throw new Error("Erreur lors du chargement des produits");
                const data = await response.json();
    
                // Si tu as une pagination comme { produits: [], total: ... }, adapte ici :
                setProducts(data.produits || []);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits :", error);
            }
        };
    
        fetchProducts();
    }, []);
    
    
    
    const [searchParams, setSearchParams] = useSearchParams();

    const availableLanguages = ["en", "fr", "es", "de", "it", "pt"];
    const [anglais, setAnglais] = useState(localStorage.getItem("anglais") || "en");
    const [location, setLocation] = useState({ country: "", state: "" });
    const [error, setError] = useState(null);
    const [showLocation, setShowLocation] = useState(false);

    const [priceRange, setPriceRange] = useState([0, parseInt(searchParams.get("price") || 1000)]);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
    const [minRating, setMinRating] = useState(parseInt(searchParams.get("rating") || 0));

    const staticProducts = [
        { id: 1, name: "Smartphone XYZ", price: 499, category: "Phones", rating: 4, image: img1 },
        { id: 2, name: "Laptop", price: 999, category: "Computers", rating: 5, image: img2 },
        { id: 3, name: "Wireless Headphones", price: 99, category: "Accessories", rating: 3, image: img3 },
        { id: 4, name: "Smartwatch Pro", price: 29, category: "Watches", rating: 2, image: img4 },
    ];

    const products = fetchedProducts.length > 0 ? fetchedProducts : staticProducts;

    const categories = ["All", "Phones", "Computers", "Accessories", "Watches"];

    const filteredProducts = products.filter(product => {
        return (
            (selectedCategory === "All" || product.category === selectedCategory) &&
            product.price >= priceRange[0] && product.price <= priceRange[1] &&
            product.rating >= minRating
        );
    });

    useEffect(() => {
        localStorage.setItem("anglais", anglais);
    }, [anglais]);

    useEffect(() => {
        setSearchParams({
            category: selectedCategory,
            price: priceRange[1].toString(),
            rating: minRating.toString()
        }, { replace: true });
    }, [selectedCategory, priceRange, minRating, setSearchParams]);
    

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

    const text = {
        en: { signIn: "Sign in", cart: "Cart", electronics: "Electronics", category: "Category", price: "Price", rating: "Rating", country: "Country", state: "State" },
        fr: { signIn: "Se connecter", cart: "Panier", electronics: "Électronique", category: "Catégorie", price: "Prix", rating: "Note", country: "Pays", state: "Région" },
    };

    const resetFilters = () => {
        setSelectedCategory("All");
        setPriceRange([0, 1000]);
        setMinRating(0);
    };


    
    return (
        
        <div className="marketplace-container">
         <Header />

            <h1 className="electronics-title">{text[anglais].electronics}</h1>

            {/* Filtres */}
            <div className="electronics-content">
    <aside className="electronics-sidebar">
        <h3>Filtres</h3>
        <div className="filter-section">
            <label>{text[anglais].category}</label>
            <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                ))}
            </select>
        </div>
        <div className="filter-section">
            <label>{text[anglais].price}</label>
            <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            />
            <span>0 DT - {priceRange[1]} DT</span>
        </div>
        <div className="filter-section">
            <label>{text[anglais].rating}</label>
            <select value={minRating} onChange={(e) => setMinRating(parseInt(e.target.value))}>
                <option value={0}>All</option>
                <option value={1}>1 ★ & up</option>
                <option value={2}>2 ★ & up</option>
                <option value={3}>3 ★ & up</option>
                <option value={4}>4 ★ & up</option>
                <option value={5}>5 ★</option>
            </select>
        </div>
        <button className="reset-filters-button" onClick={resetFilters}>
            Reset Filters
        </button>
    </aside>

    <div className="electronics-grid">
        {filteredProducts.map(product => (
            <div key={product.id} className="electronics-product">
                <img src={product.image} alt={product.name} className="electronics-product-image" />
                <h2 className="electronics-product-name">{product.name}</h2>
                <p className="electronics-product-price">{product.price} DT</p>
                <p className="electronics-product-rating">{product.rating} ★</p>
                <button className="electronics-buy-button" onClick={() => navigate(`/product/${product.id}`)}>
               Ajouter au panier 
                </button>

            </div>
            
        ))}
    </div>
</div>

        </div>
    );
}
