// src/components/AddProduct.jsx
import { useState } from "react";

export default function AddProduct({ onAdd }) {
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        category: "",
        rating: 0,
        image: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(product);
        setProduct({ name: "", price: 0, category: "", rating: 0, image: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="add-product-form">
            <input type="text" placeholder="Nom" value={product.name}
                   onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            <input type="number" placeholder="Prix" value={product.price}
                   onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })} />
            <input type="text" placeholder="Catégorie" value={product.category}
                   onChange={(e) => setProduct({ ...product, category: e.target.value })} />
            <input type="number" placeholder="Note" value={product.rating}
                   onChange={(e) => setProduct({ ...product, rating: parseInt(e.target.value) })} />
            <input type="text" placeholder="Image" value={product.image}
                   onChange={(e) => setProduct({ ...product, image: e.target.value })} />
            <button type="submit">Ajouter</button>
        </form>
    );
}
