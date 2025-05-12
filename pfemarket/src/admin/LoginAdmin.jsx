// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, Button, Card, Label } from "flowbite-react";

export default function LoginAdmin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === "admin" && password === "admin123") {
            sessionStorage.setItem("isAdmin", "true");
            navigate("/admin/dashboard");
        } else {
            setError("Nom d'utilisateur ou mot de passe incorrect");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md p-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">Connexion Admin</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="username">Nom d'utilisateur</Label>
                        <TextInput
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="admin"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Mot de passe</Label>
                        <TextInput
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="admin123"
                        />
                    </div>
                    <Button type="submit" className="w-full">Se connecter</Button>
                </form>
                {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
            </Card>
        </div>
    );
}
