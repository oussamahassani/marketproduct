import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate
import { Form , Button, Card  } from 'react-bootstrap';

import '../component/Login.css';
import Header from '../pages/Header';
import {signup , login} from '../services/loginService'
const Inscription = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('ACHETEUR');
  const [isRegistering, setIsRegistering] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [numTel, setNumTel] = useState('');
  const [adresse, setAdresse] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Utilisation de useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (isRegistering) {
const creteNewAcount =  await signup({email,password,role,nom,prenom,numTel,adresse})
console.log('creteNewAcount:', creteNewAcount);
if(creteNewAcount.id){
   navigate('/login'); 
}
    }
    else {
const loginResult = await login(email,password)
console.log('loginResult:', loginResult);

  localStorage.setItem('role' , loginResult.role);
  localStorage.setItem('token' ,loginResult.token)
  if(loginResult.role =="ADMIN"){

navigate('/admin/dashboard'); 
  }
  else {
navigate('/products'); 
  }
      
    }

    console.log('Email:', email);
    console.log('Mot de passe:', password);
    console.log('Rôle:', role);


  };

  return (
    <>
      <Header />
      <div className="inscription-container">
        <Card className="w-full max-w-md p-6 mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {isRegistering ? 'Créez votre compte' : 'Connectez-vous à votre compte'}
          </h2>
          <Form  onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <>
                <Form.Label htmlFor="nom">Informations personnelles</Form.Label>
                <div className="form-group">
                  <Form.Label htmlFor="nom">Nom</Form.Label>
                  <Form.Control
                    type="text"
                    id="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <Form.Label htmlFor="prenom">Prénom</Form.Label>
                  <Form.Control
                    type="text"
                    id="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <Form.Label htmlFor="numTel">Numéro de téléphone</Form.Label>
                  <Form.Control
                    type="tel"
                    id="numTel"
                    value={numTel}
                    onChange={(e) => setNumTel(e.target.value)}
                    required
                  />
                </div>

                <Form.Label htmlFor="adresse">Informations d'adresse</Form.Label>
                <div className="form-group">
                  <Form.Label htmlFor="adresse">Adresse</Form.Label>
                  <Form.Control
                    type="text"
                    id="adresse"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <Form.Label htmlFor="email">Informations de connexion</Form.Label>

            <div className="form-group">
              <Form.Label htmlFor="email">Adresse e-mail</Form.Label>
              <Form.Control
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <Form.Label htmlFor="password">Mot de passe</Form.Label>
              <Form.Control
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <Form.Label htmlFor="confirmPassword">Confirmer le mot de passe</Form.Label>
              <Form.Control
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {!isRegistering && (
              <div className="form-group">
                <Form.Label htmlFor="role">Rôle</Form.Label>
                <Form.Select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="ACHETEUR">Acheteur</option>
                  <option value="VEDEUR">Vendeur</option>
                </Form.Select>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full">
              {isRegistering ? "S'inscrire" : 'Connexion'}
            </Button>
          </Form >

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
