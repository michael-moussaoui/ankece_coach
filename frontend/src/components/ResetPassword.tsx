import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Récupère le token depuis l'URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/reset-password', {
        token, // Envoie le token reçu dans l'URL
        password,
      });

      setMessage(response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        setMessage(error.response?.data?.message || 'Erreur lors de la réinitialisation.');
      } else {
        setMessage('Une erreur inconnue est survenue.');
      }
    }
  };

  return (
    <div>
      <h1>Réinitialiser votre mot de passe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label> Nouveau mot de passe </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label> Confirmez le mot de passe </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Réinitialiser</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
