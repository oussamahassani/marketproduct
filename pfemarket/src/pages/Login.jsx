import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate
import { TextInput, Button, Card, Label, Select } from 'flowbite-react'; // Utilisation des bons composants
import '../component/Login.css';
import Header from '../pages/Header';

const Inscription = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('acheteur');
  const [isRegistering, setIsRegistering] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [numTel, setNumTel] = useState('');
  const [adresse, setAdresse] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Utilisation de useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (isRegistering) {
      console.log('Nom:', nom);
      console.log('Prénom:', prenom);
      console.log('Numéro de téléphone:', numTel);
      console.log('Adresse:', adresse);
    }

    console.log('Email:', email);
    console.log('Mot de passe:', password);
    console.log('Rôle:', role);

    // Redirection vers la page des produits ou autre action après soumission
    // navigate('/products'); // Exemple de redirection
  };

  return (
    <>
      <Header />
      <div className="inscription-container">
        <Card className="w-full max-w-md p-6 mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {isRegistering ? 'Créez votre compte' : 'Connectez-vous à votre compte'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <>
                <Label htmlFor="nom">Informations personnelles</Label>
                <div className="form-group">
                  <Label htmlFor="nom">Nom</Label>
                  <TextInput
                    type="text"
                    id="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <Label htmlFor="prenom">Prénom</Label>
                  <TextInput
                    type="text"
                    id="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <Label htmlFor="numTel">Numéro de téléphone</Label>
                  <TextInput
                    type="tel"
                    id="numTel"
                    value={numTel}
                    onChange={(e) => setNumTel(e.target.value)}
                    required
                  />
                </div>

                <Label htmlFor="adresse">Informations d'adresse</Label>
                <div className="form-group">
                  <Label htmlFor="adresse">Adresse</Label>
                  <TextInput
                    type="text"
                    id="adresse"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <Label htmlFor="email">Informations de connexion</Label>

            <div className="form-group">
              <Label htmlFor="email">Adresse e-mail</Label>
              <TextInput
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <Label htmlFor="password">Mot de passe</Label>
              <TextInput
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <TextInput
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {!isRegistering && (
              <div className="form-group">
                <Label htmlFor="role">Rôle</Label>
                <Select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="acheteur">Acheteur</option>
                  <option value="vendeur">Vendeur</option>
                </Select>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full">
              {isRegistering ? "S'inscrire" : 'Connexion'}
            </Button>
          </form>

          <Button
            onClick={() => setIsRegistering(!isRegistering)}
            className="w-full mt-4"
            color="gray"
          >
            {isRegistering ? 'Déjà un compte ? Se connecter' : 'Créer un compte'}
          </Button>
        </Card>
      </div>
    </>
  );
};

export default Inscription;
